import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))



//* Routes importing
import userRouter  from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js"
// Routes declaration

app.use("/api/v1/users", userRouter)
app.use("/api/v1/todo", todoRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    const errors = err.errors || [];

    res.status(statusCode).json({
        success: false,
        message,
        errors,
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
})




export { app }