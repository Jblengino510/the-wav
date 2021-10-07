import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { Parallax } from 'react-scroll-parallax';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function LandingPage({ user }) {
    const [ youtubeVideos, setYoutubeVideos ] = useState([])
    const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
    // console.log(YOUTUBE_API_KEY)
    // console.log(youtubeVideos)

    // useEffect(() => {
    //     fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=fliko&maxResults=10&type=video&videoDefinition=high&key=${YOUTUBE_API_KEY}`)
    //     .then(res => {
    //         if (res.ok) {
    //             res.json().then(data => setYoutubeVideos(data.items))
    //         }
    //     })
    // }, [])

    return (
        <div>
            {user ? 
            <>
                <Grid container>
                    <Grid item xs={12}>
                        <div style={{backgroundColor: 'rgb(0, 0, 0, .4)', backgroundImage: 'url(/studio.jpg)', backgroundSize: 'cover', backgroundBlendMode: 'multiply', height: '100vh', marginTop: '100px', display: 'flex', alignItems: 'center'}}>
                        <Typography variant='h4' sx={{ml: '40px'}}><strong>BUY & SELL BEATS FOR FREE</strong></Typography>
                        
                        <Button component={Link} to='/signup' variant='contained' sx={{ml: '20px', padding: '20px'}}><strong>Try for Free</strong></Button>
                        
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>
                     {/* {youtubeVideos.map(video => <iframe key={video.id.videoId} src={`https://www.youtube.com/embed/${video.id.videoId}`} height='200' width='300'></iframe>)}  */}
                </Grid>
            </>
            : 
            <>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '200px'}}>
                    <img src='/wavegif.gif' width='400px' height='400px'/>
                </div>
                {youtubeVideos.map(video => <iframe key={video.id.videoId} src={`https://www.youtube.com/embed/${video.id.videoId}`} height='200' width='300'></iframe>)}  
            </>
            }
        </div>
    )
}

export default LandingPage
