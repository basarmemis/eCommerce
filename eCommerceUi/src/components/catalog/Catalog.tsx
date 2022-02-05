import { Product } from "../../models/product";
import { ProductList } from "./ProductList";
import { useState, useEffect } from "react";
import agent from "../../api/agent";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import NotFound from "../errors/NotFound";

export default function Catalog() {
    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState<Product[] | undefined>(undefined);

    useEffect(() => {
        agent.Catalog.list()
            .then(products => setProducts(products))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
        return cleanupTheState;
    }, []);


    // useEffect'teki return bloğu component Unmount olunca cagrılıyormus. onu test ettik
    const cleanupTheState = () => {
        console.log("state cleaned");
        setProducts([]);
    }

    if (loading) return (<LoadingSpinner message={'Catalog is Loading...'} />);
    if (!products) return (<NotFound />);
    return (
        <ProductList
            products={products}
        />
    );
}
