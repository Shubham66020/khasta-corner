/* global process */
import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECERET,
});

const uploadFiles = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const result = await cloudinary.v2.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        fs.unlinkSync(localFilePath);

        return result.url;
    } catch (error) {
        console.error("Cloudinary upload error", error);

        fs.unlinkSync(localFilePath);
2
        console.error("error uploading the file", error).json({
            message: "error uploading",
            error: error.message,
        });
    }
};

export { uploadFiles };
