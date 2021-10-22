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
  const getIframeDocument = () => {
    return (
      cy
        .get('iframe[data-cy="dialogflowFrame"]')
        // Cypress yields jQuery element, which has the real
        // DOM element under property "0".
        // From the real DOM iframe element we can get
        // the "document" element, it is stored in "contentDocument" property
        // Cypress "its" command can access deep properties using dot notation
        // https://on.cypress.io/its
        .its("0.contentDocument")
        .should("exist")
    );
  };

  const getIframeBody = () => {
    // get the document
    return (
      getIframeDocument()
        // automatically retries until body is loaded
        .its("body")
        .should("not.be.undefined")
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        .then(cy.wrap)
    );
  };

  it("Customer should be able to ask questions and they should recieve a response ", () => {
    {
      cy.get(".c-sidebar-nav-link")
        .contains("Ask Questions")
        .should("exist")
        .click({ force: true });
      cy.log("This should be the ask questions page");
      cy.url().should("include", "/customer/ask-questions");
      cy.wait(3000);
      //   cy.get('[data-cy="dialogflowFrame"]')
      //     .should("exist")
      //     .get("#query")
      //     .type("Hello");
      //getIframeBody().find("#query").type("Hello");
      cy.get('[data-cy="dialogflowFrame"]')
        .should("exist")
        .then(function ($ele) {
          var iframe = $ele.contents().find("#query");
          cy.wrap(iframe).type("Hello{enter}");
          var response = $ele.contents().find("#result");
          cy.wrap(response).should("exist");
        });

      //getIframeBody().find('#result').should('include.text', '"delectus aut autem"')
      // cy.get("df-messenger").shadow().find("#widgetIcon").click();
    }
  });
});
