import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongo';
import Chat from '@/models/Chat';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });

  await connectToDatabase();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const chats = await Chat.find({ userId: session.user?.email })
    .sort({ createdAt: -1 })
    .lean();

  return Response.json(chats);
}