import React, { useEffect, useState } from 'react'

// pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {


    return (
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <h1 className="text-6xl font-bold text-orange-500 mb-10 mt-22">Welcome to Tasky Town 🏙️</h1>
            <p className="text-gray-700 text-2xl mb-8">
                Your tasks, your rules. Organize your life with ease and simplicity.
            </p>

            <div className="flex justify-center gap-12">
                <Link
                    to="/register"
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg text-2xl hover:bg-orange-600 transition-all"
                >
                    Get Started
                </Link>

                <Link
                    to="/about"
                    className="text-orange-500 border text-2xl border-orange-500 px-6 py-3 rounded-lg hover:bg-orange-50 transition-all"
                >
                    About
                </Link>
            </div>
        </div>
    );
};

export default Home;
