import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import * as React from 'react';

export interface Props {
    message?: string;
}

export default function LoadingSpinner({ message = 'Loading...' }: Props) {
    return (
        <Backdrop open={true} invisible={true}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
                <CircularProgress
                    color='secondary'
                />
                <Typography variant='h4' sx={{ marginTop: '20px' }}>{message}</Typography>
            </Box>
        </Backdrop>
    );
}
