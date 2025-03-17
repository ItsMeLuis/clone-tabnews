test("GET to /api/v1/status should return 200 and contain database info", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody).toHaveProperty("dependencies.database");

  // Teste para `updated_at`
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const { database } = responseBody.dependencies;

  // Teste para database `version`
  expect(database).toHaveProperty("version");
  expect(typeof database.version).toBe("string");
  expect(database.version.length).toBeGreaterThan(0);

  // Teste para database `max_connections`
  expect(database).toHaveProperty("max_connections");
  expect(parseInt(database.max_connections)).toBeGreaterThan(1);

  // Teste para database `opened_connections`
  expect(database).toHaveProperty("opened_connections");
  expect(parseInt(database.opened_connections)).toEqual(1);

  console.log(database);
});
