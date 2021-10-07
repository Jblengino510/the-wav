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
import SaveAltIcon from '@mui/icons-material/SaveAlt';



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
    let genreArr = genres


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

    function handleClose(){
        setOpen(false)
    }

    function togglePlayButton(beat){
        setPlayClicked(!playClicked)
        handlePlayClick(beat)
    }


    return (
        <Container>
            {beat.genre ?
            <>
                {/* <h2>{beat.name}</h2>
                <em>{beat.genre.name}</em>
                <h4>{beat.tempo} bpm</h4>
                <h4>${beat.price}.00</h4>
                <div onClick={() => handlePlayClick(beat)}>
                <AudioPlayer src={beat.audio_url} controls/>
                </div>
                <p onClick={() => toggleLike(user, beat)}>▶️&nbsp; {beat.plays ? beat.plays : 0} &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; ❤️ &nbsp;{likeClicked ? beat.likes.length + 1 : beat.likes.length }</p> */}
                <br></br>
                <Card key={beat.id} sx={{display: 'flex', bgcolor: '#000000', padding: '20px', border: '2px solid #222222', '&:hover': {border: '2px solid #333333'}}}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <CardMedia component='image' image={beat.image_url ? beat.image_url : '/logo512.png'} sx={{width: '150px', height: '150px', mt: '20px', padding: '10px'}}/>
                    </Grid>
                    <Grid item xs={10}>
                        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                            <CardContent>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mr: '2vh'}}>
                                {playClicked ? 
                                <IconButton size='large' color='secondary' onClick={() => togglePlayButton(beat)}>
                                    <PauseCircleOutlineIcon fontSize='large' sx={{width: '60px', height: '60px'}}/>
                                </IconButton> 
                                : 
                                <IconButton size='large' color='secondary' onClick={togglePlayButton}>
                                    <PlayCircleOutlineIcon fontSize='large' sx={{width: '60px', height: '60px'}}/>
                                </IconButton>
                                }
                                <Typography variant='h5' color='secondary'><strong>{beat.name}</strong>
                                </Typography>
                                </div>
                                <br></br>
                                <Typography variant='body1'>{beat.genre.name}</Typography>
                                <br></br>
                                {beat.is_sold ? 
                                <Button variant='contained'>
                                <strong>sold</strong>
                                </Button> 
                                : 
                                <Button variant='contained' startIcon={<ShoppingCartOutlinedIcon color='secondary'/>}>
                                    <strong>${beat.price}.00</strong>
                                </Button>}
                            </CardContent>
                        </Box>
                    </Grid>
                    <Grid item xs={12}sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <PlayArrowIcon fontSize='large' sx={{mr: '5px'}}/> &nbsp;{beat.plays}
                        <IconButton size='large' color='secondary' onClick={() => handleLikeClick(user, beat)}sx={{ml: '5px'}}>
                            <FavoriteIcon fontSize='medium'/>
                        </IconButton>
                        <Typography variant='subtitle1'>{beat.likes.length}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {playClicked ? 
                        <div onClick={() => handlePlayClick(beat)}>
                            <AudioPlayer src={beat.audio_url} controls autoPlay/>
                        </div> 
                        : 
                        null
                        }
                    </Grid>
                </Grid>
                </Card>
                <br></br>
                <br></br>
                <Button size='large'  variant='contained' onClick={() => setOpen(true)} sx={{mr: '20px'}}>Edit</Button>
                <Button size='large' variant='contained' onClick={() => handleBeatDelete(beat.id)}>Delete</Button>
                <Modal 
                open={open} 
                onClose={!open} 
                aria-labelledby="modal-modal-title" 
                aria-describedby="modal-modal-description"
                >
                    <Box className='modalForm'>
                        <IconButton onClick={handleClose}>
                            <CloseIcon sx={{color: '#222222', ml: '350px', mt: '5px'}}/>
                        </IconButton>
                        <form onSubmit={handleEditBeat} autoComplete='off'>
                            <h3>name</h3>
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                            <h3>genre</h3>
                            <select onChange={(e) => setGenre(e.target.value)}>
                                <option value="">--</option>
                                {genreArr.map(genre => <option value={genre.id}>{genre.name}</option>)}
                            </select>
                            <h3>tempo</h3>
                            <input type='text' value={tempo} onChange={(e) => setTempo(e.target.value)}/>
                            <h3>price</h3>
                            <input type='text' value={price} onChange={(e) => setPrice(e.target.value)}/>
                            <br></br>
                            <br></br>
                            <Button 
                            type='submit' 
                            color='primary' 
                            variant='contained' 
                            // endIcon={<SaveAltIcon />}
                            >
                                Save Changes
                            </Button>
                            <br></br>
                            <br></br>
                        </form>
                        {(errors.length > 0) ?
                            (<div>
                            {errors.map(error => <li key={error}>{error}</li>)}
                            <br></br>
                            </div>) 
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
