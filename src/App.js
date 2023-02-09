import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import InputField from "./components/inputField/InputField";
import SearchAppBar from "./components/header/Header";
import Products from "./components/products/Products";
import ViewProduct from "./components/products/ViewProduct";

function App() {
  return (
    <>
      <div className="App">
        <SearchAppBar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos/" element={<InputField />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ViewProduct />} />
        <Route path="*" element={<h2>404 Not Found</h2>}></Route>
      </Routes>
    </>
  );
}

export default App;
