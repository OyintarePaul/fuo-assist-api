import mongoose from "mongoose";

const PermissionsSchema = new mongoose.Schema({
  post: {
    read: { type: Boolean, default: true },
    write: { type: Boolean, default: false },
  },
  accommodation: {
    read: { type: Boolean, default: true },
    write: { type: Boolean, default: false },
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    immutable: true,
  },
  phone: {
    type: String,
  },
  permissions: PermissionsSchema,
});

const User = mongoose.model("User", userSchema);
export { User };
