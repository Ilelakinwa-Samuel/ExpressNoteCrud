import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import { User } from "../model/user";
import { v4 as uuidv4 } from "uuid";

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource from users");
});
router.post(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    const newId = uuidv4();
    const { username, email, password } = req.body;
    const newUser = await User.create({
      id: newId,
      username,
      email,
      password,
    });
    console.log(newUser);
    res.status(201).json({
      data: {
        newUser,
      },
    });
  }
);

export default router;
