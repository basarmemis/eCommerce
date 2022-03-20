
import { ProductList } from "./ProductList";
import { useEffect } from "react";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import NotFound from "../errors/NotFound";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors } from "./catalogSlice";
import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - Hight to low' },
    { value: 'price', label: 'Price - Low to high' },
]

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status, filtersLoaded, brands, types } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);

    //2. defa useEffect Kullandım Cünkü, productsLoaded ve filtersLoaded iksini dependency arrayde kullanınca re-render problemi oluyodu.
    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync());
    }, [filtersLoaded, dispatch]);

    if ((status === "pendingFetchProducts")) return (<LoadingSpinner message={'Catalog is Loading...'} />);
    if (!products) return (<NotFound />);
    return (
        <>
            <Grid container rowSpacing={{ xs: 4, sm: 0, md: 0 }} columnSpacing={{ xs: 4, sm: 0, md: 0 }} columns={12}>
                <Grid item xl={2.5} md={3} sm={4} xs={5}>
                    <Paper sx={{ mb: 2 }}>
                        <TextField
                            label='Search products'
                            variant="outlined"
                            fullWidth
                        />
                    </Paper>
                    <Paper sx={{ marginBottom: 2, padding: 2 }}>
                        <FormControl>
                            <RadioGroup>
                                {sortOptions.map(({ value, label }) => (
                                    <FormControlLabel value={value} control={<Radio />} label={label} />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Paper>
                    <Paper sx={{ marginBottom: 2, padding: 2 }}>
                        <FormGroup>
                            {brands.map(brand => (
                                <FormControlLabel control={<Checkbox />} label={brand} key={brand} />
                            ))}
                        </FormGroup>
                    </Paper>
                    <Paper sx={{ marginBottom: 2, padding: 2 }}>
                        <FormGroup>
                            {types.map(type => (
                                <FormControlLabel control={<Checkbox />} label={type} key={type} />
                            ))}
                        </FormGroup>
                    </Paper>
                </Grid>
                <Grid item xl={9.5} md={9} sm={8} xs={7}>
                    <ProductList
                        products={products}
                    />
                </Grid>
                <Grid item xl={2.5} md={3} sm={4} xs={5} />
                <Grid item xl={9.5} md={9} sm={8} xs={7}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Typography>
                            Displaying 1-6 of 20 items
                        </Typography>
                        <Pagination
                            color='secondary'
                            size='large'
                            count={5}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
