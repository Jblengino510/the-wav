

function UserProfile({ user }) {
  

    return (
        <div>
            {user ? <h1>Welcome {user.username}</h1> : <h1>Sign in please</h1>}
        </div>
    )
}

export default UserProfile
