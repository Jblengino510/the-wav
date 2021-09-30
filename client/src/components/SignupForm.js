import { useState } from 'react'
import { useHistory } from 'react-router-dom'

function SignupForm({ setUser }) {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordConfirmation, setPasswordConfirmation ] = useState('')
    const [ errors, setErrors ] = useState([])
    const history = useHistory()

    function handleSignUpSubmit(e){
        e.preventDefault()
        const newUser = {
            username: username,
            password: password,
            password_confirmation: passwordConfirmation
        }
        fetch('/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
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

    return (
        <div>
            <form onSubmit={handleSignUpSubmit} autoComplete='off'>
                <h3>username:</h3>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <h3>password:</h3>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <h3>confirm password:</h3>
                <input type='password' value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                <br></br>
                <br></br>
                <button type='submit'>Get Started</button>
            </form>
            {(errors.length > 0) ?
                (<div>
                {errors.map(error => <li key={error}>{error}</li>)}
                </div>) 
                :
                null
            }
        </div>
    )
}

export default SignupForm
