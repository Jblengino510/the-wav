import { Switch, Route } from 'react-router-dom'
import UserProfile from './UserProfile'
import BeatForm from './BeatForm'

function UserRoutes({ user }) {
    return (
        <Switch>
            <Route path={user ? `/${user.username}/upload` : null}>
                <BeatForm />
            </Route>
            <Route path={user ? `/${user.username}` : null}>
                <UserProfile user={user}/>
            </Route>
        </Switch>
    )
}

export default UserRoutes
