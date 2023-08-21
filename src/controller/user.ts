import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as UUIDV4 } from "uuid";
import { User } from "../model/user";
import {
  loginUserSchema,
  options,
  signupSchema,
  updateUserSchema,
} from "../utils/utils";

config();
const jwtsecret = process.env.JWT_SECRET as string;

export const signup = async (req: Request, res: Response) => {
  try {
    const {
      fullname,
      email,
      password,
      confirm_password,
      gender,
      phone,
      address,
    } = req.body;
    const newId = UUIDV4();

    //validate with joi or zoid
    const validatedResult = signupSchema.validate(req.body, options);
    if (validatedResult.error) {
      return res
        .status(400)
        .json({ Error: validatedResult.error.details[0].message });
    }

    // //HASH PASSWORD
    const passwordHash = await bcrypt.hash(password, 10);

    // //create User
    // //checking if user exist
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      let newUser = await User.create({
        id: newId,
        fullname,
        email,
        password: passwordHash,
        gender,
        phone,
        address,
      });

      //generate token for user
      const user = (await User.findOne({
        where: { email: email },
      })) as unknown as { [key: string]: string };

      const { id } = user;

      const token = jwt.sign({ id }, jwtsecret, { expiresIn: "30mins" });
      //USE LINE WHEN ITS COOKIE INSTEAD OF AUTHORISATION HEADER IN AUTH
      //res.cookie('token', token, {httpOnly:true, maxAge:30*60*1000})
      //SEND OTP TO THE USER

      //SEND EMAIL TOO
      return res.status(201).json({
        msg: "user created successfully",
        newUser,
        token,
      });
    }

    res.status(409).json({
      error: "email already taken",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: "Internal server error" });
  }
};

//LOGIN

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //validate with joi or zoid
    const validatedResult = loginUserSchema.validate(req.body, options);
    if (validatedResult.error) {
      // console.error(validatedResult.error.message);
      return res
        .status(400)
        .json({ Error: validatedResult.error.details[0].message });
    }

    //generate token for user

    const user = (await User.findOne({
      where: { email: email },
    })) as unknown as { [key: string]: string };

    const { id } = user;

    const token = jwt.sign({ id }, jwtsecret, { expiresIn: "30d" });
    //USE LINE WHEN ITS COOKIE INSTEAD OF AUTHORISATION HEADER IN AUTH
    req.headers = { ...req.headers, authorization: `Bearer ${token}` };
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    const validUser = await bcrypt.compare(password, user.password);

    if (validUser) {
      return res.status(200).json({
        msg: "You have successfully logged In",
        user,
        token,
      });
    }
    res;
    return res.status(400).json({ Error: "Invalid Email/Password" });
  } catch (err: any) {
    res.status(401).json({ err: err.message });
    // console.log(err);
    // return res.status(500).json({ Error: "Internal server error" });
  }
};

// GET USERS

export async function get_users(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Find all users
  const users = await User.findAll();
  users.every((user) => user instanceof User); // true

  if (users) {
    return res.status(200).json({
      message: users,
    });
  }
  return res.status(404).json({
    message: "No user exist",
  });
}

//GET USER
export async function get_User(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.body.id);
  const user = await User.findByPk(req.body.id);

  console.log({ user });
  console.log(req.body);
  return res.status(200).json({
    user,
  });
}

// UPDATE USER

export const update_User = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { id } = req.params;
    const id = req.params.id;

    const { fullname, email, gender, phone, address } = req.body;

    //validate with joi
    const validatedResult = updateUserSchema.validate(req.body, options);

    if (validatedResult.error) {
      return res.status(400).json({
        Error: validatedResult.error.details[0].message,
      });
    }

    const userUpdate = await User.findOne({ where: { id } });

    if (!userUpdate) {
      res.status(400).json({
        error: "Cannot find existing note",
      });
    }

    const correct = await userUpdate?.update({
      id,
      ...req.body,
    });

    return res.status(200).json({
      msg: "You have successfully updated your results",
      correct,
    });
  } catch (error) {
    console.log(error);
  }
};

// DELETE

export const delete_User = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const record = await User.findOne({ where: { id } });

    if (!record) {
      return res.status(404).json({ error: "Cannot find existing note" });
    }

    await record.destroy();

    return res.status(204).json({ msg: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
export const Logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.redirect("/login");
};
