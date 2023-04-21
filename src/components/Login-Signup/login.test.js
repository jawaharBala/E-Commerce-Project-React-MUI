import { render, screen } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { BrowserRouter } from "react-router-dom";



describe("testing login page",()=>{
    beforeEach(()=>{
        render(<BrowserRouter><LoginPage/></BrowserRouter>)
    })
    it("fill the field",()=>{
        const email = screen.getByTitle("email");
        const password = screen.getByTitle("password");
        expect(email && password).toBeInTheDocument();
    })
    it("click the sign in button",()=>{
        const signinButton = screen.getByTitle("login");
        expect(signinButton).not.toBeDisabled();
        signinButton.click();
        
      });
})