import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

function BeatLibrary({ beats }) {
    return (
        <div>
            <h1>Beats</h1>
            <Card sx={{display: 'flex'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent></CardContent>
                </Box>
            </Card>
        </div>
    )
}

export default BeatLibrary
