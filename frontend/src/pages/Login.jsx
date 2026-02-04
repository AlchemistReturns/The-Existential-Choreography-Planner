import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../providers'

const Login = () => {
    const navigate = useNavigate()
    const { login, error } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setFormError('')
        setLoading(true)

        const result = await login(formData.email, formData.password)

        setLoading(false)

        if (result.success) {
            navigate('/dashboard')
        } else {
            setFormError(result.error)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1>Login</h1>
                {(formError || error) && (
                    <div className="error-message">{formError || error}</div>
                )}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="auth-link">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
