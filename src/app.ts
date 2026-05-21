import express, { Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import routes from "./app/routes";
import NotFoundHandler from "./error/NotFoundHandler";
import cookieParser from "cookie-parser";
import corsOptions from "./util/corsOptions";

// const express = require("express");
// const cors = require("cors");
// const globalErrorHandler = require("./app/middleware/globalErrorHandler");
// const routes = require("./app/routes");
// const NotFoundHandler = require("./error/NotFoundHandler");
// const cookieParser = require("cookie-parser");
// const corsOptions = require("./util/corsOptions");

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/", routes);

app.get("/", async (req: Request, res: Response) => {
  res.json("Welcome to Mount Fuji");
});

app.use(globalErrorHandler);
app.use(NotFoundHandler.handle);

export = app;
