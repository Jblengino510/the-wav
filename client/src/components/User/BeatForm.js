import { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';



function BeatForm({ user, genres, beats, setBeats }) {
    const [ name, setName ] = useState('')
    const [ genre, setGenre ]  = useState('')
    const [ tempo, setTempo ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ plays, setPlays ] = useState(0)
    const [ audioUrl, setAudioUrl ] = useState()
    const [ image, setImage ] = useState(null)
    const [ imageUrl, setImageUrl ] = useState('')
    const [ waveFormUrl, setWaveFormUrl ] = useState('')
    const [ sold, setSold ] = useState(false)
    const [ errors, setErrors ] = useState([])
    const history = useHistory()
    let genreArr = genres


    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(file => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', 'thewav')
            formData.append('cloud_name', 'dczg4dzfm')
            fetch('https://api.cloudinary.com/v1_1/dczg4dzfm/video/upload', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => setAudioUrl(data.url))
        })
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accepts: 'audio/*', multiple: false})


    function handleImageUpload(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'thewav')
        formData.append('cloud_name', 'dczg4dzfm')
        fetch('https://api.cloudinary.com/v1_1/dczg4dzfm/image/upload', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => setImageUrl(data.url))
    }


    function handleBeatSubmit(e){
        e.preventDefault()

        const formData = new FormData()
        formData.append('user_id', user.id)
        formData.append('genre_id', parseInt(genre))
        formData.append('name', name)
        formData.append('tempo', parseInt(tempo))
        formData.append('price', parseInt(price))
        formData.append('plays', plays)
        formData.append('audio_url', audioUrl)
        formData.append('is_sold', sold)
        formData.append('image_url', imageUrl)
        formData.append('wave_form_url', waveFormUrl)

        fetch('/beats', {
            method: 'POST',
            body: formData
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => setBeats([data, ...beats]))
                history.push(`/${user.username}`)
            } else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }

    
    return (
        <Container sx={{bgcolor: ''}}>
            <h1>Upload a Beat</h1>
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : null}`}>
                <input {...getInputProps()}/>
                Drag and drop your beats here 
                <br></br>
                or click to choose files
                {/* <Button variant='contained' color='primary'>or click to choose files</Button> */}
            </div>
            {audioUrl ?
            <Grid container spacing={2} sx={{bgcolor: 'white', mt: '20px'}}>
                <Grid item xs={6} sx={imageUrl ? {backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'} : {bgcolor: '#000000', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <h1>add cover art</h1>
                    <form onSubmit={handleImageUpload}>
                        <input type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])}/>
                        <br></br>
                        <br></br>
                        {image ? <Button type='submit' variant='contained' sx={{alignItems: 'center'}}>Upload image</Button> : null}
                    </form>
                </Grid>
                <Grid item xs={6} sx={{bgcolor: 'red'}}>
                <form onSubmit={handleBeatSubmit} autoComplete='off'>
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
                    <Button type='submit' variant='contained'>Submit</Button>
                </form> 
                </Grid>
            </Grid> 
            :
            null
            }
            {(errors.length > 0) ?
                (<div>
                {errors.map(error => <li key={error}>{error}</li>)}
                </div>) 
                :
                null
            }
        </Container>
    )
}

export default BeatForm
