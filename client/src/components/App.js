import '../App.css';
import { Switch, Route, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from './NavBar';
import LandingPage from './LandingPage';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import UserRoutes from './User/UserRoutes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    },
    text: {
      primary: '#FFFFFF'
    }
  }
})


function App() {
  const [ user, setUser ] = useState()
  const [ beats, setBeats ] = useState([])
  const [ genres, setGenres ] = useState([])
  const history = useHistory()

  useEffect(() => {
    fetch('/me')
   .then(res => {
     if (res.ok) {
       res.json().then(user => {
         setUser(user)
        })
     }
   })
  }, [])


  useEffect(() => {
    fetch('/beats')
    .then(res => {
      if (res.ok) {
        res.json().then(data => setBeats(data))
      }
    })
  }, [])


  useEffect(() => {
    fetch('/genres')
    .then(res => {
      if (res.ok) {
        res.json().then(data => setGenres(data))
      }
    })
  }, [])


  function handleSignOut(){
    fetch('/logout', {
      method: 'DELETE'
    })
    .then(res => {
      if (res.ok) {
        setUser()
        history.push('/')
      }
    })
  }


  function handleBeatDelete(id){
    fetch(`/beats/${id}`, {
        method: 'DELETE'
    })
    setBeats(beats.filter(beat => beat.id !== id))
    history.push(`/${user.username}`)
  }


  function handlePlayClick(beat){
    const beatPlays = {
        plays: beat.plays + 1
    }
    fetch(`/beats/${beat.id}`, {
       method: 'PATCH',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(beatPlays)
    })
  }


  return (
    <>
      {user ? 
      <>
        <ThemeProvider theme={theme}>
        <Container sx={{bgcolor: '', color: 'white'}}>
          <NavBar user={user} handleSignOut={handleSignOut}/>
          <Switch>
            <Route path='/login'>
              <LoginForm setUser={setUser}/>
            </Route>
            <Route path='/signup'>
              <SignupForm setUser={setUser}/>
            </Route>
            <Route path={user ? `/${user.username}` : null}>
              <UserRoutes user={user} genres={genres} beats={beats} setBeats={setBeats} handleBeatDelete={handleBeatDelete} handlePlayClick={handlePlayClick}/>
            </Route>
            <Route path='/'>
              <LandingPage user={user}/>
            </Route>
          </Switch>
        </Container>  
        </ThemeProvider>
      </> 
      :
      <>
        <ThemeProvider theme={theme}>
        <Container sx={{bgcolor: '', color: 'white'}}>
          <NavBar user={user} handleSignOut={handleSignOut}/>
          <Switch>
            <Route path='/login'>
              <LoginForm setUser={setUser}/>
            </Route>
            <Route path='/signup'>
              <SignupForm setUser={setUser}/>
            </Route>
            {/* <Route path={user ? `/${user.username}` : null}>
              <UserRoutes user={user} setBeats={setBeats}/>
            </Route> */}
            <Route path='/'>
              <LandingPage user={user}/>
            </Route>
          </Switch>  
        </Container>  
        </ThemeProvider>
      </>
      }
    </>
  );
}

export default App;
