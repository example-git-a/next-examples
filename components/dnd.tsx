import { useState, useRef } from 'react';

import Typography from '@mui/material/Typography';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import UploadIcon from '@mui/icons-material/Upload';

export default function FileDropZone({ onDrop }: { onDrop: (files: File[]) => void }) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDropEvent = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);


        // const files = e.dataTransfer.files;
        const files = Array.from(e.dataTransfer.files); // Convert
        if (onDrop) {
            onDrop(files);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const files = (e.target as HTMLInputElement).files;
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);
            if (onDrop) {
                onDrop(fileArray);
            }
        }
    };

    const handleClick = () => {
        if (fileInputRef.current)
            (fileInputRef.current as HTMLInputElement).click();
    };

    const theme = useTheme();

    return (
        <>
            {/* <ThemeProvider theme={theme}> */}
                <div
                    onClick={handleClick}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDropEvent}
                    style={{
                        border: '2px dashed #cccccc',
                        borderRadius: '4px',
                        padding: '20px',
                        textAlign: 'center',
                        background: isDragging ? '#eeeeee' : 'rgba(0, 0, 0, 0)',
                        cursor: isDragging ? 'grabbing' : 'pointer',// なぜかgrabbingにならない
                        // cursor: 'grabbing'
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                        fontSize: 14,
                        color: isDragging ? 'rgba(1, 1, 1, 0.7)' : 'rgba(255, 255, 255, 1)',
                    }}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        webkitdirectory="true" // フォルダ選択を可能にする
                        onChange={handleFileInputChange}
                        style={{ display: 'none', }}
                    />
                    <UploadIcon style={{pointerEvents: 'none'}} /><br/>
                    {/* <Typography fontSize={14}> */}
                        {isDragging ? 'ファイルをリリースしてアップロード' :
                            'アップロードするファイルをドラッグ＆ドロップします'}
                    {/* </Typography> */}
                    {/* {isDragging ? 'Release to drop the files here' :
                        'Choose a file or drag it here'} */}
                </div>
            {/* </ThemeProvider> */}
        </>
    );
};

