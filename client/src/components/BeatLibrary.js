import { useState } from 'react'
import BeatCard from './BeatCard';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Slider from '@mui/material/Slider';



function BeatLibrary({ user, beats, likes, handleLikeClick, handleAddToCart }) {
    const [ search, setSearch ] = useState('')
    const [ searchClicked, setSearchClicked ] = useState(false)
    const [ value, setValue ] = useState(0)
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
                    onClick={() => setSearchClicked(!searchClicked)}
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
                        border: `${searchClicked ? '4px solid #001c55' : '4px solid #222222'}`
                    }}
                />
            </Box>
            <Box>
                {/* <Slider valueLabelDisplay="auto" min={0} max={300} value={value} onChange={(e) => setValue(e.target.value)}/> */}
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


