describe("Login tests Manager and Brach Manager", () => {
  beforeEach(() => {
    cy.visit("/home/login");
  });

  it(
    "Unregistered user should not be able to log into website",
    { scrollBehavior: false },
    () => {
      {
        cy.get("#email")
          .should("exist")
          .type("nuwan" + Math.floor(Math.random() * 1000) + "@gmail.com");
        cy.get("#password").should("exist").type("test1234");
        cy.get(".btn")
          .contains("Log In")
          .should("exist")
          .click({ force: true });
        cy.get(".Toastify__toast--error").should("exist");
        cy.url().should("not.include", "/customer");
        cy.go("back");
      }
    }
  );

  it("Registered branch manager should log into website and redirect to the correct dashboard", () => {
    {
      cy.get("#email").should("exist").type("testBManager@gmail.com");
      cy.get("#password").should("exist").type("test123");
      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/branch-manager");
      cy.go("back");
    }
  });
});
