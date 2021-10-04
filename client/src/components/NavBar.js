import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Settings from '@mui/icons-material/Settings';
import PowerSettingsNew from '@mui/icons-material/PowerSettingsNew';
import Insights from '@mui/icons-material/Insights';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }


function NavBar({ user, handleSignOut }) {
    const [ value, setValue ] = useState(0)
    const [ anchorEl, setAnchorEl ] = useState(null)
    const open = Boolean(anchorEl);
    const history = useHistory()

    function handleClick(e){
        setAnchorEl(e.currentTarget)
    }


    function handleClose(){
       setAnchorEl(null)
    }
   

    function handleChange(event, newValue) {
        setValue(newValue)
    }
    
    
    return (
        <div>
            { user ? 
            <>
                <AppBar position='sticky' sx={{bgcolor: '#000000', color: 'white', width: '100%', padding: '10px'}}>
                    <Toolbar>
                        <Typography variant='h4' sx={{flexGrow: 1}}>
                            ∿ The Wav ∿
                        </Typography>
                        <Box sx={{width: '30%', bgcolor: ''}}>
                            <Tabs value={value} onChange={handleChange} textColor='secondary' indicatorColor='primary'>
                                <LinkTab label="Page One" href="/drafts" sx={{color: 'white'}}/>
                                <LinkTab label="Page Two" href="/trash" sx={{color: 'white'}}/>
                                <LinkTab label="Page Three" href="/spam" sx={{color: 'white'}}/>
                            </Tabs>
                        </Box>
                        <IconButton
                        size='large'
                        // edge='end'
                        aria-label='account of current user'
                        // aria-controls={menuId}
                        aria-haspopup='true'
                        onClick={handleClick}
                        color='secondary'
                        >
                            <Avatar sx={{width: 32, height: 32, mr: '10px'}}></Avatar>
                            <Typography sx={{mr: '5px'}}>{user.username}</Typography>
                            <KeyboardArrowDownIcon onClick={handleClick}/>
                        </IconButton> 
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                            '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: '#111111',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                            bgcolor: '#000000',
                            padding: '5px',
                            border: '2px solid #222222'
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                            <MenuItem sx={{bgcolor: '#000000',  paddingRight: '50px', '&:hover': {backgroundColor: '#111111'}}} onClick={() => history.push(`/${user.username}`)} >
                                <Avatar /> Profile
                            </MenuItem>
                            <Divider sx={{bgcolor: '#222222'}}/>
                            <MenuItem sx={{bgcolor: '#000000',  paddingRight: '50px', '&:hover': {backgroundColor: '#111111'}}}>
                                <ListItemIcon>
                                    <Insights fontSize="medium" color='secondary'/>
                                </ListItemIcon>
                                Insights
                            </MenuItem>
                            <br></br>
                            <MenuItem sx={{bgcolor: '#000000',  paddingRight: '50px', '&:hover': {backgroundColor: '#111111'}}}>
                                <ListItemIcon>
                                    <Settings fontSize="medium" color='secondary'/>
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <br></br>
                            <MenuItem sx={{bgcolor: '#000000',  paddingRight: '50px', '&:hover': {backgroundColor: '#111111'}}} onClick={handleSignOut}>
                                <ListItemIcon>
                                    <PowerSettingsNew fontSize="medium" color='secondary'/>
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </>
            : 
            (
            <>
                <AppBar position='static' sx={{bgcolor: '#000000', color: 'white', width: '100%', padding: '10px'}}>
                    <Toolbar>
                        <Typography variant='h3' sx={{flexGrow: 1}}>
                            ∿ The Wav ∿
                        </Typography>
                        <Button onClick={() => history.push('/signup')} size='large' sx={{color: 'white'}}>Sign Up</Button>
                        <Button onClick={() => history.push('/login')} size='large' sx={{color: 'white'}}>Log In</Button>
                    </Toolbar>
                </AppBar>
            </>
            )
            }
        </div>
    )
}

export default NavBar

