import { Head, Link, usePage } from "@inertiajs/react";
import "../../css/dashboard.css";

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth?.user;

    const displayName =
        [user?.first_name, user?.last_name].filter(Boolean).join(" ") ||
        user?.name ||
        "Admin";

    return (
        <>
            <Head title="Dashboard" />

            <div className="erp-dashboard">

                {/* ================= SIDEBAR ================= */}
                <aside className="erp-sidebar">

                    <div className="sidebar-logo">
                        <div className="sidebar-logo-box">E</div>

                        <div>
                            <h2>ERP SYSTEM</h2>
                            <span>Business Management</span>
                        </div>
                    </div>

                    <nav className="sidebar-menu">

                        <div className="menu-section-title">
                            MAIN
                        </div>

                        <Link
                            href="/dashboard"
                            className="sidebar-menu-item active"
                        >
                            <DashboardIcon />
                            <span>Dashboard</span>
                        </Link>

                        <div className="menu-section-title">
                            MANAGEMENT
                        </div>

                        <Link href="#" className="sidebar-menu-item">
                            <SalesIcon />
                            <span>Sales</span>
                        </Link>

                        <Link href="#" className="sidebar-menu-item">
                            <PurchaseIcon />
                            <span>Purchases</span>
                        </Link>

                        <Link href="#" className="sidebar-menu-item">
                            <InventoryIcon />
                            <span>Inventory</span>
                        </Link>

                        <Link href="#" className="sidebar-menu-item">
                            <CustomerIcon />
                            <span>Customers</span>
                        </Link>

                        <div className="menu-section-title">
                            REPORTS
                        </div>

                        <Link href="#" className="sidebar-menu-item">
                            <ReportIcon />
                            <span>Reports</span>
                        </Link>

                        <Link href="#" className="sidebar-menu-item">
                            <SettingsIcon />
                            <span>Settings</span>
                        </Link>

                    </nav>

                    <div className="sidebar-bottom">
                        <div className="sidebar-security">
                            <ShieldIcon />

                            <div>
                                <strong>Secure System</strong>
                                <span>Protected account</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* ================= MAIN ================= */}
                <main className="erp-main">

                    {/* TOPBAR */}
                    <header className="erp-topbar">

                        <div>
                            <h1>Dashboard</h1>
                            <p>
                                Overview of your business performance
                            </p>
                        </div>

                        <div className="topbar-right">

                            <button
                                type="button"
                                className="notification-button"
                                aria-label="Notifications"
                            >
                                <NotificationIcon />
                                <span className="notification-dot" />
                            </button>

                            <div className="user-profile">

                                <div className="user-avatar">
                                    {displayName.charAt(0).toUpperCase()}
                                </div>

                                <div className="user-details">
                                    <strong>
                                        {displayName}
                                    </strong>

                                    <span>
                                        {user?.email || "admin@example.com"}
                                    </span>
                                </div>
                            </div>

                            {/* LOGOUT */}
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

                    {/* CONTENT */}
                    <div className="dashboard-content">

                        {/* WELCOME */}
                        <section className="welcome-card">

                            <div>
                                <span className="welcome-label">
                                    BUSINESS OVERVIEW
                                </span>

                                <h2>
                                    Welcome back, {displayName}!
                                </h2>

                                <p>
                                    Here's what's happening with your
                                    business today.
                                </p>
                            </div>

                            <div className="welcome-icon">
                                <DashboardIcon />
                            </div>

                        </section>

                        {/* STATS */}
                        <section className="dashboard-stats">

                            <StatCard
                                title="Total Sales"
                                value="₹ 2,45,800"
                                change="+12.5%"
                                icon={<SalesIcon />}
                            />

                            <StatCard
                                title="Total Purchases"
                                value="₹ 1,82,400"
                                change="+8.2%"
                                icon={<PurchaseIcon />}
                            />

                            <StatCard
                                title="Inventory Items"
                                value="1,248"
                                change="+4.8%"
                                icon={<InventoryIcon />}
                            />

                            <StatCard
                                title="Customers"
                                value="486"
                                change="+10.4%"
                                icon={<CustomerIcon />}
                            />

                        </section>

                        {/* MAIN GRID */}
                        <section className="dashboard-grid">

                            {/* RECENT SALES */}
                            <div className="dashboard-card">

                                <div className="card-header">

                                    <div>
                                        <h3>Recent Sales</h3>
                                        <p>
                                            Latest sales transactions
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="view-all-button"
                                    >
                                        View All
                                    </button>

                                </div>

                                <div className="sales-list">

                                    <SaleRow
                                        invoice="INV-1001"
                                        customer="ABC Industries"
                                        amount="₹ 42,500"
                                        status="Paid"
                                    />

                                    <SaleRow
                                        invoice="INV-1002"
                                        customer="XYZ Traders"
                                        amount="₹ 28,900"
                                        status="Paid"
                                    />

                                    <SaleRow
                                        invoice="INV-1003"
                                        customer="Modern Enterprises"
                                        amount="₹ 18,400"
                                        status="Pending"
                                    />

                                    <SaleRow
                                        invoice="INV-1004"
                                        customer="Global Machines"
                                        amount="₹ 35,800"
                                        status="Paid"
                                    />

                                </div>
                            </div>

                            {/* QUICK ACTIONS */}
                            <div className="dashboard-card">

                                <div className="card-header">
                                    <div>
                                        <h3>Quick Actions</h3>
                                        <p>
                                            Frequently used actions
                                        </p>
                                    </div>
                                </div>

                                <div className="quick-actions">

                                    <QuickAction
                                        icon={<SalesIcon />}
                                        title="New Sale"
                                        description="Create invoice"
                                    />

                                    <QuickAction
                                        icon={<PurchaseIcon />}
                                        title="New Purchase"
                                        description="Record purchase"
                                    />

                                    <QuickAction
                                        icon={<InventoryIcon />}
                                        title="Add Inventory"
                                        description="Add new item"
                                    />

                                    <QuickAction
                                        icon={<CustomerIcon />}
                                        title="Add Customer"
                                        description="Create customer"
                                    />

                                </div>

                            </div>

                        </section>

                        {/* BUSINESS SUMMARY */}
                        <section className="dashboard-card business-summary">

                            <div className="card-header">

                                <div>
                                    <h3>Business Summary</h3>
                                    <p>
                                        Current business performance
                                    </p>
                                </div>

                            </div>

                            <div className="summary-grid">

                                <SummaryItem
                                    label="Outstanding Receivables"
                                    value="₹ 86,400"
                                />

                                <SummaryItem
                                    label="Outstanding Payables"
                                    value="₹ 54,200"
                                />

                                <SummaryItem
                                    label="Low Stock Items"
                                    value="18"
                                />

                                <SummaryItem
                                    label="Pending Orders"
                                    value="24"
                                />

                            </div>

                        </section>

                    </div>
                </main>
            </div>
        </>
    );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ title, value, change, icon }) {
    return (
        <div className="stat-card">

            <div className="stat-top">

                <div className="stat-icon">
                    {icon}
                </div>

                <span className="stat-change">
                    {change}
                </span>

            </div>

            <div className="stat-info">
                <span>{title}</span>
                <strong>{value}</strong>
            </div>

        </div>
    );
}


/* =========================================================
   SALE ROW
========================================================= */

function SaleRow({
    invoice,
    customer,
    amount,
    status,
}) {
    return (
        <div className="sale-row">

            <div className="sale-info">
                <strong>{invoice}</strong>
                <span>{customer}</span>
            </div>

            <strong className="sale-amount">
                {amount}
            </strong>

            <span
                className={`sale-status ${
                    status === "Paid"
                        ? "status-paid"
                        : "status-pending"
                }`}
            >
                {status}
            </span>

        </div>
    );
}


/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
    icon,
    title,
    description,
}) {
    return (
        <button
            type="button"
            className="quick-action"
        >

            <div className="quick-action-icon">
                {icon}
            </div>

            <div className="quick-action-content">
                <strong>{title}</strong>
                <span>{description}</span>
            </div>

            <span className="quick-arrow">
                →
            </span>

        </button>
    );
}


/* =========================================================
   SUMMARY
========================================================= */

function SummaryItem({ label, value }) {
    return (
        <div className="summary-item">

            <span>{label}</span>

            <strong>{value}</strong>

        </div>
    );
}


/* =========================================================
   ICONS
========================================================= */

function DashboardIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
    );
}

function SalesIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 19V5" />
            <path d="M4 19h16" />
            <path d="M7 15l4-4 3 2 5-6" />
        </svg>
    );
}

function PurchaseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 3h12l2 5H4l2-5z" />
            <path d="M4 8v11h16V8" />
            <path d="M9 13h6" />
        </svg>
    );
}

function InventoryIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 7l8-4 8 4-8 4-8-4z" />
            <path d="M4 7v10l8 4 8-4V7" />
            <path d="M12 11v10" />
        </svg>
    );
}

function CustomerIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
        </svg>
    );
}

function ReportIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 19V5" />
            <path d="M4 19h16" />
            <path d="M8 16v-4" />
            <path d="M12 16V8" />
            <path d="M16 16v-6" />
        </svg>
    );
}

function SettingsIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 002-2l-1-1.7" />
            <path d="M4.6 9a1.7 1.7 0 00-2 2l1 1.7" />
            <path d="M15 4.6a1.7 1.7 0 00-2-2l-1.7 1" />
            <path d="M9 19.4a1.7 1.7 0 002 2l1.7-1" />
        </svg>
    );
}

function NotificationIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 8a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
        </svg>
    );
}

function LogoutIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M10 17l5-5-5-5" />
            <path d="M15 12H3" />
            <path d="M21 3v18" />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}
