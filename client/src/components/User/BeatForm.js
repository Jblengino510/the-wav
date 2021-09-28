import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function BeatForm({ user, setBeats }) {
    const [ name, setName ] = useState('')
    const [ genre, setGenre ]  = useState('')
    const [ tempo, setTempo ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ audioData, setAudioData ] = useState(null)
    const [ sold, setSold ] = useState(false)
    const [ allGenres, setAllGenres ] = useState([])
    const [ errors, setErrors ] = useState([])
    const history = useHistory()
    let genreArr = allGenres
    console.log('GENRE:', genre)
    console.log('ERRORS:', errors)

    useEffect(() => {
        fetch('/genres')
        .then(res => res.json())
        .then(setAllGenres)
    }, [])


    function handleBeatSubmit(e){
        e.preventDefault()

        const formData = new FormData ()
        formData.append('user_id', user.id)
        formData.append('genre_id', parseInt(genre))
        formData.append('name', name)
        formData.append('tempo', parseInt(tempo))
        formData.append('price', parseInt(price))
        formData.append('audio_data', audioData)
        formData.append('is_sold', sold)

        fetch('/beats', {
            method: 'POST',
            body: formData
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => setBeats(data))
            } else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }
    
    return (
        <div>
            <h1>Upload a Beat</h1>
            <form onSubmit={handleBeatSubmit}>
                <h3>name</h3>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} required/>
                <h3>genre</h3>
                <select onChange={(e) => setGenre(e.target.value)}>
                    {genreArr.map(genre => <option value={genre.id}>{genre.name}</option>)}
                </select>
                <h3>tempo</h3>
                <input type='text' value={tempo} onChange={(e) => setTempo(e.target.value)} required/>
                <h3>price</h3>
                <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} required/>
                <h3>upload an mp3</h3>
                <input type='file' accept="audio/*" onChange={(e) => setAudioData(e.target.files[0])} required/>
                <input type='submit'/>
            </form>
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
