import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const COURSE_DATA: Record<string, { name: string; price: string; img: string }> = {
    gt:  { name: 'General Transcription',      price: '$499',    img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/generaltranscriptioncourse.jpg' },
    lt:  { name: 'Legal Transcription',         price: '$649',    img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/legaltranscriptionbook.jpg' },
    ap:  { name: 'AAERT Exam Prep',             price: '$399',    img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/aaertbook.jpg' },
    ga:  { name: 'General + AAERT Bundle',      price: '$750',    img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/generaltranscriptioncourse.jpg' },
    la:  { name: 'Legal + AAERT Bundle',        price: '$999',    img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/legaltranscriptionbook.jpg' },
    lg:  { name: 'Legal + General Bundle',      price: '$999',    img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/legaltranscriptionbook.jpg' },
    all: { name: 'All-in-One (3 Courses)',      price: '$1,499',  img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/generaltranscriptioncourse.jpg' },
};

const SignupPage: React.FC = () => {
    const [showPass, setShowPass]       = useState(false);
    const [course, setCourse]           = useState('');
    const [nameError, setNameError]     = useState(false);
    const [emailError, setEmailError]   = useState(false);
    const [passError, setPassError]     = useState(false);
    const [courseError, setCourseError] = useState(false);

    const nameRef  = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef  = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const preview = course ? COURSE_DATA[course] : null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const name  = nameRef.current?.value.trim()  ?? '';
        const email = emailRef.current?.value.trim() ?? '';
        const pass  = passRef.current?.value          ?? '';

        const nameOk   = name.length > 1;
        const emailOk  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const passOk   = pass.length >= 8;
        const courseOk = course !== '';

        setNameError(!nameOk);
        setEmailError(!emailOk);
        setPassError(!passOk);
        setCourseError(!courseOk);

        if (nameOk && emailOk && passOk && courseOk) {
            sessionStorage.setItem('tci_user', JSON.stringify({ name, email, selectedCourse: course }));
            navigate('/cart');
        }
    };

    return (
        <div className="signup-root">
            {/* Top Bar */}
            <header className="signup-topbar">
                <Link to="/" className="signup-logo">
                    <img src="https://www.transcriptioncertificationinstitute.org/images/tci-logo.png" alt="TCI Logo" />
                </Link>
            </header>

            {/* Progress Steps */}
            <div className="signup-progress-wrap">
                <div className="signup-steps">
                    <div className="signup-step active">
                        <div className="signup-step-num">1</div>
                        Registration
                    </div>
                    <div className="signup-step-connector" />
                    <Link to="/cart" className="signup-step">
                        <div className="signup-step-num">2</div>
                        Cart &amp; Payment
                    </Link>
                </div>
            </div>

            {/* Main */}
            <main className="signup-main">
                <div className="signup-form-container">
                    <div className="signup-form-header">
                        <h1>Start Your Transcription Career</h1>
                        <p>Create a free account to access your course and begin learning.</p>
                    </div>

                    <div className="signup-card">
                        {/* Social Login */}
                        <div className="signup-social-row">
                            <button type="button" className="signup-social-btn">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                                Continue with Google
                            </button>
                            <button type="button" className="signup-social-btn">
                                <img src="https://www.svgrepo.com/show/448234/facebook.svg" alt="Facebook" />
                                Continue with Facebook
                            </button>
                        </div>

                        <div className="signup-divider"><span>or register with email</span></div>

                        <form noValidate onSubmit={handleSubmit}>
                            {/* Full Name */}
                            <div className={`signup-form-group${nameError ? ' has-error' : ''}`}>
                                <label className="signup-label" htmlFor="full-name">Full Name</label>
                                <div className="signup-input-icon-wrap">
                                    <span className="signup-input-icon">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <circle cx="8" cy="5.5" r="2.5" stroke="#94a3b8" strokeWidth="1.4" />
                                            <path d="M2 13c0-2.761 2.686-5 6-5s6 2.239 6 5" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                    <input ref={nameRef} type="text" id="full-name" className="signup-input" placeholder="Jane Smith" autoComplete="name" />
                                </div>
                                <span className="signup-error-msg">Please enter your full name.</span>
                            </div>

                            {/* Email */}
                            <div className={`signup-form-group${emailError ? ' has-error' : ''}`}>
                                <label className="signup-label" htmlFor="email">Email Address</label>
                                <div className="signup-input-icon-wrap">
                                    <span className="signup-input-icon">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="#94a3b8" strokeWidth="1.4" />
                                            <path d="M2 5l6 5 6-5" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <input ref={emailRef} type="email" id="email" className="signup-input" placeholder="you@example.com" autoComplete="email" />
                                </div>
                                <span className="signup-error-msg">Please enter a valid email address.</span>
                            </div>

                            {/* Password */}
                            <div className={`signup-form-group${passError ? ' has-error' : ''}`}>
                                <label className="signup-label" htmlFor="password">Password</label>
                                <div className="signup-input-icon-wrap" style={{ position: 'relative' }}>
                                    <span className="signup-input-icon">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="#94a3b8" strokeWidth="1.4" />
                                            <path d="M5 7V5a3 3 0 016 0v2" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                    <input
                                        ref={passRef}
                                        type={showPass ? 'text' : 'password'}
                                        id="password"
                                        className="signup-input"
                                        placeholder="Minimum 8 characters"
                                        autoComplete="new-password"
                                        style={{ paddingRight: 44 }}
                                    />
                                    <button type="button" className="signup-toggle-pass" onClick={() => setShowPass(v => !v)}>
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
                                <span className="signup-error-msg">Password must be at least 8 characters.</span>
                            </div>

                            {/* Course Selection */}
                            <div className={`signup-form-group${courseError ? ' has-error' : ''}`}>
                                <label className="signup-label" htmlFor="course">Select Your Course</label>
                                <select
                                    id="course"
                                    className="signup-select"
                                    value={course}
                                    onChange={e => { setCourse(e.target.value); setCourseError(false); }}
                                >
                                    <option value="">— Choose a course —</option>
                                    <option value="gt">General Transcription — $499</option>
                                    <option value="lt">Legal Transcription — $649</option>
                                    <option value="ap">AAERT Exam Prep — $399</option>
                                    <option value="ga">General + AAERT Bundle — $750</option>
                                    <option value="la">Legal + AAERT Bundle — $999</option>
                                    <option value="lg">Legal + General Bundle — $999</option>
                                    <option value="all">All-in-One (3 Courses) — $1,499</option>
                                </select>
                                <span className="signup-error-msg">Please select a course to continue.</span>

                                {preview && (
                                    <div className="signup-course-preview visible">
                                        <img className="signup-course-preview-img" src={preview.img} alt={preview.name} />
                                        <div>
                                            <div className="signup-course-preview-name">{preview.name}</div>
                                            <div className="signup-course-preview-price">{preview.price}</div>
                                        </div>
                                        <div className="signup-course-check">
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="signup-cta-btn">
                                Register &amp; Continue to Cart
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </form>

                        <div className="signup-ssl-note">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <rect x="2" y="5" width="8" height="6" rx="1" stroke="#94a3b8" strokeWidth="1.2" />
                                <path d="M4 5V3.5a2 2 0 014 0V5" stroke="#94a3b8" strokeWidth="1.2" />
                            </svg>
                            Your information is protected by 256-bit SSL encryption
                        </div>
                    </div>

                    {/* Trust strip */}
                    <div className="signup-trust-strip">
                        <div className="signup-trust-item">
                            <div className="signup-trust-icon">
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                    <path d="M6.5 1.5L8.3 5.2l4.1.6-2.95 2.87.7 4.06L6.5 10.7l-3.65 1.93.7-4.06L.5 5.8l4.1-.6z" stroke="#4fb783" strokeWidth="1.2" strokeLinejoin="round" />
                                </svg>
                            </div>
                            Industry Certified
                        </div>
                        <div className="signup-trust-item">
                            <div className="signup-trust-icon">
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                    <circle cx="6.5" cy="6.5" r="5" stroke="#4fb783" strokeWidth="1.2" />
                                    <path d="M4 6.5l2 2 3-3" stroke="#4fb783" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            30-Day Money Back
                        </div>
                        <div className="signup-trust-item">
                            <div className="signup-trust-icon">
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                    <path d="M6.5 1.5v10M1.5 6.5h10" stroke="#4fb783" strokeWidth="1.2" strokeLinecap="round" />
                                    <circle cx="6.5" cy="6.5" r="5" stroke="#4fb783" strokeWidth="1.2" />
                                </svg>
                            </div>
                            Instant Access
                        </div>
                    </div>

                    <p className="signup-signin-note">
                        Already have an account? <Link to="/login">Sign in here</Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default SignupPage;
