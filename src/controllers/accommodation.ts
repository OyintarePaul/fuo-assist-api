import { NextFunction, Request, Response } from "express";
import { Accommodation } from "../models/accommodation";

export async function getAllAccommodations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const query = req.query;
    const result = await Accommodation.find(query);

    if (result.length == 0) {
      return res.status(404).json({ message: "No accommodations found." });
    }
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
}

export async function createAccommodation(
  req: any,
  res: Response,
  next: NextFunction
) {
  const filter = {
    ...req.body,
    user: req.auth.user?._id,
  };
  const accommodation = new Accommodation(filter);
  try {
    const result = await accommodation.save();
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
}

export async function getAccommodation(req: Request, res: Response, next: any) {
  try {
    const id = req.params.id;
    const result = await Accommodation.findById(id);
    if (!result) {
      return res
        .status(404)
        .json({ message: "This accommodation does not exist" });
    }
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
}

export async function updateAccommodation(req: any, res: any, next: any) {
  try {
    const id = req.params.id;
    const accommodation = await Accommodation.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(accommodation);
  } catch (e) {
    next(e);
  }
}

export async function deleteAccommodation(req: any, res: any, next: any) {
  try {
    const id = req.params.id;
    const deleted = await Accommodation.findByIdAndDelete(id);
    res.status(200).json({ message: "Successfully Deleted" });
  } catch (e) {
    next(e);
  }
}
