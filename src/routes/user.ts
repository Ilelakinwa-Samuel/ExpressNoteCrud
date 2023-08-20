import express, { Request, Response, NextFunction } from "express";
import {
  signup,
  get_users,
  update_User,
  delete_User,
  get_User,
  Login,
  Logout,
} from "../controller";
const router = express.Router();

router.post("/create", signup);
router.post("/login", Login);
router.get("/read", get_users);
router.put("/update/:id", update_User);
router.delete("/delete/:id", delete_User);
router.get("/users/:id", get_User);
router.get("/logout", Logout);

export default router;
