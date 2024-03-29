import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "../entity/user";
import { Button } from "../entity/button";
import { Template } from "../entity/template";
dotenv.config();

export const AppDataSource = new DataSource({
  url: process.env.PG_DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  type: "postgres",
  synchronize: false,
  logging: false,
  entities: [User, Button, Template],
  migrations: [],
  subscribers: [],
});

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.HOST,
//   port: 5432,
//   username: process.env.PG_USERNAME,
//   password: process.env.PASSWORD ,
//   database: process.env.DATABASE,
//   entities: [User],
//   synchronize: false,
//   logging: true,
// });
