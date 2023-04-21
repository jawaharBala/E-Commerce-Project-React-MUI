import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { configureStore } from "@reduxjs/toolkit";
import { customReducer } from "../../StateManagement/Reducers";
import { Provider } from "react-redux";
import Store from "../../StateManagement/Store";
import { BrowserRouter } from "react-router-dom";
const initialState = {
  products: [],
  cart: [],
  isAuthenticated: false,
  cartCount: 0,
  totalPrice: 0,
};

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("App", () => {
  it("Take a picture", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Provider store={Store}>
          <NavBar />
        </Provider>
      </BrowserRouter>
    );
    expect(asFragment).toMatchSnapshot();
  });

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <BrowserRouter>
        <Provider store={Store}>
          <NavBar />
        </Provider>
      </BrowserRouter>
    );
  });

  it("renders Home button", () => {
    const moreProducts = screen.getByText(/home/i);
    expect(moreProducts).toBeInTheDocument();
  });
  it("click the login button",()=>{
    const loginButton =screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
    loginButton.click();
    
    
  })

  });

// const render = ( ui, {initialState, store = configureStore(customReducer, initialState), ...renderOptions} = {}) => {
//     const Wrapper = ({ children }) => {
//     return <Provider store={store}>{children}</Provider>
//     }
//     return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
//     };

// describe("Testing navBar", ()=>{
//    beforeEach(()=>{
//         // eslint-disable-next-line testing-library/no-render-in-setup
//         const contextValues = { cart:[],cartCount:0, updateCartCount:jest.fn()};
// 	jest.spyOn(ProductsStore, 'ProductsStore')
// 		.mockImplementation(() => contextValues);
// 	 const wrapper = shallow(<Provider store={Store}><ProductsStore.Provider value={{contextValues}}><NavBar/></ProductsStore.Provider></Provider>);
//        // eslint-disable-next-line testing-library/no-render-in-setup
//         render(<Provider store={Store}><ProductsStore.Provider value={{contextValues}}><NavBar/></ProductsStore.Provider></Provider>);
//     });

// });
