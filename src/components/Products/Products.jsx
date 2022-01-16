import React from "react";
import { Grid } from "@material-ui/core";

import Product from "./Product/Product";
import  useStyles from './styles';

// const products = [
//   { id: 1, name: "Shoes", description: "Running Shoes", price: "98€", image:'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c368aa69-428f-421f-a59a-cc6d1c83460d/af-1-1-mens-shoes-kcdPxn.png' },
//   {
//     id: 2,
//     name: "MacBook Pro",
//     description: "Apple Macbook Pro",
//     price: "1250€",
//     image:'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/2400/public/media/image/2021/11/macbook-pro-14-m1-pro-2538075.jpg?itok=kfA5PgNk'
//   },
// ];

const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();

  if (!products.length) return <p>Loading...</p>;


  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
