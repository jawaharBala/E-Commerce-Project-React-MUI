import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import InputField from "./components/inputField/InputField";
import SearchAppBar from "./components/header/Header";
import Products from "./components/products/Products";
import ViewProduct from "./components/products/ViewProduct";
import ShoppingCart from "./components/products/shoppingCart";
import { ProductsStore } from "./components/products/ProductsContext";
import axios from "axios";
import ProductUtils from "./components/products/productUtils";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getProducts();
    getCart();
    console.log("api");
  }, []);

  useEffect(() => {
    ProductUtils.cartCount(cart,setCount);
    postCart(cart);
  }, [cart]);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setLoading(false);
      setProducts(
        response.data.map((elem) => {
          return { ...elem, cart: 1 };
        })
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  const postCart = async (cart) => {
    try {
      await axios
        .put(
          "https://reacttodo-team-default-rtdb.firebaseio.com/cart.json",
          JSON.stringify(cart)
        )
        .then((response) => console.log("put", response.data,'cart',cart));
    } catch (error) {
      console.log(error);
    }
  };

  const getCart= async () => {
    try {
      await axios
        .get(
          "https://reacttodo-team-default-rtdb.firebaseio.com/cart.json"
        )
        .then((response) => {
          console.log("getcart", response.data);
          setCart(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="App">
        <SearchAppBar count={count} />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos/" element={<InputField />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/products"
          element={
            <ProductsStore.Provider
              value={{
                products,
                setProducts,
                ProductUtils,
                loading: loading,
                error,
                cart,
                setCart
              }}
            >
              <Products />
            </ProductsStore.Provider>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProductsStore.Provider
              value={{
                products,
                setProducts,
                cart,
                setCart,
                ProductUtils
              }}
            >
              <ViewProduct />
            </ProductsStore.Provider>
          }
        />
        <Route
          path="/cart"
          element={
            <ProductsStore.Provider value={{ cart, ProductUtils, setCart }}>
              <ShoppingCart />
            </ProductsStore.Provider>
          }
        />
        <Route path="*" element={<h2>404 Not Found</h2>}></Route>
      </Routes>
    </>
  );
}

export default App;
