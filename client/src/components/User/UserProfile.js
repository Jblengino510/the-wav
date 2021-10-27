import ProfileBeatCard from './ProfileBeatCard';
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
        // setBeats((beats) => [...beats, 
        // {
        //     ...beat, 
        //     likes: [...beat.likes, ]
        // }])
        handleLikeClick(user, beat)
        setLikeClicked(!likeClicked)
    }
  

    return (
        <Container sx={{mt: '100px'}}>
            <Typography variant='h4' sx={{mt: '20px', mb: '20px', paddingTop: '20px'}}>Welcome {user.username}</Typography> 
            {userBeats.map(beat => {
                let foundLike = likes.find(like => like.beat_id === beat.id)
                return (
                    <>
                        <ProfileBeatCard user={user} beat={beat} foundLike={foundLike} handleLikeClick={handleLikeClick}/>
                    </>
                )
            })}
        </Container>
    )
}

export default UserProfile


