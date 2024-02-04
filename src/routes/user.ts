import { Router } from "express";
import {
  deleteUser,
  getOrCreateUser,
  getUser,
  updateUser,
} from "../controllers/user";
import { requireAuth } from "../middlewares/auth";
const router = Router();

router.get("/:id", getUser);
router.post("/", getOrCreateUser);
router.patch("/", requireAuth, updateUser);
router.delete("/", requireAuth, deleteUser);

export { router };
