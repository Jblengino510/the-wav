import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import ReactAudioPlayer from 'react-audio-player'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


function UserProfile({ user, beats, likes, setBeats, handlePlayClick, handleLikeClick }) {
    const [ likeClicked, setLikeClicked ] = useState(false)
    // const [ userBeats, setUserBeats ] = useState(beats)
    const history = useHistory()
    // console.log('USER BEATS', userBeats)
    const userBeats = beats ? beats.filter(beat => beat.user_id === user.id) : null
  

    function toggleLike(user, beat){
        setBeats((beats) => [...beats, 
        {
            ...beat, 
            likes: [...beat.likes, ]
        }])
        handleLikeClick(user, beat)
        setLikeClicked(!likeClicked)
    }
  

    return (
        <Container>
            {user ?
            <> 
                <Typography variant='h4'>Welcome {user.username}</Typography> 
                <Button variant='contained' onClick={() => history.push(`/${user.username}/upload`)}>Upload Beats</Button>
                <br></br>
                <br></br>
                {userBeats.map(beat => {
                    let foundLike = likes.find(like => like.beat_id === beat.id)
                return (<>
                <br></br>
                <Card key={beat.id} sx={{display: 'flex', bgcolor: '#000000', padding: '20px', border: '2px solid #222222', '&:hover': {border: '2px solid #333333'}}}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <CardMedia component='image' image={beat.image_url ? beat.image_url : '/logo512.png'} sx={{width: '150px', height: '150px', mt: '20px', padding: '10px'}}/>
                    </Grid>
                    <Grid item xs={10}>
                        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                            <CardContent>
                                <Link to={`/${beat.user.username}/${beat.id}`}>
                                <Typography variant='h5' color='secondary'><strong>{beat.name}</strong></Typography>
                                </Link>
                                <br></br>
                                <Typography variant='body1'>{beat.genre.name}</Typography>
                                <br></br>
                                <Button variant='contained' startIcon={<ShoppingCartOutlinedIcon color='secondary'/>}>
                                    <strong>${beat.price}.00</strong>
                                </Button>
                            </CardContent>
                        </Box>
                    </Grid>
                    <Grid item xs={12}sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <PlayArrowIcon fontSize='large' sx={{mr: '5px'}}/> &nbsp;{beat.plays}
                        <IconButton size='large' color='secondary' onClick={() => handleLikeClick(user, beat)}sx={{ml: '5px'}}>
                            {foundLike ? <FavoriteIcon fontSize='medium'/> : <FavoriteBorderIcon fontSize='medium'/>}
                        </IconButton>
                        <Typography variant='subtitle1'>{beat.likes.length}</Typography>
                    </Grid>
                </Grid>
                </Card>
                </>)
})}
            </>
            : 
            <h1>Loading...</h1>
            }
        </Container>
    )
}

export default UserProfile

{/* <Link to={`/${user.username}/${beat.id}`}><h2>{beat.name}</h2></Link>
<em>{beat.genre.name}</em>
<h4>{beat.tempo} bpm</h4>
<h4>${beat.price}.00</h4>
<div onClick={() => handlePlayClick(beat)}>
<AudioPlayer src={beat.audio_url} controls/>
</div>
<p onClick={() => toggleLike(user, beat)}>▶️&nbsp; {beat.plays ? beat.plays : 0} &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;❤️ &nbsp;{beat.likes.length}</p> */}
