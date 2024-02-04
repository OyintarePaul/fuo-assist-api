import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema(
  {
    lodge_name: { type: String },
    price: { type: Number, min: 0 },
    type: {
      type: String,

      enum: ["one-bedroom", "two-bedroom", "one-room", "self-contain"],
    },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    rating: { type: Number, min: 1, max: 5 },
    description: { type: String },
    has_water: { type: Boolean },
    has_light: { type: Boolean },
    comments: { type: [String] },
    directions: { type: [String] },
    thumbnails: { type: [String] },
    environmental_quality: {
      type: String,
      enum: ["good", "excellent", "fair", "poor", "average"],
    },
    distance_from_school: {
      type: String,
      enum: ["far", "near", "very-near", "very-far"],
    },
  },
  { timestamps: true }
);

const Accommodation = mongoose.model("Accommodation", accommodationSchema);
export { Accommodation };
