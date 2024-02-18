// ./app/page.js
'use client';

import { useChat } from 'ai/react';
import Button from '@mui/material/Button';
import { send } from 'process';
import { useEffect, useState } from 'react';

import { Marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import 'highlight.js/styles/gradient-light.css';
// https://highlightjs.org/examples

// https://www.npmjs.com/package/highlight.js?activeTab=readme#es6-modules--import

export default function Chat() {
  // const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [msg, setMsg] = useState('')

  let receivedText = '';

  const [html, setHtml] = useState('');

  const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  )

  useEffect(() => {
    setHtml(marked.parse(msg) as string);
  }, [msg]);

  async function sendMessages() {
    const messages = [
      {
        role: 'user',
        content: 'JSXボタンのコードを書いて',
      },
    ];
    try {
      const response = await fetch('api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // ストリームを取得
      const reader = response.body.getReader();

      // データをチャンク単位で読み出す再帰関数
      async function read() {
        const { done, value } = await reader.read();
        if (done) {
          console.log('Stream completed');
          return;
        }
        // チャンク（Uint8Array）をテキストに変換
        // console.log(new TextDecoder("utf-8").decode(value));
        let decoder = new TextDecoder('utf-8');

        // 次のチャンクを読み出す
        receivedText += decoder.decode(value, { stream: true });
        setMsg(receivedText); // 更新されたテキストで状態を更新
        read();
      }

      // ストリームの読み出しを開始
      read();
    } catch (error) {
      console.error('Failed to send messages:', error);
    }
  }

  return (
    <div>
      <Button variant="outlined" onClick={sendMessages}>コード生成</Button>
      {/* {msg} */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}