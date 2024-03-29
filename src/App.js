import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "../src/components/home/Home";
import Products from "../src/components/products/Products";
import ViewProduct from "../src/components/products/ViewProduct";
import ShoppingCart from "../src/components/products/shoppingCart";
import { ProductsStore } from "../src/components/products/ProductsContext";
import axios from "axios";
import ProductUtils from "../src/components/products/productUtils";
import SignUpPage from "../src/components/Login-Signup/SignUpPage";
import LoginPage from "../src/components/Login-Signup/LoginPage";
import { AuthProvider, useAuth } from "../src/components/contexts/AuthContext";
import PrivateRoute from "../src/components/Routes/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import Spinner from "../src/components/UI/Spinner";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import NavBar from "./components/Navigation/NavBar";
import BottomNavBar from "../src/components/Navigation/BottomNavBar";
import LogRocket from "logrocket";
import ErrorBoundary from "../src/components/Error-handling/ErrorBoundary/Errorboundary";

const InputFieldLazy = lazy(() =>
  import("../src/components/inputField/InputField")
);

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
  const cartCount = useSelector((store) => {
    return store.custom.cartCount;
  });
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      ProductUtils.getCart(user?.uid, updateCartItems);
    });

    LogRocket.init("46iseo/ecommerce-project");
    LogRocket.identify(user?.email, {
      name: user?.name,
      email: user?.email,

      // Add your own custom user variables here, ie:
      subscriptionType: "pro",
    });
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

  const updateCartCount = (payload) => {
    dispatch({
      type: "updateCartCount",
      payload: payload,
    });
  };

  // const getProducts = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       "https://api.escuelajs.co/api/v1/products"
  //     );
  //     let array = response.data.map((elem) => {
  //       return { ...elem, cart: 1 };
  //     });
  //     updateProducts(array);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //     setError(error);
  //   }
  // };

  return (
    <>
      <ErrorBoundary>
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
              cartCount,
              updateCartCount,
            }}
          >
            <div className="App">
              <NavBar />
              <BottomNavBar />
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/catagories/:id" element={<Products />} />
              <Route path="/product/:id" element={<ViewProduct />} />
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
              <Route path="*" element={<h2>404 Page Not Found</h2>}></Route>
            </Routes>
          </ProductsStore.Provider>
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
