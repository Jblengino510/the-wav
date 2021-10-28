import React from 'react'
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
                    <Typography variant='body1'>This app was created with <strong style={{color: '#001c55', fontSize: 'large'}}>React</strong> and <strong style={{color: '#001c55', fontSize: 'large'}}>Ruby on Rails</strong>.</Typography>
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
