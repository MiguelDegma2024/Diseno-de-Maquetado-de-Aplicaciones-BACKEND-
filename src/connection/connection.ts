import { Sequelize } from "sequelize-typescript";
import { Product } from "../models/product";
import { User } from "../models/user";
import { Branch } from "../models/branch";

const connection = new Sequelize({
  database: "sisweb_db",
  dialect: "postgres",
  username: "sisweb_user",
  password: "HDK#$%Ljkwerff.89",
  storage: ":memory:",
  models: [Product, User, Branch],
});

async function connectionDB() {
  try {
    await connection.sync();
  } catch (e) {
    console.log(e);
  }
}

export default connectionDB;
