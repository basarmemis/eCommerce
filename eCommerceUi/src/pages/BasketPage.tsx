import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../api/agent";
import BasketSummary from "../components/basket/BasketSummary";
import { useStoreContext } from "../context/StoreContext";

export interface IAppProps {
}

export default function BasketPage(props: IAppProps) {

    const { basket, setBasket, removeItem } = useStoreContext();
    const [loading, setLoading] = useState(false);

    const handleAddItem = (productId: string) => {
        setLoading(true);
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }



    const handleRemoveItem = (productId: string, quantity = 1) => {
        setLoading(true);
        agent.Basket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    if (!basket) return (<Typography variant="h3">Your Basket is Empty</Typography>);

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Subtotal</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((item) => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center'>
                                        <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">${(item.price! / 100).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <Box display="flex" alignItems="center" sx={{ justifyContent: "center" }}>
                                        <LoadingButton onClick={() => handleRemoveItem(item.productId)} color='error' loading={loading}>
                                            <Remove />
                                        </LoadingButton>
                                        {item.quantity}
                                        <LoadingButton onClick={() => handleAddItem(item.productId)} color='success' loading={loading}>
                                            <Add />
                                        </LoadingButton>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">${((item.price! * item.quantity) / 100).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton onClick={() => handleRemoveItem(item.productId, item.quantity)} color='error' loading={loading}>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container rowSpacing={{ xs: 1, sm: 0, md: 0 }} columnSpacing={{ xs: 1, sm: 0, md: 0 }} columns={12}>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to='/checkout'
                        variant="contained"
                        size='large'
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>

    );
}
