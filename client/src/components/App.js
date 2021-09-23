import '../App.css';
import { Switch, Route, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from './NavBar';
import LandingPage from './LandingPage';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function App() {
  const [ user, setUser ] = useState()
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

  // if (!user) return <LandingPage user={user}/>

  // console.log(user)


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
