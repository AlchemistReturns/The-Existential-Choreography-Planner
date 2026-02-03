import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        // TODO: Implement actual registration logic
        navigate('/login')
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" placeholder="Enter your full name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Create a password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" placeholder="Confirm your password" />
                    </div>
                    <button type="submit" className="btn-primary">Register</button>
                </form>
                <p className="auth-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register
