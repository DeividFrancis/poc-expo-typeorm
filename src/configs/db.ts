import * as SQLite from "expo-sqlite";
import { DataSource, DataSourceOptions } from "typeorm";
import { entities } from "../models";

export const config: DataSourceOptions = {
  database: "todolist.db",
  type: "expo",
  driver: SQLite,
  entities: entities,
  logging: true,
  synchronize: true,
};

const configTest: DataSourceOptions = {
  database: ":memory:",
  type: "sqlite",
  entities: entities,
  synchronize: true,
  // logging: true,
};

const configFinal = process.env.NODE_ENV == "test" ? configTest : config;

export const conn = new DataSource(configFinal);
