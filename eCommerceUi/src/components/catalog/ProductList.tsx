import { Grid } from '@mui/material';
import * as React from 'react';
import { Product } from '../../models/product';
import { useAppSelector } from '../../store/configureStore';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

export interface Props {
    products: Product[];
}

export function ProductList({ products }: Props) {
    const { productsLoaded } = useAppSelector(state => state.catalog);
    return (
        <Grid container rowSpacing={{ xs: 4, sm: 0, md: 0 }} columnSpacing={{ xs: 4, sm: 0, md: 0 }} columns={12}>
            {
                products.map(product =>
                    <Grid item xs={12} sm={6} md={4} xl={3} key={product.id}>
                        {!productsLoaded ? (
                            <ProductCardSkeleton />
                        ) : (
                            <ProductCard
                                product={product}
                            />
                        )}
                    </Grid>
                )
            }
        </Grid>
    );
}
