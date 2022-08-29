import { Server } from "http";
import express, { Express } from "express";

import { ExeptionFilter } from "./errors/exeption.filter";
import { UserController } from "./users/users.controller";
import { ILogger } from "./logger/logger.interface";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: ILogger;
  userController: UserController;
  exeptionFilter: ExeptionFilter;

  // Include all dependecies
  constructor(
    logger: ILogger,
    userController: UserController,
    exeptionFilter: ExeptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.exeptionFilter = exeptionFilter;
  }

  useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  useExceptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server start on: http://localhost${this.port}`);
  }
}
