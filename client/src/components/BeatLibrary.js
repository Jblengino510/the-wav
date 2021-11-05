import { useState } from 'react'
import BeatCard from './BeatCard';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';



function BeatLibrary({ user, beats, likes, handleLikeClick, handleAddToCart }) {
    const [ search, setSearch ] = useState('')
    const searchedBeats = beats.filter(beat => 
        beat.name.toLowerCase().includes(search.toLowerCase()) || beat.user.username.toLowerCase().includes(search.toLowerCase())
    )

    
    return (
        <Container sx={{mt: '100px'}}>
            <Box sx={{
            width: '100%',
            mt: '20px',
            mb: '20px'
            }}
            >
                <TextField 
                    fullWidth 
                    placeholder='Search by beat name, or producer'
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color='primary' fontSize='large' sx={{'&:hover': {cursor: 'pointer'}}}/>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        bgcolor: '#000000', 
                        color: 'white',
                        width: '100%', 
                        border: '4px solid #001c55',
                        '&:hover': {border: '4px solid #001c55'}
                    }}
                />
            </Box>
            <Typography variant='h4'>Beats</Typography>
            {beats ? 
            searchedBeats.map(beat => {
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


