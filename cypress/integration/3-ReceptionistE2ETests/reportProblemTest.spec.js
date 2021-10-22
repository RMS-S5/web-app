describe("Receptionist should be able report a problem", () => {
  const receptionist_email = Cypress.env("receptionist_email");
  const receptionist_password = Cypress.env("receptionist_password");

  beforeEach(() => {
    // valid dummy credentials
    cy.visit("/home/login");
    cy.get("#email").should("exist").type(receptionist_email);
    cy.get("#password").should("exist").type(receptionist_password);
    cy.get(".btn").contains("Log In").should("exist").click({ force: true });
    cy.url().should("include", "/receptionist");
  });

  it("Receptionist should be able to upload reports with a report", () => {
    {
      cy.get(".c-sidebar-nav-link")
        .contains("Report a problem")
        .should("exist")
        .click({ force: true });
      cy.log("This should be the report a problem page");
      cy.url().should("include", "/receptionist/report-a-problem");
      cy.wait(1500);
      cy.get("#report")
        .should("exist")
        .type("This is question is for the testing purpose");
      cy.get(".btn").contains("Send").should("exist").click({ force: true });
      cy.get(".Toastify__toast--success").should("exist");
    }
  });

  it("Receptionist should not be able to upload reports with a report", () => {
    {
      cy.get(".c-sidebar-nav-link")
        .contains("Report a problem")
        .should("exist")
        .click({ force: true });
      cy.log("This should be the report a problem page");
      cy.url().should("include", "/receptionist/report-a-problem");
      cy.wait(1500);
      cy.get("#report").should("exist");
      cy.get(".btn").contains("Send").should("exist").click({ force: true });
      cy.get(".Toastify__toast--success").should("not.exist");
    }
  });
});
