describe("Customer Add a review function should work", () => {
  beforeEach(() => {
    // valid dummy credentials
    cy.visit("/home");
    cy.contains("Booking").should("exist").click({ force: true });
    cy.url().should("include", "/customer");
  });

  it("Should be able to add a review with valid data", () => {
    ////////////happy path ////////////////////
    {
      cy.get(".c-sidebar-nav-link")
        .contains("Add a review")
        .should("exist")
        .click({ force: true });
      cy.log("This should be the add a review page");
      cy.url().should("include", "/customer/add-a-review");
      cy.get(
        "#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div > form > span > label:nth-child(7)"
      )
        .should("exist")
        .click();
      cy.get("#review")
        .should("exist")
        .type("Test review for the testing purpose");
      cy.get("#recommendation")
        .should("exist")
        .type("Test recommendation for the testing purpose");
      cy.get(".btn").contains("Send").should("exist").click({ force: true });
      cy.get(".Toastify__toast--success").should("exist");
    }
  });

  it("Should be able to add a review without a recommondation", () => {
    ////////////another happy path ////////////////////
    {
      cy.get(".c-sidebar-nav-link")
        .contains("Add a review")
        .should("exist")
        .click({ force: true });
      cy.log("This should be the add a review page");
      cy.url().should("include", "/customer/add-a-review");
      cy.get(
        "#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div > form > span > label:nth-child(7)"
      )
        .should("exist")
        .click();
      cy.get("#review")
        .should("exist")
        .type("Test review for the testing purpose");
      cy.get("#recommendation").should("exist");
      cy.get(".btn").contains("Send").should("exist").click({ force: true });
      cy.get(".Toastify__toast--success").should("exist");
    }
  });

  it("Should not be able to add a review without a review", () => {
    ////////////another happy path ////////////////////
    {
      cy.get(".c-sidebar-nav-link")
        .contains("Add a review")
        .should("exist")
        .click({ force: true });
      cy.log("This should be the add a review page");
      cy.url().should("include", "/customer/add-a-review");
      cy.get(
        "#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div > form > span > label:nth-child(7)"
      )
        .should("exist")
        .click();
      cy.get("#review").should("exist");
      cy.get("#recommendation").should("exist");
      cy.get(".btn").contains("Send").should("exist").click({ force: true });
      cy.get(".Toastify__toast--success").should("not.exist");
    }
  });
});
