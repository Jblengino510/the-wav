import { useState } from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

function SettingsForm({ user }) {
    const [ username, setUsername ] = useState(user.username)
    const [ avatarUrl, setAvatarUrl ] = useState('')
    const [ image, setImage ] = useState(null)
    const [ errors, setErrors ] = useState([])


    function handleImageUpload(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'thewav')
        formData.append('cloud_name', 'dczg4dzfm')
        fetch('https://api.cloudinary.com/v1_1/dczg4dzfm/image/upload', {
            method: 'POST', 
            body: formData
        })
        .then(res => res.json())
        .then(data => setAvatarUrl(data.url))
    }


    function handleEditProfile(e){
        e.preventDefault()
        const profileObj = {
            username: username, 
            avatar_url: avatarUrl
        }
        fetch('/users')
    }


    return (
        <Container sx={{mt: '100px', height: '100vh'}}>
            <Box sx={{display: 'flex', justifyContent: 'center', mb: '20px', padding: '20px'}}>
                <Typography variant='h3'>Your Profile Settings</Typography>
            </Box>
            <Divider sx={{bgcolor: '#222222'}}/>
            <Grid container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Grid item xs={12} sx={{width: '50%'}}>
                    <form autoComplete='off' >
                        <TextField variant="outlined" color='primary' value={username} onChange={(e) => setUsername(e.target.value)} sx={{bgcolor: '#222222', color: '#777777', width: '100%', mt: '20px', mb: '20px'}}/>
                        <TextField type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])} sx={{bgcolor: '#222222', color: '#777777', width: '100%', mt: '20px', mb: '20px'}}/>
                    </form>
                </Grid>
            </Grid>
        </Container>
    )
}

export default SettingsForm
