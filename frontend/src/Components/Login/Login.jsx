import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../axios";

const Login = () => {
    
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loggedin, setLoggedIn] = useState(false)
    const [errorMessage , setErrorMessage] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        
        try{   

            setError(false)
            setLoading(true)

            // const formData = new FormData()
            // formData.append("email",email)
            // formData.append("password",password)

            const response = await api.post("/users/login", {
                email , password
            })
            setPassword("")
            setEmail("")
            setLoggedIn(true)

            navigate("/account")
            window.location.reload()
        

        }catch (error) {
            setError(true)
            console.error("Registeration failed:" , error.response?.data || error.message)
            setErrorMessage(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }


return (
<div className="mt-30 flex items-center justify-center bg-white px-4">
    <div className="w-full pb-10 max-w-md bg-white border border-orange-300 rounded-xl shadow-md p-8">
    <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
        Log In
    </h2>

    {error && (
        <div className="text-red-500 text-sm text-center mb-4">{errorMessage}</div>
    )}

    {loading && (
            <div className="text-orange-500 text-sm text-center mb-4">
            Finding your account...
            </div> 
        )}
    {loggedin && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm text-center">
            Registration successful!You are now Logged in
            </div>
        )}


    <form className="space-y-4" onSubmit={handleLogin}>
        {/* Email */}
        <div>
        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input
            type="email"
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        </div>

        {/* Password */}
        <div>
        <label className="block text-sm text-gray-600 mb-1">Password</label>
        <input
            type="password"
            className="w-full mb-3 px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        </div>

        {/* Submit */}
        <button
        type="submit"
        className={`w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
        disabled={loading}
        >
        {loading ? "Logging in..." : "Log In"}
        </button>
    </form>

    <p className="text-sm text-center text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-orange-500 hover:underline">
        Sign Up
        </Link>
    </p>
    </div>
</div>
);
}

export default Login