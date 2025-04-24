import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const result = streamText({
    model: anthropic('claude-3-5-sonnet-latest'),
    system: `You are a personally identifiable information (PII) detector. Extract all PII cosider those as priority,
    Email addresses (emailAddres),
    Phone numbers (phoneNumber),
    Social security numbers (socialSecurityNumber),
    Credit card numbers (creditCardNumber),
    Names (name)
    Then, write a human-readable analysis of the document following this exmaple format. Example:

    Name: ...
    Phone Number: ...
    Email Address: ...
    LinkedIn: ...
    <newline>
    The document contains personal information from...`,
    maxTokens: 1044,
    messages
  });

  return result.toDataStreamResponse();
}