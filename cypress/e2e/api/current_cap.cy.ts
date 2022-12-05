describe("Test current cap", () => {
  it("First get all should return all MCP", () => {
    cy.request("/api/current_cap").then((resp) => {
      expect(resp.body).to.have.length(10);
      for (const item of resp.body) {
        expect(item["current_cap"]).to.be.eq(0);
      }
    });
  });

  it("Update cap of MCP2", () => {
    cy.request({
      method: "POST",
      url: "/api/current_cap",
      qs: {
        mcp_id: 2,
        current_cap: 20,
      },
    }).then((resp) => {
      expect(resp.isOkStatusCode).to.be.true;
    });
  });

  it("Get all MCP caps should be updated", () => {
    cy.request("/api/current_cap").then((resp) => {
      expect(resp.body).to.deep.include({
        mcp_id: 2,
        current_cap: 20,
      });
    });
  });

  it("Set caps of MCP2 back to 0", () => {
    cy.request({
      method: "POST",
      url: "/api/current_cap",
      qs: {
        mcp_id: 2,
        current_cap: 0,
      },
    }).then((resp) => {
      expect(resp.isOkStatusCode).to.be.true;
    });
  });

  it("Finally, get all should be 0", () => {
    cy.request("/api/current_cap").then((resp) => {
      expect(resp.body).to.have.length(10);
      for (const item of resp.body) {
        expect(item["current_cap"]).to.be.eq(0);
      }
    });
  });
});
