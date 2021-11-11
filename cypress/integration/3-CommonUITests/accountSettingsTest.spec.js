describe("Account Setting tests for Customer, Receptionist, Manager and Brach Manager", () => {
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

  it("Registered customer should see his email in the dashboard", () => {
    {
      cy.get("#email").should("exist").type(customer_email);
      cy.get("#password").should("exist").type(customer_password);
      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/customer");
      cy.get(".c-header-nav-link.nav-link")
        .contains(customer_email)
        .should("exist");
    }
  });

  it("Unregistered customer should not see an email in the dashboard", () => {
    {
      cy.visit("/home");
      cy.contains("Booking").should("exist").click({ force: true });
      cy.log("This should be the new bookings page");
      cy.url().should("include", "/customer/check-availability");
      cy.get(".c-header-nav-link.nav-link")
        .contains(customer_email)
        .should("not.exist");
    }
  });

  it("Registered manager should see his email in the dashboard", () => {
    {
      cy.get("#email").should("exist").type(manager_email);
      cy.get("#password").should("exist").type(manager_password);
      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/manager");
      cy.get(".c-header-nav-link.nav-link")
        .contains(manager_email)
        .should("exist");
    }
  });

  it("Registered branch manager should see his email in the dashboard", () => {
    {
      cy.get("#email").should("exist").type(bmanager_email);
      cy.get("#password").should("exist").type(bmanager_password);
      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/branch-manager");
      cy.get(".c-header-nav-link.nav-link")
        .contains(bmanager_email)
        .should("exist");
    }
  });

  it("Registered receptionist should see his email in the dashboard", () => {
    {
      cy.get("#email").should("exist").type(receptionist_email);
      cy.get("#password").should("exist").type(receptionist_password);
      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/receptionist");
      cy.get(".c-header-nav-link.nav-link")
        .contains(receptionist_email)
        .should("exist");
    }
  });

  const newAccountName = "NUWAN";
  let newAccountLastName = "ABEYNAYAKE";
  let newAccountMobile = "0775125652";

  it("Customer should be able to change account data", () => {
    {
      cy.get("#email").should("exist").type(customer_email);
      cy.get("#password").should("exist").type(customer_password);
      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/customer");
      cy.get(
        "#root > div.c-app.c-default-layout > div.c-wrapper > header > ul:nth-child(6) > li > a"
      )
        .should("exist")
        .click({ force: true });
      cy.get(
        "#root > div.c-app.c-default-layout > div.c-wrapper > header > ul:nth-child(6) > li > div > a:nth-child(3)"
      )
        .should("exist")
        .click({ force: true });
      cy.get(
        "#root > div.c-app.c-default-layout > div.c-wrapper > header > ul:nth-child(6) > li > div > a:nth-child(3)"
      )
        .should("exist")
        .click({ force: true });
      cy.get(".btn").contains("Edit").should("exist").click({ force: true });

      cy.get("#firstName").should("exist").clear().type(newAccountName);
      cy.get("#lastName").should("exist").clear().type(newAccountLastName);
      cy.get("#mobileNumber").should("exist").clear().type(newAccountMobile);

      cy.contains("Save").should("exist").click({ force: true });

      cy.url().should("include", "/customer/profile");

      cy.get("#first_name").should("have.attr", "value", newAccountName);
      cy.get("#last_name").should("have.attr", "value", newAccountLastName);
      cy.get("#mobile").should("have.attr", "value", newAccountMobile);

      /// Change account data again
      cy.get(".btn").contains("Edit").should("exist").click({ force: true });

      cy.get("#firstName").should("exist").clear().type("nuwan");
      cy.get("#lastName").should("exist").clear().type("abeynayake");
      cy.get("#mobileNumber").should("exist").clear().type("0784695571");

      cy.contains("Save").should("exist").click({ force: true });
    }
  });

  it("Manager should be able to change account data", () => {
    {
      cy.get("#email").should("exist").type(manager_email);
      cy.get("#password").should("exist").type(manager_password);
      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/manager");
      cy.contains(manager_email).should("exist").click({ force: true });
      cy.contains("Profile").should("exist").click({ force: true });

      cy.get(".btn").contains("Edit").should("exist").click({ force: true });

      cy.get("#firstName").should("exist").clear().type(newAccountName);
      cy.get("#lastName").should("exist").clear().type(newAccountLastName);
      cy.get("#mobileNumber").should("exist").clear().type(newAccountMobile);

      cy.contains("Save").should("exist").click({ force: true });

      cy.url().should("include", "/manager/profile");

      cy.get("#first_name").should("have.attr", "value", newAccountName);
      cy.get("#last_name").should("have.attr", "value", newAccountLastName);
      // cy.get("#mobile").should("have.attr", "value", newAccountMobile);

      /// Change account data again
      cy.get(".btn").contains("Edit").should("exist").click({ force: true });

      cy.get("#firstName").should("exist").clear().type("test");
      cy.get("#lastName").should("exist").clear().type("Manager");
      cy.get("#mobileNumber").should("exist").clear().type("0784695571");

      cy.contains("Save").should("exist").click({ force: true });
    }
  });
  it("Branch Manager should be able to change account data", () => {
    {
      cy.get("#email").should("exist").type(bmanager_email);
      cy.get("#password").should("exist").type(bmanager_password);
      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/branch-manager");
      cy.contains(bmanager_email).should("exist").click({ force: true });
      cy.contains("Profile").should("exist").click({ force: true });

      cy.get(".btn").contains("Edit").should("exist").click({ force: true });

      cy.get("#firstName").should("exist").clear().type(newAccountName);
      cy.get("#lastName").should("exist").clear().type(newAccountLastName);
      cy.get("#mobileNumber").should("exist").clear().type(newAccountMobile);

      cy.contains("Save").should("exist").click({ force: true });

      cy.url().should("include", "/branch-manager/profile");

      cy.get("#first_name").should("have.attr", "value", newAccountName);
      cy.get("#last_name").should("have.attr", "value", newAccountLastName);
      //cy.get("#mobile").should("have.attr", "value", newAccountMobile);

      /// Change account data again
      cy.get(".btn").contains("Edit").should("exist").click({ force: true });

      cy.get("#firstName").should("exist").clear().type("test");
      cy.get("#lastName").should("exist").clear().type("BManager");
      cy.get("#mobileNumber").should("exist").clear().type("0784695571");

      cy.contains("Save").should("exist").click({ force: true });
    }
  });

  it("Receptionist should be able to change account data", () => {
    {
      cy.get("#email").should("exist").type(receptionist_email);
      cy.get("#password").should("exist").type(receptionist_password);
      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/receptionist");
      cy.contains(receptionist_email).should("exist").click({ force: true });
      cy.contains("Profile").should("exist").click({ force: true });

      cy.get(".btn").contains("Edit").should("exist").click({ force: true });

      cy.get("#firstName").should("exist").clear().type(newAccountName);
      cy.get("#lastName").should("exist").clear().type(newAccountLastName);
      cy.get("#mobileNumber").should("exist").clear().type(newAccountMobile);

      cy.contains("Save").should("exist").click({ force: true });

      cy.url().should("include", "/receptionist/profile");

      cy.get("#first_name").should("have.attr", "value", newAccountName);
      cy.get("#last_name").should("have.attr", "value", newAccountLastName);
      //cy.get("#mobile").should("have.attr", "value", newAccountMobile);

      /// Change account data again
      cy.get(".btn").contains("Edit").should("exist").click({ force: true });

      cy.get("#firstName").should("exist").clear().type("namal");
      cy.get("#lastName").should("exist").clear().type("Wickramasinghe");
      cy.get("#mobileNumber").should("exist").clear().type("0784695571");

      cy.contains("Save").should("exist").click({ force: true });
    }
  });

  const newPassword = "test122"; ///////////////////////////////////// Change Password /////////////////////////////////////////////////////////////

  it("Customer should be able to change password after login", () => {
    {
      cy.get("#email").should("exist").type(customer_email);
      cy.get("#password").should("exist").type(customer_password);

      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/customer");
      cy.contains(customer_email).should("exist").click({ force: true });
      cy.contains("Profile").should("exist").click({ force: true });

      cy.get(".btn")
        .contains("Change Password")
        .should("exist")
        .click({ force: true });

      cy.get("#currentPassword")
        .should("exist")
        .clear()
        .type(customer_password);
      cy.get("#password").should("exist").clear().type(newPassword);
      cy.get("#repeatNewPassword").should("exist").clear().type(newPassword);

      cy.get(".btn").contains("Change").should("exist").click({ force: true });

      cy.get(".Toastify__toast--success").should("exist");
      cy.url().should("include", "/customer/profile");

      /// Change password again
      cy.get(".btn")
        .contains("Change Password")
        .should("exist")
        .click({ force: true });

      cy.get("#currentPassword").should("exist").clear().type(newPassword);
      cy.get("#password").should("exist").clear().type(customer_password);
      cy.get("#repeatNewPassword")
        .should("exist")
        .clear()
        .type(customer_password);

      cy.get(".btn").contains("Change").should("exist").click({ force: true });
    }
  });

  it("Manger should be able to change password after login", () => {
    {
      cy.get("#email").should("exist").type(manager_email);
      cy.get("#password").should("exist").type(manager_password);

      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/manager");
      cy.contains(manager_email).should("exist").click({ force: true });
      cy.contains("Profile").should("exist").click({ force: true });

      cy.get(".btn")
        .contains("Change Password")
        .should("exist")
        .click({ force: true });

      cy.get("#currentPassword").should("exist").clear().type(manager_password);
      cy.get("#password").should("exist").clear().type(newPassword);
      cy.get("#repeatNewPassword").should("exist").clear().type(newPassword);

      cy.get(".btn").contains("Change").should("exist").click({ force: true });

      cy.get(".Toastify__toast--success").should("exist");
      cy.url().should("include", "/manager/profile");

      /// Change password again
      cy.get(".btn")
        .contains("Change Password")
        .should("exist")
        .click({ force: true });

      cy.get("#currentPassword").should("exist").clear().type(newPassword);
      cy.get("#password").should("exist").clear().type(manager_password);
      cy.get("#repeatNewPassword")
        .should("exist")
        .clear()
        .type(manager_password);

      cy.get(".btn").contains("Change").should("exist").click({ force: true });
    }
  });

  it("Branch Manger should be able to change password after login", () => {
    {
      cy.get("#email").should("exist").type(bmanager_email);
      cy.get("#password").should("exist").type(bmanager_password);

      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/branch-manager");
      cy.contains(bmanager_email).should("exist").click({ force: true });
      cy.contains("Profile").should("exist").click({ force: true });

      cy.get(".btn")
        .contains("Change Password")
        .should("exist")
        .click({ force: true });

      cy.get("#currentPassword")
        .should("exist")
        .clear()
        .type(bmanager_password);
      cy.get("#password").should("exist").clear().type(newPassword);
      cy.get("#repeatNewPassword").should("exist").clear().type(newPassword);

      cy.get(".btn").contains("Change").should("exist").click({ force: true });

      cy.get(".Toastify__toast--success").should("exist");
      cy.url().should("include", "/branch-manager/profile");

      /// Change password again
      cy.get(".btn")
        .contains("Change Password")
        .should("exist")
        .click({ force: true });

      cy.get("#currentPassword").should("exist").clear().type(newPassword);
      cy.get("#password").should("exist").clear().type(bmanager_password);
      cy.get("#repeatNewPassword")
        .should("exist")
        .clear()
        .type(bmanager_password);

      cy.get(".btn").contains("Change").should("exist").click({ force: true });
    }
  });
  it("Receptionist should be able to change password after login", () => {
    {
      cy.get("#email").should("exist").type(receptionist_email);
      cy.get("#password").should("exist").type(receptionist_password);

      cy.get(".btn").contains("Log In").should("exist").click({ force: true });
      cy.url().should("include", "/receptionist");
      cy.contains(receptionist_email).should("exist").click({ force: true });
      cy.contains("Profile").should("exist").click({ force: true });

      cy.get(".btn")
        .contains("Change Password")
        .should("exist")
        .click({ force: true });

      cy.get("#currentPassword")
        .should("exist")
        .clear()
        .type(receptionist_password);
      cy.get("#password").should("exist").clear().type(newPassword);
      cy.get("#repeatNewPassword").should("exist").clear().type(newPassword);

      cy.get(".btn").contains("Change").should("exist").click({ force: true });

      cy.get(".Toastify__toast--success").should("exist");
      cy.url().should("include", "/receptionist/profile");

      /// Change password again
      cy.get(".btn")
        .contains("Change Password")
        .should("exist")
        .click({ force: true });

      cy.get("#currentPassword").should("exist").clear().type(newPassword);
      cy.get("#password").should("exist").clear().type(receptionist_password);
      cy.get("#repeatNewPassword")
        .should("exist")
        .clear()
        .type(receptionist_password);

      cy.get(".btn").contains("Change").should("exist").click({ force: true });
    }
  });
});
