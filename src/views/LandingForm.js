// src/views/LandingForm.js
import React, { useState } from 'react'
import {
    CCard, CCardBody, CCardHeader,
    CRow, CCol, CForm, CFormInput, CFormSelect, CFormTextarea,
    CButton, CAlert, CSpinner, CFormCheck,
} from '@coreui/react'

export default function LandingForm() {
    const [form, setForm] = useState({
        studentType: '',
        selections: [],
        // Form fields
        ucfId: '',
        givenName: '',
        familyName: '',
        legalSex: '',
        dateOfBirth: '',
        cityOfBirth: '',
        countryOfBirth: '',
        countryOfCitizenship: '',
        hasUsAddress: true,
        hasNonUsAddress: true,
        usAddress: {
            street: '',
            city: '',
            state: '',
            postalCode: ''
        },
        nonUsAddress: {
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
        },
        ucfEmail: '',
        personalEmail: '',
        usTelephone: '',
        nonUsTelephone: ''
    })
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    // Debug render check
    console.log('LandingForm rendering')

    const update = (e) => {
        const { name, value } = e.target
        setForm((f) => ({ ...f, [name]: value }))
        setErrors((errs) => ({ ...errs, [name]: undefined }))
    }

    const validate = () => {
        const e = {}
        if (!form.studentType) e.studentType = 'Please select your student status'
        if (form.selections.length === 0) e.selections = 'Please select at least one option'

        if (form.selections.length > 0) {
            // Basic Information
            if (!form.ucfId) e.ucfId = 'UCF ID is required'
            if (!form.givenName) e.givenName = 'Given name is required'
            if (!form.familyName) e.familyName = 'Family name is required'
            if (!form.legalSex) e.legalSex = 'Legal sex is required'
            if (!form.dateOfBirth) e.dateOfBirth = 'Date of birth is required'
            if (!form.cityOfBirth) e.cityOfBirth = 'City of birth is required'
            if (!form.countryOfBirth) e.countryOfBirth = 'Country of birth is required'
            if (!form.countryOfCitizenship) e.countryOfCitizenship = 'Country of citizenship is required'

            // Address validation
            if (form.hasUsAddress) {
                if (!form.usAddress.street) e.usAddressStreet = 'Street address is required'
                if (!form.usAddress.city) e.usAddressCity = 'City is required'
                if (!form.usAddress.state) e.usAddressState = 'State is required'
                if (!form.usAddress.postalCode) e.usAddressPostalCode = 'Postal code is required'
            }

            // Non-US Address validation
            if (form.hasNonUsAddress) {
                if (!form.nonUsAddress.street) e.nonUsAddressStreet = 'Street address is required'
                if (!form.nonUsAddress.city) e.nonUsAddressCity = 'City is required'
                if (!form.nonUsAddress.state) e.nonUsAddressState = 'State/Province is required'
                if (!form.nonUsAddress.postalCode) e.nonUsAddressPostalCode = 'Postal code is required'
                if (!form.nonUsAddress.country) e.nonUsAddressCountry = 'Country is required'
            }

            // Contact Information
            if (!form.ucfEmail) e.ucfEmail = 'UCF email is required'
            else if (!/^[^\s@]+@ucf\.edu$/.test(form.ucfEmail)) e.ucfEmail = 'Must be a valid UCF email address'

            if (!form.personalEmail) e.personalEmail = 'Personal email is required'
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.personalEmail)) e.personalEmail = 'Must be a valid email address'

            if (!form.usTelephone && !form.nonUsTelephone) {
                e.usTelephone = 'At least one telephone number is required'
                e.nonUsTelephone = 'At least one telephone number is required'
            }
        }

        // All validations are now handled above
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const onSubmit = async (ev) => {
        ev.preventDefault()
        if (!validate()) return
        setSubmitting(true)
        try {
            // TODO: send to your API
            // await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
            await new Promise((r) => setTimeout(r, 600)) // simulate
            setSubmitted(true)
            setForm({
                studentType: '',
                selections: [],
                ucfId: '',
                givenName: '',
                familyName: '',
                legalSex: '',
                dateOfBirth: '',
                cityOfBirth: '',
                countryOfBirth: '',
                countryOfCitizenship: '',
                hasUsAddress: true,
                usAddress: { street: '', city: '', state: '', postalCode: '' },
                nonUsAddress: { street: '', city: '', state: '', postalCode: '', country: '' },
                ucfEmail: '',
                personalEmail: '',
                usTelephone: '',
                nonUsTelephone: ''
            })
        } catch (err) {
            setErrors((e) => ({ ...e, _global: 'Something went wrong. Try again.' }))
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Get in touch</strong>
                        <small className="ms-2 text-body-secondary">Tell us a bit and we'll reach out.</small>
                    </CCardHeader>
                    <CCardBody>
                        {submitted && <CAlert color="success" className="mb-4">Thanks! We’ll contact you soon.</CAlert>}
                        {errors._global && <CAlert color="danger" className="mb-4">{errors._global}</CAlert>}

                        <CForm onSubmit={onSubmit}>
                            <CRow className="mb-3">
                                <CCol md={6}>
                                    <CFormSelect
                                        label="I am a..."
                                        name="studentType"
                                        value={form.studentType}
                                        onChange={update}
                                        invalid={!!errors.studentType}
                                        feedbackInvalid={errors.studentType}
                                        options={[
                                            { label: 'Choose...', value: '' },
                                            { label: 'Current UCF student', value: 'current' },
                                            { label: 'New incoming UCF student', value: 'new' }
                                        ]}
                                    />
                                </CCol>
                            </CRow>

                            {form.studentType && (
                                <>
                                    <CRow className="mb-4">
                                        <CCol xs={12}>
                                            <h5>Select all that apply:</h5>
                                            <div className="d-grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                                                {[
                                                    'Program Extension',
                                                    'Change of Major',
                                                    'Return from Authorized Early Withdrawal',
                                                    'Change of Academic Level',
                                                    'Return from Absence of greater than 5 months',
                                                    'Add or Remove a F-2 Dependent',
                                                    'Change of Non-Immigrant Status',
                                                    'Other'
                                                ].map((option) => (
                                                    <CFormCheck
                                                        key={option}
                                                        id={`check-${option.toLowerCase().replace(/\s+/g, '-')}`}
                                                        label={option}
                                                        checked={form.selections.includes(option)}
                                                        onChange={() => {
                                                            setForm(f => ({
                                                                ...f,
                                                                selections: f.selections.includes(option)
                                                                    ? f.selections.filter(s => s !== option)
                                                                    : [...f.selections, option]
                                                            }))
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            {errors.selections && (
                                                <div className="text-danger small mt-2">{errors.selections}</div>
                                            )}
                                        </CCol>
                                    </CRow>

                                    {form.selections.length > 0 && (
                                        <>
                                            <CRow className="mb-3">
                                                <CCol md={6}>
                                                    <CFormInput
                                                        label="UCF ID"
                                                        name="ucfId"
                                                        value={form.ucfId}
                                                        onChange={update}
                                                        invalid={!!errors.ucfId}
                                                        feedbackInvalid={errors.ucfId}
                                                    />
                                                </CCol>
                                            </CRow>

                                            <CRow className="mb-3">
                                                <CCol md={6}>
                                                    <CFormInput
                                                        label="Given Name"
                                                        name="givenName"
                                                        value={form.givenName}
                                                        onChange={update}
                                                        invalid={!!errors.givenName}
                                                        feedbackInvalid={errors.givenName}
                                                    />
                                                </CCol>
                                                <CCol md={6}>
                                                    <CFormInput
                                                        label="Family Name/Surname"
                                                        name="familyName"
                                                        value={form.familyName}
                                                        onChange={update}
                                                        invalid={!!errors.familyName}
                                                        feedbackInvalid={errors.familyName}
                                                    />
                                                </CCol>
                                            </CRow>

                                            <CRow className="mb-3">
                                                <CCol md={4}>
                                                    <CFormSelect
                                                        label="Legal Sex"
                                                        name="legalSex"
                                                        value={form.legalSex}
                                                        onChange={update}
                                                        invalid={!!errors.legalSex}
                                                        feedbackInvalid={errors.legalSex}
                                                        options={[
                                                            { label: 'Choose...', value: '' },
                                                            { label: 'Male', value: 'male' },
                                                            { label: 'Female', value: 'female' },
                                                            { label: 'Unknown', value: 'unknown' }
                                                        ]}
                                                    />
                                                </CCol>
                                                <CCol md={4}>
                                                    <CFormInput
                                                        type="date"
                                                        label="Date of Birth"
                                                        name="dateOfBirth"
                                                        value={form.dateOfBirth}
                                                        onChange={update}
                                                        invalid={!!errors.dateOfBirth}
                                                        feedbackInvalid={errors.dateOfBirth}
                                                    />
                                                </CCol>
                                                <CCol md={4}>
                                                    <CFormInput
                                                        label="City of Birth"
                                                        name="cityOfBirth"
                                                        value={form.cityOfBirth}
                                                        onChange={update}
                                                        invalid={!!errors.cityOfBirth}
                                                        feedbackInvalid={errors.cityOfBirth}
                                                    />
                                                </CCol>
                                            </CRow>

                                            <CRow className="mb-3">
                                                <CCol md={6}>
                                                    <CFormSelect
                                                        label="Country of Birth"
                                                        name="countryOfBirth"
                                                        value={form.countryOfBirth}
                                                        onChange={update}
                                                        invalid={!!errors.countryOfBirth}
                                                        feedbackInvalid={errors.countryOfBirth}
                                                        options={[
                                                            { label: 'Choose...', value: '' },
                                                            { label: 'United States', value: 'US' },
                                                            // TODO: Add more countries
                                                        ]}
                                                    />
                                                </CCol>
                                                <CCol md={6}>
                                                    <CFormSelect
                                                        label="Country of Citizenship"
                                                        name="countryOfCitizenship"
                                                        value={form.countryOfCitizenship}
                                                        onChange={update}
                                                        invalid={!!errors.countryOfCitizenship}
                                                        feedbackInvalid={errors.countryOfCitizenship}
                                                        options={[
                                                            { label: 'Choose...', value: '' },
                                                            { label: 'United States', value: 'US' },
                                                            // TODO: Add more countries
                                                        ]}
                                                    />
                                                </CCol>
                                            </CRow>

                                            <CRow className="mb-3">
                                                <CCol xs={12}>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <h5 className="mb-0">U.S. Address</h5>
                                                        <CFormCheck
                                                            className="ms-3"
                                                            label="I do not have a U.S. address"
                                                            checked={!form.hasUsAddress}
                                                            onChange={(e) => setForm(f => ({ ...f, hasUsAddress: !e.target.checked }))}
                                                        />
                                                    </div>
                                                </CCol>
                                            </CRow>

                                            {form.hasUsAddress && (
                                                <CRow className="mb-3">
                                                    <CCol md={12}>
                                                        <CFormInput
                                                            label="Street Address"
                                                            name="usAddress.street"
                                                            value={form.usAddress.street}
                                                            onChange={update}
                                                            invalid={!!errors.usAddressStreet}
                                                            feedbackInvalid={errors.usAddressStreet}
                                                        />
                                                    </CCol>
                                                    <CCol md={4} className="mt-3">
                                                        <CFormInput
                                                            label="City"
                                                            name="usAddress.city"
                                                            value={form.usAddress.city}
                                                            onChange={update}
                                                            invalid={!!errors.usAddressCity}
                                                            feedbackInvalid={errors.usAddressCity}
                                                        />
                                                    </CCol>
                                                    <CCol md={4} className="mt-3">
                                                        <CFormSelect
                                                            label="State"
                                                            name="usAddress.state"
                                                            value={form.usAddress.state}
                                                            onChange={update}
                                                            invalid={!!errors.usAddressState}
                                                            feedbackInvalid={errors.usAddressState}
                                                            options={[
                                                                { label: 'Choose...', value: '' },
                                                                { label: 'Florida', value: 'FL' },
                                                                // TODO: Add more states
                                                            ]}
                                                        />
                                                    </CCol>
                                                    <CCol md={4} className="mt-3">
                                                        <CFormInput
                                                            label="Postal Code"
                                                            name="usAddress.postalCode"
                                                            value={form.usAddress.postalCode}
                                                            onChange={update}
                                                            invalid={!!errors.usAddressPostalCode}
                                                            feedbackInvalid={errors.usAddressPostalCode}
                                                        />
                                                    </CCol>
                                                </CRow>
                                            )}

                                            <CRow className="mb-3">
                                                <CCol xs={12}>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <h5 className="mb-0">Non-U.S. Address</h5>
                                                        <CFormCheck
                                                            className="ms-3"
                                                            label="I do not have a Non-U.S. address"
                                                            checked={!form.hasNonUsAddress}
                                                            onChange={(e) => setForm(f => ({ ...f, hasNonUsAddress: !e.target.checked }))}
                                                        />
                                                    </div>
                                                </CCol>
                                                {form.hasNonUsAddress && (
                                                    <>
                                                        <CCol md={12}>
                                                            <CFormInput
                                                                label="Street Address"
                                                                name="nonUsAddress.street"
                                                                value={form.nonUsAddress.street}
                                                                onChange={update}
                                                                invalid={!!errors.nonUsAddressStreet}
                                                                feedbackInvalid={errors.nonUsAddressStreet}
                                                            />
                                                        </CCol>
                                                        <CCol md={3} className="mt-3">
                                                            <CFormInput
                                                                label="City"
                                                                name="nonUsAddress.city"
                                                                value={form.nonUsAddress.city}
                                                                onChange={update}
                                                                invalid={!!errors.nonUsAddressCity}
                                                                feedbackInvalid={errors.nonUsAddressCity}
                                                            />
                                                        </CCol>
                                                        <CCol md={3} className="mt-3">
                                                            <CFormInput
                                                                label="State/Province"
                                                                name="nonUsAddress.state"
                                                                value={form.nonUsAddress.state}
                                                                onChange={update}
                                                                invalid={!!errors.nonUsAddressState}
                                                                feedbackInvalid={errors.nonUsAddressState}
                                                            />
                                                        </CCol>
                                                        <CCol md={3} className="mt-3">
                                                            <CFormInput
                                                                label="Postal Code"
                                                                name="nonUsAddress.postalCode"
                                                                value={form.nonUsAddress.postalCode}
                                                                onChange={update}
                                                                invalid={!!errors.nonUsAddressPostalCode}
                                                                feedbackInvalid={errors.nonUsAddressPostalCode}
                                                            />
                                                        </CCol>
                                                        <CCol md={3} className="mt-3">
                                                            <CFormSelect
                                                                label="Country"
                                                                name="nonUsAddress.country"
                                                                value={form.nonUsAddress.country}
                                                                onChange={update}
                                                                invalid={!!errors.nonUsAddressCountry}
                                                                feedbackInvalid={errors.nonUsAddressCountry}
                                                                options={[
                                                                    { label: 'Choose...', value: '' },
                                                                    // TODO: Add countries
                                                                ]}
                                                            />
                                                        </CCol>
                                                    </>
                                                )}
                                            </CRow>

                                            <CRow className="mb-3">
                                                <CCol md={6}>
                                                    <CFormInput
                                                        type="email"
                                                        label="UCF Email Address"
                                                        name="ucfEmail"
                                                        value={form.ucfEmail}
                                                        onChange={update}
                                                        invalid={!!errors.ucfEmail}
                                                        feedbackInvalid={errors.ucfEmail}
                                                    />
                                                </CCol>
                                                <CCol md={6}>
                                                    <CFormInput
                                                        type="email"
                                                        label="Personal Email Address"
                                                        name="personalEmail"
                                                        value={form.personalEmail}
                                                        onChange={update}
                                                        invalid={!!errors.personalEmail}
                                                        feedbackInvalid={errors.personalEmail}
                                                    />
                                                </CCol>
                                            </CRow>

                                            <CRow className="mb-3">
                                                <CCol md={6}>
                                                    <CFormInput
                                                        type="tel"
                                                        label="U.S. Telephone Number"
                                                        name="usTelephone"
                                                        value={form.usTelephone}
                                                        onChange={update}
                                                        invalid={!!errors.usTelephone}
                                                        feedbackInvalid={errors.usTelephone}
                                                    />
                                                </CCol>
                                                <CCol md={6}>
                                                    <CFormInput
                                                        type="tel"
                                                        label="Non-U.S. Telephone Number"
                                                        name="nonUsTelephone"
                                                        value={form.nonUsTelephone}
                                                        onChange={update}
                                                        invalid={!!errors.nonUsTelephone}
                                                        feedbackInvalid={errors.nonUsTelephone}
                                                    />
                                                </CCol>
                                            </CRow>
                                        </>
                                    )}

                                    <div className="d-flex gap-2">
                                        <CButton type="submit" disabled={submitting}>
                                            {submitting ? <><CSpinner size="sm" />&nbsp;Sending…</> : 'Send'}
                                        </CButton>
                                        <CButton
                                            type="button"
                                            color="secondary"
                                            variant="outline"
                                            disabled={submitting}
                                            onClick={() => {
                                                setForm({
                                                    studentType: '',
                                                    selections: [],
                                                    ucfId: '',
                                                    givenName: '',
                                                    familyName: '',
                                                    legalSex: '',
                                                    dateOfBirth: '',
                                                    cityOfBirth: '',
                                                    countryOfBirth: '',
                                                    countryOfCitizenship: '',
                                                    hasUsAddress: true,
                                                    hasNonUsAddress: true,
                                                    usAddress: { street: '', city: '', state: '', postalCode: '' },
                                                    nonUsAddress: { street: '', city: '', state: '', postalCode: '', country: '' },
                                                    ucfEmail: '',
                                                    personalEmail: '',
                                                    usTelephone: '',
                                                    nonUsTelephone: ''
                                                });
                                                setErrors({});
                                            }}
                                        >
                                            Clear
                                        </CButton>
                                    </div>
                                </>
                            )}
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
