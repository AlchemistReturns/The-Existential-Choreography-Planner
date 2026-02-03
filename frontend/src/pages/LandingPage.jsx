import './LandingPage.css'

function LandingPage() {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-visual">
                    <div className="floating-shape shape-1"></div>
                    <div className="floating-shape shape-2"></div>
                    <div className="floating-shape shape-3"></div>
                </div>
                <div className="hero-content">
                    <span className="hero-badge">✨ Web Programming Project</span>
                    <h1 className="hero-title">
                        The <span className="text-gradient">Existential</span><br />
                        Choreography Planner
                    </h1>
                    <p className="hero-subtitle">
                        Design, organize, and perfect your dance choreographies with our intuitive
                        drag-and-drop planner. Collaborate with your team and bring your artistic vision to life.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn-primary">Get Started</button>
                        <button className="btn-secondary">Learn More</button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <div className="section-header">
                        <p className="section-label">Features</p>
                        <h2 className="section-title">Everything You Need to <span className="text-gradient">Choreograph</span></h2>
                        <p className="section-description">
                            Powerful tools designed for dancers, choreographers, and creative teams.
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card glass">
                            <div className="feature-icon">🎭</div>
                            <h3 className="feature-title">Drag & Drop Builder</h3>
                            <p className="feature-description">
                                Create stunning flowcharts and sequences with our intuitive drag-and-drop interface.
                                No technical skills required.
                            </p>
                        </div>

                        <div className="feature-card glass">
                            <div className="feature-icon">👥</div>
                            <h3 className="feature-title">Team Collaboration</h3>
                            <p className="feature-description">
                                Work together with your dance crew in real-time. Share ideas, provide feedback,
                                and sync your vision.
                            </p>
                        </div>

                        <div className="feature-card glass">
                            <div className="feature-icon">📝</div>
                            <h3 className="feature-title">Failure Log</h3>
                            <p className="feature-description">
                                Document what didn't work and learn from it. Upload detailed notes about
                                failed attempts for future reference.
                            </p>
                        </div>

                        <div className="feature-card glass">
                            <div className="feature-icon">📦</div>
                            <h3 className="feature-title">Archive & Organize</h3>
                            <p className="feature-description">
                                Archive completed choreographies and keep your workspace organized.
                                Access your history anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works">
                <div className="container">
                    <div className="section-header">
                        <p className="section-label">How It Works</p>
                        <h2 className="section-title">Three Simple <span className="text-gradient">Steps</span></h2>
                        <p className="section-description">
                            From concept to performance, we've got you covered.
                        </p>
                    </div>

                    <div className="steps">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h3 className="step-title">Create Your Project</h3>
                            <p className="step-description">
                                Start a new choreography project and define your goals, music, and team members.
                            </p>
                        </div>

                        <div className="step">
                            <div className="step-number">2</div>
                            <h3 className="step-title">Build Your Sequence</h3>
                            <p className="step-description">
                                Use our visual builder to map out movements, transitions, and formations.
                            </p>
                        </div>

                        <div className="step">
                            <div className="step-number">3</div>
                            <h3 className="step-title">Perform & Archive</h3>
                            <p className="step-description">
                                Execute your choreography, then archive it with notes for future inspiration.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team">
                <div className="container">
                    <div className="section-header">
                        <p className="section-label">Our Team</p>
                        <h2 className="section-title">Meet the <span className="text-gradient">Creators</span></h2>
                        <p className="section-description">
                            The passionate developers behind this project.
                        </p>
                    </div>

                    <div className="team-grid">
                        <div className="team-member glass">
                            <div className="team-avatar">119</div>
                            <h4 className="team-name">Team Member 119</h4>
                            <p className="team-role">Developer</p>
                        </div>

                        <div className="team-member glass">
                            <div className="team-avatar">220</div>
                            <h4 className="team-name">Team Member 220</h4>
                            <p className="team-role">Developer</p>
                        </div>

                        <div className="team-member glass">
                            <div className="team-avatar">226</div>
                            <h4 className="team-name">Team Member 226</h4>
                            <p className="team-role">Developer</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <span className="text-gradient">Choreography Planner</span>
                        </div>
                        <div className="footer-links">
                            <a href="#features" className="footer-link">Features</a>
                            <a href="#how-it-works" className="footer-link">How It Works</a>
                            <a href="#team" className="footer-link">Team</a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2026 The Existential Choreography Planner. Web Programming Project - Group 2.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage
