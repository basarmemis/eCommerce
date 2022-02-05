import { Grid } from '@mui/material';
import * as React from 'react';
import { Product } from '../../models/product';
import ProductCard from './ProductCard';

export interface Props {
    products: Product[];
}

export function ProductList({ products }: Props) {
    return (
        <Grid container rowSpacing={{ xs: 4, sm: 0, md: 0 }} columnSpacing={{ xs: 4, sm: 0, md: 0 }} columns={12}>
            {
                products.map(product =>
                    <Grid item xs={6} sm={4} md={3} xl={3} key={product.id}>
                        <ProductCard
                            product={product}
                        />
                    </Grid>
                )
            }
        </Grid>
    );
}
