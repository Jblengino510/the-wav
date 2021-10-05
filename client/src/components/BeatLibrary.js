import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


function BeatLibrary({ user, beats, likes, handleLikeClick, handleAddToCart }) {
    const [ likeClicked, setLikeClicked ] = useState(false)
    const history = useHistory()
    const options = { year: 'numeric', month: 'long' };

    function toggleLike(user, beat){
        handleLikeClick(user, beat)
        setLikeClicked(!likeClicked)
    }
    
    return (
        <Container>
            <Typography variant='h4'>Beats</Typography>
            {beats ? beats.map(beat => 
                <>
                <br></br>
                <Card sx={{display: 'flex', bgcolor: '#000000', padding: '20px', border: '2px solid #222222', '&:hover': {border: '2px solid #333333'}}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Avatar sx={{mr: '10px'}}/>
                        <strong>{beat.user.username}</strong>
                        <Typography variant='body1'>&nbsp;&nbsp;&nbsp;Released {new Intl.DateTimeFormat('en-US', options).format(Date.parse(beat.created_at))}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <CardMedia component='image' image={beat.image_url ? beat.image_url : '/logo512.png'} sx={{width: '150px', height: '150px', mt: '20px', padding: '10px'}}/>
                        {/* <PlayArrowIcon sx={{margin: '-100px auto', width: '150px', height: '150px', display: 'none', '&:hover': {display: 'inline-block'}}}/> */}
                        {/* <div style={{background: `url(${beat.image_url}) auto`}}>
                            <img src='https://www.pngrepo.com/png/13672/180/play-button.png'/>
                        </div> */}
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
                            <Button variant='contained' startIcon={<ShoppingCartOutlinedIcon color='secondary'/>} onClick={(e) => handleAddToCart(e, user, beat)}>
                                <strong>${beat.price}.00</strong>
                            </Button>
                        </CardContent>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <PlayArrowIcon fontSize='large' sx={{mr: '5px'}}/> &nbsp;{beat.plays}
                        <IconButton size='large' color='secondary' onClick={() => toggleLike(user, beat)}sx={{ml: '5px'}}>
                            {likeClicked ? <FavoriteBorderIcon fontSize='medium'/> : <FavoriteIcon fontSize='medium'/>}
                        </IconButton>
                        <Typography variant='subtitle1'>{beat.likes.length}</Typography>
                    </Grid>
                </Grid>
                </Card>
                </>
            ) : <h1>no beats</h1>}
            {/* <Card sx={{display: 'flex'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent></CardContent>
                    <CardMedia component='image' image={}/>
                </Box>
            </Card> */}
        </Container>
    )
}

export default BeatLibrary

{/* <IconButton size='large' color='secondary' onClick={() => toggleLike(user, beat)}sx={{ml: '5px'}}>
                            <FavoriteIcon fontSize='medium'/>
                        </IconButton> */}
