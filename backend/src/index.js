import "../config/enviroment.js";
import express from "express";
import cors from "cors";

import camerasRouter from "./routes/cameras.routes.js";
import plansRouter from "./routes/plans.routes.js";
import sensorsRouter from "./routes/sensors.routes.js";
import accessoriesRouter from "./routes/accessories.routes.js";

const startServer = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.get("/test", (req, res) => {
    res.status(200).json({ message: "Hello World" });
  });

  app.use("/api/cameras", camerasRouter);
  app.use("/api/plans", plansRouter);
  app.use("/api/sensors", sensorsRouter);
  app.use("/api/accessories", accessoriesRouter);

  app.listen(process.env.PORT || 3000, () => {
    console.log(`running at ${process.env.PORT || 3000}`);
  });
};

startServer();
