import { OpenAIStream, StreamingTextResponse } from 'ai';


export async function GET(req: Request) {
    // const { messages } = await req.json();

    const response = await fetch('http://127.0.0.1:8000/chat', {});
    const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();

    while (true) {
        const {value, done} = await reader.read();
        if (done) break;
        console.log('Received', value);
      }
      
      console.log('Response fully received');
      


    // const response = await openai.chat.completions.create({
    //   model: 'gpt-4',
    //   stream: true,
    //   messages,
    // });

    // const stream = OpenAIStream(response);
    // return new StreamingTextResponse(stream);
    return Response.json({ res: 'ok' })
  }