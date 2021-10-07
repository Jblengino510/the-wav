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
                <Grid item xs={4} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Card sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', bgcolor: '#00072d', padding: '20px', width: '250px'}}>
                        <AttachMoneyIcon color='secondary' fontSize='large' sx={{mr: '40px'}}/>
                        <div>
                        <Typography variant='h6'><strong>${user.total_earnings}.00</strong></Typography>
                        <Typography variant='subtitle2'><strong>TOTAL EARNINGS</strong></Typography>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={4} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Card sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', bgcolor: '#00072d', padding: '20px', width: '250px'}}>
                        <ShoppingCartIcon color='secondary' fontSize='large' sx={{mr: '40px'}}/>
                        <div>
                        <Typography variant='h6'><strong>{user.total_beats_sold}</strong></Typography>
                        <Typography variant='subtitle2'><strong>TOTAL BEATS SOLD</strong></Typography>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={4} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Card sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', bgcolor: '#00072d', padding: '20px', width: '250px'}}>
                        <PlayArrowIcon color='secondary' fontSize='large' sx={{mr: '40px'}}/>
                        <div>
                        <Typography variant='h6'><strong>{user.total_plays}</strong></Typography>
                        <Typography variant='subtitle2'><strong>TOTAL PLAYS</strong></Typography>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', mt: '20px', paddingTop: '30px'}}>
                    <Typography variant='h5'><strong>Sales for Last 3 Months</strong></Typography>
                </Grid>
                <Grid item xs={12} sx={{mt: '20px', paddingTop: '30px'}}>
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
