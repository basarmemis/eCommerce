import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function ServerError() {

    const location = useLocation();
    const state = location.state as any;
    const navigate = useNavigate();

    return (
        <Container component={Paper}>
            {state?.error ? (
                <>
                    <Typography variant='h3' color='error' gutterBottom>{state.error.title}</Typography>
                    <Divider />
                    <Typography>{state.error.detail || 'Internal server error'}</Typography>
                </>
            ) :
                (<Typography variant='h5' gutterBottom>Server error</Typography>)
            }
            <Button onClick={() => navigate(-1)}>Go Back</Button>
        </Container>
    );
}
