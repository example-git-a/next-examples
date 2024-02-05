import { useEffect, useRef } from 'react'

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

import Chip from '@mui/material/Chip';

// const useStyles = makeStyles({
//     table: {
//         minWidth: 650,
//     },
//     chatSection: {
//         width: '100%',
//         height: '80vh'
//     },
//     headBG: {
//         backgroundColor: '#e0e0e0'
//     },
//     borderRight500: {
//         borderRight: '1px solid #e0e0e0'
//     },
//     messageArea: {
//         height: '70vh',
//         overflowY: 'auto'
//     }
// });

export default function Chat({ messages, streamedMsg, clickSend }:
    { messages: any[], streamedMsg: string, clickSend: () => void, }) {

    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [streamedMsg]);

    return (
        <Box minWidth={600} alignItems='center'>

            <Grid component={Paper} sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* <Grid ref={scrollRef}> */}
                <List ref={scrollRef} sx={{

                    height: 400,
                    overflowY: 'auto'


                }}>

                    {messages.map((message, index) => (
                        <ListItem key={index}>
                            <Grid container>
                                <Grid item xs={12} textAlign={message.role === 'user' ? 'right' : 'left'}>
                                    {/* <Chip
                                        sx={{
                                            maxWidth: 300,
                                            height: 'auto',
                                            '& .MuiChip-label': {
                                                display: 'block',
                                            },
                                        }}
                                        label={<Typography whiteSpace='pre-wrap'>
                                            {message.message}
                                        </Typography>} color="primary" variant={message.role === 'user' ? 'filled' : 'outlined'} /> */}
                                    <Typography whiteSpace='pre-wrap' sx={{ whiteSpace: 'pre-wrap' }}>
                                        {message.message}
                                    </Typography>
                                </Grid>

                            </Grid>
                        </ListItem>
                    ))}
                    <ListItem>
                        {streamedMsg &&
                            <Grid item xs={12} textAlign='left'>
                                {/* <Chip
                                    sx={{
                                        maxWidth: 600,
                                        height: 'auto',
                                        '& .MuiChip-label': {
                                            display: 'block',
                                            whiteSpace: 'pre-wrap'
                                        },
                                    }}
                                    label={

                                        <Typography whiteSpace='pre-wrap'>
                                            {streamedMsg}
                                        </Typography>} color="primary" variant='outlined' /> */}
                                <Typography whiteSpace='pre-wrap' sx={{ whiteSpace: 'pre-wrap' }}>
                                    {streamedMsg}
                                </Typography>
                            </Grid>}
                    </ListItem>
                </List>
                {/* </Grid> */}

                <Grid container style={{ padding: '20px' }} sx={{ marginTop: 'auto' }} >
                    {/* <Divider sx={{ marginBottom: 20 }} /> */}
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Message" fullWidth />
                    </Grid>
                    <Grid item xs={1} alignItems='right'>
                        <IconButton color="primary" onClick={() => clickSend()}><SendIcon fontSize='medium' /></IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    );
}