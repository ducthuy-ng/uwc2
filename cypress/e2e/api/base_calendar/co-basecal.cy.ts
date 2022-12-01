describe("Test Base Calendar functions for CO", () => {
  it("First run, get CO perspective should return empty array", () => {
    cy.request({
      url: "/api/base-cal/co-base",
      method: "GET"
    }).then((resp) => {
      expect(resp.body).to.have.length(10);
      for (const assigment of resp.body) {
        expect(assigment).to.have.all.keys(["co_id", "co_name", "number_day_of_week"]);
        expect(assigment["number_day_of_week"]).to.be.eq(0);
      }
    });
  });

  it("First run, get specific CO should return array of 7 items, all is null", () => {
    cy.request({
      url: "/api/base-cal/co-base/1",
      method: "GET"
    }).then((resp) => {
      expect(resp.body).to.have.length(7);
      for (const assigment of resp.body) {
        expect(assigment).to.have.all.keys(["day_of_week", "area_id"]);
        expect(assigment["area_id"]).to.be.eq(null);
      }
    });
  });

  it("First run, get Area perspective should return empty array", () => {
    cy.request({
      url: "/api/base-cal/co-base/area",
      method: "GET"
    }).then((resp) => {
      expect(resp.body).to.have.length(10);
      for (const assigment of resp.body) {
        expect(assigment).to.have.all.keys(["area_id", "number_day_of_week"]);
        expect(assigment["number_day_of_week"]).to.be.eq(0);
      }
    });
  });

  it("First run, get specific Area should return array of 7 items, all is null", () => {
    cy.request({
      url: "/api/base-cal/co-base/area/1",
      method: "GET"
    }).then((resp) => {
      expect(resp.body).to.have.length(7);
      for (const assigment of resp.body) {
        expect(assigment).to.have.all.keys(["day_of_week", "co_id"]);
        expect(assigment["co_id"]).to.be.eq(null);
      }
    });
  });

  it("Create simple BaseCal should success", () => {
    cy.request({
      url: "/api/base-cal/co-base/",
      method: "POST",
      qs: {
        area_id: 1,
        co_id: 1,
        day_of_week: "Mon"
      }
    }).then((resp) => {
      expect(resp.status).to.be.eq(200);
    });
  });

  it("Create simple BaseCal, another DoW should success", () => {
    cy.request({
      url: "/api/base-cal/co-base/",
      method: "POST",
      qs: {
        area_id: 1,
        co_id: 1,
        day_of_week: "Tue"
      }
    }).then((resp) => {
      expect(resp.status).to.be.eq(200);
    });
  });

  it("Get CO perspective should have 2 assigned", () => {
    cy.request({
      url: "/api/base-cal/co-base",
      method: "GET"
    }).then((resp) => {
      expect(resp.body).to.deep.include({ co_id: 1, co_name: "Susan", number_day_of_week: 2 });
    });
  });

  it("Get specific CO should return array, 2 is assigned", () => {
    cy.request({
      url: "/api/base-cal/co-base/1",
      method: "GET"
    }).then((resp) => {
      const expectedResults = [{ day_of_week: "Mon", area_id: 1 }, { day_of_week: "Tue", area_id: 1 }];

      for (const result of expectedResults) {
        expect(resp.body).to.deep.include(result);
      }
    });
  });

  it("Get Area perspective should have 2 assigned", () => {
    cy.request({
      url: "/api/base-cal/co-base/area",
      method: "GET"
    }).then((resp) => {
      expect(resp.body).to.deep.include({ area_1: 1, number_day_of_week: 2 });
    });
  });

  it("Get specific Area should return array, 2 is assigned", () => {
    cy.request({
      url: "/api/base-cal/co-base/area/1",
      method: "GET"
    }).then((resp) => {
      const expectedResults = [{ day_of_week: "Mon", co_id: 1 }, { day_of_week: "Tue", co_id: 1 }];

      for (const result of expectedResults) {
        expect(resp.body).to.deep.include(result);
      }
    });
  });

  it("Delete Mon BaseCal should success", () => {
    cy.request({
      url: "/api/base-cal/co-base/",
      method: "DELETE",
      qs: {
        area_id: 1,
        co_id: 1,
        day_of_week: "Mon"
      }
    }).then((resp) => {
      expect(resp.status).to.be.eq(200);
    });
  });

  it("Get CO perspective should have 1 assigned", () => {
    cy.request({
      url: "/api/base-cal/co-base",
      method: "GET"
    }).then((resp) => {
      expect(resp.body).to.deep.include({ co_id: 1, co_name: "Susan", number_day_of_week: 1 });
    });
  });

  it("Get specific CO should return array, 1 is assigned", () => {
    cy.request({
      url: "/api/base-cal/co-base/1",
      method: "GET"
    }).then((resp) => {
      const expectedResults = [{ day_of_week: "Tue", area_id: 1 }];

      for (const result of expectedResults) {
        expect(resp.body).to.deep.include(result);
      }
    });
  });

  it("Get Area perspective should have 1 assigned", () => {
    cy.request({
      url: "/api/base-cal/co-base/area",
      method: "GET"
    }).then((resp) => {
      expect(resp.body).to.deep.include({ area_1: 1, number_day_of_week: 1 });
    });
  });

  it("Get specific Area should return array, 1 is assigned", () => {
    cy.request({
      url: "/api/base-cal/co-base/area/1",
      method: "GET"
    }).then((resp) => {
      const expectedResults = [{ day_of_week: "Tue", co_id: 1 }];

      for (const result of expectedResults) {
        expect(resp.body).to.deep.include(result);
      }
    });
  });

  it("Cleanup results", () => {
    cy.request({
      url: "/api/base-cal/co-base/",
      method: "DELETE",
      qs: {
        area_id: 1,
        co_id: 1,
        day_of_week: "Tue"
      }
    }).then((resp) => {
      expect(resp.status).to.be.eq(200);
    });
  });
});