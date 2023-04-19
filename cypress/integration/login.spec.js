Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("test login page", () => {
    // afterEach("clear",()=>{
    //     cy.clearCookies();
    // });

  it("visit login page", () => {
    cy.visit("localhost:3000/login");
    cy.get("#email").type("jawaharbjkk@gmail.com").type("{enter}");
    cy.get("#password").type("123456");
    cy.contains("Sign In").click();
    cy.contains("More products").click();
  });
});
