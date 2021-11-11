import { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function BeatForm({ user, genres, beats, setBeats }) {
    const [ name, setName ] = useState('')
    const [ genre, setGenre ]  = useState('')
    const [ tempo, setTempo ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ plays, setPlays ] = useState(0)
    const [ audioUrl, setAudioUrl ] = useState('')
    const [ image, setImage ] = useState(null)
    const [ imageUrl, setImageUrl ] = useState('')
    const [ waveFormUrl, setWaveFormUrl ] = useState('')
    const [ sold, setSold ] = useState(false)
    const [ errors, setErrors ] = useState([])
    const [ activeStep, setActiveStep ] = useState(0);
    const [ open, setOpen ] = useState(false)
    const history = useHistory()
    let genreArr = genres


    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(file => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', 'thewav')
            formData.append('cloud_name', 'dczg4dzfm')
            fetch('https://api.cloudinary.com/v1_1/dczg4dzfm/video/upload', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => setAudioUrl(data.url))
            .then(setActiveStep(1))
            .then(setOpen(true))
            window.scrollTo(0, document.body.scrollHeight)
        })
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accepts: 'audio/*', multiple: false})


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
        .then(data => setImageUrl(data.url))
        .then(setActiveStep(2))
        .then(setOpen(true))
    }


    function handleBeatSubmit(e){
        e.preventDefault()

        const formData = new FormData()
        formData.append('user_id', user.id)
        formData.append('genre_id', parseInt(genre))
        formData.append('name', name)
        formData.append('tempo', parseInt(tempo))
        formData.append('price', parseInt(price))
        formData.append('plays', plays)
        formData.append('audio_url', audioUrl)
        formData.append('is_sold', sold)
        formData.append('image_url', imageUrl)
        formData.append('wave_form_url', waveFormUrl)

        fetch('/beats', {
            method: 'POST',
            body: formData
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => setBeats([data, ...beats])).then(setActiveStep(3))
                window.scrollTo(0, 0)
                // history.push(`/${user.username}`)
            } else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }

    
    return (
        <Container sx={{mt: '100px'}}>
            <Box sx={{height: '200px'}}>
                <Typography variant='h3' sx={{mt: '20px', mb: '20px', ml: '10px', paddingTop: '20px'}}>Upload</Typography>
            </Box>
            <Box sx={{mb: '50px', width: '100%'}}>
                <Stepper activeStep={activeStep}>
                    <Step active='true'>
                        <StepLabel>Upload an audio file</StepLabel>
                    </Step>
                    <Step active='true'>
                        <StepLabel>Add cover art (optional)</StepLabel>
                    </Step>
                    <Step active='true'>
                        <StepLabel>Submit beat</StepLabel>
                    </Step>
                </Stepper>
                <br />
                <br />
                {activeStep === 3 ? 
                <Alert variant='outlined' severity='success'>
                    <strong>Beat successfully uploaded!</strong>
                </Alert> 
                : 
                null
                }
            </Box>
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : null}`}>
                <input {...getInputProps()}/>
                Drag and drop your beats here 
                <br />
                or click to choose files
                <Typography variant='body1' sx={{mt: '40px', mb: '20px'}}>
                    <strong>M4A, MP3, WAV, FLAC, AAC, OGG, MP2, and WMA accepted</strong>
                </Typography>
            </div>
            {audioUrl ?
            <Grid container spacing={2} sx={{border: '2px dashed #001c55', mt: '20px', mb: '20px', padding: '20px'}}>
                <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(!open)}>
                    <Alert variant='outlined' onClose={() => setOpen(!open)} severity='success' sx={{width: '100%'}}>
                        {imageUrl ? 'Image Uploaded' : 'File upload successful!'}
                    </Alert>
                </Snackbar>
                <Grid item xs={6} sx={imageUrl ? 
                    {backgroundImage: `url(${imageUrl})`, 
                    backgroundSize: 'cover', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center'
                    } 
                    : 
                    {bgcolor: '#000000', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center'
                    }}
                    >
                    <form 
                    onSubmit={handleImageUpload} 
                    style={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center'
                        }}
                    >
                        {imageUrl ? 
                        null 
                        : 
                        <>
                        <Typography variant='h4' sx={{mb: '30px'}}>
                            <strong>Add Cover Art</strong>
                        </Typography>
                        <TextField type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])}/>
                        </>
                        }
                        <br />
                        <br />
                        {image ? 
                        <Tooltip title='Click to upload image' placement='bottom' arrow>
                            <Button type='submit' variant='contained' sx={{alignItems: 'center'}}>Upload image</Button> 
                        </Tooltip>
                        : 
                        null
                        }
                    </form>
                </Grid>
                <Grid item xs={6} sx={{bgcolor: '#000000'}}>
                <form 
                onSubmit={handleBeatSubmit} 
                autoComplete='off' 
                style={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center'
                    }}
                >
                    <TextField 
                    label="Name" 
                    variant="outlined" 
                    color='primary' 
                    onChange={(e) => setName(e.target.value)} 
                    sx={{
                        bgcolor: '#222222', 
                        color: '#777777', 
                        width: '50%', 
                        mt: '20px', 
                        mb: '20px'
                        }}
                    />
                    <TextField 
                    select 
                    label="Genre" 
                    variant="outlined" 
                    color='primary' 
                    onChange={(e) => setGenre(e.target.value)} 
                    sx={{
                        bgcolor: '#222222', 
                        color: '#777777', 
                        width: '50%', 
                        mt: '20px', 
                        mb: '20px'
                        }}
                    >
                        <MenuItem 
                        value="" 
                        sx={{
                            bgcolor: '#222222', 
                            color: '#777777', 
                            '&:hover': {bgcolor: '#1B1B1B'}
                            }}
                        >
                            --
                        </MenuItem>
                        {genreArr.map(genre => 
                        <MenuItem value={genre.id} sx={{bgcolor: '#222222', color: '#777777', '&:hover': {bgcolor: '#1B1B1B'}}}>{genre.name}</MenuItem>
                        )}
                    </TextField>
                    <TextField 
                    label="Tempo" 
                    variant="outlined" 
                    color='primary' 
                    onChange={(e) => setTempo(e.target.value)} 
                    sx={{
                        bgcolor: '#222222', 
                        color: '#777777', 
                        width: '50%', 
                        mt: '20px', 
                        mb: '20px'
                        }}
                    />
                    <TextField 
                    label="Price" 
                    variant="outlined" 
                    color='primary' 
                    onChange={(e) => setPrice(e.target.value)} 
                    sx={{
                        bgcolor: '#222222', 
                        color: '#777777', 
                        width: '50%', 
                        mt: '20px', 
                        mb: '20px'
                        }}
                    />
                    <Button type='submit' variant='contained' sx={{mt: '20px', mb: '20px'}}>
                        <strong>Submit</strong>
                    </Button>
                </form> 
                {(errors.length > 0) ?
                (<Box sx={{mb: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                {errors.map(error => <Typography key={error} color='error'>{error}</Typography>)}
                </Box>) 
                :
                null
                }
                </Grid>
            </Grid> 
            :
            null
            }
        </Container>
    )
}

export default BeatForm
