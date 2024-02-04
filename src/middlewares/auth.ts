// middlewares for authentication and authorization
import { NextFunction, Request, Response } from "express";
import { Accommodation } from "../models/accommodation";
import { User } from "../models/user";
import { Post } from "../models/post";

export async function requireAuth(req: any, res: Response, next: NextFunction) {
  try {
    const email = req.headers["authorization"]; // email after parsing auth token
    if (email) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User is not registered." });
      } else {
        req.auth = {
          user,
        };
        return next();
      }
    }
    return res
      .status(401)
      .json({ message: "Please, sign in or login to continue" });
  } catch (e) {
    next(e);
  }
}

export function allowCreateAccommodation(req: any, res: any, next: any) {
  const user = req.auth.user;
  if (!user.permissions?.accommodation?.write) {
    return res.status(401).json({
      messsage:
        "Verify your account to be able to create or update an accommodation.",
    });
  }
  next();
}

export async function allowModifyAccommodation(req: any, res: any, next: any) {
  try {
    const user = req.auth.user;
    const id = req.params.id;
    const accommodation = await Accommodation.findById(id);
    if (!accommodation) {
      return res.status(404).json({
        message: "The accommodation you are trying to modify does not exist",
      });
    }
    if (accommodation?.user?.toString() != user._id?.toString()) {
      return res.status(401).json({
        message: "You can't modify an accommodation you did not create",
      });
    }

    if (!user.permissions?.accommodation?.write) {
      return res.status(401).json({
        messsage: "Verify your account to be able to modify an accommodation.",
      });
    }
    next();
  } catch (e) {
    next(e);
  }
}

export function allowCreatePost(req: any, res: any, next: any) {
  const user = req.auth.user;
  if (!user.permissions?.post?.write) {
    return res.status(401).json({
      messsage:
        "Verify your account to be able to create or update an accommodation.",
    });
  }
  next();
}

export async function allowModifyPost(req: any, res: any, next: any) {
  try {
    const user = req.auth.user;
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        message: "The post you are trying to modify does not exist",
      });
    }
    if (post?.user?.toString() != user._id?.toString()) {
      return res.status(401).json({
        message: "You can't modify a post you did not create",
      });
    }

    if (!user.permissions?.post?.write) {
      return res.status(401).json({
        messsage: "Verify your account to be able to modify a post.",
      });
    }
    next();
  } catch (e) {
    next(e);
  }
}
