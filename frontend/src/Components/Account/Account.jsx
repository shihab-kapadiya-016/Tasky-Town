import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios"
import api from '../../axios';

const Account = () => {

    const [user,setUser] = useState()

    // const tempUser = {
    //     email: "s@sh.com",
    //     username: "shihab",
    //     profilePicture: "http://res.cloudinary.com/dugi8cyh7/image/upload/v1749982857/spocasoyq"
    // }

    // setUser(tempUser)

    useEffect( () => {
        ;(async () => {
            try {
                const response = await api.get('/users/User')
                setUser(response.data.data)
                
            } catch (error) {
                console.log(error.response)
            }
        })()
    }, [])
    


    return (
        <div className="mt-10 flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-md bg-white border border-orange-300 rounded-xl shadow-md p-8 text-center">
            <h2 className="text-3xl font-bold text-orange-500 mb-6">Your Account</h2>

            {user ? (
            <>
                <img
                src={user.profilePicture || "/default-avatar.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border"
                />
                <h3 className="text-xl font-semibold text-gray-800">{user.username}</h3>
                <p className="text-gray-600 mb-4">{user.email}</p>
            </>
            ) : (
            <p className="text-gray-600">Loading your info...</p>
            )}
        </div>
        </div>
    );
};

export default Account;