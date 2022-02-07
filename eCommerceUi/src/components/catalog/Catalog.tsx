
import { ProductList } from "./ProductList";
import { useEffect } from "react";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import NotFound from "../errors/NotFound";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);


    if ((status === "pendingFetchProducts")) return (<LoadingSpinner message={'Catalog is Loading...'} />);
    if (!products) return (<NotFound />);
    return (
        <ProductList
            products={products}
        />
    );
}
