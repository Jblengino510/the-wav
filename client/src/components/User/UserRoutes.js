import { Switch, Route } from 'react-router-dom'
import UserProfile from './UserProfile'
import BeatForm from './BeatForm'
import BeatDetails from './BeatDetails'

function UserRoutes({ user, beats, setBeats, handleBeatDelete }) {
    return (
        <Switch>
            <Route path={user ? `/${user.username}/upload` : null}>
                <BeatForm user={user} setBeats={setBeats}/>
            </Route>
            <Route path={user ? `/${user.username}/:id` : null}>
                <BeatDetails user={user} handleBeatDelete={handleBeatDelete}/>
            </Route>
            <Route path={user ? `/${user.username}` : null}>
                <UserProfile user={user} beats={beats}/>
            </Route>
        </Switch>
    )
}

export default UserRoutes
