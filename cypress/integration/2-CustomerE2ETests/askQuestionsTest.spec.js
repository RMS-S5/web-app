describe("Customer Ask Question function should work", () => {
  const customer_email = Cypress.env("customer_email");
  const customer_password = Cypress.env("customer_password");

  beforeEach(() => {
    // valid dummy credentials
    cy.visit("/home/login");
    cy.get("#email").should("exist").type(customer_email);
    cy.get("#password").should("exist").type(customer_password);
    cy.get(".btn").contains("Log In").should("exist").click({ force: true });
    cy.url().should("include", "/customer");
  });

  ////////////////////////////////////////// Under development ///////////////////////

  it("The 'Ask Questions' button in customer dashboard should navigate unauthenticated customer to the ask questions page ", () => {
    {
      cy.get(".c-sidebar-nav-link")
        .contains("Ask Questions")
        .should("exist")
        .click({ force: true });
      cy.log("This should be the ask questions page");
      cy.url().should("include", "/customer/ask-questions");
      cy.wait(3000);
      cy.get("iframe").get("#query").type("Hello");
      // cy.get("df-messenger").shadow().find("#widgetIcon").click();
    }
  });
});
