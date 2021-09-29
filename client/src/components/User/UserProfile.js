import { useHistory, Link } from 'react-router-dom'
import ReactAudioPlayer from 'react-audio-player'

function UserProfile({ user, beats }) {
    const history = useHistory()
    const userBeats = beats ? beats.filter(beat => beat.user_id === user.id) : null
    // console.log(userBeats)
  

    return (
        <div>
            {user ?
            <> 
                <h1>Welcome {user.username}</h1> 
                <button onClick={() => history.push(`/${user.username}/upload`)}>Upload Beats</button>
                {userBeats.map(beat => 
                <>
                    <Link to={`/${user.username}/${beat.id}`}><h2>{beat.name}</h2></Link>
                    <em>{beat.genre.name}</em>
                    <h4>{beat.tempo} bpm</h4>
                    <h4>${beat.price}.00</h4>
                    <ReactAudioPlayer src={beat.audio_data} controls/>
                </>
                )}
            </>
            : 
            <h1>Sign in please</h1>
            }
        </div>
    )
}

export default UserProfile
