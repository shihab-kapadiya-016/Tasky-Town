import mongoose from "mongoose";
import { Todo } from "../models/todo.model.js";
import {User} from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createTodo = asyncHandler(async (req,res) => {
    const {title, description, priority} = req.body

    if(!title) {
        throw new ApiError(401 , "title is required")
    }

    const newTodo = await Todo.create({
        title: title,
        description: description || "",
        priority: priority
    })

    await User.findByIdAndUpdate(req.user._id, {
        $push: {todos: newTodo._id}
    })

    res
    .status(200)
    .json(
        new ApiResponse(200, newTodo,"Todo added Successfully ")
    )
})

const deleteTodo = asyncHandler(async (req,res) => {
    try {
        const { id } = req.params
        console.log(id)

        
        
        console.log(req.user._id)
        const deletedTodo = await Todo.findByIdAndDelete({ _id: id, user: req.user._id})
        
    
        if(!deletedTodo) {
            throw new ApiError(404, "Todo not found")
        }
    
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {todos: id}
        })
    
        res
        .status(200)
        .json(
            new ApiResponse(200, "todo deleted successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Error while deleting todo" + " " + error.message)
    }    
})

const toggleIsComplete = asyncHandler(async (req,res) => {
    try {
        const {id} = req.params
    
    
        const todo = await Todo.findById({ _id: id, user: req.user._id });
    
        if(!todo) {
            throw new ApiError(404, "Todo not found")
        }
    
        todo.isCompleted = !todo.isCompleted
        await todo.save({validateBeforeSave:true})
    
        res
        .status(200)
        .json(
            new ApiResponse(200, "Status Updated Successfully")
        )
        
    } catch (error) {
        throw new ApiError(500, "ERROR while updating todo" + " " + error.message)
    }
})

const updatePriority = asyncHandler(async (req,res) => {
    try {
        const {id} = req.params
        const {priority} = req.body
        
        console.log(id + " " + priority)    


        if(!priority) {
            throw new ApiError(401 , "Priority is Missing")
        }
    
        const todo = await Todo.findById({ _id: id, user: req.user._id });
    
        if(!todo) {
            throw new ApiError(404, "Todo not found")
        }
    
        todo.priority = priority
        await todo.save({validateBeforeSave:true})
    
        res
        .status(200)
        .json(
            new ApiResponse(200, "priority Updated Successfully")
        )
        
    } catch (error) {
        throw new ApiError(500, "ERROR while updating todo" + " " + error.message)
    }
})

const updateTitle = asyncHandler(async (req,res) => {
    const {id} = req.params
    const {title} = req.body

    if(!title) {
        throw new ApiError(401, "Please provide the title")
    }

    const updatedTodo = await Todo.findById({ _id:id, user: req.user._id })

    updatedTodo.title = title
    updatedTodo.save()

    res
    .status(200)
    .json(
        new ApiResponse(200, "title updated successfully", updatedTodo)
    )
}) 


const updateDescription = asyncHandler(async (req,res) => {
    const {id} = req.params
    const {description} = req.body

    if(!description) {
        throw new ApiError(401, "Please provide the title")
    }

    const updatedTodo = await Todo.findById({ _id:id, user: req.user._id })

    updatedTodo.description = description
    updatedTodo.save()

    res
    .status(200)
    .json(
        new ApiResponse(200, "title updated successfully", updatedTodo)
    )

}) 

export {
    createTodo,
    deleteTodo,
    toggleIsComplete,
    updatePriority,
    updateDescription,
    updateTitle
}