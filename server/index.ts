"use strict";

import dotenv from "dotenv";
import express from "express";
import { router } from "./router";
import cors from "cors";
import { db } from "./models/index";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.use(router);

(async () => {
  try {
    app.listen(port, () => {
      console.log(`[SERVER]: server running at http://localhost:${port}`);
      console.log(process.env.API_KEY)
    });
    await db.sequelize.sync();

    console.log(`[DATABASE]: connection established`);
  } catch (error) {
    console.log(error);
  }
})();
