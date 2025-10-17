// src/views/LandingForm.js
import React, { useState } from 'react'
import {
    CCard, CCardBody, CCardHeader,
    CRow, CCol, CForm, CFormInput, CFormSelect, CFormTextarea,
    CButton, CAlert, CSpinner,
} from '@coreui/react'

export default function LandingForm() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        studentType: '',
        selections: [],
        message: ''
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
        if (!form.name.trim()) e.name = 'Name is required'
        if (!form.email.trim()) e.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
        if (!form.studentType) e.studentType = 'Please select your student status'
        if (form.selections.length === 0) e.selections = 'Please select at least one option'
        if (form.message.length > 500) e.message = 'Keep it under 500 characters'
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
            setForm({ name: '', email: '', reason: '', message: '' })
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
                                                    <CButton
                                                        key={option}
                                                        color={form.selections.includes(option) ? 'primary' : 'light'}
                                                        className="text-start"
                                                        onClick={() => {
                                                            setForm(f => ({
                                                                ...f,
                                                                selections: f.selections.includes(option)
                                                                    ? f.selections.filter(s => s !== option)
                                                                    : [...f.selections, option]
                                                            }))
                                                        }}
                                                    >
                                                        {option}
                                                    </CButton>
                                                ))}
                                            </div>
                                            {errors.selections && (
                                                <div className="text-danger small mt-2">{errors.selections}</div>
                                            )}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md={6}>
                                            <CFormInput
                                                label="Full name"
                                                name="name"
                                                value={form.name}
                                                onChange={update}
                                                invalid={!!errors.name}
                                                feedbackInvalid={errors.name}
                                                placeholder="Jane Doe"
                                            />
                                        </CCol>
                                        <CCol md={6}>
                                            <CFormInput
                                                type="email"
                                                label="Email"
                                                name="email"
                                                value={form.email}
                                                onChange={update}
                                                invalid={!!errors.email}
                                                feedbackInvalid={errors.email}
                                                placeholder="jane@example.com"
                                            />
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-4">
                                        <CCol>
                                            <CFormTextarea
                                                label="Message (optional)"
                                                name="message"
                                                value={form.message}
                                                onChange={update}
                                                rows={5}
                                                placeholder="Tell us more…"
                                                invalid={!!errors.message}
                                                feedbackInvalid={errors.message}
                                            />
                                            <div className="text-body-secondary mt-1">{form.message.length}/500</div>
                                        </CCol>
                                    </CRow>

                                    <div className="d-flex gap-2">
                                        <CButton type="submit" disabled={submitting}>
                                            {submitting ? <><CSpinner size="sm" />&nbsp;Sending…</> : 'Send'}
                                        </CButton>
                                        <CButton
                                            type="button"
                                            color="secondary"
                                            variant="outline"
                                            disabled={submitting}
                                            onClick={() => { setForm({ name: '', email: '', studentType: '', selections: [], message: '' }); setErrors({}) }}
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
