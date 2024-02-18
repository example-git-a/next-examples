'use client';

import { useEffect, useRef } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';///<<<<
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import SendIcon from '@mui/icons-material/Send';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ReplayIcon from '@mui/icons-material/Replay';

import { useChat } from 'ai/react';

import { ChatMessage } from './chat-message';

export default function Chat() {
    const { messages, input, isLoading, handleInputChange, handleSubmit, stop, reload, } = useChat();

    const endOfListRef = useRef(null);

    // コンポーネントがレンダリングされた後に、リストの最下部にスクロールします。
    useEffect(() => {
        endOfListRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 860, maxHeight: 800, overflow: 'auto', bgcolor: 'background.paper' }}>
                {messages.map((m, index) => (
                    <ListItem key={index} alignItems="flex-start">
                        {/* <ListItemAvatar>
                            <Avatar sx={{ bgcolor: message.sender === 'user' ? green[500] : deepPurple[500] }}>
                                {message.sender === 'user' ? 'U' : 'A'}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={message.text} /> */}
                        <ChatMessage message={m} />
                        <div ref={endOfListRef} />
                    </ListItem>
                ))}

                {messages.length > 0 && !isLoading && <Button variant="outlined" endIcon={<ReplayIcon />} onClick={() => reload()}>
                    再生成
                </Button>}

                <form onSubmit={handleSubmit}>
                    {/* <input value={input} onChange={handleInputChange} /> */}
                    <TextField placeholder="ここにメッセージを入力してください" variant="filled" value={input} onChange={handleInputChange}
                        InputProps={{
                            endAdornment: isLoading ?
                                <IconButton color="primary" onClick={() => stop()}>
                                    <StopCircleIcon />
                                </IconButton> :
                                <IconButton color="primary" type='submit'>
                                    <SendIcon />
                                </IconButton>

                        }}
                        sx={{
                            width: 500,
                            maxWidth: '80%',
                        }} />

                </form>
            </List>
        </>

    );
}