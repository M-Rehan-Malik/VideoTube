import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (filePath: string) => {
    if (!filePath) {
        throw new Error('File path is required');
    }
    const file = await cloudinary.uploader.upload(filePath, {
        resource_type: "auto",
    })

    if (!file) {
        throw new Error('Failed to upload file to Cloudinary');
    }

    fs.unlinkSync(filePath);
    return file;
}

export const deleteFromCloudinary = async (fileID: string) => {
    if (!fileID) {
        throw new Error('File ID is required');
    }

    await cloudinary.uploader.destroy(fileID)
}