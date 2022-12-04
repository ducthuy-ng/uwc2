describe("Test CO Calendar", () => {
  const insertItems = [
    [1, "Mon", 3],
    [1, "Tue", 4],
    [1, "Wed", 6],
    [2, "Mon", 4],
    [2, "Tue", 6],
    [3, "Wed", 4],
  ];
  before(() => {
    for (const item of insertItems) {
      cy.request({
        method: "POST",
        url: "/api/base-cal/co-base",
        qs: {
          area_id: item[0],
          co_id: item[2],
          day_of_week: item[1],
        },
      });
    }
  });

  it("Test create for December, 2022", () => {
    cy.request({
      method: "POST",
      url: "/api/calendar/co-calendar",
      qs: {
        month: 12,
        year: 2022,
      },
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.be.eq(200);
    });
  });

  it("Get all calendar for CO 1 of December, 2022", () => {
    cy.request({
      method: "GET",
      url: "/api/calendar/get-co-calendar",
      qs: {
        month: 12,
        year: 2022,
        co_id: 3,
      },
    }).then((resp) => {
      expect(resp.body).to.have.length(4);
    });
  });

  it("Get all calendar for Area 1 of December, 2022", () => {
    cy.request({
      method: "GET",
      url: "/api/calendar/get-area-calendar",
      qs: {
        month: 12,
        year: 2022,
        area_id: 1,
      },
    }).then((resp) => {
      expect(resp.body).to.have.length(12);
    });
  });


  it("Delete all calendar of December, 2022", () => {});

  after(() => {
    for (const item of insertItems) {
      cy.request({
        method: "DELETE",
        url: "/api/base-cal/co-base",
        qs: {
          area_id: item[0],
          co_id: item[2],
          day_of_week: item[1],
        },
      });
    }
  });
});
