import React from 'react'
import { Header } from './Components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer/Footer'

export function Layout(props) {
    

    return (
        <>
            <div className="flex flex-col min-h-screen ">
        <Header />

        <main className="flex-grow">
            <Outlet />
        </main>

        <Footer />
        </div>
        </>
    )
}
