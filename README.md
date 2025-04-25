📃 Project Overview

ComplyBot is an AI-powered compliance assistant built with Next.js, MongoDB Atlas, and OpenAI's GPT-4o via Vercel's AI SDK. It allows users to interact with an AI chatbot to upload files (PDFs, images) and detect personally identifiable information (PII) within documents. The system is protected by authentication and stores user conversations securely.

## Getting Started

Create a .env.local file and add:


```bash
MONGODB_URI=your_mongodb_atlas_uri
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-deployed-app.vercel.app
OPENAI_API_KEY=your_openai_api_key
GITHUB_ID=your_github_oauth_id
GITHUB_SECRET=your_github_oauth_secret
```


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

- Frontend: Built with Next.js App Router and Material UI (MUI) for a responsive and professional design. @ai-sdk/react is used for real-time AI chat streaming.

- Authentication: Implemented with NextAuth.js using GitHub OAuth provider. Sessions are securely managed.

- AI Integration: Leveraging Vercel AI SDK to connect with OpenAI's GPT-4o.

- Database: Conversations and user interactions are stored in MongoDB Atlas, with a schema designed to handle message attachments (experimental_attachments).

- Protected API Routes: APIs are protected by user authentication and session validation to ensure data privacy.

- Deployment: Hosted on Vercel, using environment variables for a secure and scalable deployment.

## Tool Functionality Implemented

- PII Detector

- Upload Support: Users can upload PDFs or images via the chat interface.

- Automatic Detection: Upon uploading, the AI analyzes the files for sensitive data such as:
    - Email addresses
    - Phone numbers
    - Social security numbers
    - Credit card numbers
    - Full names

- Result Presentation: PII findings are formatted and displayed back through the chat in a clear, structured message.

- Message Persistence: Each message and its corresponding AI response are saved into MongoDB Atlas, along with any file metadata attached.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
