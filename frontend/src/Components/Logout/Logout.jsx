import axios from "axios"
import React, { useEffect } from 'react'
import { useState } from 'react';
import api from '../../axios';

export function Logout(props) {
    
    const [isLoggedOut, setIsLoggedOut] = useState(false)

    useEffect(()=> {
        ;(async () => {
            try {
                const response = await api.post('/users/logout', {withCredentials:true})
                console.log(response)
                setIsLoggedOut(true)
                setTimeout(() => {
                    window.location.reload();
                    }, 1500); //

            } catch (error) {
                console.log(error.response.data)
            }
        })()
    })

    

    return ( isLoggedOut ? 
        (
            <div className="flex items-center justify-center h-screen bg-white">
                <div className="text-center p-8 border rounded-2xl shadow-lg max-w-md">
                    <h1 className="text-3xl font-bold text-orange-500 mb-4">You’ve been logged out ✅</h1>
                    <p className="text-gray-600">We hope to see you again soon!</p>
                </div>
                </div>
    ) : 
    (
            <div className="flex items-center justify-center mt-50 bg-white text-">
                <div className="text-center p-8 border rounded-2xl  shadow-lg max-w-md">
                <h1 className="text-4xl font-bold text-orange-500 mb-4">Logging you out...</h1>
                <p className="text-gray-600 text-xl">Please wait while we safely end your session.</p>
    </div>
    </div>
) 
)
}