import { Sequelize } from "sequelize-typescript";
import { Product } from "../models/product";
import { User } from "../models/user";
import { Branch } from "../models/branch";
import { Category } from "../models/category";
import { Manager } from "../models/manager";

const connection = new Sequelize({
  database: "sisweb_db",
  dialect: "postgres",
  username: "sisweb_user",
  password: "HDK#$%Ljkwerff.89",
  storage: ":memory:",
  models: [Product, User, Branch, Category, Manager], // Path to the model files
});

async function connectionDB() {
  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");

    await connection.sync();
    console.log("All models were synchronized successfully.");
  } catch (e) {
    console.log(e);
  }
}

export default connectionDB;
