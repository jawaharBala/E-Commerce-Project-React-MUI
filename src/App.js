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

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getProducts();
    console.log("api");
  }, []);

  const updateCart = (action, product) => {
    let productInCart = cart.filter((prod) => {
      return prod.id === product.id;
    });
    if (productInCart.length > 0) {
      let newCart = cart.map((prod) => {
        if (prod.id === product.id) {
          return (prod = { ...prod, cart: prod.cart + product.cart });
        } else return prod;     
      });
      setCart([...newCart])
    } else {
      if (cart.length > 0) {
        if (action === "add") {
          setCart([...cart, product]);
        } else if (action==='remove') {
          let newCart = cart.filter((prod) => {
            return prod.id !== product.id;
          });
          setCart([...newCart]);
        }
      } else{
        setCart([product])
      }
    }
    console.log(cart)
  };

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
  const updateCount = (action, product, productContext,settermethod) => {
    if (action === "add" && productContext.length > 0) {
      let newProdArray = productContext?.map((prod) => {
        if (prod.id === product.id) {
          prod = { ...prod, cart: prod.cart + 1 };
          return prod;
        } else return prod;
      });

      settermethod([...newProdArray]);
    } else if (action === "minus") {
      let newProdArray = productContext.map((prod) => {
        if (prod.id === product.id && prod.cart > 0) {
          prod = { ...prod, cart: prod.cart - 1 };
          console.log("minus", prod.cart);
          return prod;
        } else return prod;
      });
      settermethod([...newProdArray]);
    }
  };

  return (
    <>
      <div className="App">
        <SearchAppBar />
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
                updateCount,
                loading: loading,
                error,
                updateCart
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
              value={{ products, setProducts, updateCount, cart, setCart ,updateCart}}
            >
              <ViewProduct />
            </ProductsStore.Provider>
          }
        />
        <Route path="/cart" element={<ProductsStore.Provider value={{cart,updateCount, setCart}}><ShoppingCart /></ProductsStore.Provider>} />
        <Route path="*" element={<h2>404 Not Found</h2>}></Route>
      </Routes>
    </>
  );
}

export default App;
