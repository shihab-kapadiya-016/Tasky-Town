import mongoose, { model, Schema } from "mongoose";

const todoSchema = Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        trim: true,
        default: ""
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

export const Todo = model("Todo", todoSchema)