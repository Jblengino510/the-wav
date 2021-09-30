import { useHistory } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';


function NavBar({ user, handleSignOut }) {
    const history = useHistory()
    
    return (
        <div>
            { user ? 
            <>
                <AppBar position='static' sx={{bgcolor: 'black'}}>
                    <Toolbar>
                    <Button onClick={handleSignOut} size='large'>Log out</Button> 
                    <Button onClick={() => history.push(`/${user.username}`)} size='large'>Profile</Button>
                    <IconButton
                    size='large'
                    edge='end'
                    aria-label='account of current user'
                    // aria-controls={menuId}
                    aria-haspopup='true'
                    // onClick={handleProfileMenuOpen}
                    color='primary'
                    >
                        <AccountCircle />
                    </IconButton> 
                    </Toolbar>
                </AppBar>
            </>
            : 
            (<>
                <AppBar position='static' sx={{bgcolor: 'black'}}>
                    <Toolbar>
                    <Button onClick={() => history.push('/signup')} size='large'>Sign Up</Button>
                    <Button onClick={() => history.push('/login')} size='large'>Log In</Button>
                    </Toolbar>
                </AppBar>
            </>
            )
            }
        </div>
    )
}

export default NavBar

