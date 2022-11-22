describe("Test employees API", () => {
  it("get specific employee", async () => {
    cy.request("api/employees/1").then((resp) => {
      expect(resp.status).to.be.eq(200);
      expect(resp.body).to.have.property("name").with.value("Susan");
    });
  });
});
