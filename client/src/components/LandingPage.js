import { useState, useEffect } from 'react'

function LandingPage({ user }) {
    const [ youtubeVideos, setYoutubeVideos ] = useState([])
    const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
    // console.log(YOUTUBE_API_KEY)
    // console.log(youtubeVideos)

    // useEffect(() => {
    //     fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=fliko&maxResults=10&type=video&videoDefinition=high&key=${YOUTUBE_API_KEY}`)
    //     .then(res => {
    //         if (res.ok) {
    //             res.json().then(data => setYoutubeVideos(data.items))
    //         }
    //     })
    // }, [])

    return (
        <div>
            {user ? 
            <>
                <h1>Welcome {user.username}</h1>
                {youtubeVideos.map(video => <iframe key={video.id.videoId} src={`https://www.youtube.com/embed/${video.id.videoId}`} height='200' width='300'></iframe>)} 
            </>
            : 
            <>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <img src='/wavegif.gif' width='400px' height='400px'/>
                </div>
                {youtubeVideos.map(video => <iframe key={video.id.videoId} src={`https://www.youtube.com/embed/${video.id.videoId}`} height='200' width='300'></iframe>)}  
            </>
            }
        </div>
    )
}

export default LandingPage
