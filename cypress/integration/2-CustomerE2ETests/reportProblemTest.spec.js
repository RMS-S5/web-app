describe("Customer should be able report a problem", () => {
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

  it("Customer should be able to upload reports with a report", () => {
    {
      cy.get(".c-sidebar-nav-link")
        .contains("Report a problem")
        .should("exist")
        .click({ force: true });
      cy.log("This should be the report a problem page");
      cy.url().should("include", "/customer/report-a-problem");
      cy.wait(1500);
      cy.get("#report")
        .should("exist")
        .type("This is question is for the testing purpose");
      cy.get(".btn").contains("Send").should("exist").click({ force: true });
      cy.get(".Toastify__toast--success").should("exist");
    }
  });

  it("Customer should not be able to upload reports with a report", () => {
    {
      cy.get(".c-sidebar-nav-link")
        .contains("Report a problem")
        .should("exist")
        .click({ force: true });
      cy.log("This should be the report a problem page");
      cy.url().should("include", "/customer/report-a-problem");
      cy.wait(1500);
      cy.get("#report").should("exist");
      cy.get(".btn").contains("Send").should("exist").click({ force: true });
      cy.get(".Toastify__toast--success").should("not.exist");
    }
  });
});
