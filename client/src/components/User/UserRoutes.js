import { Switch, Route } from 'react-router-dom'
import UserProfile from './UserProfile'
import BeatForm from './BeatForm'
import BeatDetails from './BeatDetails'
import Cart from './Cart'
import SellerDashboard from './SellerDashboard'

function UserRoutes({ user, genres, beats, setBeats, likes, carts, setCarts, handleBeatDelete, handlePlayClick, handleLikeClick, handleDeleteFromCart }) {
    return (
        <Switch>
            <Route path={user ? `/${user.username}/dashboard` : null}>
                <SellerDashboard user={user}/>
            </Route>
            <Route path={user ? `/${user.username}/cart` : null}>
                <Cart carts={carts} setCarts={setCarts} handleDeleteFromCart={handleDeleteFromCart}/>
            </Route>
            <Route path={user ? `/${user.username}/upload` : null}>
                <BeatForm user={user} genres={genres} beats={beats} setBeats={setBeats}/>
            </Route>
            <Route path={user ? `/${user.username}/:id` : null}>
                <BeatDetails user={user} genres={genres} handleBeatDelete={handleBeatDelete} handlePlayClick={handlePlayClick} handleLikeClick={handleLikeClick}/>
            </Route>
            <Route path={user ? `/${user.username}` : null}>
                <UserProfile user={user} beats={beats} setBeats={setBeats} likes={likes} handlePlayClick={handlePlayClick} handleLikeClick={handleLikeClick}/>
            </Route>
        </Switch>
    )
}

export default UserRoutes
