import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const LoginPage: React.FC = () => {
    const [showPass, setShowPass] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef  = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const email = emailRef.current?.value.trim() ?? '';
        const pass  = passRef.current?.value ?? '';
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const passOk  = pass.length > 0;
        setEmailError(!emailOk);
        setPassError(!passOk);
        if (emailOk && passOk) navigate('/dashboard');
    };

    return (
        <div className="login-root">
            {/* Top Bar */}
            <header className="login-topbar">
                <Link to="/" className="login-logo">
                    <img src="https://www.transcriptioncertificationinstitute.org/images/tci-logo.png" alt="TCI Logo" />
                </Link>
            </header>

            {/* Main */}
            <main className="login-main">
                <div className="login-form-container">
                    <div className="login-form-header">
                        <h1>Welcome Back</h1>
                        <p>Sign in to continue your learning journey.</p>
                    </div>

                    <div className="login-card">
                        {/* Social Login */}
                        <div className="login-social-row">
                            <button type="button" className="login-social-btn">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                                Continue with Google
                            </button>
                            <button type="button" className="login-social-btn">
                                <img src="https://www.svgrepo.com/show/448234/facebook.svg" alt="Facebook" />
                                Continue with Facebook
                            </button>
                        </div>

                        <div className="login-divider"><span>or sign in with email</span></div>

                        <form noValidate onSubmit={handleSubmit}>
                            {/* Email */}
                            <div className={`login-form-group${emailError ? ' has-error' : ''}`}>
                                <label className="login-label" htmlFor="email">Email Address</label>
                                <div className="login-input-icon-wrap">
                                    <span className="login-input-icon">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="#94a3b8" strokeWidth="1.4" />
                                            <path d="M2 5l6 5 6-5" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <input ref={emailRef} type="email" id="email" className="login-input" placeholder="you@example.com" autoComplete="email" />
                                </div>
                                <span className="login-error-msg">Please enter a valid email address.</span>
                            </div>

                            {/* Password */}
                            <div className={`login-form-group${passError ? ' has-error' : ''}`}>
                                <div className="login-label-row">
                                    <label className="login-label" htmlFor="password">Password</label>
                                    <a href="#!" className="login-forgot-link">Forgot password?</a>
                                </div>
                                <div className="login-input-icon-wrap" style={{ position: 'relative' }}>
                                    <span className="login-input-icon">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="#94a3b8" strokeWidth="1.4" />
                                            <path d="M5 7V5a3 3 0 016 0v2" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                    <input
                                        ref={passRef}
                                        type={showPass ? 'text' : 'password'}
                                        id="password"
                                        className="login-input"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        style={{ paddingRight: 44 }}
                                    />
                                    <button type="button" className="login-toggle-pass" onClick={() => setShowPass(v => !v)}>
                                        {showPass ? (
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="#4fb783" strokeWidth="1.4" />
                                                <circle cx="8" cy="8" r="2" stroke="#4fb783" strokeWidth="1.4" />
                                                <path d="M2 2l12 12" stroke="#4fb783" strokeWidth="1.4" strokeLinecap="round" />
                                            </svg>
                                        ) : (
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="#94a3b8" strokeWidth="1.4" />
                                                <circle cx="8" cy="8" r="2" stroke="#94a3b8" strokeWidth="1.4" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <span className="login-error-msg">Please enter your password.</span>
                            </div>

                            {/* Remember me */}
                            <div className="login-remember-row">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember">Remember me for 30 days</label>
                            </div>

                            <button type="submit" className="login-cta-btn">
                                Sign In
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </form>

                        <div className="login-ssl-note">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <rect x="2" y="5" width="8" height="6" rx="1" stroke="#94a3b8" strokeWidth="1.2" />
                                <path d="M4 5V3.5a2 2 0 014 0V5" stroke="#94a3b8" strokeWidth="1.2" />
                            </svg>
                            Your information is protected by 256-bit SSL encryption
                        </div>
                    </div>

                    {/* Trust strip */}
                    <div className="login-trust-strip">
                        <div className="login-trust-item">
                            <div className="login-trust-icon">
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                    <path d="M6.5 1.5L8.3 5.2l4.1.6-2.95 2.87.7 4.06L6.5 10.7l-3.65 1.93.7-4.06L.5 5.8l4.1-.6z" stroke="#4fb783" strokeWidth="1.2" strokeLinejoin="round" />
                                </svg>
                            </div>
                            Industry Certified
                        </div>
                        <div className="login-trust-item">
                            <div className="login-trust-icon">
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                    <circle cx="6.5" cy="6.5" r="5" stroke="#4fb783" strokeWidth="1.2" />
                                    <path d="M4 6.5l2 2 3-3" stroke="#4fb783" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            30-Day Money Back
                        </div>
                        <div className="login-trust-item">
                            <div className="login-trust-icon">
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                    <path d="M6.5 1.5v10M1.5 6.5h10" stroke="#4fb783" strokeWidth="1.2" strokeLinecap="round" />
                                    <circle cx="6.5" cy="6.5" r="5" stroke="#4fb783" strokeWidth="1.2" />
                                </svg>
                            </div>
                            Instant Access
                        </div>
                    </div>

                    <p className="login-signup-note">
                        Don't have an account? <Link to="/signup">Create one here</Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
