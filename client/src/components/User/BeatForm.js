import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function BeatForm({ user, genres, beats, setBeats }) {
    const [ name, setName ] = useState('')
    const [ genre, setGenre ]  = useState('')
    const [ tempo, setTempo ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ plays, setPlays ] = useState(0)
    const [ audioData, setAudioData ] = useState(null)
    const [ audioUrl, setAudioUrl ] = useState()
    const [ sold, setSold ] = useState(false)
    const [ errors, setErrors ] = useState([])
    const history = useHistory()
    let genreArr = genres
    // console.log(audioUrl)


    function handleAudioUpload(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', audioData)
        formData.append('upload_preset', 'thewav')
        formData.append('cloud_name', 'dczg4dzfm')
        fetch('https://api.cloudinary.com/v1_1/dczg4dzfm/video/upload', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => setAudioUrl(data.url))
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
        <div>
            <h1>Upload a Beat</h1>
            <form onSubmit={handleAudioUpload}>
            <h3>upload audio here</h3>
                <input type='file' accept='audio/*' onChange={(e) => setAudioData(e.target.files[0])} required/>
                <Button type='submit' variant='contained' endIcon={<CloudUploadIcon />}>Upload</Button>
            </form>
            {audioUrl ? 
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
        </div>
    )
}

export default BeatForm
