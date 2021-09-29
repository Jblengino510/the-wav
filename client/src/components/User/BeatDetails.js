import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactAudioPlayer from 'react-audio-player'

function BeatDetails({ user, handleBeatDelete }) {
    const [ beat, setBeat ] = useState({})
    const params = useParams()
    // console.log(beat)

    useEffect(() => {
        fetch(`/beats/${params.id}`)
        .then(res => {
            if (res.ok) {
                res.json().then(data => setBeat(data))
            }
        })
    }, [])


    return (
        <div>
            {beat.genre ?
            <>
                <h2>{beat.name}</h2>
                <em>{beat.genre.name}</em>
                <h4>{beat.tempo} bpm</h4>
                <h4>${beat.price}.00</h4>
                <ReactAudioPlayer src={beat.audio_data} controls/>
                <br></br>
                <br></br>
                <button>Edit</button>
                <button onClick={() => handleBeatDelete(beat.id)}>Delete</button>
            </>
            :
            null
            }
        </div>
    )
}

export default BeatDetails
