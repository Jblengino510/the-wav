import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactAudioPlayer from 'react-audio-player'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';



function BeatDetails({ user, genres, likes, handleBeatDelete, handlePlayClick, handleLikeClick }) {
    const [ beat, setBeat ] = useState({})
    const [ open, setOpen ] = useState(false)
    const [ name, setName ] = useState('')
    const [ genre, setGenre ]  = useState('')
    const [ tempo, setTempo ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ errors, setErrors ] = useState([])
    const [ likeClicked, setLikeClicked ] = useState(false)
    const [ playClicked, setPlayClicked ] = useState(false)
    const params = useParams()
    const options = { year: 'numeric', month: 'long' };
    let genreArr = genres
    let foundLike = likes.find(like => like.beat_id === beat.id) 
  

    useEffect(() => {
        fetch(`/beats/${params.id}`)
        .then(res => {
            if (res.ok) {
                res.json().then(data => setBeat(data))
            }
        })
    }, [])


    function handleEditBeat(){
        const beatObj = {
            name: name,
            genre_id: parseInt(genre),
            tempo: parseInt(tempo),
            price: parseInt(price)

        }
        fetch(`/beats/${params.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(beatObj)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(editedBeat => setBeat(editedBeat)).then(setOpen(false))
            } else {
                res.json().then(err => setErrors(err.errors)).then(setOpen(true))
            }
        })
    }

    function toggleLike(user, beat){
        // setBeats((beats) => [...beats, 
        // {
        //     ...beat, 
        //     likes: [...beat.likes, ]
        // }])
        handleLikeClick(user, beat)
        setLikeClicked(!likeClicked)
    }

    //Modal
    function handleClose(){
        setOpen(false)
    }

    //Audioplayer
    function togglePlayButton(beat){
        setPlayClicked(!playClicked)
        handlePlayClick(beat)
    }



    return (
        <Container sx={{mt: '100px'}}>
            {beat.genre ?
            <>
                <br />
                <Card key={beat.id} sx={{display: 'flex', bgcolor: '#000000', padding: '20px', border: '2px solid #222222', '&:hover': {border: '2px solid #333333'}}}>
                <Grid container>
                    <Grid item xs={12} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Avatar src={beat.user.avatar_url} sx={{mr: '10px'}}/>
                        <strong>{beat.user.username}</strong>
                        <Typography variant='body1'>&nbsp;&nbsp;&nbsp;Released {new Intl.DateTimeFormat('en-US', options).format(Date.parse(beat.created_at))}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <CardMedia component='image' image={beat.image_url ? beat.image_url : '/iphonewav.jpg'} sx={{width: '200px', height: '200px', mt: '20px', padding: '10px'}}/>
                    </Grid>
                    <Grid item xs={10}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', ml: '50px'}}>
                            <CardContent>
                                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                {playClicked ? 
                                <IconButton size='large' color='secondary' onClick={() => togglePlayButton(beat)} sx={{padding: '0', mr: '10px'}}>
                                    <PauseCircleOutlineIcon fontSize='large' sx={{width: '70px', height: '70px'}}/>
                                </IconButton> 
                                : 
                                <IconButton size='large' color='secondary' onClick={togglePlayButton} sx={{padding: '0', mr: '10px'}}>
                                    <PlayCircleOutlineIcon fontSize='large' sx={{width: '70px', height: '70px'}}/>
                                </IconButton>
                                }
                                <Typography variant='h5' color='secondary'>
                                    <strong>{beat.name}</strong>
                                </Typography>
                                </Box>
                                <br />
                                <Typography variant='body1'>{beat.genre.name}</Typography> 
                                <br />
                                <Typography variant='body1'>
                                    <strong>{beat.tempo} BPM</strong>
                                </Typography>
                                <br />
                                {beat.is_sold ? 
                                <Tooltip title='Sorry, somebody already bought this beat' placement='bottom-start' arrow>
                                    <Button variant='contained'>
                                        <strong>sold</strong>
                                    </Button> 
                                </Tooltip> 
                                : 
                                <Tooltip title='Add to Cart' placement='bottom-start' arrow>
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
                    <Grid item xs={12}>
                        {playClicked ? 
                        <Box onClick={() => handlePlayClick(beat)}>
                            <AudioPlayer src={beat.audio_url} controls autoPlay/>
                        </Box> 
                        : 
                        null
                        }
                    </Grid>
                </Grid>
                </Card>
                <br />
                <br />
                {user ?
                <>
                <Button size='large'  variant='contained' onClick={() => setOpen(true)} sx={{mr: '20px'}}>
                    Edit
                </Button>
                <Button size='large' variant='contained' onClick={() => handleBeatDelete(beat.id)}>
                    Delete
                </Button>
                </>
                :
                null
                }
                <Modal 
                open={open} 
                onClose={!open} 
                aria-labelledby="modal-modal-title" 
                aria-describedby="modal-modal-description"
                >
                    <Box className='modalForm'>
                        <IconButton onClick={handleClose}>
                            <CloseIcon sx={{color: '#222222', ml: '380px', mt: '10px'}}/>
                        </IconButton>
                        <form onSubmit={handleEditBeat} autoComplete='off' style={{padding: '50px'}}>
                            <TextField label="Name" variant="outlined" color='primary' onChange={(e) => setName(e.target.value)} sx={{bgcolor: '#222222', color: '#777777', width: '100%', mb: '20px'}}/>
                            <TextField select label="Genre" variant="outlined" color='primary' onChange={(e) => setGenre(e.target.value)} sx={{bgcolor: '#222222', color: '#777777', width: '100%', mt: '20px', mb: '20px'}}>
                                <MenuItem value="" sx={{bgcolor: '#222222', color: '#777777', '&:hover': {bgcolor: '#1B1B1B'}}}>--</MenuItem>
                                {genreArr.map(genre => <MenuItem key={genre.id} value={genre.id} sx={{bgcolor: '#222222', color: '#777777', '&:hover': {bgcolor: '#1B1B1B'}}}>{genre.name}</MenuItem>)}
                            </TextField>
                            <TextField label="Tempo" variant="outlined" color='primary' onChange={(e) => setTempo(e.target.value)} sx={{bgcolor: '#222222', color: '#777777', width: '100%', mt: '20px', mb: '20px'}}/>
                            <TextField label="Price" variant="outlined" color='primary' onChange={(e) => setPrice(e.target.value)} sx={{bgcolor: '#222222', color: '#777777', width: '100%', mt: '20px', mb: '20px'}}/>
                            <Button type='submit' variant='contained' sx={{mt: '20px', width: '100%', padding: '15px'}}><strong>Submit</strong></Button> 
                        </form>
                        {(errors.length > 0) ?
                            (<Box sx={{mt: '20px', mb: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            {errors.map(error => <Typography key={error} color='error'>{error}</Typography>)}
                            <br />
                            </Box>) 
                            :
                            null
                        }
                    </Box>
                </Modal>
            </>
            :
            null
            } 
        </Container>
    )
}

export default BeatDetails
