import mongoose, { Schema } from "mongoose";

const UrlSchema = new Schema(
  {
    longUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    expiresAt: {
      type: Date,
      required: true,
      default: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
  {
    timestamps: true,
  }
);

export const Url = mongoose.models.Url || mongoose.model("Url", UrlSchema);
