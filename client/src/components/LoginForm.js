import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

function LoginForm({ setUser }) {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errors, setErrors]  = useState([])
    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault()
        setErrors([])
        const userObj = {
            username: username,
            password: password
        }
        fetch('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userObj)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(user => setUser(user))
                history.push(`/${username}`)
            } else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }

    // console.log(errors)

    return (
        <Container sx={{mt: '100px'}}>
            <form onSubmit={handleSubmit} autoComplete='off' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant='h4' sx={{mt: '20px', mb: '20px', paddingTop: '20px'}}><strong>Log In to The Wav</strong></Typography>
                <TextField label="Username" variant="outlined" color='primary' onChange={(e) => setUsername(e.target.value)} sx={{bgcolor: '#222222', color: '#777777', width: '50%', mt: '20px', mb: '20px'}}/>
                <TextField type='password' label="Password" variant="outlined" color='primary' onChange={(e) => setPassword(e.target.value)} sx={{bgcolor: '#222222', color: '#777777', width: '50%', mt: '20px', mb: '20px'}}/>
                <Button type='submit' variant='contained' sx={{mt: '20px', mb: '40px', width: '50%', padding: '20px'}}><strong>Log In</strong></Button>
            </form>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: '20px', mb: '20px'}}>
                <Divider sx={{bgcolor: '#222222', width: '50%'}}/>
                <br></br>
                <Typography variant='body1'><strong>Don't have an account?</strong></Typography>
                <Typography variant='body1' onClick={() => history.push('/signup')} sx={{textDecoration: 'underline', '&:hover': {cursor: 'pointer'}}}><strong>Sign Up</strong></Typography>
            </Box>
            {(errors.length > 0) ?
                (<Box sx={{mt: '20px', mb: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                {errors.map(error => <Typography key={error} color='error'>{error}</Typography>)}
                </Box>) 
                :
                null
            }
        </Container>
    )
}

export default LoginForm
