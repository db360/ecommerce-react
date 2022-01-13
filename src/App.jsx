import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';

// Components (importandolos todos a la vez, crear index.js en /components para imports)
import {Products, Navbar, Cart } from './components'


const App = () => {

    //Use State para guardar los fetch products
    const [products, setProducts] = useState([]);

    //State para el cart
    const [cart, setCart] = useState({});

    //Fetch Products
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    // Fetch Cart
    const fetchCart = async () => {

        setCart(await commerce.cart.retrieve());
    }

    //Call the function
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log(cart);

    // add items to cart
    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity)

        setCart(item.cart)
    }

    return (
        <div>
            <Navbar totalItems={cart.total_items} />
            {/* <Products products={products} onAddtoCart={handleAddToCart}/> */}
            <Cart cart={cart}/>
        </div>
    )
}

export default App
