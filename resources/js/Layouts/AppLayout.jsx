import React from "react";
import { Link, usePage } from "@inertiajs/react";

import "../../css/dashboard.css";

export default function AppLayout({
    children,
    title = "Dashboard",
}) {
    const { auth } = usePage().props;

    const user = auth?.user;

    /*
    |--------------------------------------------------------------------------
    | User Role
    |--------------------------------------------------------------------------
    | role_id = 1 => Admin
    | Other role_id => Normal User
    |--------------------------------------------------------------------------
    */

    const roleId = Number(user?.role_id);

    const isAdmin = roleId === 1;


    /*
    |--------------------------------------------------------------------------
    | Display Name
    |--------------------------------------------------------------------------
    */

    const displayName =
        [user?.first_name, user?.last_name]
            .filter(Boolean)
            .join(" ") ||
        user?.name ||
        "Admin";


    /*
    |--------------------------------------------------------------------------
    | Profile Image
    |--------------------------------------------------------------------------
    */

    const profileImage = user?.image
        ? `/storage/${user.image}`
        : null;


    /*
    |--------------------------------------------------------------------------
    | Avatar Letter
    |--------------------------------------------------------------------------
    */

    const avatarLetter =
        displayName
            ?.charAt(0)
            ?.toUpperCase() || "A";


    return (
        <div className="erp-dashboard">

            {/* =====================================================
                SIDEBAR
            ===================================================== */}

            <aside className="erp-sidebar">

                {/* ================= LOGO ================= */}

                <div className="sidebar-logo">

                    <div className="sidebar-logo-box">
                        E
                    </div>

                    <div>
                        <h2>ERP SYSTEM</h2>

                        <span>
                            Business Management
                        </span>
                    </div>

                </div>


                {/* ================= MENU ================= */}

                <nav className="sidebar-menu">

                    {/* =================================================
                        MAIN
                    ================================================= */}

                    <div className="menu-section-title">
                        MAIN
                    </div>


                    {/* Dashboard */}

                    <Link
                        href="/dashboard"
                        className={`sidebar-menu-item ${
                            title === "Dashboard"
                                ? "active"
                                : ""
                        }`}
                    >
                        <DashboardIcon />

                        <span>
                            Dashboard
                        </span>
                    </Link>


                    {/* =================================================
                        MANAGEMENT
                    ================================================= */}

                    <div className="menu-section-title">
                        MANAGEMENT
                    </div>


                    {/* Sales */}

                    <Link
                        href="#"
                        className="sidebar-menu-item"
                    >
                        <SalesIcon />

                        <span>
                            Sales
                        </span>
                    </Link>


                    {/* Purchases */}

                    <Link
                        href="#"
                        className="sidebar-menu-item"
                    >
                        <PurchaseIcon />

                        <span>
                            Purchases
                        </span>
                    </Link>


                    {/* Inventory */}

                    <Link
                        href="#"
                        className="sidebar-menu-item"
                    >
                        <InventoryIcon />

                        <span>
                            Inventory
                        </span>
                    </Link>


                    {/* Customers */}

                    <Link
                        href="#"
                        className="sidebar-menu-item"
                    >
                        <CustomerIcon />

                        <span>
                            Customers
                        </span>
                    </Link>


                    {/* =================================================
                        REPORTS
                    ================================================= */}

                    <div className="menu-section-title">
                        REPORTS
                    </div>


                    <Link
                        href="#"
                        className="sidebar-menu-item"
                    >
                        <ReportIcon />

                        <span>
                            Reports
                        </span>
                    </Link>


                    {/* =================================================
                        SETTINGS
                    ================================================= */}

                    <div className="menu-section-title">
                        SETTINGS
                    </div>


                    {/* =================================================
                        COMPANY PROFILE
                        ONLY ADMIN
                    ================================================= */}

                    {isAdmin && (
                        <Link
                            href="/company-profile"
                            className={`sidebar-menu-item ${
                                title === "Company Profile"
                                    ? "active"
                                    : ""
                            }`}
                        >
                            <SettingsIcon />

                            <span>
                                Company Profile
                            </span>
                        </Link>
                    )}


                    {/* =================================================
                        PROFILE
                        ALL USERS
                    ================================================= */}

                    <Link
                        href="/profile"
                        className={`sidebar-menu-item ${
                            title === "Profile"
                                ? "active"
                                : ""
                        }`}
                    >
                        <ProfileIcon />

                        <span>
                            Profile
                        </span>
                    </Link>


                    {/* =================================================
                        USERS
                        ONLY ADMIN
                    ================================================= */}

                    {isAdmin && (
                        <Link
                            href="/users"
                            className={`sidebar-menu-item ${
                                title === "Users" ||
                                title === "Add User"
                                    ? "active"
                                    : ""
                            }`}
                        >
                            <ProfileIcon />

                            <span>
                                Users
                            </span>
                        </Link>
                    )}

                </nav>


                {/* =====================================================
                    SIDEBAR BOTTOM
                ===================================================== */}

                <div className="sidebar-bottom">

                    <div className="sidebar-security">

                        <ShieldIcon />

                        <div>

                            <strong>
                                Secure System
                            </strong>

                            <span>
                                Protected account
                            </span>

                        </div>

                    </div>

                </div>

            </aside>


            {/* =====================================================
                MAIN AREA
            ===================================================== */}

            <main className="erp-main">


                {/* =================================================
                    TOPBAR
                ================================================= */}

                <header className="erp-topbar">

                    <div>

                        <h1>
                            {title}
                        </h1>

                        <p>
                            {title === "Dashboard"
                                ? "Overview of your business performance"
                                : `Manage your ${title.toLowerCase()}`
                            }
                        </p>

                    </div>


                    {/* =================================================
                        TOPBAR RIGHT
                    ================================================= */}

                    <div className="topbar-right">


                        {/* ================= NOTIFICATION ================= */}

                        <button
                            type="button"
                            className="notification-button"
                            aria-label="Notifications"
                        >

                            <NotificationIcon />

                            <span className="notification-dot" />

                        </button>


                        {/* ================= USER PROFILE ================= */}

                        <div className="user-profile">

                            <div className="user-avatar">

                                {profileImage ? (

                                    <img
                                        src={profileImage}
                                        alt={displayName}
                                        onError={(e) => {
                                            e.currentTarget.style.display =
                                                "none";
                                        }}
                                    />

                                ) : (

                                    <span>
                                        {avatarLetter}
                                    </span>

                                )}

                            </div>


                            <div className="user-details">

                                <strong>
                                    {displayName}
                                </strong>

                                <span>
                                    {user?.email ||
                                        "admin@example.com"}
                                </span>

                            </div>

                        </div>


                        {/* ================= LOGOUT ================= */}

                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="logout-button"
                            aria-label="Logout"
                        >

                            <LogoutIcon />

                        </Link>

                    </div>

                </header>


                {/* =================================================
                    PAGE CONTENT
                ================================================= */}

                <div className="dashboard-content">

                    {children}

                </div>

            </main>

        </div>
    );
}


/* =========================================================
   ICONS
========================================================= */


/* ================= DASHBOARD ================= */

function DashboardIcon() {

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
        >

            <rect
                x="3"
                y="3"
                width="7"
                height="7"
                rx="1"
            />

            <rect
                x="14"
                y="3"
                width="7"
                height="7"
                rx="1"
            />

            <rect
                x="3"
                y="14"
                width="7"
                height="7"
                rx="1"
            />

            <rect
                x="14"
                y="14"
                width="7"
                height="7"
                rx="1"
            />

        </svg>
    );
}


/* ================= SALES ================= */

function SalesIcon() {

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
        >

            <path d="M4 19V5" />

            <path d="M4 19h16" />

            <path d="M7 15l4-4 3 2 5-6" />

        </svg>
    );
}


/* ================= PURCHASE ================= */

function PurchaseIcon() {

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
        >

            <path d="M6 3h12l2 5H4l2-5z" />

            <path d="M4 8v11h16V8" />

            <path d="M9 13h6" />

        </svg>
    );
}


/* ================= INVENTORY ================= */

function InventoryIcon() {

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
        >

            <path d="M4 7l8-4 8 4-8 4-8-4z" />

            <path d="M4 7v10l8 4 8-4V7" />

            <path d="M12 11v10" />

        </svg>
    );
}


/* ================= CUSTOMER ================= */

function CustomerIcon() {

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
        >

            <circle
                cx="12"
                cy="8"
                r="4"
            />

            <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />

        </svg>
    );
}


/* ================= REPORT ================= */

function ReportIcon() {

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
        >

            <path d="M4 19V5" />

            <path d="M4 19h16" />

            <path d="M8 16v-4" />

            <path d="M12 16V8" />

            <path d="M16 16v-6" />

        </svg>
    );
}


/* ================= SETTINGS ================= */

function SettingsIcon() {

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
        >

            <circle
                cx="12"
                cy="12"
                r="3"
            />

            <path d="M19.4 15a1.7 1.7 0 002-2l-1-1.7" />

            <path d="M4.6 9a1.7 1.7 0 00-2 2l1 1.7" />

            <path d="M15 4.6a1.7 1.7 0 00-2-2l-1.7 1" />

            <path d="M9 19.4a1.7 1.7 0 002 2l1.7-1" />

        </svg>
    );
}


/* ================= PROFILE ================= */

function ProfileIcon() {

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >

            <circle
                cx="12"
                cy="8"
                r="4"
            />

            <path
                d="M4 21c0-4.5 3.5-7 8-7s8 2.5 8 7"
            />

        </svg>
    );
}


/* ================= NOTIFICATION ================= */

function NotificationIcon() {

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
        >

            <path d="M18 8a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />

            <path d="M10 21h4" />

        </svg>
    );
}


/* ================= LOGOUT ================= */

function LogoutIcon() {

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
        >

            <path d="M10 17l5-5-5-5" />

            <path d="M15 12H3" />

            <path d="M21 3v18" />

        </svg>
    );
}


/* ================= SHIELD ================= */

function ShieldIcon() {

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
        >

            <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />

            <path d="M9 12l2 2 4-4" />

        </svg>
    );
}
