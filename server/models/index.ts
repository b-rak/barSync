"use strict";
import { Sequelize, Options } from "sequelize";
import inventoryModel from "./inventoryModel";
import userModel from "./userModel";
import favoritesModel from "./favoritesModel";

const options: Options = {
  host: "localhost",
  dialect: "postgres",
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
}

const sequelize = new Sequelize(options);

const db = {
  sequelize: sequelize,
  user: userModel(sequelize),
  inventory: inventoryModel(sequelize),
  favoritesModel: favoritesModel(sequelize)
};
export { db };
