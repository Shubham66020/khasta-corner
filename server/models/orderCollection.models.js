import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuCollection",
    },
    quatity: {
        type: Number,
        required: true,
    },
});

const orderCollectionSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        serviceType: {
            type: String,
            enum: ["Dine-In", "Take-Away"],
        },
        items: [menuItemSchema],
        serviceCharge: {
            // Dynamic charge set by Admin
            type: Number,
            required: true,
        },
        totaAmount: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: ["Cash", "Online"]
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Refunded"]
        },
        orderStatus: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected", "Cancelled", "Completed"]
        },
        razorpayDetails: {
            type: Object
        }
    },
    { timestamps: true }
);

export const OrderCollection = mongoose.model(
    "OrderCollection",
    orderCollectionSchema
);
