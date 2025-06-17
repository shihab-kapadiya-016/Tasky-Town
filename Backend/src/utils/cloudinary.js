import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import {ApiError} from "../utils/ApiError.js"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEYS,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (filePath) => {
    try {
        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
        })
        fs.unlinkSync(filePath)
        return response
    } catch (error) {
        fs.unlinkSync(filePath)
        throw new ApiError(500, "Error while uploading to Cloudinary" + " " + error.message, error)
    }
}

export {uploadOnCloudinary}