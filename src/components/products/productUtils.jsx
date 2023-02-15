const productInCart =(product,cart)=> cart?.filter((prod) => {
    return prod.id === product.id;
  });

  const updateCart = (action, product,cart,setCart) => {
   
    if (productInCart(product,cart)?.length > 0) {
      if (action === "change") {
        let newCart = cart.map((prod) => {
          if (prod.id === product.id) {
            return (prod = { ...prod, cart: prod.cart + product.cart });
          } else return prod;
        });
        setCart([...newCart]);
      } else if (action === "remove") {
        let newCart = cart.filter((prod) => {
          return prod.id !== product.id;
        });
        setCart([...newCart]);
      }
    } else if (cart?.length>0 && action === 'change') {
      setCart([...cart, product]);
    } else if(action ==='change'){
        setCart([product])
    } 
  };

  const cartCount = (cart,setCount) => {
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
 const ProductUtils =  {
    productInCart,
    updateCart,
    updateCount,
    cartCount
    
};
export default ProductUtils;