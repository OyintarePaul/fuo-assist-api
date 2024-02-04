import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
  getPost,
} from "../controllers/post";
import {
  allowCreateAccommodation,
  allowCreatePost,
  allowModifyAccommodation,
  allowModifyPost,
  requireAuth,
} from "../middlewares/auth";

const router = Router();
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", requireAuth, allowCreatePost, createPost);
router.patch("/:id", requireAuth, allowModifyPost, updatePost);
router.delete("/:id", requireAuth, allowModifyPost, deletePost);

export { router };
