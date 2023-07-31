import express, { Request, Response, NextFunction } from "express";
import { User } from "../model/user";
import { v4 as uuidv4 } from "uuid";

export async function signup(req: Request, res: Response, next: NextFunction) {
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
