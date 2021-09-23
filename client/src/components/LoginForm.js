import { useState } from 'react'
import { useHistory } from 'react-router-dom'

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
                history.push('/')
            } else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }

    // console.log(errors)

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>username:</h3>
                <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <h3>password:</h3>
                <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <br></br>
                <br></br>
                <button type='submit'>Log In</button>
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

export default LoginForm
