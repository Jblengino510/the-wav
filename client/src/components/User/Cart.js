import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

function Cart({ carts, setCarts, handleDeleteFromCart }) {
    const unsoldBeats = carts ? carts.filter(item => item.beat.is_sold === false) : null
   

    function handleBeatSold(beats){
        const dateSold = new Date(Date.now()).toISOString()

        {beats.forEach(beat => {
            const beatObj = {
                is_sold: true,
                date_sold: dateSold
            }

            fetch(`/beats/${beat.beat_id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(beatObj)
            })
            //deletes cart instance
            .then(handleDeleteFromCart(beat.id))
        })}
    }


    return (
        <Container sx={{mt: '100px'}}>
            <Typography variant='h3' sx={{mt: '20px', mb: '20px', paddingTop: '20px'}}>Checkout</Typography>
            <Divider sx={{bgcolor: '#222222', mt: '20px', mb: '20px'}}/>
            <Grid container>
                <Grid item xs={12}>
                    <Box>
                        <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item</TableCell>
                                    <TableCell>Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {unsoldBeats.map(item => 
                                <TableRow>
                                    <TableCell sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                        <CardMedia component='image' image={item.beat.image_url ? item.beat.image_url : '/logo512.png'} sx={{width: '150px', height: '150px', mt: '20px', mb: '20px', mr: '40px'}}/>
                                        <div>
                                        <Typography variant='h5'><strong>{item.beat_creator}</strong></Typography>
                                        <br></br>
                                        <Typography variant='body1'><strong>{item.beat.name}</strong></Typography>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='h6'>
                                            <strong>${item.beat.price}.00</strong>
                                            <IconButton onClick={() => handleDeleteFromCart(item.id)}sx={{float: 'right'}}>
                                                <CloseIcon sx={{color: '#222222'}}/>
                                            </IconButton>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                    )}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{mt: '20px'}}>
                    <Typography variant='h5'>Total: ${unsoldBeats ? unsoldBeats.map(item => item.beat.price).reduce((a, b) => a + b, 0) : null}.00 USD</Typography>
                </Grid>
                <Grid item xs={6} sx={{mt: '20px'}}>
                    <Button variant='contained' color='primary' sx={{float: 'right'}} onClick={() => handleBeatSold(unsoldBeats)}>Checkout</Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Cart
