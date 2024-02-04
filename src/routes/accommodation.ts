import { Router } from "express";
import {
  createAccommodation,
  getAccommodation,
  getAllAccommodations,
  updateAccommodation,
  deleteAccommodation,
} from "../controllers/accommodation";
import {
  allowCreateAccommodation,
  allowModifyAccommodation,
  requireAuth,
} from "../middlewares/auth";

const router = Router();
router.get("/", getAllAccommodations);
router.get("/:id", getAccommodation);
router.post("/", requireAuth, allowCreateAccommodation, createAccommodation);
router.patch(
  "/:id",
  requireAuth,
  allowModifyAccommodation,
  updateAccommodation
);
router.delete(
  "/:id",
  requireAuth,
  allowModifyAccommodation,
  deleteAccommodation
);

export { router };
