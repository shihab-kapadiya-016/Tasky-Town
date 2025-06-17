import mongoose from "mongoose"
import {asyncHandler} from "../utils/AsyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"



// options for cookies

const options = {
            httpOnly: true,
            secure: true,
        }    

const generateAccessAndRefreshTokens = async (userId) => { 
    try {
        const user = await User.findById(userId)
    
        if (!user) {
            throw new ApiError(404, "User not found")
        }
    
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
    
        return {accessToken, refreshToken}
    
    } catch (error) {
        throw new ApiError(500, "Error while generating tokens: " + error.message)
    }
}

const refershAccessToken = asyncHandler(async (req,res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is required")
    }

    const decodedRefreshToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    if(!decodedRefreshToken) {
        throw new ApiError(401, "Refresh token is expired or invalid")
    }

    const user = await User.findById(decodedRefreshToken._id)

    if(!user) {
        throw new ApiError(404, "User not found")
    }

    if(user.refreshToken !== incomingRefreshToken) {
        throw new ApiError(403, "Invalid refresh token")
    }

    const {accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    user.refreshToken = refreshToken
    await user.save()


    res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(new ApiResponse(200, "Tokens refreshed successfully"));
})

const registerUser = asyncHandler(async ( req, res ) => {
    try {
        // get data from body
    
        const { username , email , password } = req.body
    
        // Validate data
        if([ username , email , password ].some(field => field.trim() === "")) {
            throw new ApiError(400, "All fields are required")
        }

        // check if user already exists
    
        const existedUser = await User.findOne({
            $or: [{ email }, { username }]
        })

    
        if(existedUser) {
            throw new ApiError(400, "User already exists")
        }
    
        //handle the file upload
    
        const profilePictureFilePath = req?.file?.path


        if(!profilePictureFilePath) {
            throw new ApiError(400, "Profile picture is required")
        }
    
        // upload the file to cloudinary
        const profilePicture = await uploadOnCloudinary(profilePictureFilePath)

        
    
        // create user
    
        await User.create({
            username,
            email,
            password,
            profilePicture: profilePicture.url || ""
        })
    
        const createdUser = await User.findOne({ username }).select("-password -refreshToken")
        
    
        res.status(201).json(
            new ApiResponse(201, createdUser, "User registered successfully")
        )
    } catch (error) {
        throw new ApiError(500, error.message)
    }
        
}) 

const loginUser = asyncHandler(async (req,res) => {

    try {
        const {email, password} = req.body
    
        if([email,password].some(field => field.trim() === "")) {
            throw new ApiError(400, "All fields are required")
        }
    
        const user = await User.findOne({email})
    
        if (!user) {
            throw new ApiError(404, "User not found")
}
    
        if(!( await  user.isPasswordCorrect(password))) {
            throw new ApiError(401, "Invalid Password")
        }
    
        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
        
        user.refreshToken = refreshToken
        await user.save()
        
    
        res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, "User logged in successfully")
        )
    } catch (error) {
        throw new ApiError(500, "error while logging in user" + " " + error.message)
    }


})

const logoutUser = asyncHandler(async (req,res) => {
    try {
        
        await User.findByIdAndUpdate(req.user._id,{
            $set: {
                refreshToken: ""
            }
            
        },
        {
            new: true,
        })
    
        res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(
            new ApiResponse(200, "User logged out successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Error while logging out" + " " + error.message)
    }
})

const updatePassword = asyncHandler(async (req,res) => {
    try {
        const {newPassword} = req.body
    
        if(!newPassword) {
            throw new ApiError(401, "Password is required")
        }
        
        const user = await User.findById(req.user._id)
    
        if(!user) {
            throw new ApiError(404, "User not found")
        }
    
        user.password = newPassword
    
        user.save()
    
        res
        .status(200)
        .json(
            new ApiResponse(200, "Password changed successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Error while changing password" + " " + error.message)
    }
})

const updateProfileImage = asyncHandler(async (req,res) => {
    const profilePictureFilePath = req.file?.path

    if(!profilePictureFilePath) {
        throw new ApiError(401, "Profile picture is required")
    }

    const profilePicture = await uploadOnCloudinary(profilePictureFilePath)

    const user = await User.findById(req.user._id)

    user.profilePicture = profilePicture.url
    user.save()

    res
    .status(200)
    .json(
        new ApiResponse(200, "Profile Picture changed successfully")
    )

})

const updateUsername = asyncHandler(async (req,res) => {
    const {username} = req.body

    if(!username) {
        throw new ApiError(401, "Please enter the username")
    }

    const user = await User.findById(req.user._id)

    user.username = username
    user.save()

    res
    .status(200)
    .json(
        new ApiResponse(200, "Username changed successfully")
    )
})

const deleteUser = asyncHandler(async (req,res) => {
    User.findByIdAndDelete(req.user._id)

    res.status(200).json(new ApiResponse(200, "User deleted successfully"))
}) 

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select(" -refreshToken");
    
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(
        new ApiResponse(200, user)
    );
});

const getTodos = asyncHandler(async (req,res) => {
    try {
                    const userTodo = await User.aggregate([
            {
                $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
    }
    },
            {
                $lookup: {
                from: "todos",
                localField: "todos",
                foreignField: "_id",
                as: "todo"
                }
            },
            {
                $project: {
                username: 1,
                email: 1,
                todo: 1
                }
            }
]);

    
    res
        .status(200)
        .json(
        new ApiResponse(200, userTodo,"todo got successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Error while getting todos" + " " + error.message)   
    }

})





export { 
    registerUser,
    loginUser,
    logoutUser,
    refershAccessToken,
    updatePassword,
    updateProfileImage,
    updateUsername,
    deleteUser,
    getUser,
    getTodos
}