import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [preview, setPreview] = useState(null);

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [registered, setRegistered] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file)
    if (file) setPreview(URL.createObjectURL(file));
};

    const handleSubmit = async (e) => {
        e.preventDefault()
    try {
            setError(false)
            setLoading(true)
            const formData = new FormData
            formData.append("username", username)
            formData.append("email",email)
            formData.append("password",password)
            if(profileImage ) {
                formData.append("profileImage", profileImage)
            }
    
            const response = await axios.post("/users/register", formData)

            setRegistered(true)
            setUsername("")
            setEmail("")
            setPassword("")
            setProfileImage("")
            setPreview(null)    
    } catch (error) {
        setError(true)
        console.error("Registeration failed:" , error.response?.data || error.message)
        setErrorMessage(error.response.data.message)
    } finally {
        setLoading(false)
    }

}

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-md bg-white border border-orange-300 rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">Create Account</h2>
            {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            Registration failed. {errorMessage}
            </div> 
        )}
            {registered && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm text-center">
            Registration successful! You can now log in.
            </div>
        )}
            {loading && (
            <div className="text-orange-500 text-sm text-center mb-4">
            Registering your account...
            </div>
        )}


            <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Profile Image Upload */}
            <div className="text-center">
                <label className="block mb-2 text-sm text-gray-600">Profile Image</label>
                {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-2 border border-orange-300"
                />
                )}
                <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-100 file:text-orange-600 hover:file:bg-orange-200 cursor-pointer"
                
                />
            </div>

            {/* Username */}
            <div>
                <label className="block text-sm text-gray-600 mb-1">Username</label>
                <input
                type="text"
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                type="email"
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm text-gray-600 mb-1">Password</label>
                <input
                type="password"
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
            >
                Sign Up
            </button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 hover:underline">
                Log in
            </Link>
            </p>
        </div>
        </div>
    );
};

export default Register;
