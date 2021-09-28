import { useHistory } from 'react-router-dom'

function UserProfile({ user }) {
    const history = useHistory()
  

    return (
        <div>
            {user ?
            <> 
                <h1>Welcome {user.username}</h1> 
                <button onClick={() => history.push(`/${user.username}/upload`)}>Upload Beats</button>
            </>
            : 
            <h1>Sign in please</h1>
            }
        </div>
    )
}

export default UserProfile
