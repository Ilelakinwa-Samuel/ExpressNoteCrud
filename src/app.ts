import { config } from "dotenv";
import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";

const app = express();

console.log(app.get("env"));

// view engine setup
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

if (process.env.NODE_ENV === "development") {
  console.log(process.env.NODE_ENV);
  app.use(logger("dev"));
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(bodyParser.json());

import usersRouter from "./routes/user";
import notesRouter from "./routes/notes";
// import homePage from "./routes/page";

import { db } from "./config";

db.sync()

  .then(() => {
    console.log("database connected");
  })
  .catch((err: any) => {
    console.log("err syncing db", err);
  });
config();
//console.log(process.env);

const myLogger = function (req: Request, res: Response, next: NextFunction) {
  console.log("LOGGED");
  next();
};

app.use("/api/note", notesRouter);
app.use("/api/user", usersRouter);
// app.use("/", homePage);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(
  () =>
    (
      err: createError.HttpError,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    }
);

//PORT

export default app;
