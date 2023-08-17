import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../model/user";
const jwtsecret = process.env.JWT_SECRET as string;

export async function auth(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    //re.cookies.jwt
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ Error: "Kindly sign in as a user" });
    }

    const token = authorization.slice(7, authorization.length);
    let verified = jwt.verify(token, jwtsecret);

    if (!verified) {
      return res
        .status(401)
        .json({ Error: "Token invalid, you cannot access this route" });
    }

    const { id } = verified as { [key: string]: string };

    //find user by id:
    const user = await User.findOne({ where: { id } });

    if (!user) {
      res.status(401).json({ Error: "Kindly sign in as a user" });
    }
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ Error: "User not logged In" });
  }
}
