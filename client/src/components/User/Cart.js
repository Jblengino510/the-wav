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

function Cart({ carts }) {
    return (
        <Container>
            <Typography variant='h3'>Checkout</Typography>
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
                                {carts.map(item => 
                                <TableRow>
                                    <TableCell sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                        <CardMedia component='image' image={item.beat.image_url ? item.beat.image_url : '/logo512.png'} sx={{width: '150px', height: '150px', mt: '20px', mb: '20px', mr: '40px'}}/>
                                        <div>
                                        <Typography variant='h5' color='secondary'><strong>{item.beat.name}</strong></Typography>
                                        </div>
                                        
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='h6'>
                                            <strong>${item.beat.price}.00</strong>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                    )}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Cart
