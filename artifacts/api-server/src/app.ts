import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "@workspace/db";
import { brandReferences } from "@workspace/db/schema";

const app: Express = express();

// Seed default brands if table is empty (fire-and-forget, never block server startup)
setTimeout(() => {
  db.select().from(brandReferences)
    .then((existing) => {
      if (existing.length === 0) {
        return db.insert(brandReferences).values([
          { name: "Aryan", logoUrl: "/brands/aryan.png", sortOrder: 1 },
          { name: "Black Money Clo", logoUrl: "/brands/black-money-clo.png", sortOrder: 2 },
          { name: "Voidwear", logoUrl: "/brands/voidwear.png", sortOrder: 3 },
          { name: "TWTU", logoUrl: "/brands/twtu.png", sortOrder: 4 },
          { name: "Quels", logoUrl: "/brands/quels.png", sortOrder: 5 },
        ]);
      }
      return undefined;
    })
    .then(() => logger.info("Brand seed checked"))
    .catch((err) => logger.error({ err }, "Brand seed failed"));
}, 0);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

app.use("/api", router);

export default app;
