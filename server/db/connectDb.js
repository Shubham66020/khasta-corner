/* global process */
import mongoose from "mongoose";
import { db_name } from "../constants.js";
import app from "../app.js";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${db_name}`
        );

        console.log(
            "Database connected successfully",
            connectionInstance.connection.host
        );

        app.on("error", (err) => {
            console.log("Database not getting connected", err);
        });
    } catch (err) {
        console.log("Databasae connection failed", err);
        process.exit(1);
    }
};

export { connectDb };
