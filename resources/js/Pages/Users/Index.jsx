import React from "react";
import { Head, Link } from "@inertiajs/react";
import { Pencil, Trash2 } from "lucide-react";

import AppLayout from "@/Layouts/AppLayout";

export default function Index({ users }) {
    /*
    |--------------------------------------------------------------------------
    | User List
    |--------------------------------------------------------------------------
    */

    const userList = users?.data || [];


    /*
    |--------------------------------------------------------------------------
    | Delete Confirmation
    |--------------------------------------------------------------------------
    */

    const handleDelete = (e, user) => {
        const userName =
            [
                user.first_name,
                user.last_name,
            ]
                .filter(Boolean)
                .join(" ") ||
            user.name ||
            user.username ||
            "this user";

        const confirmed = window.confirm(
            `Are you sure you want to delete ${userName}?`
        );

        if (!confirmed) {
            e.preventDefault();
        }
    };


    return (
        <AppLayout title="Users">

            <Head title="Users" />


            <div className="users-page">


                {/* =====================================================
                    Header
                ====================================================== */}

                <div className="page-header">

                    <div>

                        <h1>
                            Users
                        </h1>

                        <p>
                            Manage system users and their roles.
                        </p>

                    </div>


                    <Link
                        href="/users/create"
                        className="add-button"
                    >
                        + Add User
                    </Link>

                </div>


                {/* =====================================================
                    Success Message
                ====================================================== */}

                {users?.flash?.success && (

                    <div className="success-message">

                        {users.flash.success}

                    </div>

                )}


                {/* =====================================================
                    Error Message
                ====================================================== */}

                {users?.flash?.error && (

                    <div className="error-message">

                        {users.flash.error}

                    </div>

                )}


                {/* =====================================================
                    Users Card
                ====================================================== */}

                <div className="card">


                    {/* =================================================
                        Card Header
                    ================================================== */}

                    <div className="card-header">

                        <div>

                            <h2>
                                All Users
                            </h2>

                            <p>
                                View and manage all registered users.
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        Table
                    ================================================== */}

                    <div className="table-wrapper">

                        <table className="users-table">


                            {/* =================================================
                                Table Head
                            ================================================== */}

                            <thead>

                                <tr>

                                    <th>
                                        #
                                    </th>

                                    <th>
                                        Name
                                    </th>

                                    <th>
                                        Username
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Role
                                    </th>

                                    <th>
                                        Email Verified
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            {/* =================================================
                                Table Body
                            ================================================== */}

                            <tbody>

                                {userList.length > 0 ? (

                                    userList.map(
                                        (user, index) => (

                                            <tr
                                                key={user.id}
                                            >


                                                {/* =================================================
                                                    #
                                                ================================================== */}

                                                <td>

                                                    {users.from
                                                        ? users.from + index
                                                        : index + 1}

                                                </td>


                                                {/* =================================================
                                                    Name
                                                ================================================== */}

                                                <td>

                                                    <strong>

                                                        {[
                                                            user.first_name,
                                                            user.last_name,
                                                        ]
                                                            .filter(Boolean)
                                                            .join(" ") ||

                                                            user.name ||

                                                            "-"}

                                                    </strong>

                                                </td>


                                                {/* =================================================
                                                    Username
                                                ================================================== */}

                                                <td>

                                                    {user.username || "-"}

                                                </td>


                                                {/* =================================================
                                                    Email
                                                ================================================== */}

                                                <td>

                                                    {user.email || "-"}

                                                </td>


                                                {/* =================================================
                                                    Role
                                                ================================================== */}

                                                <td>

                                                    {user.role?.name ? (

                                                        <span className="role-badge">

                                                            {user.role.name}

                                                        </span>

                                                    ) : (

                                                        "-"

                                                    )}

                                                </td>


                                                {/* =================================================
                                                    Email Verified
                                                ================================================== */}

                                                <td>

                                                    {user.email_verified_at ? (

                                                        <span className="verified-badge">

                                                            Verified

                                                        </span>

                                                    ) : (

                                                        <span className="not-verified-badge">

                                                            Not Verified

                                                        </span>

                                                    )}

                                                </td>


                                                {/* =================================================
                                                    Status
                                                ================================================== */}

                                                <td>

                                                    {user.status ? (

                                                        <span className="active-badge">

                                                            Active

                                                        </span>

                                                    ) : (

                                                        <span className="deactive-badge">

                                                            Deactive

                                                        </span>

                                                    )}

                                                </td>


                                                {/* =================================================
                                                    Action
                                                ================================================== */}

                                                <td>

                                                    <div className="action-buttons">


                                                        {/* =================================================
                                                            Edit
                                                        ================================================== */}

                                                        <Link
                                                            href={`/users/${user.id}/edit`}
                                                            className="action-button edit-button"
                                                            title="Edit User"
                                                        >

                                                            <Pencil
                                                                size={15}
                                                                strokeWidth={2}
                                                            />

                                                        </Link>


                                                        {/* =================================================
                                                            Delete

                                                            role_id = 1
                                                            cannot be deleted
                                                        ================================================== */}

                                                        {Number(
                                                            user.role_id
                                                        ) !== 1 && (

                                                            <Link
                                                                href={`/users/${user.id}`}
                                                                method="delete"
                                                                as="button"
                                                                className="action-button delete-button"
                                                                title="Delete User"
                                                                onClick={(e) =>
                                                                    handleDelete(
                                                                        e,
                                                                        user
                                                                    )
                                                                }
                                                            >

                                                                <Trash2
                                                                    size={15}
                                                                    strokeWidth={2}
                                                                />

                                                            </Link>

                                                        )}

                                                    </div>

                                                </td>

                                            </tr>

                                        )

                                    )

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="empty-users"
                                        >

                                            No users found.

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* =================================================
                        Pagination
                    ================================================== */}

                    {users?.links &&
                        users.links.length > 3 && (

                            <div className="pagination">

                                {users.links.map(
                                    (link, index) => (

                                        <Link
                                            key={index}
                                            href={
                                                link.url || "#"
                                            }
                                            preserveScroll
                                            className={
                                                link.active
                                                    ? "pagination-link active"
                                                    : "pagination-link"
                                            }
                                            style={{
                                                pointerEvents:
                                                    link.url
                                                        ? "auto"
                                                        : "none",

                                                opacity:
                                                    link.url
                                                        ? 1
                                                        : 0.5,
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    link.label,
                                            }}
                                        />

                                    )
                                )}

                            </div>

                        )}

                </div>

            </div>


            {/* =============================================================
                CSS
            ============================================================= */}

            <style>{`

                /* =========================================================
                   Page
                ========================================================= */

                .users-page {
                    width: 100%;
                    max-width: none;
                    margin: 0;
                    padding: 30px;

                    background: #f7f8fa;

                    min-height: calc(100vh - 90px);

                    box-sizing: border-box;
                }


                /* =========================================================
                   Header
                ========================================================= */

                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    margin-bottom: 25px;
                    padding: 22px 25px;

                    background: #0f6b4f;

                    border-radius: 12px;

                    box-shadow:
                        0 4px 12px rgba(15, 107, 79, 0.12);
                }


                .page-header h1 {
                    margin: 0 0 5px;

                    font-size: 28px;
                    font-weight: 700;

                    color: #ffffff;
                }


                .page-header p {
                    margin: 0;

                    color: #d9f3e8;

                    font-size: 14px;
                }


                /* =========================================================
                   Add User Button
                ========================================================= */

                .add-button {
                    display: inline-flex;

                    align-items: center;

                    justify-content: center;

                    text-decoration: none;

                    color: #0f6b4f;

                    background: #ffffff;

                    border: 1px solid #d1e7df;

                    padding: 10px 16px;

                    border-radius: 8px;

                    font-size: 14px;

                    font-weight: 600;

                    transition: all 0.2s ease;
                }


                .add-button:hover {
                    background: #e8f6f0;

                    border-color: #0f6b4f;
                }


                /* =========================================================
                   Success Message
                ========================================================= */

                .success-message {
                    background: #ecfdf5;

                    color: #047857;

                    border: 1px solid #a7f3d0;

                    padding: 13px 16px;

                    border-radius: 8px;

                    margin-bottom: 20px;

                    font-size: 14px;

                    font-weight: 500;
                }


                /* =========================================================
                   Error Message
                ========================================================= */

                .error-message {
                    background: #fef2f2;

                    color: #b91c1c;

                    border: 1px solid #fecaca;

                    padding: 13px 16px;

                    border-radius: 8px;

                    margin-bottom: 20px;

                    font-size: 14px;

                    font-weight: 500;
                }


                /* =========================================================
                   Card
                ========================================================= */

                .card {
                    background: #ffffff;

                    border: 1px solid #e5e7eb;

                    border-radius: 12px;

                    margin-bottom: 20px;

                    overflow: hidden;
                }


                /* =========================================================
                   Card Header
                ========================================================= */

                .card-header {
                    display: flex;

                    align-items: center;

                    justify-content: space-between;

                    padding: 20px;

                    border-bottom: 1px solid #eeeeee;
                }


                .card-header h2 {
                    margin: 0 0 5px;

                    font-size: 18px;

                    color: #17211b;

                    font-weight: 700;
                }


                .card-header p {
                    margin: 0;

                    color: #6b7280;

                    font-size: 14px;
                }


                /* =========================================================
                   Table Wrapper
                ========================================================= */

                .table-wrapper {
                    width: 100%;

                    overflow-x: auto;

                    -webkit-overflow-scrolling: touch;
                }


                /* =========================================================
                   Table
                ========================================================= */

                .users-table {
                    width: 100%;

                    min-width: 950px;

                    border-collapse: collapse;

                    background: #ffffff;
                }


                .users-table thead {
                    background: #f7faf8;
                }


                .users-table th {
                    padding: 14px 12px;

                    border-bottom: 1px solid #e5e7eb;

                    font-size: 13px;

                    font-weight: 700;

                    color: #374151;

                    text-align: left;

                    white-space: nowrap;
                }


                .users-table td {
                    padding: 14px 12px;

                    border-bottom: 1px solid #f0f0f0;

                    font-size: 14px;

                    color: #4b5563;

                    white-space: nowrap;

                    vertical-align: middle;
                }


                .users-table tbody tr {
                    transition: background 0.15s ease;
                }


                .users-table tbody tr:hover {
                    background: #fafcfb;
                }


                .users-table tbody tr:last-child td {
                    border-bottom: none;
                }


                .users-table td strong {
                    color: #26332b;

                    font-weight: 600;
                }


                /* =========================================================
                   Role Badge
                ========================================================= */

                .role-badge {
                    display: inline-block;

                    padding: 5px 10px;

                    border-radius: 20px;

                    font-size: 12px;

                    font-weight: 600;

                    background: #e8f6f0;

                    color: #0f6b4f;
                }


                /* =========================================================
                   Verified Badge
                ========================================================= */

                .verified-badge {
                    display: inline-block;

                    padding: 5px 10px;

                    border-radius: 20px;

                    font-size: 12px;

                    font-weight: 600;

                    background: #dcfce7;

                    color: #166534;
                }


                /* =========================================================
                   Not Verified Badge
                ========================================================= */

                .not-verified-badge {
                    display: inline-block;

                    padding: 5px 10px;

                    border-radius: 20px;

                    font-size: 12px;

                    font-weight: 600;

                    background: #fef3c7;

                    color: #92400e;
                }


                /* =========================================================
                   Active Badge
                ========================================================= */

                .active-badge {
                    display: inline-block;

                    padding: 5px 10px;

                    border-radius: 20px;

                    font-size: 12px;

                    font-weight: 600;

                    background: #dcfce7;

                    color: #166534;
                }


                /* =========================================================
                   Deactive Badge
                ========================================================= */

                .deactive-badge {
                    display: inline-block;

                    padding: 5px 10px;

                    border-radius: 20px;

                    font-size: 12px;

                    font-weight: 600;

                    background: #fee2e2;

                    color: #991b1b;
                }


                /* =========================================================
                   Action Buttons
                ========================================================= */

                .action-buttons {
                    display: flex;

                    align-items: center;

                    gap: 7px;
                }


                .action-button {
                    width: 32px;

                    height: 32px;

                    display: inline-flex;

                    align-items: center;

                    justify-content: center;

                    padding: 0;

                    border-radius: 7px;

                    border: 1px solid transparent;

                    cursor: pointer;

                    text-decoration: none;

                    transition:
                        color 0.18s ease,
                        background 0.18s ease,
                        border-color 0.18s ease,
                        transform 0.18s ease;
                }


                .action-button:hover {
                    transform: translateY(-1px);
                }


                /* =========================================================
                   Edit Button
                ========================================================= */

                .edit-button {
                    color: #0f6b4f;

                    background: #f0fdf8;

                    border-color: #ccefe1;
                }


                .edit-button:hover {
                    color: #ffffff;

                    background: #0f6b4f;

                    border-color: #0f6b4f;
                }


                /* =========================================================
                   Delete Button
                ========================================================= */

                .delete-button {
                    color: #dc2626;

                    background: #fff5f5;

                    border-color: #fecaca;
                }


                .delete-button:hover {
                    color: #ffffff;

                    background: #dc2626;

                    border-color: #dc2626;
                }


                /* =========================================================
                   Empty Users
                ========================================================= */

                .empty-users {
                    padding: 45px 20px !important;

                    text-align: center !important;

                    color: #6b7280 !important;

                    font-size: 14px !important;
                }


                /* =========================================================
                   Pagination
                ========================================================= */

                .pagination {
                    display: flex;

                    justify-content: flex-end;

                    align-items: center;

                    gap: 6px;

                    padding: 20px;

                    border-top: 1px solid #eeeeee;

                    flex-wrap: wrap;
                }


                .pagination-link {
                    display: inline-flex;

                    align-items: center;

                    justify-content: center;

                    min-width: 40px;

                    min-height: 40px;

                    box-sizing: border-box;

                    padding: 0 12px;

                    border: 1px solid #d1d5db;

                    border-radius: 8px;

                    background: #ffffff;

                    color: #374151;

                    text-decoration: none;

                    font-size: 13px;

                    font-weight: 600;

                    transition: all 0.2s ease;
                }


                .pagination-link:hover {
                    background: #e8f6f0;

                    border-color: #0f6b4f;

                    color: #0f6b4f;
                }


                .pagination-link.active {
                    background: #0f6b4f;

                    border-color: #0f6b4f;

                    color: #ffffff;
                }


                /* =========================================================
                   Mobile
                ========================================================= */

                @media (max-width: 768px) {

                    .users-page {
                        padding: 15px;
                    }


                    .page-header {
                        flex-direction: column;

                        align-items: flex-start;

                        gap: 15px;
                    }


                    .add-button {
                        width: 100%;
                    }


                    .card-header {
                        padding: 18px;
                    }


                    .pagination {
                        justify-content: center;

                        padding: 16px;
                    }

                }


                /* =========================================================
                   Small Mobile
                ========================================================= */

                @media (max-width: 480px) {

                    .users-page {
                        padding: 10px;
                    }


                    .page-header {
                        padding: 18px;
                    }


                    .page-header h1 {
                        font-size: 24px;
                    }


                    .users-table th,
                    .users-table td {
                        padding: 12px 10px;
                    }


                    .action-button {
                        width: 30px;

                        height: 30px;
                    }

                }

            `}</style>

        </AppLayout>
    );
}
