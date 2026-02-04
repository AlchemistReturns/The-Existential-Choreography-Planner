import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const API_URL = 'http://localhost:3000/api/auth'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Initialize auth state from localStorage on mount
    useEffect(() => {
        const initAuth = async () => {
            const storedUser = localStorage.getItem('user')
            const accessToken = localStorage.getItem('accessToken')

            if (storedUser && accessToken) {
                setUser(JSON.parse(storedUser))
                // Optionally verify token by fetching profile
                try {
                    const response = await fetch(`${API_URL}/profile`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    })
                    if (response.ok) {
                        const data = await response.json()
                        setUser(data.user)
                        localStorage.setItem('user', JSON.stringify(data.user))
                    } else {
                        // Token expired, try refresh
                        await refreshAccessToken()
                    }
                } catch (err) {
                    console.error('Auth init error:', err)
                }
            }
            setLoading(false)
        }
        initAuth()
    }, [])

    // Refresh access token
    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
            logout()
            return null
        }

        try {
            const response = await fetch(`${API_URL}/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken })
            })

            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('accessToken', data.accessToken)
                localStorage.setItem('refreshToken', data.refreshToken)
                return data.accessToken
            } else {
                logout()
                return null
            }
        } catch (err) {
            console.error('Token refresh error:', err)
            logout()
            return null
        }
    }

    // Register new user
    const register = async (fullName, username, email, password) => {
        setError(null)
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, username, email, password })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed')
            }

            // Save tokens and user
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
            localStorage.setItem('user', JSON.stringify(data.user))
            setUser(data.user)

            return { success: true, user: data.user }
        } catch (err) {
            setError(err.message)
            return { success: false, error: err.message }
        }
    }

    // Login user
    const login = async (email, password) => {
        setError(null)
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Login failed')
            }

            // Save tokens and user
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
            localStorage.setItem('user', JSON.stringify(data.user))
            setUser(data.user)

            return { success: true, user: data.user }
        } catch (err) {
            setError(err.message)
            return { success: false, error: err.message }
        }
    }

    // Logout user
    const logout = async () => {
        const accessToken = localStorage.getItem('accessToken')

        // Call logout endpoint to invalidate refresh token
        if (accessToken) {
            try {
                await fetch(`${API_URL}/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
            } catch (err) {
                console.error('Logout error:', err)
            }
        }

        // Clear local storage and state
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        setUser(null)
        setError(null)
    }

    // Get access token (with auto-refresh if needed)
    const getAccessToken = async () => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) return null

        // Simple check - you could add JWT decode to check expiry
        return accessToken
    }

    const value = {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        register,
        login,
        logout,
        getAccessToken,
        refreshAccessToken
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export default AuthContext
