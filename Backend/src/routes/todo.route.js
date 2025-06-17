import { Router } from "express";
import { 
    toggleIsComplete, 
    createTodo, 
    deleteTodo, 
    updateDescription, 
    updatePriority, 
    updateTitle } 
    from "../controllers/todo.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router()


router.route("/create-todo").post(verifyJWT,createTodo)
router.route("/delete-todo/:id").delete(verifyJWT,deleteTodo)
router.route("/toggle-complete/:id").patch(verifyJWT, toggleIsComplete)
router.route("/update-priority/:id").patch(verifyJWT,updatePriority)
router.route("/update-title/:id").patch(verifyJWT, updateTitle)
router.route("/update-description/:id").patch(verifyJWT, updateDescription)

export default router