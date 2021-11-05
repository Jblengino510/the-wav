import { useState } from 'react'
import { Link } from 'react-router-dom'
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
import Tooltip from '@mui/material/Tooltip';

function ProfileBeatCard({ user, beat, foundLike, handleLikeClick }) {
    const [ likeClicked, setLikeClicked ] = useState(false)

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
        <>
            <br></br>
            <Card key={beat.id} sx={{bgcolor: '#000000', padding: '20px', border: '2px solid #222222', '&:hover': {border: '2px solid #333333'}}}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <CardMedia component='image' image={beat.image_url ? beat.image_url : '/iphonewav.jpg'} sx={{width: '150px', height: '150px', mt: '20px', padding: '10px'}}/>
                    </Grid>
                    <Grid item xs={10}>
                        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                            <CardContent>
                                <Link to={`/${beat.user.username}/${beat.id}`}>
                                <Typography variant='h5' color='secondary' sx={{'&:hover': {textDecoration: 'underline'}}}><strong>{beat.name}</strong></Typography>
                                </Link>
                                <br></br>
                                <Typography variant='body1'>{beat.genre.name}</Typography>
                                <br></br>
                                <Typography variant='body1'><strong>{beat.tempo} BPM</strong></Typography>
                                <br></br>
                                {beat.is_sold ? 
                                <Tooltip title='Sorry, somebody already bought this beat' placement='bottom-start' arrow>
                                    <Button variant='contained'>
                                        <strong>sold</strong>
                                    </Button> 
                                </Tooltip>
                                : 
                                <Tooltip title='Add to Cart' placement='bottom' arrow>
                                    <Button variant='contained' startIcon={<ShoppingCartOutlinedIcon color='secondary'/>}>
                                        <strong>${beat.price}.00</strong>
                                    </Button>
                                </Tooltip>
                                }
                            </CardContent>
                        </Box>
                    </Grid>
                    <Grid item xs={12}sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <PlayArrowIcon fontSize='large' sx={{mr: '5px'}}/> &nbsp;{beat.plays}
                        <IconButton size='large' color='secondary' onClick={() => handleLikeClick(user, beat)}sx={{ml: '5px'}}>
                            {foundLike ? 
                            <Tooltip title='Unlike' placement='top-start' arrow>
                                <FavoriteIcon fontSize='medium'/> 
                            </Tooltip>
                            : 
                            <Tooltip title='Like' placement='top-start' arrow>
                                <FavoriteBorderIcon fontSize='medium'/>
                            </Tooltip>
                            }
                        </IconButton>
                        <Typography variant='subtitle1'>{beat.likes.length}</Typography>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}

export default ProfileBeatCard
