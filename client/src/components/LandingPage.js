import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Parallax } from 'react-scroll-parallax';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';


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
                        <div style={{backgroundColor: 'rgba(0, 0, 0, .4)', backgroundImage: 'linear-gradient(0deg, #000, transparent), url(/studio.jpg)', backgroundSize: 'cover', backgroundBlendMode: 'multiply', height: '100vh', display: 'flex', alignItems: 'center'}}>
                        <Typography variant='h4' sx={{ml: '40px'}}><strong>BUY & SELL BEATS FOR FREE</strong></Typography>
                        <Button component={Link} to='/signup' variant='contained' sx={{ml: '20px', padding: '20px', width: '200px'}}><strong>Become a Member</strong></Button>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{height: '100vh'}}>
                            <Typography variant='h3' sx={{mt: '200px', display: 'flex', justifyContent: 'center'}}><strong>Make Noise, Be Heard</strong></Typography>
                            <Box sx={{mt: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', textAlign: 'center'}}>
                                <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#000000', padding: '20px', width: '250px'}}>
                                    <CloudUploadOutlinedIcon color='primary' fontSize='large' sx={{width: '100px', height: '100px'}}/>
                                    <br></br>
                                    <br></br>
                                    <Typography variant='h5'><strong>Unlimited Uploads</strong></Typography>
                                    <br></br>
                                    <br></br>
                                    <Typography variant='body1'>Upload as many beats as you can cook up.</Typography>
                                </Card>
                                <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#000000', padding: '20px', width: '250px'}}>
                                    <SearchOutlinedIcon color='primary' fontSize='large' sx={{width: '100px', height: '100px'}}/>
                                    <br></br>
                                    <br></br>
                                    <Typography variant='h5'><strong>Browse</strong></Typography>
                                    <br></br>
                                    <br></br>
                                    <Typography variant='body1'>Browse our entire library of beats from all creators.</Typography>
                                </Card>
                                <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#000000', padding: '20px', width: '250px'}}>
                                    <InsightsOutlinedIcon color='primary' fontSize='large' sx={{width: '100px', height: '100px'}}/>
                                    <br></br>
                                    <br></br>
                                    <Typography variant='h5'><strong>Sales Analytics</strong></Typography>
                                    <br></br>
                                    <br></br>
                                    <Typography variant='body1'>Track your earnings, plays, and sales all in one place.</Typography>
                                </Card>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </>
            : 
            <>
                <Grid container>
                    <Grid item xs={12}>
                        <div style={{backgroundColor: 'rgba(0, 0, 0, .4)', backgroundImage: 'linear-gradient(0deg, #000, transparent), url(/studio.jpg)', backgroundSize: 'cover', backgroundBlendMode: 'multiply', height: '100vh', display: 'flex', alignItems: 'center'}}>
                        <Typography variant='h4' sx={{ml: '40px'}}><strong>BUY & SELL BEATS FOR FREE</strong></Typography>
                        <Button component={Link} to='/signup' variant='contained' sx={{ml: '20px', padding: '20px', width: '200px'}}><strong>Become a Member</strong></Button>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{height: '100vh'}}>
                            <Typography variant='h3' sx={{mt: '200px', display: 'flex', justifyContent: 'center'}}><strong>How It Works</strong></Typography>
                            <Box sx={{mt: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', textAlign: 'center'}}>
                                <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#000000', padding: '20px', width: '250px'}}>
                                    <CloudUploadOutlinedIcon color='primary' fontSize='large' sx={{width: '100px', height: '100px'}}/>
                                    <br></br>
                                    <br></br>
                                    <Typography variant='h5'><strong>Unlimited Uploads</strong></Typography>
                                    <br></br>
                                    <br></br>
                                    <Typography variant='body1'>Upload as many beats as you can cook up.</Typography>
                                </Card>
                                <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#000000', padding: '20px', width: '250px'}}>
                                    <SearchOutlinedIcon color='primary' fontSize='large' sx={{width: '100px', height: '100px'}}/>
                                    <br></br>
                                    <br></br>
                                    <Typography variant='h5'><strong>Browse</strong></Typography>
                                    <br></br>
                                    <br></br>
                                    <Typography variant='body1'>Browse our entire library of beats from all creators.</Typography>
                                </Card>
                                <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#000000', padding: '20px', width: '250px'}}>
                                    <InsightsOutlinedIcon color='primary' fontSize='large' sx={{width: '100px', height: '100px'}}/>
                                    <br></br>
                                    <br></br>
                                    <Typography variant='h5'><strong>Sales Analytics</strong></Typography>
                                    <br></br>
                                    <br></br>
                                    <Typography variant='body1'>Track your earnings, plays, and sales all in one place.</Typography>
                                </Card>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
                {/* {youtubeVideos.map(video => <iframe key={video.id.videoId} src={`https://www.youtube.com/embed/${video.id.videoId}`} height='200' width='300'></iframe>)}   */}
            </>
            }
        </div>
    )
}

export default LandingPage
