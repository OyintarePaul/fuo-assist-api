import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";

export async function getOrCreateUser(req: any, res: Response) {
  // check if user exists using their email
  // if user exist, send user info to front-end
  //if user does not exist, create new user and to front-end
  try {
    const email = req.headers["authorization"]; // parse the authorization header
    if (!email) {
      return res.status(400).json({ message: "Please, sign in to continue" });
    }
    let user = await User.findOne({ email });

    if (!user) {
      const newUser = new User({
        email,
      });
      newUser.permissions = {}; // used to set the defaults in the schema
      const result = await newUser.save();
      return res.status(201).json(result);
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    return res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateUser(req: any, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const currentUser = req.auth.user;
    const updated = await User.findOneAndUpdate(
      { email: currentUser.email },
      body,
      { new: true }
    );
    return res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
}

export async function deleteUser(req: any, res: Response, next: NextFunction) {
  try {
    const currentUser = req.auth.user;

    const deleted = await User.findByIdAndDelete(currentUser._id);

    return res
      .status(200)
      .json({ message: "This user has been successfully deleted" });
  } catch (e) {
    next(e);
  }
}
