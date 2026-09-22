import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Login({ status = null }) {
    const [showPassword, setShowPassword] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post("/login", {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Login" />

            <div className="login-page">
                <div className="container-fluid p-0">
                    <div className="row g-0 min-vh-100">

                        {/* =====================================================
                            LEFT SIDE
                        ====================================================== */}
                        <div className="col-lg-6 d-none d-lg-flex login-left">

                            <div className="login-overlay-circle circle-one"></div>
                            <div className="login-overlay-circle circle-two"></div>

                            <div className="left-content">

                                {/* Logo */}
                                <div className="erp-logo">

                                    <div className="logo-box">
                                        E
                                    </div>

                                    <div>
                                        <h1>ERP SYSTEM</h1>
                                        <p>Business Management</p>
                                    </div>

                                </div>

                                {/* Main Content */}
                                <div className="left-main">

                                    {/* Platform Badge */}
                                    <div className="platform-badge">
                                        <span className="status-dot"></span>

                                        Business Management Platform
                                    </div>

                                    {/* Heading */}
                                    <h2>
                                        Manage your business
                                        <span> smarter.</span>
                                    </h2>

                                    {/* Description */}
                                    <p className="description">
                                        Manage sales, purchases, inventory,
                                        customers and business operations
                                        from one powerful platform.
                                    </p>

                                    {/* Features */}
                                    <div className="features">

                                        <Feature text="Sales & Invoice Management" />

                                        <Feature text="Inventory & Stock Management" />

                                        <Feature text="Purchase & Supplier Management" />

                                        <Feature text="Reports & Business Analytics" />

                                    </div>

                                </div>

                                {/* Footer */}
                                <div className="left-footer">
                                    © 2026 ERP System. All rights reserved.
                                </div>

                            </div>
                        </div>


                        {/* =====================================================
                            RIGHT SIDE
                        ====================================================== */}
                        <div className="col-lg-6 login-right">

                            <div className="login-container">

                                {/* Mobile Logo */}
                                <div className="mobile-logo d-lg-none">

                                    <div className="mobile-logo-box">
                                        E
                                    </div>

                                    <div>
                                        <h1>ERP SYSTEM</h1>
                                        <p>Business Management</p>
                                    </div>

                                </div>


                                {/* Login Card */}
                                <div className="login-card">

                                    {/* Heading */}
                                    <div className="login-heading">

                                        <h2>
                                            Welcome back
                                        </h2>

                                        <p>
                                            Sign in to continue to your ERP
                                            dashboard.
                                        </p>

                                    </div>


                                    {/* Status Message */}
                                    {status && (
                                        <div className="alert alert-success">
                                            {status}
                                        </div>
                                    )}


                                    {/* Login Form */}
                                    <form onSubmit={submit}>

                                        {/* =================================================
                                            EMAIL
                                        ================================================== */}
                                        <div className="mb-4">

                                            <label className="form-label">
                                                Email Address
                                            </label>

                                            <div className="input-group-custom">

                                                <span className="input-icon">
                                                    <EmailIcon />
                                                </span>

                                                <input
                                                    type="email"
                                                    className={`form-control custom-input ${
                                                        errors.email
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="admin@example.com"
                                                    autoComplete="username"
                                                    autoFocus
                                                />

                                            </div>

                                            {errors.email && (
                                                <div className="text-danger small mt-2">
                                                    {errors.email}
                                                </div>
                                            )}

                                        </div>


                                        {/* =================================================
                                            PASSWORD
                                        ================================================== */}
                                        <div className="mb-4">

                                            <div className="password-label">

                                                <label className="form-label mb-0">
                                                    Password
                                                </label>

                                            </div>


                                            <div className="input-group-custom">

                                                <span className="input-icon">
                                                    <LockIcon />
                                                </span>

                                                <input
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    className={`form-control custom-input password-input ${
                                                        errors.password
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    value={data.password}
                                                    onChange={(e) =>
                                                        setData(
                                                            "password",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter your password"
                                                    autoComplete="current-password"
                                                />


                                                {/* Password Toggle */}
                                                <button
                                                    type="button"
                                                    className="password-toggle"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                    aria-label={
                                                        showPassword
                                                            ? "Hide password"
                                                            : "Show password"
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <EyeOffIcon />
                                                    ) : (
                                                        <EyeIcon />
                                                    )}
                                                </button>

                                            </div>


                                            {errors.password && (
                                                <div className="text-danger small mt-2">
                                                    {errors.password}
                                                </div>
                                            )}

                                        </div>


                                        {/* =================================================
                                            REMEMBER ME
                                        ================================================== */}
                                        <div className="form-check remember-box mb-4">

                                            <input
                                                id="remember"
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={data.remember}
                                                onChange={(e) =>
                                                    setData(
                                                        "remember",
                                                        e.target.checked
                                                    )
                                                }
                                            />

                                            <label
                                                htmlFor="remember"
                                                className="form-check-label"
                                            >
                                                Remember me
                                            </label>

                                        </div>


                                        {/* =================================================
                                            LOGIN BUTTON
                                        ================================================== */}
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="btn login-button w-100"
                                        >

                                            {processing ? (
                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>

                                                    Signing in...
                                                </>
                                            ) : (
                                                <>
                                                    <span>
                                                        Sign In
                                                    </span>

                                                    <ArrowIcon />
                                                </>
                                            )}

                                        </button>

                                    </form>


                                    {/* =================================================
                                        SECURITY
                                    ================================================== */}
                                    <div className="security-box">

                                        <ShieldIcon />

                                        <span>
                                            Secure & encrypted login
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}


/* =========================================================
   FEATURE COMPONENT
========================================================= */

function Feature({ text }) {
    return (
        <div className="feature-item">

            <div className="feature-icon">

                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M5 12l4 4L19 6" />
                </svg>

            </div>

            <span>
                {text}
            </span>

        </div>
    );
}


/* =========================================================
   EMAIL ICON
========================================================= */

function EmailIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
            />

            <path d="M3 7l9 6 9-6" />
        </svg>
    );
}


/* =========================================================
   LOCK ICON
========================================================= */

function LockIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect
                x="4"
                y="10"
                width="16"
                height="11"
                rx="2"
            />

            <path d="M8 10V7a4 4 0 018 0v3" />
        </svg>
    );
}


/* =========================================================
   EYE ICON
========================================================= */

function EyeIcon() {
    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />

            <circle
                cx="12"
                cy="12"
                r="3"
            />
        </svg>
    );
}


/* =========================================================
   EYE OFF ICON
========================================================= */

function EyeOffIcon() {
    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 3l18 18" />

            <path d="M10.6 10.6a2 2 0 002.8 2.8" />

            <path d="M9.9 4.3A10.8 10.8 0 0112 4c6.5 0 10 8 10 8a18.4 18.4 0 01-3 4.2" />

            <path d="M6.1 6.1C3.5 8.2 2 12 2 12s3.5 8 10 8a10.7 10.7 0 004.1-.8" />
        </svg>
    );
}


/* =========================================================
   ARROW ICON
========================================================= */

function ArrowIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />

            <path d="M13 6l6 6-6 6" />
        </svg>
    );
}


/* =========================================================
   SHIELD ICON
========================================================= */

function ShieldIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />

            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}
