import axios from "axios";



const productInCart = (product, cart) =>
  cart?.filter((prod) => {
    return prod.id === product.id;
  });

const postCart = async (uid,cart, setCart) => {
  try {
   let response = await axios
      .put(
        "https://reacttodo-team-default-rtdb.firebaseio.com/"+uid+"-cart.json",
        JSON.stringify(cart)
      );
        setCart([...cart]);
  } catch (error) {
    console.log(error);
  }
};

const getCart = async(uid)=>{
  return await axios.get("https://reacttodo-team-default-rtdb.firebaseio.com/"+uid+"-cart.json");
}

const updateCart =async (action, product, cart, setCart,uid) => {
  if (productInCart(product, cart)?.length > 0) {
    if (action === "change") {
      let newCart = cart.map((prod) => {
        if (prod.id === product.id) {
          return (prod = { ...prod, cart: prod.cart + product.cart });
        } else return prod;
      });
    await  postCart(uid,[...newCart], setCart);
    } else if (action === "remove") {
      let newCart = cart.filter((prod) => {
        return prod.id !== product.id;
      });
    await  postCart(uid,[...newCart], setCart);
    } else if (action === "minus") {
      let newCart = cart.map((prod) => {
        if (prod.id === product.id) {
          return (prod = { ...prod, cart: prod.cart - 1 });
        } else return prod;
      });
      await postCart(uid,[...newCart], setCart);
    } else if (action === "add") {
      let newCart = cart.map((prod) => {
        if (prod.id === product.id) {
          return (prod = { ...prod, cart: prod.cart + 1 });
        } else return prod;
      });
      await  postCart(uid,[...newCart], setCart);
    }
  } else if (cart?.length > 0 && action === "change") {
    await postCart(uid,[...cart, product], setCart);
  } else if (action === "change") {
    await postCart(uid,[product], setCart);
  }
};

const cartCount = (cart, setCount) => {
  let cartCounter = [];
  if (cart && cart?.length > 0) {
    cartCounter = cart
      .map((item) => {
        return item.cart;
      })
      .reduce((accumlator, currentValue) => {
        return accumlator + currentValue;
      });
    setCount(cartCounter);
  } else return setCount(0);
};

const updateCount = (action, product, productContext, settermethod) => {
  if (action === "add" && productContext?.length > 0) {
    let newProdArray = productContext?.map((prod) => {
      if (prod.id === product.id) {
        prod = { ...prod, cart: prod.cart + 1 };
        return prod;
      } else return prod;
    });

    settermethod([...newProdArray]);
  } else if (action === "minus") {
    let newProdArray = productContext?.map((prod) => {
      if (prod.id === product.id && prod.cart > 1) {
        prod = { ...prod, cart: prod.cart - 1 };
        console.log("minus", prod.cart);
        return prod;
      } else return prod;
    });
    settermethod([...newProdArray]);
  }
};

const ProductUtils = {
  productInCart,
  updateCart,
  updateCount,
  cartCount,
  postCart,
  getCart
};
export default ProductUtils;
