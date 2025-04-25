
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { streamText, UIMessage } from 'ai';
import { openai } from '@ai-sdk/openai';
import { connectToDatabase } from '@/lib/mongo';
import Chat from '@/models/Chat';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  console.log("🚀 ~ POST ~ session:", session)
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
      const savetoDB = async () => {  
        try {
          await connectToDatabase();
          await Chat.create({
            userId: session.user?.email,
            createdAt: new Date(),
            messages: [
              ...messages,
              { role: 'assistant', content: fullAssistantMessage || finalMessage?.text },
            ],
          });
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