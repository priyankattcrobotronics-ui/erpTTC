import React, { useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function CompanyProfile() {
    const { company, flash, countries } = usePage().props;

    /*
    |--------------------------------------------------------------------------
    | Logo Preview
    |--------------------------------------------------------------------------
    */

    const [preview, setPreview] = useState(
        company?.logo
            ? `/storage/${company.logo}`
            : null
    );


    /*
    |--------------------------------------------------------------------------
    | Favicon Preview
    |--------------------------------------------------------------------------
    */

    const [faviconPreview, setFaviconPreview] = useState(
        company?.favicon
            ? `/storage/${company.favicon}`
            : null
    );


    /*
    |--------------------------------------------------------------------------
    | Form
    |--------------------------------------------------------------------------
    */

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({

        _method: "PUT",

        company_name: company?.company_name || "",

        logo: null,

        favicon: null,

        email: company?.email || "",
        phone: company?.phone || "",

        address: company?.address || "",

        country_id: company?.country_id || "",
        state_id: company?.state_id || "",
        city_id: company?.city_id || "",

        zipcode: company?.zipcode || "",

        gst_number: company?.gst_number || "",
        pan_number: company?.pan_number || "",

        website: company?.website || "",
    });


    /*
    |--------------------------------------------------------------------------
    | Country / State / City Data
    |--------------------------------------------------------------------------
    */

    const selectedCountry = countries?.find(
        (country) =>
            String(country.id) === String(data.country_id)
    );

    const states = selectedCountry?.states || [];


    const selectedState = states.find(
        (state) =>
            String(state.id) === String(data.state_id)
    );

    const cities = selectedState?.cities || [];


    /*
    |--------------------------------------------------------------------------
    | Normal Input Change
    |--------------------------------------------------------------------------
    */

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData(name, value);
    };


    /*
    |--------------------------------------------------------------------------
    | Country Change
    |--------------------------------------------------------------------------
    */

    const handleCountryChange = (e) => {
        const countryId = e.target.value;

        setData((data) => ({
            ...data,
            country_id: countryId,
            state_id: "",
            city_id: "",
        }));
    };


    /*
    |--------------------------------------------------------------------------
    | State Change
    |--------------------------------------------------------------------------
    */

    const handleStateChange = (e) => {
        const stateId = e.target.value;

        setData((data) => ({
            ...data,
            state_id: stateId,
            city_id: "",
        }));
    };


    /*
    |--------------------------------------------------------------------------
    | City Change
    |--------------------------------------------------------------------------
    */

    const handleCityChange = (e) => {
        setData("city_id", e.target.value);
    };


    /*
    |--------------------------------------------------------------------------
    | Logo Change
    |--------------------------------------------------------------------------
    */

    const handleLogoChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        setData("logo", file);

        setPreview(
            URL.createObjectURL(file)
        );
    };


    /*
    |--------------------------------------------------------------------------
    | Favicon Change
    |--------------------------------------------------------------------------
    */

    const handleFaviconChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        setData("favicon", file);

        setFaviconPreview(
            URL.createObjectURL(file)
        );
    };


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const submit = (e) => {
        e.preventDefault();

        post("/company-profile", {
            forceFormData: true,
            preserveScroll: true,
        });
    };


    return (
        <AppLayout title="Company Profile">

            <Head title="Company Profile" />


            <div className="company-profile-page">


                {/* Header */}

                <div className="page-header">

                    <div>

                        <h1>
                            Company Profile
                        </h1>

                        <p>
                            Manage your company information and business details.
                        </p>

                    </div>


                    <Link
                        href="/dashboard"
                        className="back-button"
                    >
                        ← Back to Dashboard
                    </Link>

                </div>


                {/* Success Message */}

                {flash?.success && (
                    <div className="success-message">
                        {flash.success}
                    </div>
                )}


                {/* Form */}

                <form
                    onSubmit={submit}
                    encType="multipart/form-data"
                >


                    {/* =====================================================
                        Company Information
                    ====================================================== */}

                    <div className="card">

                        <div className="card-header">

                            <h2>
                                Company Information
                            </h2>

                            <p>
                                Basic information about your company.
                            </p>

                        </div>


                        <div className="form-grid">


                            {/* Company Name */}

                            <div className="form-group full-width">

                                <label>
                                    Company Name
                                    <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="company_name"
                                    value={data.company_name}
                                    onChange={handleChange}
                                    placeholder="Enter company name"
                                />

                                {errors.company_name && (
                                    <small className="error">
                                        {errors.company_name}
                                    </small>
                                )}

                            </div>


                            {/* Email */}

                            <div className="form-group">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder="company@example.com"
                                />

                                {errors.email && (
                                    <small className="error">
                                        {errors.email}
                                    </small>
                                )}

                            </div>


                            {/* Phone */}

                            <div className="form-group">

                                <label>
                                    Phone Number
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={data.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                />

                                {errors.phone && (
                                    <small className="error">
                                        {errors.phone}
                                    </small>
                                )}

                            </div>


                            {/* Website */}

                            <div className="form-group">

                                <label>
                                    Website
                                </label>

                                <input
                                    type="url"
                                    name="website"
                                    value={data.website}
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                                />

                                {errors.website && (
                                    <small className="error">
                                        {errors.website}
                                    </small>
                                )}

                            </div>


                            {/* GST */}

                            <div className="form-group">

                                <label>
                                    GST Number
                                </label>

                                <input
                                    type="text"
                                    name="gst_number"
                                    value={data.gst_number}
                                    onChange={handleChange}
                                    placeholder="Enter GST number"
                                />

                                {errors.gst_number && (
                                    <small className="error">
                                        {errors.gst_number}
                                    </small>
                                )}

                            </div>


                            {/* PAN */}

                            <div className="form-group">

                                <label>
                                    PAN Number
                                </label>

                                <input
                                    type="text"
                                    name="pan_number"
                                    value={data.pan_number}
                                    onChange={handleChange}
                                    placeholder="Enter PAN number"
                                />

                                {errors.pan_number && (
                                    <small className="error">
                                        {errors.pan_number}
                                    </small>
                                )}

                            </div>


                            {/* Zipcode */}

                            <div className="form-group">

                                <label>
                                    Zipcode
                                </label>

                                <input
                                    type="text"
                                    name="zipcode"
                                    value={data.zipcode}
                                    onChange={handleChange}
                                    placeholder="Enter zipcode"
                                />

                                {errors.zipcode && (
                                    <small className="error">
                                        {errors.zipcode}
                                    </small>
                                )}

                            </div>


                            {/* Address */}

                            <div className="form-group full-width">

                                <label>
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    value={data.address}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Enter company address"
                                />

                                {errors.address && (
                                    <small className="error">
                                        {errors.address}
                                    </small>
                                )}

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        Logo + Favicon
                    ====================================================== */}

                    <div className="card">

                        <div className="card-header">

                            <h2>
                                Company Logo
                            </h2>

                            <p>
                                Upload your company logo and website favicon.
                            </p>

                        </div>


                        {/* =================================================
                            Logo + Favicon Same Row
                        ================================================== */}

                        <div className="logo-favicon-row">


                            {/* Company Logo */}

                            <div className="logo-section">

                                <div className="logo-preview">

                                    {preview ? (

                                        <img
                                            src={preview}
                                            alt="Company Logo"
                                        />

                                    ) : (

                                        <div className="logo-placeholder">
                                            LOGO
                                        </div>

                                    )}

                                </div>


                                <div className="logo-upload">

                                    <label className="upload-button">

                                        Choose Logo

                                        <input
                                            type="file"
                                            name="logo"
                                            accept=".jpg,.jpeg,.png,.webp"
                                            onChange={handleLogoChange}
                                            hidden
                                        />

                                    </label>


                                    <p>
                                        JPG, JPEG, PNG or WEBP.
                                        Maximum size 2MB.
                                    </p>


                                    {errors.logo && (
                                        <small className="error">
                                            {errors.logo}
                                        </small>
                                    )}

                                </div>

                            </div>


                            {/* Favicon */}

                            <div className="favicon-section">

                                <div className="favicon-preview">

                                    {faviconPreview ? (

                                        <img
                                            src={faviconPreview}
                                            alt="Favicon"
                                        />

                                    ) : (

                                        <div className="favicon-placeholder">
                                            F
                                        </div>

                                    )}

                                </div>


                                <div className="favicon-upload">

                                    <label className="upload-button">

                                        Choose Favicon

                                        <input
                                            type="file"
                                            name="favicon"
                                            accept=".ico,.png,.jpg,.jpeg,.webp"
                                            onChange={handleFaviconChange}
                                            hidden
                                        />

                                    </label>


                                    <p>
                                        ICO, PNG, JPG, JPEG or WEBP.
                                        Maximum size 1MB.
                                    </p>


                                    {errors.favicon && (
                                        <small className="error">
                                            {errors.favicon}
                                        </small>
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        Location
                    ====================================================== */}

                    <div className="card">

                        <div className="card-header">

                            <h2>
                                Location
                            </h2>

                            <p>
                                Company location information.
                            </p>

                        </div>


                        <div className="form-grid">


                            {/* Country */}

                            <div className="form-group">

                                <label>
                                    Country
                                </label>

                                <select
                                    name="country_id"
                                    value={data.country_id}
                                    onChange={handleCountryChange}
                                >

                                    <option value="">
                                        Select Country
                                    </option>

                                    {countries?.map((country) => (

                                        <option
                                            key={country.id}
                                            value={country.id}
                                        >
                                            {country.name}
                                        </option>

                                    ))}

                                </select>


                                {errors.country_id && (
                                    <small className="error">
                                        {errors.country_id}
                                    </small>
                                )}

                            </div>


                            {/* State */}

                            <div className="form-group">

                                <label>
                                    State
                                </label>

                                <select
                                    name="state_id"
                                    value={data.state_id}
                                    onChange={handleStateChange}
                                    disabled={!data.country_id}
                                >

                                    <option value="">
                                        {data.country_id
                                            ? "Select State"
                                            : "Select Country First"}
                                    </option>


                                    {states.map((state) => (

                                        <option
                                            key={state.id}
                                            value={state.id}
                                        >
                                            {state.name}
                                        </option>

                                    ))}

                                </select>


                                {errors.state_id && (
                                    <small className="error">
                                        {errors.state_id}
                                    </small>
                                )}

                            </div>


                            {/* City */}

                            <div className="form-group">

                                <label>
                                    City
                                </label>

                                <select
                                    name="city_id"
                                    value={data.city_id}
                                    onChange={handleCityChange}
                                    disabled={!data.state_id}
                                >

                                    <option value="">
                                        {data.state_id
                                            ? "Select City"
                                            : "Select State First"}
                                    </option>


                                    {cities.map((city) => (

                                        <option
                                            key={city.id}
                                            value={city.id}
                                        >
                                            {city.name}
                                        </option>

                                    ))}

                                </select>


                                {errors.city_id && (
                                    <small className="error">
                                        {errors.city_id}
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
                            href="/dashboard"
                            className="cancel-button"
                        >
                            Cancel
                        </Link>


                        <button
                            type="submit"
                            className="save-button"
                            disabled={processing}
                        >
                            {processing
                                ? "Saving..."
                                : "Save Company Profile"}
                        </button>

                    </div>

                </form>

            </div>


            {/* =============================================================
                CSS
            ============================================================= */}

            <style>{`

                .company-profile-page {
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


                .success-message {
                    background: #ecfdf5;
                    color: #047857;
                    border: 1px solid #a7f3d0;
                    padding: 13px 16px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }


                .card {
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    margin-bottom: 20px;
                    overflow: hidden;
                }


                .card-header {
                    padding: 20px;
                    border-bottom: 1px solid #eee;
                }


                .card-header h2 {
                    margin: 0 0 5px;
                    font-size: 18px;
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


                .full-width {
                    grid-column: 1 / -1;
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
                .form-group textarea,
                .form-group select {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 11px 13px;
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    font-size: 14px;
                    outline: none;
                    background: #fff;
                }


                .form-group select {
                    cursor: pointer;
                }


                .form-group select:disabled {
                    background: #f3f4f6;
                    color: #9ca3af;
                    cursor: not-allowed;
                }


                .form-group input:focus,
                .form-group textarea:focus,
                .form-group select:focus {
                    border-color: #2563eb;
                }


                .error {
                    color: #dc2626;
                    font-size: 13px;
                    margin-top: 5px;
                }


                /* =========================================================
                   Logo + Favicon Row
                ========================================================= */

                .logo-favicon-row {
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    gap: 50px;
                }


                .logo-section {
                    padding: 0;
                    display: flex;
                    gap: 25px;
                    align-items: center;
                    flex: 1;
                    min-width: 0;
                }


                .favicon-section {
                    padding: 0;
                    display: flex;
                    gap: 25px;
                    align-items: center;
                    flex: 1;
                    min-width: 0;
                }


                /* =========================================================
                   Logo Preview
                ========================================================= */

                .logo-preview {
                    width: 120px;
                    height: 120px;
                    border: 1px dashed #cbd5e1;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    background: #fff;
                    flex-shrink: 0;
                }


                .logo-preview img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }


                .logo-placeholder {
                    color: #94a3b8;
                    font-weight: 700;
                }


                /* =========================================================
                   Favicon Preview
                ========================================================= */

                .favicon-preview {
                    width: 70px;
                    height: 70px;
                    border: 1px dashed #cbd5e1;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    background: #fff;
                    flex-shrink: 0;
                }


                .favicon-preview img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    padding: 8px;
                    box-sizing: border-box;
                }


                .favicon-placeholder {
                    color: #94a3b8;
                    font-weight: 700;
                    font-size: 20px;
                }


                /* =========================================================
                   Upload
                ========================================================= */

                .upload-button {
                    display: inline-block;
                    background: #2563eb;
                    color: white;
                    padding: 10px 16px;
                    border-radius: 8px;
                    cursor: pointer;
                }


                .logo-upload p,
                .favicon-upload p {
                    color: #6b7280;
                    font-size: 13px;
                    margin-bottom: 0;
                }


                /* =========================================================
                   Form Actions
                ========================================================= */

                .form-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    margin-top: 10px;
                    margin-bottom: 20px;
                }


                .cancel-button,
                .save-button {
                    padding: 12px 20px;
                    border-radius: 8px;
                    font-size: 14px;
                    text-decoration: none;
                    cursor: pointer;
                }


                .cancel-button {
                    background: white;
                    color: #374151;
                    border: 1px solid #d1d5db;
                }


                .save-button {
                    background: #2563eb;
                    color: white;
                    border: none;
                }


                .save-button:disabled {
                    opacity: .6;
                    cursor: not-allowed;
                }


                /* =========================================================
                   Mobile
                ========================================================= */

                @media (max-width: 768px) {

                    .company-profile-page {
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


                    .full-width {
                        grid-column: auto;
                    }


                    .logo-favicon-row {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 25px;
                    }


                    .logo-section,
                    .favicon-section {
                        width: 100%;
                    }

                }

            `}</style>

        </AppLayout>
    );
}
