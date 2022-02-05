import { Button, Container, Divider, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <Container component={Paper} sx={{ height: 400 }}>
            <Typography gutterBottom variant='h3'>Oops - we could not find what you are looking for.</Typography>
            <Divider></Divider>
            <Button fullWidth onClick={() => navigate(-1)}>Go Back</Button>
        </Container>
    );
}
