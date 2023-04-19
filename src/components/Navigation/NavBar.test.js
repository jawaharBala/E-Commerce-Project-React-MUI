import { render} from "@testing-library/react";
import NavBar from "./NavBar";
import { configureStore } from "@reduxjs/toolkit";
import { customReducer } from "../../StateManagement/Reducers";
import { Provider } from "react-redux";
import Store from "../../StateManagement/Store";
import { ProductsStore } from "../products/ProductsContext";
import { shallow } from "enzyme";
import { useContext } from "react";
const initialState = {
    products: [],
    cart: [],
    isAuthenticated: false,
    cartCount:0,
    totalPrice:0
  };


// const render = ( ui, {initialState, store = configureStore(customReducer, initialState), ...renderOptions} = {}) => {
//     const Wrapper = ({ children }) => {
//     return <Provider store={store}>{children}</Provider>
//     }
//     return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
//     };

 
describe("Testing navBar", ()=>{
    beforeEach(()=>{
        // eslint-disable-next-line testing-library/no-render-in-setup
        const contextValues = { cart:[],cartCount:0, updateCartCount:jest.fn()};
	// jest.spyOn(ProductsStore, 'ProductsStore')
	// 		.mockImplementation(() => contextValues);
	// const wrapper = shallow(<Provider store={Store}><ProductsStore.Provider value={{contextValues}}><NavBar/></ProductsStore.Provider></Provider>);
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<Provider store={Store}><ProductsStore.Provider value={{contextValues}}><NavBar/></ProductsStore.Provider></Provider>);
    });

    it("Take a picture", () => {
        const {asFragment} = render(<Provider store={Store}><NavBar/></Provider>)
        expect(asFragment).toMatchSnapshot();
      });
});