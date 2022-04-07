
import { ProductList } from "./ProductList";
import { useEffect } from "react";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import NotFound from "../errors/NotFound";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../radioButtonGroup/RadioButtonGroup";
import CheckBoxButtons from "../checkBoxButtons/CheckBoxButtons";
import AppPagination from "../appPagination/AppPagination";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - Hight to low' },
    { value: 'price', label: 'Price - Low to high' },
]


export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, filtersLoaded, brands, types, productParams, metaData } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);

    //2. defa useEffect Kullandım Cünkü, productsLoaded ve filtersLoaded iksini dependency arrayde kullanınca re-render problemi oluyodu.
    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync());
    }, [filtersLoaded, dispatch]);

    if (!filtersLoaded) return (<LoadingSpinner message={'Catalog is Loading...'} />);
    if (!products) return (<NotFound />);
    return (
        <>
            <Grid container rowSpacing={{ xs: 4, sm: 0, md: 0 }} columnSpacing={{ xs: 4, sm: 0, md: 0 }} columns={12}>
                <Grid item xl={2.5} md={3} sm={4} xs={5}>
                    <Paper sx={{ mb: 2 }}>
                        <ProductSearch />
                    </Paper>
                    <Paper sx={{ marginBottom: 2, padding: 2 }}>
                        <RadioButtonGroup
                            selectedValue={productParams.orderBy}
                            options={sortOptions}
                            onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
                        />
                    </Paper>
                    <Paper sx={{ marginBottom: 2, padding: 2 }}>
                        <CheckBoxButtons
                            items={brands}
                            checked={productParams.brands}
                            onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
                        />
                    </Paper>
                    <Paper sx={{ marginBottom: 2, padding: 2 }}>
                        <CheckBoxButtons
                            items={types}
                            checked={productParams.types}
                            onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
                        />
                    </Paper>
                </Grid>
                <Grid item xl={9.5} md={9} sm={8} xs={7}>
                    <ProductList
                        products={products}
                    />
                </Grid>
                <Grid item xl={2.5} md={3} sm={4} xs={5} />
                <Grid item xl={9.5} md={9} sm={8} xs={7}>
                    {metaData &&
                        <AppPagination
                            metaData={metaData}
                            onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
                        />}
                </Grid>
            </Grid>
        </>
    );
}
