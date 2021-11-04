import ProfileBeatCard from './ProfileBeatCard';
import { useHistory, Link } from 'react-router-dom'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';



function UserProfile({ user, beats, likes, setBeats, handlePlayClick, handleLikeClick }) {
    const history = useHistory()
    const userBeats = beats ? beats.filter(beat => beat.user_id === user.id) : null
  
  

    return (
        <Container sx={{mt: '100px'}}>
            <Card sx={{backgroundImage: `linear-gradient(0deg, #000, transparent), url(${user.banner_url})`, bgcolor: '#000000', backgroundSize: 'cover', padding: '50px', border: '2px solid #222222', '&:hover': {border: '2px solid #333333'}}}>
                <Grid container>
                    <Grid item xs={3} sx={{bgcolor: ''}}>
                        <Avatar src={user.avatar_url} sx={{width: '200px', height: '200px'}}/>
                    </Grid>
                    <Grid item xs={9}>
                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <CardContent>
                            <Typography variant='h4' color='secondary' sx={{bgcolor: 'rgba(0, 0, 0, .7)', padding: '10px'}}>{user.username}</Typography>
                        </CardContent>
                            <Box sx={{flexGrow: 1}}></Box>
                            <Box sx={{bgcolor: 'rgba(0, 0, 0, .7)', padding: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <PlayArrowIcon sx={{fontSize: '40px'}}/> &nbsp;<strong style={{fontSize: '20px'}}>{user.total_plays}</strong>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                <FavoriteIcon sx={{fontSize: '30px'}}/> &nbsp;<strong style={{fontSize: '20px'}}>{user.total_likes}</strong>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
            <br></br>
            <Card sx={{bgcolor: '#000000', padding: '20px', border: '2px solid #222222', '&:hover': {border: '2px solid #333333'}}}>
                <CardContent sx={{flexGrow: 1}}>
                    <Typography variant='h4' color='secondary'>{`Beats (${user.total_beats_uploaded})`}</Typography>
                </CardContent>
            </Card>
            {userBeats.map(beat => {
                let foundLike = likes.find(like => like.beat_id === beat.id)
                return (
                    <>
                        <ProfileBeatCard user={user} beat={beat} foundLike={foundLike} handleLikeClick={handleLikeClick}/>
                    </>
                )
            })}
        </Container>
    )
}

export default UserProfile


