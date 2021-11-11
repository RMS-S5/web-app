describe("Receptionist booking function should work", () => {
  const receptionist_email = Cypress.env("receptionist_email");
  const receptionist_password = Cypress.env("receptionist_password");

  beforeEach(() => {
    // valid dummy credentials
    cy.visit("/home/login");
    cy.get("#email").should("exist").type(receptionist_email);
    cy.get("#password").should("exist").type(receptionist_password);
    cy.get(".btn").contains("Log In").should("exist").click({ force: true });
    cy.url().should("include", "/receptionist");
    cy.get(".c-sidebar-nav-link")
      .contains("New Booking")
      .should("exist")
      .click({ force: true });
  });

  // it("Receptionist should be able to check avalibility of the rooms", () => {
  //   {
  //     cy.get("#branchId").should("exist").select("Matara");
  //     cy.get("#arrival").should("exist").type("2075-12-12");
  //     cy.get("#departure").should("exist").type("2075-12-15");
  //     cy.get(".btn")
  //       .contains("Show Rooms")
  //       .should("exist")
  //       .click({ force: true });
  //     cy.url().should("include", "/receptionist/add-booking-rooms");
  //   }
  // });

  // it("Receptionist should be able to add rooms to the bookings", () => {
  //   {
  //     cy.get("#branchId").select("Matara");
  //     cy.get("#arrival").type("2021-12-12");
  //     cy.get("#departure").type("2021-12-15");
  //     cy.get(".btn").contains("Show Rooms").click({ force: true });
  //     cy.url().should("include", "/receptionist/add-booking-rooms");
  //     cy.get("h2").contains("No items ").should("exist");
  //     cy.get("#0").contains("Add").should("exist").click();
  //     cy.get("#amount").should("exist");
  //     //cy.get('[id="amount"]').invoke("val").should("eq", "100");
  //     cy.get('[id="amount"]')
  //       .invoke("val")
  //       .then(($amount) => {
  //         cy.get(
  //           "#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div > form > div.position-relative.table-responsive > table > tbody > tr > td:nth-child(4)"
  //         )
  //           .contains($amount)
  //           .should("exist");
  //       });
  //     cy.get(".btn")
  //       .contains("Confirm Rooms")
  //       .should("exist")
  //       .click({ force: true });
  //     cy.url().should("include", "/receptionist/booking-form");
  //   }
  // });

  it("Receptionist should be able to go to Payment for with valid data", () => {
    {
      cy.get("#branchId").select("Matara");
      cy.get("#arrival").type("2021-12-12");
      cy.get("#departure").type("2021-12-15");
      cy.get(".btn").contains("Show Rooms").click({ force: true });
      cy.url().should("include", "/receptionist/add-booking-rooms");
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
      cy.url().should("include", "/receptionist/booking-form");
      cy.get("#first_name").should("exist").clear().type("Sumith");
      cy.get("#last_name").should("exist").clear().type("Withanage");
      cy.get("#email").should("exist").clear().type("sumith@gmail.com");
      cy.get("#nic").should("exist").clear().type("982502836V");
      cy.get("#mobile_number").should("exist").clear().type("0784695571");
      cy.wait(4000);
      cy.get(".btn").contains("Go to payment").should("exist").click();
    }
  });
  let amount = 0;

  //   it("Receptionist should be able to do correct payment", () => {
  //     {
  //       cy.get("#branchId").select("Matara");
  //       cy.get("#arrival").type("2021-12-12");
  //       cy.get("#departure").type("2021-12-15");
  //       cy.get(".btn").contains("Show Rooms").click({ force: true });
  //       cy.url().should("include", "/receptionist/add-booking-rooms");
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
  //       cy.url().should("include", "/receptionist/booking-form");
  //       cy.get("#email").should("exist").type(receptionist_email);
  //       cy.get("#nic").should("exist").type("982502836V");
  //       cy.wait(3000);
  //       cy.get(".btn").contains("Go to payment").should("exist").click();
  //       cy.wait(15000);
  //       //cy.get("#main_container").contains(amount).should("exist");
  //       cy.get("#method_img_VISA").should("exist").click();
  //     }
  //   });
});
