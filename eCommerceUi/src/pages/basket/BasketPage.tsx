import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import BasketSummary from "../../components/basket/BasketSummary";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export interface IAppProps {
}

export default function BasketPage(props: IAppProps) {
    const dispatch = useAppDispatch();

    const { basket, status } = useAppSelector(state => state.basket);

    if (!basket || basket.items.length <= 0) return (<Typography variant="h3">Your Basket is Empty</Typography>);

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
                                        <LoadingButton
                                            onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: 1, buttonType: "odd" }))}
                                            color='error'
                                            loading={(status === ("pendingRemoveItem" + item.productId + "odd"))}>
                                            <Remove />
                                        </LoadingButton>
                                        {item.quantity}
                                        <LoadingButton
                                            onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}
                                            color='success'
                                            loading={(status === ("pendingAddItem" + item.productId))}>
                                            <Add />
                                        </LoadingButton>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">${((item.price! * item.quantity) / 100).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        onClick={() => { dispatch(removeBasketItemAsync({ productId: item.productId, quantity: item.quantity, buttonType: "all" })) }}
                                        color='error'
                                        loading={(status === ("pendingRemoveItem" + item.productId + "all"))}>
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
