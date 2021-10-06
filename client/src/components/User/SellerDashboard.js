import { useState } from 'react'
import { AreaChart } from 'react-chartkick';
import 'chartkick/chart.js'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function SellerDashboard({ user }) {
    const [ totalBeatsSold, setTotalBeatsSold ] = useState(user.total_beats_sold)

    

    return (
        <Container>
            <Typography variant='h4'>Dashboard</Typography>
            <Divider sx={{bgcolor: '#222222', mt: '20px', mb: '20px'}}/>
            <Grid container>
                <Grid item xs={4}>
                <Card sx={{display: 'flex', bgcolor: '#00072d', padding: '20px'}}>
                <AttachMoneyIcon color='secondary' fontSize='large'/>
                </Card>
                </Grid>
                <Grid item xs={4}>
                <Card sx={{display: 'flex', bgcolor: '#00072d', padding: '20px'}}>
                <ShoppingCartIcon color='secondary' fontSize='large'/>
                </Card>
                </Grid>
                <Grid item xs={4}>
                <Card sx={{display: 'flex', bgcolor: '#00072d', padding: '20px'}}>
                <PlayArrowIcon color='secondary' fontSize='large'/>
                </Card>
                </Grid>
                <Grid item xs={12}>
                    <AreaChart height="150px"  colors={['#001c55']}
                    options={{
                        legend: {
                            labels: {
                                fontColor: "white"
                            }
                            }
                    }}
                    data={user.beats_sold_by_week} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default SellerDashboard
