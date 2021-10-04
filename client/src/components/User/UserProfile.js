import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import ReactAudioPlayer from 'react-audio-player'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Button from '@mui/material/Button';


function UserProfile({ user, beats, setBeats, handlePlayClick, handleLikeClick }) {
    const [ likeClicked, setLikeClicked ] = useState(false)
    const history = useHistory()
    const userBeats = beats ? beats.filter(beat => beat.user_id === user.id) : null
  

    function toggleLike(user, beat){
        handleLikeClick(user, beat)
        setLikeClicked(!likeClicked)
    }
  

    return (
        <div>
            {user ?
            <> 
                <h1>Welcome {user.username}</h1> 
                <Button variant='contained' onClick={() => history.push(`/${user.username}/upload`)}>Upload Beats</Button>
                {userBeats.map(beat => 
                <div key={beat.id}>
                    <Link to={`/${user.username}/${beat.id}`}><h2>{beat.name}</h2></Link>
                    <em>{beat.genre.name}</em>
                    <h4>{beat.tempo} bpm</h4>
                    <h4>${beat.price}.00</h4>
                    <div onClick={() => handlePlayClick(beat)}>
                    <AudioPlayer src={beat.audio_url} controls/>
                    </div>
                    <p onClick={() => toggleLike(user, beat)}>▶️&nbsp; {beat.plays ? beat.plays : 0} &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;❤️ &nbsp;{likeClicked ? beat.likes.length + 1 : beat.likes.length }</p>
                </div>
                )}
            </>
            : 
            <h1>Loading...</h1>
            }
        </div>
    )
}

export default UserProfile
