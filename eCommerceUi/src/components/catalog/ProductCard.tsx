import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../api/agent";
import { useStoreContext } from "../../context/StoreContext";
import { Product } from "../../models/product";

export interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const [loading, setLoading] = useState(false);
    const { setBasket } = useStoreContext();

    const handleAddItem = (productId: string) => {
        setLoading(true);
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }



    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ backgroundColor: "secondary.main" }}>
                        {product.name.toUpperCase().charAt(0)}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: 'primary.main' }
                }}
            />
            <CardMedia
                sx={{ height: 140, objectFit: 'contain', backgroundColor: "primary.light" }}
                component="img"
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography color={"secondary"} gutterBottom variant="h5">
                    ${(product.price! / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton
                    size="small"
                    onClick={() => handleAddItem(product.id!)}
                    loading={loading}
                >
                    Add to Cart
                </LoadingButton>
                <Button
                    component={Link}
                    to={`/catalog/${product.id}`}
                    size="small"
                >View</Button>
            </CardActions>
        </Card >
    );
}
