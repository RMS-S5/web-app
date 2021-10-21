describe("Registration tests for Customer, Receptionist, Manager and Brach Manager", () => {
  beforeEach(() => {
    cy.visit("/home");
  });

  it("Should register an unregistered customer with valid details", () => {
    {
      cy.contains("Register").should("exist").click({ force: true });
      cy.log(
        "This is customer registration page to check customer registration"
      );
      cy.get("#first_name").should("exist").type("test");
      cy.get("#last_name").should("exist").type("cypress");
      cy.get("#mobile").should("exist").type("0784695571");
      cy.get("#email")
        .should("exist")
        .type("nuwan" + Math.floor(Math.random() * 1000) + "@gmail.com");
      cy.get("#password").should("exist").type("test123");
      cy.get("#confirmPassword").should("exist").type("test123");
      cy.contains("Create Account").should("exist").click({ force: true });
      cy.url().should("include", "/home/login");
    }
  });

  it("Should not register a registered customer", () => {
    {
      cy.contains("Register").should("exist").click({ force: true });
      cy.log(
        "This is customer registration page to check customer registration"
      );
      cy.get("#first_name").should("exist").type("test");
      cy.get("#last_name").should("exist").type("cypress");
      cy.get("#mobile").should("exist").type("0784695571");
      cy.get("#email").should("exist").type("nuwan@gmail.com");
      cy.get("#password").should("exist").type("test123");
      cy.get("#confirmPassword").should("exist").type("test123");
      cy.contains("Create Account").should("exist").click({ force: true });
      cy.get(".Toastify__toast-body").should("exist");
      cy.url().should("include", "/home/register");
    }
  });

  it("Should not register a registered customer", () => {
    {
      cy.contains("Register").should("exist").click({ force: true });
      cy.log(
        "This is customer registration page to check customer registration"
      );
      cy.get("#first_name").should("exist").type("test");
      cy.get("#last_name").should("exist").type("cypress");
      cy.get("#mobile").should("exist").type("0784695571");
      cy.get("#email").should("exist").type("nuwan@gmail.com");
      cy.get("#password").should("exist").type("test123");
      cy.get("#confirmPassword").should("exist").type("test123");
      cy.contains("Create Account").should("exist").click({ force: true });
      cy.get(".Toastify__toast-body").should("exist");
      cy.url().should("include", "/home/register");
    }
  });

  it("Should not register a registered manager", () => {
    {
      cy.contains("Register").should("exist").click({ force: true });
      cy.log(
        "This is customer registration page to check customer registration"
      );
      cy.get("#first_name").should("exist").type("test");
      cy.get("#last_name").should("exist").type("cypress");
      cy.get("#mobile").should("exist").type("0784695571");
      cy.get("#email").should("exist").type("testManager@gmail.com");
      cy.get("#password").should("exist").type("test123");
      cy.get("#confirmPassword").should("exist").type("test123");
      cy.contains("Create Account").should("exist").click({ force: true });
      cy.get(".Toastify__toast-body").should("exist");
      cy.url().should("include", "/home/register");
    }
  });

  it("Should not register a registered branch manager", () => {
    {
      cy.contains("Register").should("exist").click({ force: true });
      cy.log(
        "This is customer registration page to check customer registration"
      );
      cy.get("#first_name").should("exist").type("test");
      cy.get("#last_name").should("exist").type("cypress");
      cy.get("#mobile").should("exist").type("0784695571");
      cy.get("#email").should("exist").type("testBManager@gmail.com");
      cy.get("#password").should("exist").type("test123");
      cy.get("#confirmPassword").should("exist").type("test123");
      cy.contains("Create Account").should("exist").click({ force: true });
      cy.get(".Toastify__toast-body").should("exist");
      cy.url().should("include", "/home/register");
    }
  });

  it("Should not register a registered receptionist", () => {
    {
      cy.contains("Register").should("exist").click({ force: true });
      cy.log(
        "This is customer registration page to check customer registration"
      );
      cy.get("#first_name").should("exist").type("test");
      cy.get("#last_name").should("exist").type("cypress");
      cy.get("#mobile").should("exist").type("0784695571");
      cy.get("#email").should("exist").type("namal@gmail.com");
      cy.get("#password").should("exist").type("test123");
      cy.get("#confirmPassword").should("exist").type("test123");
      cy.contains("Create Account").should("exist").click({ force: true });
      cy.get(".Toastify__toast-body").should("exist");
      cy.url().should("include", "/home/register");
    }
  });
});
