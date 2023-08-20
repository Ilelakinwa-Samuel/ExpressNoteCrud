import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../model/user";
import { config } from "dotenv";

config();
const jwtsecret = process.env.JWT_SECRET as string;

export async function auth(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    // using - req.headers.authorization;

    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ error: "Kindly sign in as a user" });
    }

    const token = authorization.slice(7, authorization.length);

    let verified = jwt.verify(token, jwtsecret);

    if (!verified) {
      return res
        .status(401)
        .json({ error: "Token invalid, you can't access this route" });
    }
    const { id } = verified as { [key: string]: string };

    //find user by id - mongoosse, change this...

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(401).json({ error: "User not found, kindly Register" });
    }

    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: "User not logged In" });
  }
}
