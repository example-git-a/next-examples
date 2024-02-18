'use client';

import { useChat } from 'ai/react';

import { ChatMessage } from '@/components/chat-message';

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();

    return (
        <div>
            {messages.map(m => (
                <div key={m.id}>
                    {/* {m.role === 'user' ? 'User: ' : 'AI: '}
                    {m.content} */}
                    <ChatMessage message={m}/>
                </div>
            ))}

            <form onSubmit={handleSubmit}>
                <label>
                    Say something...
                    <input value={input} onChange={handleInputChange} />
                </label>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}