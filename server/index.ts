"use strict";

import dotenv from "dotenv";
import express from "express";
import { router } from "./router";
import cors from "cors";
import { db } from "./models/index";
import session from "express-session";

const app = express();
const port = process.env.PORT || 3000;
const SECRET = process.env.SECRET || "ANOTHER_SECRET";

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(
  session({
    name: "sid",
    saveUninitialized: false,
    resave: false,
    secret: SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: true,
      httpOnly: false,
      secure: false,
    },
  })
);
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
