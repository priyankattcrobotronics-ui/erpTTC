import React from "react";
import { Head, usePage } from "@inertiajs/react";

import AppLayout from "@/Layouts/AppLayout";


export default function Dashboard() {

    const { auth } = usePage().props;

    const user = auth?.user;


    const displayName =
        [user?.first_name, user?.last_name]
            .filter(Boolean)
            .join(" ") ||
        user?.name ||
        "Admin";


    return (
        <AppLayout title="Dashboard">

            <Head title="Dashboard" />


            {/* =================================================
                WELCOME
            ================================================= */}

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


            {/* =================================================
                STATS
            ================================================= */}

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


            {/* =================================================
                MAIN GRID
            ================================================= */}

            <section className="dashboard-grid">


                {/* ================= RECENT SALES ================= */}

                <div className="dashboard-card">

                    <div className="card-header">

                        <div>

                            <h3>
                                Recent Sales
                            </h3>

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


                {/* ================= QUICK ACTIONS ================= */}

                <div className="dashboard-card">

                    <div className="card-header">

                        <div>

                            <h3>
                                Quick Actions
                            </h3>

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


            {/* =================================================
                BUSINESS SUMMARY
            ================================================= */}

            <section className="dashboard-card business-summary">

                <div className="card-header">

                    <div>

                        <h3>
                            Business Summary
                        </h3>

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

        </AppLayout>
    );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
    title,
    value,
    change,
    icon,
}) {

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

                <span>
                    {title}
                </span>


                <strong>
                    {value}
                </strong>

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

                <strong>
                    {invoice}
                </strong>

                <span>
                    {customer}
                </span>

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

                <strong>
                    {title}
                </strong>

                <span>
                    {description}
                </span>

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

function SummaryItem({
    label,
    value,
}) {

    return (

        <div className="summary-item">

            <span>
                {label}
            </span>

            <strong>
                {value}
            </strong>

        </div>

    );
}


/* =========================================================
   ICONS USED BY DASHBOARD CONTENT
========================================================= */

function DashboardIcon() {

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
        >

            <rect x="3" y="3" width="7" height="7" rx="1" />

            <rect x="14" y="3" width="7" height="7" rx="1" />

            <rect x="3" y="14" width="7" height="7" rx="1" />

            <rect x="14" y="14" width="7" height="7" rx="1" />

        </svg>
    );

}


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
