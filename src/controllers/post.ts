import { NextFunction, Request, Response } from "express";
import { Post } from "../models/post";

export async function getPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await Post.find();

    if (result.length == 0) {
      return res.status(404).json({ message: "No posts found." });
    }
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
}

export async function createPost(req: any, res: Response, next: NextFunction) {
  const filter = {
    ...req.body,
    user: req.auth.user?._id,
  };
  const post = new Post(filter);
  try {
    const result = await post.save();
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
}

export async function getPost(req: Request, res: Response, next: any) {
  try {
    const id = req.params.id;
    const result = await Post.findById(id);
    if (!result) {
      return res.status(404).json({ message: "This post does not exist" });
    }
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
}

export async function updatePost(req: any, res: any, next: any) {
  try {
    const id = req.params.id;
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(post);
  } catch (e) {
    next(e);
  }
}

export async function deletePost(req: any, res: any, next: any) {
  try {
    const id = req.params.id;
    const deleted = await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post was successfully deleted" });
  } catch (e) {
    next(e);
  }
}
