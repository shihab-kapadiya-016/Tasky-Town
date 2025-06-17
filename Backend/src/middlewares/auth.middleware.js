import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken"

const  verifyJWT = asyncHandler(async (req,res,next) => {
    try {
        const token = req.cookies.accessToken  || req.header("authorization")?.replace("Bearer ", "")
    
        if(!token) {
            throw new ApiError(401, "Access token used or expired")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken._id).select("-password -refreshToken")
    
        if(!user) {
            throw new ApiError(404, "User not found")
        }
    
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(500, "error while verifying user" + " " + error.message)
    }
})  



export {verifyJWT}