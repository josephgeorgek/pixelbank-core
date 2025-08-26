# Corporate Internet Banking - Functional Specification

## Project Overview

**Project Name:** Corporate Internet Banking Login System  
**Version:** 1.0  
**Date:** December 2024

## Executive Summary

The Corporate Internet Banking Login System is a secure, multi-step authentication platform designed for business banking customers. The system provides a comprehensive prelogin experience with account activation, password reset, and comprehensive help functionality.

## High-Level Features and Entities

### Core Features

1. **Primary Login Interface**
   - Organisation ID and User ID authentication
   - Secure password entry with visibility toggle
   - Multi-language support (SG locale)
   - Responsive design from mobile to desktop

2. **Account Activation Workflow**
   - Multi-step wizard interface
   - Email-based credential verification
   - Hardware token activation process
   - Progress tracking through activation steps

3. **Password Reset and Account Unlock**
   - Secure credential verification
   - Multi-step validation process
   - Account unlock functionality
   - Security warning system

4. **Help and Support System**
   - Fraud reporting mechanisms
   - Account blocking capabilities
   - Comprehensive FAQ system
   - Interactive help interface

### Business Entities

#### User Account
- **Organisation ID**: Unique business identifier
- **User ID**: Individual user identifier within organization
- **Password**: Encrypted user credential
- **Account Status**: Active, Locked, Pending Activation
- **Contact Email**: For credential recovery
- **Hardware Token**: Physical authentication device
- **Digital Token**: Mobile-based authentication

#### Organisation
- **Organisation ID**: Primary business identifier
- **Organisation Name**: Business entity name
- **Account Type**: Corporate, Small Business, Enterprise
- **Registration Status**: Active, Suspended, Pending
- **Admin Contacts**: Primary and secondary contacts

#### Authentication Session
- **Session ID**: Unique session identifier
- **Login Timestamp**: Authentication time
- **IP Address**: Source network location
- **Device Information**: Browser and device details
- **Authentication Method**: Password, Token, Multi-factor

### Security Requirements

1. **Data Protection**
   - All passwords encrypted at rest
   - Secure transmission (HTTPS/TLS)
   - Session management and timeout
   - CSRF protection

2. **Authentication Security**
   - Multi-factor authentication support
   - Account lockout after failed attempts
   - Secure password reset mechanisms
   - Hardware/software token validation

3. **Compliance**
   - Banking regulatory compliance
   - Data privacy regulations
   - Audit trail requirements
   - Security monitoring and alerts

### User Experience Requirements

1. **Accessibility**
   - WCAG 2.1 AA compliance
   - Screen reader compatibility
   - Keyboard navigation support
   - High contrast mode support

2. **Performance**
   - Page load time < 3 seconds
   - Mobile-first responsive design
   - Offline capability for cached content
   - Progressive web app features

3. **Internationalization**
   - Multi-language support
   - Right-to-left text support
   - Currency and date formatting
   - Time zone handling

### Integration Requirements

1. **Backend Systems**
   - Core banking system integration
   - Customer relationship management
   - Fraud detection systems
   - Audit and compliance logging

2. **External Services**
   - Email service providers
   - SMS gateway services
   - Hardware token providers
   - Security monitoring services

### Business Rules

1. **Authentication Rules**
   - Maximum 3 failed login attempts before lockout
   - Password complexity requirements
   - Session timeout after 15 minutes of inactivity
   - Mandatory password change every 90 days

2. **Account Management Rules**
   - New accounts require email verification
   - Password reset requires multi-factor authentication
   - Account unlock requires administrative approval
   - Hardware token replacement requires identity verification

3. **Security Rules**
   - All transactions require authentication
   - Suspicious activity triggers automatic lockout
   - IP address whitelisting for high-risk accounts
   - Mandatory security training for admin users

### Success Metrics

1. **User Experience Metrics**
   - Login success rate > 95%
   - Average login time < 30 seconds
   - Customer satisfaction score > 4.5/5
   - Support ticket reduction > 20%

2. **Security Metrics**
   - Zero successful unauthorized access
   - Fraud detection accuracy > 99%
   - Security incident response < 1 hour
   - Compliance audit pass rate 100%

3. **Performance Metrics**
   - System availability > 99.9%
   - Response time < 2 seconds
   - Mobile compatibility > 98%
   - Cross-browser compatibility > 95%