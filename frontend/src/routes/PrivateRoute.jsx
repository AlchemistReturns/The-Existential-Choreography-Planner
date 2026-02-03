import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    // TODO: Replace with actual auth logic (e.g., from AuthContext or localStorage)
    const isAuthenticated = localStorage.getItem('token')

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute
