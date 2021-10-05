import '../App.css';
import { Switch, Route, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from './NavBar';
import LandingPage from './LandingPage';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import UserRoutes from './User/UserRoutes';
import BeatLibrary from './BeatLibrary';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

const theme = createTheme({
  palette: {
    primary: {
      main: '#001c55'
    },
    secondary: {
      main: '#FFFFFF'
    },
    text: {
      primary: '#FFFFFF'
    }
  }
})


function App() {
  const [ user, setUser ] = useState({})
  const [ beats, setBeats ] = useState([])
  const [ genres, setGenres ] = useState([])
  const [ likes, setLikes ] = useState([])
  const [ carts, setCarts ] = useState([])
  const history = useHistory()
  // console.log(user.id)
  // console.log(carts)

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


  useEffect(() => {
    fetch(`/users/${user.id}/likes`)
    .then(res => {
      if (res.ok) {
        res.json().then(data => setLikes(data))
      }
    })
  }, [user])


  useEffect(() => {
    fetch('/carts')
    .then(res => {
      if (res.ok) {
        res.json().then(data => setCarts(data))
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


  function handleLikeClick(user, beat){
    const likeObj = {
      user_id: user.id,
      beat_id: beat.id
    }
    fetch('/likes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(likeObj)
    })
    .then(res => {
      if (res.status === 200) {
        res.json().then(data => setLikes([data, ...likes]))
      } else if (res.status === 204) {
        res.json().then(data => setLikes(likes.filter(like => like.id !== data.id)))
      }
    })
  }


  function handleAddToCart(e, user, beat){
    e.preventDefault()
    const cartObj = {
      user_id: user.id,
      beat_id: beat.id
    }
    fetch('/carts', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(cartObj)
    })
    .then(res => res.json())
    .then(data => setCarts([data, ...carts]))
  }



  return (
    <>
      {user ? 
      <>
        <ThemeProvider theme={theme}>
        <Container sx={{color: 'white'}}>
          <NavBar user={user} handleSignOut={handleSignOut}/>
          <Switch>
            <Route path='/beats'>
              <BeatLibrary user={user} beats={beats} likes={likes} handleLikeClick={handleLikeClick} handleAddToCart={handleAddToCart}/>
            </Route>
            <Route path='/login'>
              <LoginForm setUser={setUser}/>
            </Route>
            <Route path='/signup'>
              <SignupForm setUser={setUser}/>
            </Route>
            <Route path={user ? `/${user.username}` : null}>
              <UserRoutes user={user} genres={genres} beats={beats} setBeats={setBeats} likes={likes} carts={carts} handleBeatDelete={handleBeatDelete} handlePlayClick={handlePlayClick} handleLikeClick={handleLikeClick}/>
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
