import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const registerUser = asyncHandler(async (req, res) => {
    // get the data from the frontend client

    const { name, email, password } = req.body;

    // validation not empty fields

    if (name === "" || email === "" || password === "") {
        throw new ApiError(400, "All fields are required!");
    }

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
    });
});

export { registerUser };
