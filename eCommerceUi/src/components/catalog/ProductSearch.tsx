import { TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/configureStore'
import { setProductParams } from './catalogSlice';

function ProductSearch() {
    const { productParams } = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const lastTypeTime = useRef(performance.now());

    const dispatch = useAppDispatch();

    //Arama kısmına harf yazıldıktan bir süre sonra arama yapması için.
    function initiateSearch(event: any) {
        setTimeout(function () {
            if ((performance.now() - lastTypeTime.current) > 1000) {
                dispatch(setProductParams({ searchTerm: event.target.value }))
            }
        }, 1000);
    }
    return (
        <TextField
            label='Search products'
            variant="outlined"
            fullWidth
            value={searchTerm || ''}
            onChange={(event: any) => {
                lastTypeTime.current = performance.now();
                setSearchTerm(event.target.value);
                initiateSearch(event);
            }}
        />
    )
}


export default ProductSearch