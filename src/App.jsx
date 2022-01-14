import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components (importandolos todos a la vez, crear index.js en /components para imports)
import { Products, Navbar, Cart } from "./components";
import { set } from "react-hook-form";

const App = () => {
  //Use State para guardar los fetch products
  const [products, setProducts] = useState([]);

  //State para el cart
  const [cart, setCart] = useState({});

  //Fetch Products
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  // Fetch Cart
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  //Call the function
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // console.log(cart);

  // add items to cart
  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  return (
    <>
      <Router>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Products products={products} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
