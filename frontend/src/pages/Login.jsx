import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        // TODO: Implement actual login logic
        localStorage.setItem('token', 'dummy-token')
        navigate('/dashboard')
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" />
                    </div>
                    <button type="submit" className="btn-primary">Login</button>
                </form>
                <p className="auth-link">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
