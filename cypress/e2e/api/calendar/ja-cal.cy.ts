describe("Test JA Calendar", () => {
  before(() => {
    const insertItems = [[1, "Mon", 1], [1, "Tue", 2], [1, "Wed", 5], [2, "Mon", 2], [2, "Tue", 5], [3, "Wed", 2]];
    for (const item of insertItems) {
      cy.request({
        method: "POST",
        url: "/api/base-cal/ja-base",
        qs: {
          mcp_id: item[0],
          ja_id: item[2],
          day_of_week: item[1]
        }
      });
    }
  });

  it("Test create for December, 2022", () => {
    cy.request("GET", "/api/calendar/ja-calendar", {
      qs: {
        month: 12,
        year: 2022
      }
    });
  });
});