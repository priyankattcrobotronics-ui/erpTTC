import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";

import AppLayout from "@/Layouts/AppLayout";

export default function Create({
    roles = [],
    user = null,
    isEdit = false,
}) {
    /*
    |--------------------------------------------------------------------------
    | Form
    |--------------------------------------------------------------------------
    */

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
    } = useForm({
        role_id: user?.role_id ?? "",

        first_name: user?.first_name ?? "",

        last_name: user?.last_name ?? "",

        username: user?.username ?? "",

        email: user?.email ?? "",

        email_verified_at: user?.email_verified_at ?? false,

        status: user?.status ?? true,

        password: "",

        password_confirmation: "",
    });


    /*
    |--------------------------------------------------------------------------
    | Normal Input Change
    |--------------------------------------------------------------------------
    */

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setData(name, value);
    };


    /*
    |--------------------------------------------------------------------------
    | Email Verified
    |--------------------------------------------------------------------------
    */

    const handleEmailVerifiedChange = (e) => {

        setData(
            "email_verified_at",
            e.target.checked
        );
    };


    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    const handleStatusChange = (e) => {

        setData(
            "status",
            e.target.value === "1"
        );
    };


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const submit = (e) => {

        e.preventDefault();


        /*
        |--------------------------------------------------------------------------
        | Create
        |--------------------------------------------------------------------------
        */

        if (!isEdit) {

            post("/users", {
                preserveScroll: true,
            });

            return;
        }


        /*
        |--------------------------------------------------------------------------
        | Update
        |--------------------------------------------------------------------------
        */

        put(`/users/${user.id}`, {
            preserveScroll: true,
        });
    };


    return (
        <AppLayout
            title={isEdit ? "Edit User" : "Add User"}
        >

            <Head
                title={isEdit ? "Edit User" : "Add User"}
            />


            <div className="users-create-page">


                {/* =====================================================
                    Header
                ====================================================== */}

                <div className="page-header">

                    <div>

                        <h1>
                            {isEdit
                                ? "Edit User"
                                : "Add User"}
                        </h1>

                        <p>
                            {isEdit
                                ? "Update user account details and settings."
                                : "Create a new user and assign a role."}
                        </p>

                    </div>


                    <Link
                        href="/users"
                        className="back-button"
                    >
                        ← Back to Users
                    </Link>

                </div>


                {/* =====================================================
                    User Information
                ====================================================== */}

                <div className="card">

                    <div className="card-header">

                        <h2>
                            User Information
                        </h2>

                        <p>
                            {isEdit
                                ? "Update the user's account details."
                                : "Enter the user's account details."}
                        </p>

                    </div>


                    <div className="form-grid">


                        {/* =================================================
                            Role
                        ================================================== */}

                        <div className="form-group">

                            <label>
                                Role
                                <span>*</span>
                            </label>


                            <select
                                name="role_id"
                                value={data.role_id}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Role
                                </option>


                                {roles.map((role) => (

                                    <option
                                        key={role.id}
                                        value={role.id}
                                    >
                                        {role.name}
                                    </option>

                                ))}

                            </select>


                            {errors.role_id && (

                                <small className="error">
                                    {errors.role_id}
                                </small>

                            )}

                        </div>


                        {/* =================================================
                            First Name
                        ================================================== */}

                        <div className="form-group">

                            <label>
                                First Name
                                <span>*</span>
                            </label>


                            <input
                                type="text"
                                name="first_name"
                                value={data.first_name}
                                onChange={handleChange}
                                placeholder="Enter first name"
                            />


                            {errors.first_name && (

                                <small className="error">
                                    {errors.first_name}
                                </small>

                            )}

                        </div>


                        {/* =================================================
                            Last Name
                        ================================================== */}

                        <div className="form-group">

                            <label>
                                Last Name
                            </label>


                            <input
                                type="text"
                                name="last_name"
                                value={data.last_name}
                                onChange={handleChange}
                                placeholder="Enter last name"
                            />


                            {errors.last_name && (

                                <small className="error">
                                    {errors.last_name}
                                </small>

                            )}

                        </div>


                        {/* =================================================
                            Username
                        ================================================== */}

                        <div className="form-group">

                            <label>
                                Username
                                <span>*</span>
                            </label>


                            <input
                                type="text"
                                name="username"
                                value={data.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                                autoComplete="username"
                            />


                            {errors.username && (

                                <small className="error">
                                    {errors.username}
                                </small>

                            )}

                        </div>


                        {/* =================================================
                            Email
                        ================================================== */}

                        <div className="form-group">

                            <label>
                                Email
                                <span>*</span>
                            </label>


                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                placeholder="user@example.com"
                                autoComplete="email"
                            />


                            {errors.email && (

                                <small className="error">
                                    {errors.email}
                                </small>

                            )}

                        </div>


                        {/* =================================================
                            Password
                        ================================================== */}

                        <div className="form-group">

                            <label>

                                Password

                                {!isEdit && (
                                    <span>*</span>
                                )}

                            </label>


                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                placeholder={
                                    isEdit
                                        ? "Leave blank to keep current password"
                                        : "Enter password"
                                }
                                autoComplete="new-password"
                            />


                            {errors.password && (

                                <small className="error">
                                    {errors.password}
                                </small>

                            )}

                        </div>


                        {/* =================================================
                            Confirm Password
                        ================================================== */}

                        {/* <div className="form-group">

                            <label>

                                Confirm Password

                                {!isEdit && (
                                    <span>*</span>
                                )}

                            </label>


                            <input
                                type="password"
                                name="password_confirmation"
                                value={
                                    data.password_confirmation
                                }
                                onChange={handleChange}
                                placeholder={
                                    isEdit
                                        ? "Leave blank if password unchanged"
                                        : "Confirm password"
                                }
                                autoComplete="new-password"
                            />


                            {errors.password_confirmation && (

                                <small className="error">
                                    {errors.password_confirmation}
                                </small>

                            )}

                        </div> */}

                    </div>

                </div>


                {/* =====================================================
                    Account Settings
                ====================================================== */}

                <div className="card">

                    <div className="card-header">

                        <h2>
                            Account Settings
                        </h2>

                        <p>
                            Manage account status and email verification.
                        </p>

                    </div>


                    <div className="settings-grid">


                        {/* =================================================
                            Email Verification
                        ================================================== */}

                        <label className="verification-box">

                            <input
                                type="checkbox"
                                checked={
                                    Boolean(
                                        data.email_verified_at
                                    )
                                }
                                onChange={
                                    handleEmailVerifiedChange
                                }
                            />


                            <span>

                                <strong>
                                    Email Verified
                                </strong>

                                <small>
                                    Mark this user's email as verified.
                                </small>

                            </span>

                        </label>


                        {/* =================================================
                            Status
                        ================================================== */}

                        <div className="form-group">

                            <label>
                                Status
                                <span>*</span>
                            </label>


                            <select
                                name="status"
                                value={
                                    data.status
                                        ? "1"
                                        : "0"
                                }
                                onChange={
                                    handleStatusChange
                                }
                            >

                                <option value="1">
                                    Active
                                </option>

                                <option value="0">
                                    Deactive
                                </option>

                            </select>


                            {errors.status && (

                                <small className="error">
                                    {errors.status}
                                </small>

                            )}

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    Save
                ====================================================== */}

                <div className="form-actions">

                    <Link
                        href="/users"
                        className="cancel-button"
                    >
                        Cancel
                    </Link>


                    <button
                        type="button"
                        className="save-button"
                        disabled={processing}
                        onClick={submit}
                    >

                        {processing
                            ? (
                                isEdit
                                    ? "Updating..."
                                    : "Creating..."
                            )
                            : (
                                isEdit
                                    ? "Update User"
                                    : "Create User"
                            )}

                    </button>

                </div>


            </div>


            {/* =============================================================
                CSS
            ============================================================= */}

            <style>{`

                .users-create-page {
                    width: 100%;
                    max-width: none;
                    margin: 0;
                    padding: 30px;
                    background: #f7f8fa;
                    min-height: calc(100vh - 90px);
                    box-sizing: border-box;
                }


                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 25px;
                    padding: 22px 25px;
                    background: #0f6b4f;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(15, 107, 79, 0.12);
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


                .back-button {
                    text-decoration: none;
                    color: #0f6b4f;
                    background: #ffffff;
                    border: 1px solid #d1e7df;
                    padding: 10px 16px;
                    border-radius: 8px;
                    font-weight: 600;
                    transition: all 0.2s ease;
                }


                .back-button:hover {
                    background: #e8f6f0;
                    border-color: #0f6b4f;
                }


                .card {
                    background: #ffffff;
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    margin-bottom: 20px;
                    overflow: hidden;
                }


                .card-header {
                    padding: 20px;
                    border-bottom: 1px solid #eeeeee;
                }


                .card-header h2 {
                    margin: 0 0 5px;
                    font-size: 18px;
                    font-weight: 700;
                    color: #111827;
                }


                .card-header p {
                    margin: 0;
                    color: #6b7280;
                    font-size: 14px;
                }


                .form-grid {
                    padding: 20px;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                }


                .form-group {
                    display: flex;
                    flex-direction: column;
                }


                .form-group label {
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 7px;
                    color: #374151;
                }


                .form-group label span {
                    color: #dc2626;
                    margin-left: 3px;
                }


                .form-group input,
                .form-group select {
                    width: 100%;
                    box-sizing: border-box;
                    height: 44px;
                    padding: 0 13px;
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    font-size: 14px;
                    outline: none;
                    background: #ffffff;
                    color: #111827;
                    transition: all 0.2s ease;
                }


                .form-group input::placeholder {
                    color: #9ca3af;
                }


                .form-group select {
                    cursor: pointer;
                }


                .form-group input:focus,
                .form-group select:focus {
                    border-color: #0f6b4f;
                    box-shadow: 0 0 0 3px rgba(15, 107, 79, 0.08);
                }


                .error {
                    color: #dc2626;
                    font-size: 13px;
                    margin-top: 5px;
                }


                .settings-grid {
                    padding: 20px;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                    align-items: center;
                }


                .verification-box {
                    min-height: 72px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    gap: 13px;
                    padding: 14px 16px;
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    background: #ffffff;
                    cursor: pointer;
                }


                .verification-box input {
                    width: 18px;
                    height: 18px;
                    margin: 0;
                    accent-color: #0f6b4f;
                    cursor: pointer;
                    flex-shrink: 0;
                }


                .verification-box > span {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }


                .verification-box strong {
                    color: #374151;
                    font-size: 14px;
                    font-weight: 600;
                }


                .verification-box small {
                    color: #6b7280;
                    font-size: 13px;
                }


                .form-actions {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    gap: 10px;
                    margin-top: 10px;
                    margin-bottom: 20px;
                }


                .cancel-button,
                .save-button {
                    padding: 12px 20px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    text-decoration: none;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }


                .cancel-button {
                    background: #ffffff;
                    color: #374151;
                    border: 1px solid #d1d5db;
                }


                .cancel-button:hover {
                    background: #f9fafb;
                    border-color: #9ca3af;
                }


                .save-button {
                    background: #0f6b4f;
                    color: #ffffff;
                    border: 1px solid #0f6b4f;
                }


                .save-button:hover {
                    background: #0b5941;
                    border-color: #0b5941;
                }


                .save-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }


                @media (max-width: 768px) {

                    .users-create-page {
                        padding: 15px;
                    }


                    .page-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 15px;
                    }


                    .form-grid {
                        grid-template-columns: 1fr;
                    }


                    .settings-grid {
                        grid-template-columns: 1fr;
                    }


                    .form-actions {
                        flex-direction: column-reverse;
                        align-items: stretch;
                    }


                    .cancel-button,
                    .save-button {
                        width: 100%;
                        text-align: center;
                        box-sizing: border-box;
                    }

                }


                @media (max-width: 480px) {

                    .users-create-page {
                        padding: 10px;
                    }


                    .page-header {
                        padding: 18px;
                    }


                    .page-header h1 {
                        font-size: 23px;
                    }


                    .card-header {
                        padding: 17px;
                    }


                    .form-grid,
                    .settings-grid {
                        padding: 17px;
                    }

                }

            `}</style>

        </AppLayout>
    );
}
