describe("Dashboard test for manager", () => {
  beforeEach(() => {
    cy.visit("/home/login");
    cy.get("#email").should("exist").type("testManager@gmail.com");
    cy.get("#password").should("exist").type("test123");
    cy.get(".btn").contains("Log In").should("exist").click({ force: true });
    cy.url().should("include", "/manager");
  });

  it("Dashboard compoments should exits for Manager", () => {
    {
      cy.get(".c-sidebar-nav-link").contains("Dashboard").should("exist");
      cy.get(".c-sidebar-nav-link").contains("Add Staff").should("exist");
      cy.get(".c-sidebar-nav-link").contains("View Staff").should("exist");
      cy.get(".c-sidebar-nav-link").contains("Add Room Type").should("exist");

      cy.get(".c-sidebar-nav-link").contains("Add Category").should("exist");
      cy.get(".c-sidebar-nav-link").contains("View Categories").should("exist");
      cy.get(".c-sidebar-nav-link").contains("Add Branch").should("exist");
      cy.get(".c-sidebar-nav-link").contains("View Branches").should("exist");
      cy.go("back");
    }
  });
});
