'use client';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

export default function Page() {
    const [inputValue, setInputValue] = useState('');

    // ローカルストレージからデータを取得
    useEffect(() => {
        const storedValue = localStorage.getItem('myInputValue');
        if (storedValue) {
            setInputValue(storedValue);
        }
    }, []);

    // 入力値が変更されたときに状態を更新し、ローカルストレージに保存
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        localStorage.setItem('myInputValue', newValue);
    };

    return (
        <TextField
            multiline
            rows={20}
            label="Input with Local Storage"
            value={inputValue}
            onChange={handleInputChange}
        />
    );
}
