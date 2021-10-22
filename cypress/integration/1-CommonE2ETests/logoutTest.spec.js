describe("Testing logout function for Customer, Receptionist, Manager and Brach Manager", () => {
  beforeEach(() => {
    // valid dummy credentials
    cy.visit("/home/login");
  });

  const customer_email = Cypress.env("customer_email");
  const customer_password = Cypress.env("customer_password");
  const manager_email = Cypress.env("manager_email");
  const manager_password = Cypress.env("manager_password");
  const bmanager_email = Cypress.env("bmanager_email");
  const bmanager_password = Cypress.env("bmanager_password");
  const receptionist_email = Cypress.env("receptionist_email");
  const receptionist_password = Cypress.env("receptionist_password");

  //   it("Customer should be able to logout from the website, after could not go to registered dashboard", () => {
  //     {
  //       cy.get("#email").should("exist").type(customer_email);
  //       cy.get("#password").should("exist").type(customer_password);
  //       cy.get(".btn").contains("Log In").should("exist").click({ force: true });
  //       cy.url().should("include", "/customer");
  //       cy.contains(customer_email).should("exist").click({ force: true });
  //       cy.contains("Logout").should("exist").click({ force: true });

  //       cy.url().should("include", "/home");
  //       cy.contains("Booking").click({ force: true });
  //       cy.log(
  //         "This should be the customer dashboard but there is not authenticated elements"
  //       );
  //       cy.url().should("include", "/customer/check-availability");
  //       cy.get(".c-sidebar-nav-link")
  //         .contains("Previous Bookings")
  //         .should("not.exist");
  //       cy.get(".c-sidebar-nav-link")
  //         .contains("Report a problem")
  //         .should("not.exist");
  //     }
  //   });

  //   it("Manager should be able to logout from the website, then could not go to registered dashboard", () => {
  //     {
  //       cy.get("#email").should("exist").type(manager_email);
  //       cy.get("#password").should("exist").type(manager_password);
  //       cy.get(".btn").contains("Log In").should("exist").click({ force: true });
  //       cy.url().should("include", "/manager");
  //       cy.contains(manager_email).should("exist").click({ force: true });
  //       cy.contains("Logout").should("exist").click({ force: true });

  //       cy.url().should("include", "/home");
  //       cy.visit("/manager");
  //       cy.url().should("include", "/home/login");
  //     }
  //   });

  it("Branch Manager should be able to logout from the website, then could not go to registered dashboard", () => {
    {
      cy.get("#email").should("exist").type(bmanager_email);
      cy.get("#password").should("exist").type(bmanager_password);
      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/branch-manager");
      cy.contains(bmanager_email).should("exist").click({ force: true });
      cy.contains("Logout").should("exist").click({ force: true });

      cy.url().should("include", "/home");
      cy.visit("/branch-manager");
      cy.url().should("include", "/home/login");
    }
  });

  it("Receptionist should be able to logout from the website, then could not go to registered dashboard", () => {
    {
      cy.get("#email").should("exist").type(receptionist_email);
      cy.get("#password").should("exist").type(receptionist_password);
      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/receptionist");
      cy.contains(receptionist_email).should("exist").click({ force: true });
      cy.contains("Logout").should("exist").click({ force: true });

      cy.url().should("include", "/home");
      cy.visit("/manager");
      cy.url().should("include", "/home/login");
    }
  });
});
