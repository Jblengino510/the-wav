import '../App.css';
import { Switch, Route, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from './NavBar';
import LandingPage from './LandingPage';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import UserRoutes from './User/UserRoutes';

function App() {
  const [ user, setUser ] = useState()
  const [ beats, setBeats ] = useState([])
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


  return (
    <>
      {user ? <>
        <NavBar user={user} handleSignOut={handleSignOut}/>
        <Switch>
          <Route path='/login'>
            <LoginForm setUser={setUser}/>
          </Route>
          <Route path='/signup'>
            <SignupForm setUser={setUser}/>
          </Route>
          <Route path={user ? `/${user.username}` : null}>
            <UserRoutes user={user} beats={beats} setBeats={setBeats} handleBeatDelete={handleBeatDelete}/>
          </Route>
          <Route path='/'>
            <LandingPage user={user}/>
          </Route>
        </Switch>  
      </> :
      <>
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
      </>
      }
    </>
  );
}

export default App;
