describe("Test Assign JA-Trolley", () => {
  it("First run should return empty array", () => {
    cy.request({
      url: "/api/assignment/ja-trolley",
      method: "GET"
    }).then(resp => {
      expect(resp.body).to.have.length(10);
      for (const assigment of resp.body) {
        expect(assigment).to.have.property("trolley_id");
        expect(assigment["trolley_id"]).to.be.null;
      }
    });
  });

  it("Create simple assignment", () => {
    cy.request({
      url: "/api/assignment/ja-trolley",
      method: "POST",
      qs: {
        ja_id: 1,
        trolley_id: 1
      }
    }).then(resp => {
      expect(resp.status).to.be.eq(200);
    });
  });

  it("After insert, get ALL must have this assignment", () => {
    cy.request({
      url: "/api/assignment/ja-trolley",
      method: "GET"
    }).then(resp => {
      expect(resp.body).to.deep.include({ "ja_id": 1, "trolley_id": 1 });
    });
  });

  it("Assign Assigned-JA should fail", () => {
    cy.request({
      url: "/api/assignment/ja-trolley",
      method: "POST",
      qs: {
        ja_id: 1,
        trolley_id: 2
      }
    }).then(resp => {
      expect(resp.status).to.be.eq(400);
    });
  });

  it("Assign Assigned-Trolley should fail", () => {
    cy.request({
      url: "/api/assignment/ja-trolley",
      method: "POST",
      qs: {
        ja_id: 2,
        trolley_id: 1
      }
    }).then(resp => {
      expect(resp.status).to.be.eq(400);
    });
  });

  it("Delete existing assignment should success", () => {
    cy.request({
      url: "/api/assignment/ja-trolley",
      method: "DELETE",
      qs: {
        trolley_id: 1,
        ja_id: 1
      }
    }).then(resp => {
      expect(resp.status).to.be.eq(200);
    });
  });

  it("Delete non-existing assignment should fail", () => {
    cy.request({
      url: "/api/assignment/ja-trolley",
      method: "DELETE",
      qs: {
        trolley_id: 1,
        ja_id: 1
      }
    }).then(resp => {
      expect(resp.status).to.be.eq(400);
    });
  });
});