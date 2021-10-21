/// <reference types="cypress" />

describe("Basic Unauthenticated desktop Tests", () => {
  beforeEach(() => {
    cy.visit("/home");
  });

  it("Should contains main buttons (Login, Register and Booking)", () => {
    {
      cy.contains("Register").should("exist");
      cy.contains("Login").should("exist");
      cy.contains("Booking").should("exist");
    }
  });

  it("The Register button in home page should navigate user to the register page ", () => {
    {
      cy.log("goto register page and come back");
      // 1. Register page
      cy.contains("Register").should("exist").click({ force: true });
      cy.log("This should be the register page");
      cy.url().should("include", "/register");
      cy.go("back");
      cy.url().should("include", "/home");
    }
  });

  it("The Login button in home page should navigate user to the login page ", () => {
    {
      cy.log("goto login page and come back");
      // 1. Login page
      cy.contains("Login").should("exist").click({ force: true });
      cy.log("This should be the login page");
      cy.url().should("include", "/login");
      cy.go("back");
      cy.url().should("include", "/home");
    }
  });

  it("The Booking button in home page should navigate user to the new booking page ", () => {
    {
      cy.log("goto new bookings page and come back");
      // 1. Login page
      cy.contains("Booking").should("exist").click({ force: true });
      cy.log("This should be the new bookings page");
      cy.url().should("include", "/customer/check-availability");
      cy.go("back");
      cy.url().should("include", "/home");
    }
  });

  it("Should display only unauthenticated action for the unauthenticated customers", () => {
    {
      cy.log("checking tabs for unauthenticated customers are there");
      // 1. customer dashboard
      cy.contains("Booking").click({ force: true });
      cy.log("This should be the customer dashboard");
      cy.url().should("include", "/customer/check-availability");
      cy.get(".c-sidebar-nav-link").contains("New Booking").should("exist");
      cy.get(".c-sidebar-nav-link").contains("Room Categories").should("exist");
      cy.get(".c-sidebar-nav-link").contains("Ask Questions").should("exist");
      cy.get(".c-sidebar-nav-link").contains("Add a review").should("exist");
      cy.go("back");
      cy.url().should("include", "/home");
    }
  });

  it("Should not display only authenticated action for the unauthenticated customers", () => {
    {
      cy.log("checking tabs for authenticated customers are there");
      // 1. customer dashboard
      cy.contains("Booking").click({ force: true });
      cy.log("This should be the customer dashboard");
      cy.url().should("include", "/customer/check-availability");
      cy.get(".c-sidebar-nav-link")
        .contains("Previous Bookings")
        .should("not.exist");
      cy.get(".c-sidebar-nav-link")
        .contains("Report a problem")
        .should("not.exist");
    }
  });

  it("The 'New Booking' button in customer dashboard should navigate unauthenticated customer to the check availability page ", () => {
    {
      cy.contains("Booking").click({ force: true });
      cy.log("goto check availability page page and come back");
      // 1. Login page
      cy.get(".c-sidebar-nav-link")
        .contains("New Booking")
        .should("exist")
        .click({ force: true });
      cy.log("This should be the check availability page");
      cy.url().should("include", "/customer/check-availability");
      cy.go("back");
      cy.url().should("include", "/home");
    }
  });

  it("The 'Room Categories' button in customer dashboard should navigate unauthenticated customer to the view room categories page ", () => {
    {
      cy.contains("Booking").click({ force: true });
      cy.log("goto view room categories page and come back");
      // 1. Login page
      cy.get(".c-sidebar-nav-link")
        .contains("Room Categories")
        .should("exist")
        .click({ force: true });
      cy.log("This should be the view room categories page");
      cy.url().should("include", "/customer/view-room-categories");
      cy.go("back");
      cy.url().should("include", "/customer/check-availability");
    }
  });

  it("The 'Ask Questions' button in customer dashboard should navigate unauthenticated customer to the ask questions page ", () => {
    {
      cy.contains("Booking").click({ force: true });
      cy.log("goto ask questions page and come back");
      // 1. Login page
      cy.get(".c-sidebar-nav-link")
        .contains("Ask Questions")
        .should("exist")
        .click({ force: true });
      cy.log("This should be the ask questions page");
      cy.url().should("include", "/customer/ask-questions");
      cy.go("back");
      cy.url().should("include", "/customer/check-availability");
    }
  });

  it("The 'Add a review' button in customer dashboard should navigate unauthenticated customer to the add a review page ", () => {
    {
      cy.contains("Booking").click({ force: true });
      cy.log("goto add a review page and come back");
      // 1. Login page
      cy.get(".c-sidebar-nav-link")
        .contains("Add a review")
        .should("exist")
        .click({ force: true });
      cy.log("This should be the add a review page");
      cy.url().should("include", "/customer/add-a-review");
      cy.go("back");
      cy.url().should("include", "/customer/check-availability");
    }
  });

  //   it("Should display chatbot at the home page and at the customer dashboard ", () => {
  //     {
  //       cy.wait(6000);
  //       cy.get(".df-messenger-wrapper").get("#dismissIcon").click();
  //       cy.get(".df-messenger-wrapper")
  //         .contains("widgetIcon")
  //         .should("exist")
  //         .click({ force: true });
  //       cy.log("chatbot should be opened");
  //       // Chat bot
  //       cy.get(".messageList").contains("Hello").should("exist");
  //       cy.log("This should be the add a review page");
  //     }
  //   });
});
