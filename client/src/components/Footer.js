import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';

function Footer() {

    return (
        <footer style={{padding: 0}}>
            <Grid container>
                <Grid item xs={12} sx={{mt: '50px'}}>
                    <Divider sx={{bgcolor: '#222222'}}/>
                </Grid>
                <Grid item xs={12} sx={{padding: '100px', display: 'flex', justifyContent: 'center', bgcolor: ''}}>
                    <Typography variant='body1'>This app was created with <a href='https://reactjs.org/' target="_blank"><strong className='footer' style={{color: '#001c55', fontSize: 'large'}}>React</strong></a> and <a href='https://rubyonrails.org/' target="_blank"><strong className='footer' style={{color: '#001c55', fontSize: 'large'}}>Ruby on Rails</strong></a>.</Typography>
                    &nbsp;
                    <CopyrightOutlinedIcon color='secondary' fontSize='small'/>
                    &nbsp;
                    <Typography variant='body1'>2021 TheWav, Inc. All rights reserved.</Typography>
                </Grid>
            </Grid>
        </footer>
    )
}

export default Footer
