import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Layout } from './Layout.jsx'
import {
  Home,
  About,
  Register,
  Login,
  Todos,
  Account,
  Logout
} from "./Components/index.js"
import api from "./axios.js"

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [{
//       path: '',
//       element: <Home />
//     }]
//   }
// ])


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />}/>
      <Route path='about' element={<About />} />
      <Route path='register' element={<Register />} />
      <Route path= 'login' element= {<Login /> } />
      <Route path="todos" element={<Todos />}/>
      <Route path="account" element= {<Account />} />
      <Route path="logout" element={<Logout />} />


    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
