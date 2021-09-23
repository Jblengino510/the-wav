import { useHistory } from 'react-router-dom'

function NavBar({ user, handleSignOut }) {
    const history = useHistory()
    return (
        <div>
            { user ? <button onClick={handleSignOut}>Log out</button> 
            : 
            (<>
                <button onClick={() => history.push('/signup')}>Sign Up</button>
                <button onClick={() => history.push('/login')}>Log In</button>
            </>
            )
            }
        </div>
    )
}

export default NavBar

