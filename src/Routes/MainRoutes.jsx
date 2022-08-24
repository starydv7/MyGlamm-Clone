import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'

const MainRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Login/>}> </Route>
        </Routes>
    </div>
  )
}

export default MainRoutes