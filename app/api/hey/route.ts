import { OpenAIClient, OpenAIKeyCredential  } from '@azure/openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
// const client = new OpenAIClient(
//   'https://YOUR-AZURE-OPENAI-ENDPOINT',
//   new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY!),
// );

// https://learn.microsoft.com/en-us/javascript/api/overview/azure/openai-readme?view=azure-node-preview#using-an-api-key-from-openai
const client = new OpenAIClient(new OpenAIKeyCredential(process.env.OPENAI_API_KEY!));
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { messages } = await req.json();
 
  // Ask Azure OpenAI for a streaming chat completion given the prompt
  const response = await client.streamChatCompletions(
    'gpt-3.5-turbo',
    messages,
  );
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}