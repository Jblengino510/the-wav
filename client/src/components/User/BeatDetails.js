import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactAudioPlayer from 'react-audio-player'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import SaveAltIcon from '@mui/icons-material/SaveAlt';


function BeatDetails({ user, handleBeatDelete, handlePlayClick, genres }) {
    const [ beat, setBeat ] = useState({})
    const [ open, setOpen ] = useState(false)
    const [ name, setName ] = useState('')
    const [ genre, setGenre ]  = useState('')
    const [ tempo, setTempo ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ errors, setErrors ] = useState([])
    const params = useParams()
    let genreArr = genres
    // console.log(beat.name)

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

    function handleClose(){
        setOpen(false)
    }


    return (
        <div>
            {beat.genre ?
            <>
                <h2>{beat.name}</h2>
                <em>{beat.genre.name}</em>
                <h4>{beat.tempo} bpm</h4>
                <h4 onClick={() => handlePlayClick(beat)}>${beat.price}.00</h4>
                    <AudioPlayer onClick={() => handlePlayClick(beat)} src={beat.audio_data} controls/>
                    <p>▶️&nbsp; {beat.plays ? beat.plays : 0} &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; ❤️ &nbsp;{beat.likes ? beat.likes.length : 0}</p>
                <br></br>
                <br></br>
                <Button size='large' onClick={() => setOpen(true)}>Edit</Button>
                <Button size='large' onClick={() => handleBeatDelete(beat.id)}>Delete</Button>
                <Modal 
                open={open} 
                onClose={!open} 
                aria-labelledby="modal-modal-title" 
                aria-describedby="modal-modal-description"
                >
                    <Box className='modalForm'>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
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
        </div>
    )
}

export default BeatDetails
