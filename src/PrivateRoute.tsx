import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Authentication from './security/authentication'

const PrivateRoute = () => {
	return Authentication.isAuthenticated
		? <Outlet />
		: <Navigate to="/login" replace />
}

export default PrivateRoute
