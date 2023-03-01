import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
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
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
const InputFieldLazy = lazy(() => import("./components/inputField/InputField"));

function App() {
  const products = useSelector((store) => {
    return store.custom.products;
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const cart = useSelector((store) => {
    return store.custom.cart;
  });
  const { user } = useAuth();

  useEffect(() => {
    getProducts();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      ProductUtils.getCart(user?.uid, updateCartItems);
    });

    console.log("app.js-useEffect", cart, "user", user);
  }, [user?.uid]);

  const updateProducts = (payload) => {
    dispatch({
      type: "updateProducts",
      payload: payload,
    });
  };

  const updateCartItems = (payload) => {
    dispatch({
      type: "updateCart",
      payload: payload,
    });
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.escuelajs.co/api/v1/products");
      let array = response.data.map((elem) => {
        return { ...elem, cart: 1 };
      });
      updateProducts(array);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  return (
    <>
      <AuthProvider>
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
        <div className="App">
          <SearchAppBar />
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
          <Route path="/home"  element={<Home />} />
          <Route
            path="/catagories/:id"
            element={            
                <Products />            
            }
          />
          <Route
            path="/product/:id"
            element={
                <ViewProduct />
            }
          />
          <Route
            path="/cart"
            element={
                <PrivateRoute>
                  <ShoppingCart />
                </PrivateRoute>
            }
          />
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="*" element={<h2>404 Not Found</h2>}></Route>
        </Routes>
        </ProductsStore.Provider>
      </AuthProvider>
    </>
  );
}

export default App;
