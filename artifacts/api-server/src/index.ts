import app from "./app";
import { logger } from "./lib/logger";
import { ensureDemoUsers } from "@workspace/db/seed";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function main() {
  await ensureDemoUsers()
    .then(() => logger.info("Demo users ready"))
    .catch((e) => logger.warn({ err: e }, "Could not seed demo users"));

  app.listen(port, (err?: Error) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }
    logger.info({ port }, "Server listening");
  });
}

main().catch((err) => {
  logger.error({ err }, "Fatal startup error");
  process.exit(1);
});
