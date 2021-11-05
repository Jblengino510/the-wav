import BeatCard from './BeatCard';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



function BeatLibrary({ user, beats, likes, handleLikeClick, handleAddToCart }) {

    
    return (
        <Container sx={{mt: '100px'}}>
            <Typography variant='h4' sx={{mt: '20px', mb: '20px', paddingTop: '20px'}}>Beats</Typography>
            {beats ? 
            beats.map(beat => {
                let foundLike = likes.find(like => like.beat_id === beat.id)
                return (
                    <BeatCard user={user} beat={beat} foundLike={foundLike} handleLikeClick={handleLikeClick} handleAddToCart={handleAddToCart}/>
                )
            }) 
            : 
            null
            }
        </Container>
    )
}

export default BeatLibrary


