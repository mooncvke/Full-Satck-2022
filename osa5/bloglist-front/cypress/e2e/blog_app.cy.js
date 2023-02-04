const user = {
  name: "Tester",
  username: "xXTester69Xx",
  password: "salasana123",
};

describe("Blog app", () => {
  beforeEach(function () {
    //cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to the application");
    // cy.contains("Username");
    // cy.contains("Password");
    cy.get("button").contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("xXTester69Xx");
      cy.get("#password").type("salasana123");
      cy.get("#login").click();

      cy.contains("Tester is logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("xXTester69Xx");
      cy.get("#password").type("WrongPassword");
      cy.get("#login").click();

      cy.contains("Invalid username or password");
    });
  });

  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "xXTester69Xx",
        password: "salasana123",
      }).then((response) => {
        localStorage.setItem("loggedUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });
    });

    it("A blog can be created", function () {
      cy.get("#newBlogButton").click();
      cy.get("#title").type("Title");
      cy.get("#author").type("Tester");
      cy.get("#url").type("devhel.com");
      cy.contains("Submit").click();

      cy.contains("Title");
      cy.contains("Tester");
    });

    it("A Blog can be liked", function () {
      cy.get("#toggleView").click();
      cy.contains("0");
      cy.get("#like").click();
      cy.contains("1");
    });

    it("A blog can be deleted", function () {
      cy.get("#toggleView").click();
      cy.contains("delete").click();
      cy.get("html").should("not contain", "Title, Tester");
    });
  });

  it("Blogs are sorted by likes", function () {
    cy.get("#newBlogButton").click();
    cy.get("#title").type("Title 2");
    cy.get("#author").type("Tester");
    cy.get("#url").type("test.com");
    cy.contains("Submit").click();

    cy.get("#blogInfo:first").should("contain", "Title, Tester");
  });
});
