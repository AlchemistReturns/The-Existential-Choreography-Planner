import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
    // TODO: Replace with actual auth logic (e.g., from AuthContext or localStorage)
    const isAuthenticated = localStorage.getItem('token')

    // If authenticated, redirect to dashboard (prevents accessing login when already logged in)
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />
}

export default PublicRoute
