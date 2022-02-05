import { Box, Grid, Typography } from '@mui/material';
import * as React from 'react';

export interface Props {
}

export default function GridExample() {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={{ xs: 1, sm: 0, md: 0 }} columnSpacing={{ xs: 1, sm: 0, md: 0 }} columns={12}>
                <Grid item xs={12}>
                    <div style={{ background: "orange" }}>
                        <Typography variant="h3" component="h3">
                            Test
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div style={{ background: "orange" }}>1</div>
                </Grid>
                <Grid item xs={6}>
                    <div style={{ background: "orange" }}>2</div>
                </Grid>
                <Grid item xs={6}>
                    <div style={{ background: "orange" }}>3</div>
                </Grid>
                <Grid item xs={6}>
                    <div style={{ background: "orange" }}>4</div>
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </Box>
    );
}
