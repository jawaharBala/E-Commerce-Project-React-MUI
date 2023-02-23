import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
// import InputField from "./components/inputField/InputField";
import SearchAppBar from "./components/header/Header";
import Products from "./components/products/Products";
import ViewProduct from "./components/products/ViewProduct";
import ShoppingCart from "./components/products/shoppingCart";
import { ProductsStore } from "./components/products/ProductsContext";
import axios from "axios";
import ProductUtils from "./components/products/productUtils";
import SignUpPage from "./components/Login-Signup/SignUpPage";
import LoginPage from "./components/Login-Signup/LoginPage";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import db from "./firebase";
import { AuthProvider, useAuth } from "./components/contexts/AuthContext";
import PrivateRoute from "./components/Routes/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import Spinner from "./components/UI/Spinner";
const InputFieldLazy = lazy(() => import("./components/inputField/InputField"));

function App() {
  const products = useSelector((store) => {
    return store.custom.products;
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const cart= useSelector((store) => {
    return store.custom.cart;
  });;
  const [count, setCount] = useState(0);
  const { user } = useAuth();
  const storedata = useSelector((store) => {
    return store.custom.count;
  });
  useEffect(() => {
    getProducts();
    if (user) {
      getCart();
    }
    console.log("store data", storedata);
  }, []);

 

const updateProducts= (payload)=>{
  dispatch({
    type:'updateProducts',
    payload:payload
  })
};

const updateCartItems= (payload)=>{
  dispatch({
    type:'updateCart',
    payload:payload
  });
};

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      let array = response.data.map((elem) => {
        return { ...elem, cart: 1 };
      });
      updateProducts( array);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  const getCart = async () => {
    // setLoadingCart(true);
    try {
      let response = await axios.get(
        "https://reacttodo-team-default-rtdb.firebaseio.com/" +
          user.uid +
          "-cart.json"
      );
      console.log("getcart", response);
      updateCartItems(response.data);
      // setLoadingCart(false);
    } catch (error) {
      console.log(error);
      // setLoadingCart(false);
    }
  };

  return (
    <>
      <AuthProvider>
        <div className="App">
          <SearchAppBar cartCount={ProductUtils.cartCount}  />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/todos/"
            element={
              <PrivateRoute>
                <Suspense fallback={<Spinner />}>
                  <InputFieldLazy />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route
            path="/products"
            element={
              <ProductsStore.Provider
                value={{
                  products,
                  updateProducts,
                  ProductUtils,
                  loading,
                  error,
                  cart,
                  updateCartItems,
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
                  updateProducts,
                  cart,
                  updateCartItems,
                  ProductUtils,
                }}
              >
                <ViewProduct />
              </ProductsStore.Provider>
            }
          />
          <Route
            path="/cart"
            element={
              <ProductsStore.Provider value={{ cart, ProductUtils, updateCartItems }}>
                <PrivateRoute>
                  <ShoppingCart />
                </PrivateRoute>
              </ProductsStore.Provider>
            }
          />
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="*" element={<h2>404 Not Found</h2>}></Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
