import mongoose from "mongoose";

const systemConfigSchema = new mongoose.Schema(
    {
        isShopOpen: {
            type: Boolean,
            default: false,
        },
        dineInCharge: {
            type: Number,
            default: 0,
        },
        takeAwayCharge: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const SystemConfig = mongoose.model("SystemConfig", systemConfigSchema);
