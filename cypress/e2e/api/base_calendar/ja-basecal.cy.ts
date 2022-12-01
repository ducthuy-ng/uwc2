describe("Test Base Calendar functions for JA", () => {
  it("First run, get JA perspective should return empty array", () => {
    cy.request({
      url: "/api/base-cal/ja-base",
      method: "GET",
    }).then((resp) => {
      expect(resp.body).to.have.length(10);
      for (const assigment of resp.body) {
        expect(assigment).to.have.all.keys(["ja_id", "ja_name", "number_day_of_week"]);
        expect(assigment["number_day_of_week"]).to.be.eq(0);
      }
    });
  });

  it("First run, get specific JA should return array of 7 items, all is null", () => {
    cy.request({
      url: "/api/base-cal/ja-base/1",
      method: "GET",
    }).then((resp) => {
      expect(resp.body).to.have.length(7);
      for (const assigment of resp.body) {
        expect(assigment).to.have.all.keys(["day_of_week", "mcp_id"]);
        expect(assigment["mcp_id"]).to.be.eq(null);
      }
    });
  });

  it("First run, get MCP perspective should return empty array", () => {
    cy.request({
      url: "/api/base-cal/ja-base/mcp",
      method: "GET",
    }).then((resp) => {
      expect(resp.body).to.have.length(10);
      for (const assigment of resp.body) {
        expect(assigment).to.have.all.keys(["mcp_id", "number_day_of_week"]);
        expect(assigment["number_day_of_week"]).to.be.eq(0);
      }
    });
  });

  it("First run, get specific MCP should return array of 7 items, all is null", () => {
    cy.request({
      url: "/api/base-cal/ja-base/mcp/1",
      method: "GET",
    }).then((resp) => {
      expect(resp.body).to.have.length(7);
      for (const assigment of resp.body) {
        expect(assigment).to.have.all.keys(["day_of_week", "ja_id"]);
        expect(assigment["ja_id"]).to.be.eq(null);
      }
    });
  });

  it("Create simple BaseCal should success", () => {
    cy.request({
      url: "/api/base-cal/ja-base",
      method: "POST",
      qs: {
        mcp_id: 1,
        ja_id: 1,
        day_of_week: "Mon",
      },
    }).then((resp) => {
      expect(resp.status).to.be.eq(200);
    });
  });

  it("Create simple BaseCal, another DoW should success", () => {
    cy.request({
      url: "/api/base-cal/ja-base",
      method: "POST",
      qs: {
        mcp_id: 1,
        ja_id: 1,
        day_of_week: "Tue",
      },
    }).then((resp) => {
      expect(resp.status).to.be.eq(200);
    });
  });

  it("Get JA perspective should have 2 assigned", () => {
    cy.request({
      url: "/api/base-cal/ja-base",
      method: "GET",
    }).then((resp) => {
      expect(resp.body).to.deep.include({ ja_id: 1, ja_name: "Susan", number_day_of_week: 2 });
    });
  });

  it("Get specific JA should return array, 2 is assigned", () => {
    cy.request({
      url: "/api/base-cal/ja-base/1",
      method: "GET",
    }).then((resp) => {
      const expectedResults = [
        { day_of_week: "Mon", mcp_id: 1 },
        { day_of_week: "Tue", mcp_id: 1 },
      ];

      for (const result of expectedResults) {
        expect(resp.body).to.deep.include(result);
      }
    });
  });

  it("Get MCP perspective should have 2 assigned", () => {
    cy.request({
      url: "/api/base-cal/ja-base/mcp",
      method: "GET",
    }).then((resp) => {
      expect(resp.body).to.deep.include({ mcp_id: 1, number_day_of_week: 2 });
    });
  });

  it("Get specific MCP should return array, 2 is assigned", () => {
    cy.request({
      url: "/api/base-cal/ja-base/mcp/1",
      method: "GET",
    }).then((resp) => {
      const expectedResults = [
        { day_of_week: "Mon", ja_id: 1 },
        { day_of_week: "Tue", ja_id: 1 },
      ];

      for (const result of expectedResults) {
        expect(resp.body).to.deep.include(result);
      }
    });
  });

  it("Delete Mon BaseCal should success", () => {
    cy.request({
      url: "/api/base-cal/ja-base",
      method: "DELETE",
      qs: {
        mcp_id: 1,
        ja_id: 1,
        day_of_week: "Mon",
      },
    }).then((resp) => {
      expect(resp.status).to.be.eq(200);
    });
  });

  it("Get JA perspective should have 1 assigned", () => {
    cy.request({
      url: "/api/base-cal/ja-base",
      method: "GET",
    }).then((resp) => {
      expect(resp.body).to.deep.include({ ja_id: 1, ja_name: "Susan", number_day_of_week: 1 });
    });
  });

  it("Get specific JA should return array, 1 is assigned", () => {
    cy.request({
      url: "/api/base-cal/ja-base/1",
      method: "GET",
    }).then((resp) => {
      const expectedResults = [{ day_of_week: "Tue", mcp_id: 1 }];

      for (const result of expectedResults) {
        expect(resp.body).to.deep.include(result);
      }
    });
  });

  it("Get MCP perspective should have 1 assigned", () => {
    cy.request({
      url: "/api/base-cal/ja-base/mcp",
      method: "GET",
    }).then((resp) => {
      expect(resp.body).to.deep.include({ mcp_id: 1, number_day_of_week: 1 });
    });
  });

  it("Get specific MCP should return array, 1 is assigned", () => {
    cy.request({
      url: "/api/base-cal/ja-base/mcp/1",
      method: "GET",
    }).then((resp) => {
      const expectedResults = [{ day_of_week: "Tue", ja_id: 1 }];

      for (const result of expectedResults) {
        expect(resp.body).to.deep.include(result);
      }
    });
  });

  it("Cleanup results", () => {
    cy.request({
      url: "/api/base-cal/ja-base",
      method: "DELETE",
      qs: {
        mcp_id: 1,
        ja_id: 1,
        day_of_week: "Tue",
      },
    }).then((resp) => {
      expect(resp.status).to.be.eq(200);
    });
  });
});
