import express, { Request, Response, NextFunction } from "express";
import { signup } from "../controller/user";

const router = express.Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource from users");
});
router.post("/", signup);

export default router;
