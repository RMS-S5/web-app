describe("Customer booking function should work", () => {
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

  it("Customer should be able to check avalibility of the rooms", () => {
    {
      cy.get("#branchId").should("exist").select("Matara");
      cy.get("#arrival").should("exist").type("2021-12-12");
      cy.get("#departure").should("exist").type("2021-12-15");
      cy.get(".btn")
        .contains("Show Rooms")
        .should("exist")
        .click({ force: true });
      cy.url().should("include", "/customer/add-booking-rooms");
    }
  });

  it("Customer should be able to add rooms to the bookings", () => {
    {
      cy.get("#branchId").select("Matara");
      cy.get("#arrival").type("2021-12-12");
      cy.get("#departure").type("2021-12-15");
      cy.get(".btn").contains("Show Rooms").click({ force: true });
      cy.url().should("include", "/customer/add-booking-rooms");
      cy.get("h2").contains("No items ").should("exist");
      cy.get("#0").contains("Add").should("exist").click();
      cy.get("#amount").should("exist");
      //cy.get('[id="amount"]').invoke("val").should("eq", "100");
      cy.get('[id="amount"]')
        .invoke("val")
        .then(($amount) => {
          cy.get(
            "#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div > form > div.position-relative.table-responsive > table > tbody > tr > td:nth-child(4)"
          )
            .contains($amount)
            .should("exist");
        });
      cy.get(".btn")
        .contains("Confirm Rooms")
        .should("exist")
        .click({ force: true });
      cy.url().should("include", "/customer/booking-form");
    }
  });

  it("Customer should be able to go to Payment for with valid data", () => {
    {
      cy.get("#branchId").select("Matara");
      cy.get("#arrival").type("2021-12-12");
      cy.get("#departure").type("2021-12-15");
      cy.get(".btn").contains("Show Rooms").click({ force: true });
      cy.url().should("include", "/customer/add-booking-rooms");
      cy.get("h2").contains("No items ");
      cy.get("#0").contains("Add").click();
      cy.get("#amount");
      //cy.get('[id="amount"]').invoke("val").should("eq", "100");
      cy.get('[id="amount"]')
        .invoke("val")
        .then(($amount) => {
          cy.get(
            "#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div > form > div.position-relative.table-responsive > table > tbody > tr > td:nth-child(4)"
          )
            .contains($amount)
            .should("exist");
        });
      cy.get(".btn").contains("Confirm Rooms").click({ force: true });
      cy.url().should("include", "/customer/booking-form");
      cy.get("#email").should("exist");
      cy.get("#nic").should("exist").type("982502836V");
      cy.wait(4000);
      cy.get(".btn").contains("Go to payment").should("exist").click();
    }
  });
  let amount = 0;

  //   it("Customer should be able to do correct payment", () => {
  //     {
  //       cy.get("#branchId").select("Matara");
  //       cy.get("#arrival").type("2021-12-12");
  //       cy.get("#departure").type("2021-12-15");
  //       cy.get(".btn").contains("Show Rooms").click({ force: true });
  //       cy.url().should("include", "/customer/add-booking-rooms");
  //       cy.get("h2").contains("No items ");
  //       cy.get("#0").contains("Add").click();
  //       cy.get("#amount");
  //       //cy.get('[id="amount"]').invoke("val").should("eq", "100");
  //       cy.get('[id="amount"]')
  //         .invoke("val")
  //         .then(($amount) => {
  //           amount = $amount;
  //           cy.get(
  //             "#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div > form > div.position-relative.table-responsive > table > tbody > tr > td:nth-child(4)"
  //           )

  //             .contains($amount)
  //             .should("exist");
  //         });
  //       cy.get(".btn").contains("Confirm Rooms").click({ force: true });
  //       cy.url().should("include", "/customer/booking-form");
  //       cy.get("#email").should("exist").type(customer_email);
  //       cy.get("#nic").should("exist").type("982502836V");
  //       cy.wait(3000);
  //       cy.get(".btn").contains("Go to payment").should("exist").click();
  //       cy.wait(15000);
  //       //cy.get("#main_container").contains(amount).should("exist");
  //       cy.get("#method_img_VISA").should("exist").click();
  //     }
  //   });
});
