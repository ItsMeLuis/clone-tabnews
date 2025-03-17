import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB;

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersion = databaseVersionResult.rows[0].server_version;

  const maxConnectionsResults = await database.query("SHOW max_connections;");
  const maxConnections = maxConnectionsResults.rows[0].max_connections;

  const openedConnectionsResults = await database.query({
    text: "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1;", // Forma segura de passar parametros nas querys evitando SQL Injection
    values: [databaseName],
  });
  const openedConnections = openedConnectionsResults.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(maxConnections),
        opened_connections: parseInt(openedConnections),
      },
    },
  });
}

export default status;
