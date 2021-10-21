describe("Login tests for Customer, Receptionist, Manager and Brach Manager", () => {
  beforeEach(() => {
    cy.visit("/home/login");
  });

  it("Registered customer should log into website and redirect to the correct dashboard", () => {
    {
      //   cy.get("#email")
      //     .should("exist")
      //         .type("nuwan" + Math.floor(Math.random() * 1000) + "@gmail.com");
      cy.get("#email").should("exist").type("nuwan@gmail.com");
      cy.get("#password").should("exist").type("test123");
      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/customer");
    }
  });
  it("Unregistered customer should not be able to log into website", () => {
    {
      cy.get("#email")
        .should("exist")
        .type("nuwan" + Math.floor(Math.random() * 1000) + "@gmail.com");
      cy.get("#password").should("exist").type("test1234");
      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.get(".Toastify__toast-body").should("exist");
      cy.url().should("not.include", "/customer");
    }
  });

  it("Registered manager should log into website and redirect to the correct dashboard", () => {
    {
      cy.get("#email").should("exist").type("testManager@gmail.com");
      cy.get("#password").should("exist").type("test123");
      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/manager");
    }
  });
  it("Registered branch manager should log into website and redirect to the correct dashboard", () => {
    {
      cy.get("#email").should("exist").type("testBManager@gmail.com");
      cy.get("#password").should("exist").type("test123");
      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/branch-manager");
    }
  });

  it("Registered receptioninst should log into website and redirect to the correct dashboard", () => {
    {
      cy.get("#email").should("exist").type("namal@gmail.com");
      cy.get("#password").should("exist").type("test123");
      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/receptionist");
    }
  });
});
