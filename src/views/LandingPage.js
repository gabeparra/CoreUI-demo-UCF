import React from 'react'
import {
    CCard, CCardBody, CCardHeader,
    CRow, CCol, CContainer,
    CButton
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
    const navigate = useNavigate()

    const menuItems = [
        {
            title: 'I-20 Request Form',
            description: 'Request changes to your I-20, including program extensions, change of major, academic level changes, and more.',
            icon: '📄',
            path: '/forms/i20-request'
        },
        // Add more menu items here as needed
    ]

    return (
        <CContainer>
            <CRow className="mb-4">
                <CCol>
                    <h2 className="mb-4">Welcome to UCF Global Services</h2>
                    <p className="lead text-muted">
                        Select a service from the options below to get started.
                    </p>
                </CCol>
            </CRow>
            <CRow>
                {menuItems.map((item, index) => (
                    <CCol xs={12} md={6} lg={4} key={index} className="mb-4">
                        <CCard className="h-100">
                            <CCardHeader>
                                <div className="d-flex align-items-center">
                                    <span className="fs-1 me-3">{item.icon}</span>
                                    <strong>{item.title}</strong>
                                </div>
                            </CCardHeader>
                            <CCardBody>
                                <p>{item.description}</p>
                                <CButton
                                    color="primary"
                                    onClick={() => navigate(item.path)}
                                    className="w-100"
                                >
                                    Get Started
                                </CButton>
                            </CCardBody>
                        </CCard>
                    </CCol>
                ))}
            </CRow>
        </CContainer>
    )
}