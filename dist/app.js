"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
console.log(app.get("env"));
// view engine setup
app.set("views", path_1.default.join(__dirname, "..", "views"));
app.set("view engine", "ejs");
if (process.env.NODE_ENV === "development") {
    console.log(process.env.NODE_ENV);
    app.use((0, morgan_1.default)("dev"));
}
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.use(body_parser_1.default.json());
const user_1 = __importDefault(require("./routes/user"));
const notes_1 = __importDefault(require("./routes/notes"));
// import homePage from "./routes/page";
const config_1 = require("./config");
config_1.db.sync()
    .then(() => {
    console.log("database connected");
})
    .catch((err) => {
    console.log("err syncing db", err);
});
(0, dotenv_1.config)();
//console.log(process.env);
const myLogger = function (req, res, next) {
    console.log("LOGGED");
    next();
};
app.use("/api/note", notes_1.default);
app.use("/api/user", user_1.default);
// app.use("/", homePage);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(() => (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
//PORT
exports.default = app;
