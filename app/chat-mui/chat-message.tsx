// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import { useEffect, useState } from 'react';

import { Message } from 'ai'
// import remarkGfm from 'remark-gfm'
// import remarkMath from 'remark-math'

// import { cn } from '@/lib/utils'
// import { CodeBlock } from '@/components/codeblock'
// import { MemoizedReactMarkdown } from '@/components/markdown'
import { Marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import 'highlight.js/styles/gradient-light.css';

// import { IconOpenAI, IconUser } from '@/components/ui/icons'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import { ChatMessageActions } from '@/components/chat-message-actions'

export interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {

  const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  )

  const [html, setHtml] = useState('');

  useEffect(() => {
    setHtml(marked.parse(message.content) as string);
  }, [message]);

  return (
    <Box
      display="flex"
      // className={cn('group relative mb-4 flex items-start md:-ml-12')}
      {...props}
      gap={2}
    >

      {message.role === 'user' ? <Avatar /> :
        <Avatar>
          <AutoAwesomeIcon />
        </Avatar>}
      {/* <Avatar sx={{ bgcolor: message.role === 'user' ? 'green' : 'deepPurple' }}></Avatar> */}

      <div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <ChatMessageActions message={message} />
      </div>

    </Box >
  )
}