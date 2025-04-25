
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { streamText, UIMessage } from 'ai';
import { openai } from '@ai-sdk/openai';
import { connectToDatabase } from '@/lib/mongo';
import Chat from '@/models/Chat';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });
  
  const { messages }: { messages: UIMessage[] } = await req.json();
  let fullAssistantMessage = '';

  const result = streamText({
    model: openai('gpt-4o'),
    system: 'You are a helpful assistant.',
    messages,
    maxTokens: 1000,
    onError: (error) => {
      console.error('Error: > >> ', error);
    },
    onStepFinish: (message) => {
      console.log('Step finished message:', message);
    },
    onFinish: (finalMessage) => {
      const lastUserMessage = messages.at(-1);
      // To be refactored
      // const safeUserMessage = {
      //   role: lastUserMessage?.role,
      //   content: lastUserMessage?.content,
      //   experimental_attachments: lastUserMessage?.experimental_attachments?.map((att) => ({
      //     name: att.name,
      //     contentType: att.contentType,
      //     url: "",
      //   })),
      // };
      const savetoDB = async () => {  
        try {
          await connectToDatabase();
          await Chat.findOneAndUpdate(
            { userId: session.user?.email },
            {
              $push: { 
                messages: {
                  $each: [
                    {
                      ...lastUserMessage,
                    },
                    {
                      role: 'assistant',
                      content: fullAssistantMessage || finalMessage.text,
                    },
                  ],
                },
              },
              $setOnInsert: { createdAt: new Date() },
            },
            { upsert: true, new: true }
          );
          console.log('Message Saved succesfully:', finalMessage?.text);
        } catch (error) {
          console.error('❌ Error al guardar el chat:', error);
        }
      }
      savetoDB()
    },
  });

  return result.toDataStreamResponse();
}