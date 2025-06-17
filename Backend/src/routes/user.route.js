import { Router } from "express";
import { 
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
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "..//middlewares/auth.middleware.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router();


router.route("/me").get(verifyJWT, (req,res) =>  {
    res
    .status(200)
    .json(
        new ApiResponse(200, "User is loggedIn")
)
})


router.route("/register").post(upload.single("profileImage"),registerUser);
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT , logoutUser)
router.route("/refresh-token").post(refershAccessToken)
router.route("/update-password").post(verifyJWT , updatePassword)
router.route("/update-profile-picture").post(verifyJWT, upload.single("profilePicture"), updateProfileImage)
router.route("/update-username").post(verifyJWT, updateUsername)
router.route("/delete-user").post(verifyJWT,deleteUser)
router.route("/User").get(verifyJWT, getUser)
router.route("/get-todos").get(verifyJWT, getTodos)

export default router   