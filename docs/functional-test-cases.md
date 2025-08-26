# Functional Test Cases

## Corporate Internet Banking Login System

### Test Suite 1: Primary Login Functionality

#### TC001: Successful Login with Valid Credentials
**Objective:** Verify that users can successfully log in with valid credentials

**Preconditions:**
- User has valid Organization ID: TESTORG001
- User has valid User ID: TESTUSER001  
- User has valid Password: Test123!@#

**Test Steps:**
1. Navigate to login page
2. Enter Organization ID: TESTORG001
3. Enter User ID: TESTUSER001
4. Enter Password: Test123!@#
5. Click Login button

**Expected Results:**
- User is authenticated successfully
- Dashboard page is displayed
- Session token is created
- Last login timestamp is updated

**Test Data:**
```
Organization ID: TESTORG001
User ID: TESTUSER001
Password: Test123!@#
```

#### TC002: Failed Login with Invalid Credentials
**Objective:** Verify system behavior with invalid login credentials

**Test Steps:**
1. Navigate to login page
2. Enter Organization ID: INVALID
3. Enter User ID: INVALID
4. Enter Password: invalid
5. Click Login button

**Expected Results:**
- Login fails with error message
- User remains on login page
- Failed attempt is logged
- No session token is created

#### TC003: Account Lockout After Multiple Failed Attempts
**Objective:** Verify account lockout mechanism after 3 failed attempts

**Test Steps:**
1. Attempt login with invalid password (Attempt 1)
2. Attempt login with invalid password (Attempt 2) 
3. Attempt login with invalid password (Attempt 3)
4. Attempt login with valid credentials (Attempt 4)

**Expected Results:**
- First 3 attempts show error messages
- 4th attempt shows account locked message
- Account status is set to locked
- Security alert is generated

#### TC004: Password Visibility Toggle
**Objective:** Verify password show/hide functionality

**Test Steps:**
1. Navigate to login page
2. Enter password in password field
3. Click eye icon to show password
4. Click eye icon to hide password

**Expected Results:**
- Password text is hidden by default
- Clicking show reveals password text
- Clicking hide obscures password text
- Icon changes appropriately

### Test Suite 2: Account Activation Workflow

#### TC005: New User Account Activation - Happy Path
**Objective:** Verify complete new user activation process

**Preconditions:**
- User received activation email with Organization ID and User ID
- Organization ID: NEWORG001
- User ID: NEWUSER001

**Test Steps:**
1. Click "Activate new user access" link
2. Enter Organization ID: NEWORG001
3. Enter User ID: NEWUSER001
4. Click Next (Step 1 → Step 2)
5. Enter phone verification code
6. Click Next (Step 2 → Step 3)
7. Create password: NewPass123!
8. Confirm password: NewPass123!
9. Click Next (Step 3 → Step 4)
10. Activate hardware token
11. Complete activation

**Expected Results:**
- All wizard steps complete successfully
- Account status changes to Active
- User can login with new credentials
- Welcome email is sent

#### TC006: Account Activation with Invalid Credentials
**Objective:** Verify activation fails with invalid Organization/User ID

**Test Steps:**
1. Navigate to activation page
2. Enter invalid Organization ID
3. Enter invalid User ID
4. Click Next

**Expected Results:**
- Validation error message displayed
- Progress does not advance to step 2
- Error is logged for security monitoring

#### TC007: Account Activation Progress Tracking
**Objective:** Verify wizard progress indicator functions correctly

**Test Steps:**
1. Start activation process
2. Observe step 1 highlighting
3. Complete step 1 and proceed
4. Observe step 2 highlighting and step 1 completion
5. Continue through all steps

**Expected Results:**
- Current step is highlighted
- Completed steps show checkmarks
- Future steps remain inactive
- Progress bar updates appropriately

### Test Suite 3: Password Reset and Account Unlock

#### TC008: Password Reset - Complete Flow
**Objective:** Verify complete password reset process

**Preconditions:**
- User account exists: TESTORG001/TESTUSER001
- Account has registered email: test@example.com

**Test Steps:**
1. Click "Reset password or unlock account"
2. Enter Organization ID: TESTORG001
3. Enter User ID: TESTUSER001
4. Click Next (Credentials → 2FA)
5. Complete 2-factor authentication
6. Click Next (2FA → Password Reset)
7. Enter new password: NewSecure123!
8. Confirm new password: NewSecure123!
9. Click Complete

**Expected Results:**
- Identity verification succeeds
- 2FA challenge completes successfully
- New password is accepted
- Password is updated in system
- User can login with new password

#### TC009: Password Reset with Invalid Identity
**Objective:** Verify reset fails with invalid credentials

**Test Steps:**
1. Navigate to reset password page
2. Enter invalid Organization ID
3. Enter invalid User ID
4. Click Next

**Expected Results:**
- Warning message: "One or more login credentials are invalid"
- Step does not progress
- Security event is logged

#### TC010: Account Unlock Request
**Objective:** Verify account unlock functionality

**Preconditions:**
- User account is locked: TESTORG001/TESTUSER001

**Test Steps:**
1. Navigate to password reset page
2. Enter valid Organization ID and User ID
3. Complete identity verification
4. Request account unlock instead of password reset

**Expected Results:**
- Account unlock request is processed
- Account status changes to Active
- User notification is sent
- Audit log entry is created

### Test Suite 4: Help and Support System

#### TC011: Fraud Reporting
**Objective:** Verify fraud reporting functionality

**Test Steps:**
1. Navigate to Help page
2. Click "Report fraud" button
3. Fill out fraud report form
4. Submit report

**Expected Results:**
- Fraud report form displays
- Report is submitted successfully
- Confirmation message appears
- Fraud team is notified
- Case number is generated

#### TC012: Account Blocking Request
**Objective:** Verify account blocking functionality

**Test Steps:**
1. Navigate to Help page
2. Click "Block access to account(s)"
3. Select accounts to block
4. Confirm blocking request

**Expected Results:**
- Account selection interface displays
- Selected accounts are blocked immediately
- Blocking confirmation is shown
- Account holders are notified

#### TC013: FAQ Search and Browse
**Objective:** Verify FAQ functionality

**Test Steps:**
1. Navigate to Help page
2. Browse FAQ categories
3. Click on FAQ item
4. View FAQ answer
5. Click "View all FAQs"

**Expected Results:**
- FAQ categories are clearly organized
- FAQ items expand to show answers
- All FAQs page displays complete list
- Search functionality works correctly

#### TC014: Help Contact Options
**Objective:** Verify help contact methods

**Test Steps:**
1. Click "Need help?" button
2. Review available contact options
3. Test phone number display
4. Test email contact option
5. Test live chat option

**Expected Results:**
- Multiple contact methods available
- Phone numbers are correct
- Email links function properly
- Live chat initiates successfully

### Test Suite 5: User Interface and Experience

#### TC015: Responsive Design - Mobile View
**Objective:** Verify mobile responsiveness

**Test Environment:** Mobile browser (375px width)

**Test Steps:**
1. Access login page on mobile
2. Navigate through all pages
3. Test form interactions
4. Test button accessibility

**Expected Results:**
- All elements render correctly
- Forms are touch-friendly
- Navigation is intuitive
- No horizontal scrolling required

#### TC016: Responsive Design - Tablet View
**Objective:** Verify tablet responsiveness

**Test Environment:** Tablet browser (768px width)

**Test Steps:**
1. Access all pages on tablet
2. Test landscape and portrait modes
3. Verify form layouts
4. Test navigation elements

**Expected Results:**
- Optimal use of screen space
- Form elements properly sized
- Navigation remains accessible
- Content scaling is appropriate

#### TC017: Accessibility - Screen Reader
**Objective:** Verify screen reader compatibility

**Test Environment:** Screen reader software

**Test Steps:**
1. Navigate site using only screen reader
2. Test form label associations
3. Verify heading structure
4. Test error message announcements

**Expected Results:**
- All content is readable
- Form labels are properly associated
- Heading hierarchy is logical
- Error messages are announced

#### TC018: Accessibility - Keyboard Navigation
**Objective:** Verify keyboard-only navigation

**Test Steps:**
1. Navigate entire site using only keyboard
2. Test Tab order through forms
3. Test Enter key for form submission
4. Test Escape key for dialog dismissal

**Expected Results:**
- All interactive elements are reachable
- Tab order is logical and intuitive
- Keyboard shortcuts function correctly
- Focus indicators are visible

### Test Suite 6: Security and Error Handling

#### TC019: Session Timeout
**Objective:** Verify session timeout functionality

**Preconditions:**
- User is logged in
- Session timeout is set to 15 minutes

**Test Steps:**
1. Login successfully
2. Wait for session timeout period
3. Attempt to perform action
4. Observe system behavior

**Expected Results:**
- Session expires after 15 minutes
- User is redirected to login page
- Timeout warning is displayed
- Session token is invalidated

#### TC020: HTTPS Security
**Objective:** Verify secure communication

**Test Steps:**
1. Access site via HTTP
2. Verify automatic HTTPS redirect
3. Check SSL certificate validity
4. Test secure form submission

**Expected Results:**
- HTTP requests redirect to HTTPS
- Valid SSL certificate is present
- All form data is encrypted
- No mixed content warnings

#### TC021: Input Validation
**Objective:** Verify client-side input validation

**Test Steps:**
1. Test empty form submission
2. Test invalid email formats
3. Test password complexity requirements
4. Test organization ID format validation

**Expected Results:**
- Required field validation works
- Format validation prevents submission
- Clear error messages are displayed
- Validation occurs in real-time

#### TC022: Error Recovery
**Objective:** Verify error handling and recovery

**Test Steps:**
1. Simulate network connectivity issues
2. Test server timeout scenarios
3. Test invalid server responses
4. Test browser refresh during processes

**Expected Results:**
- Graceful error handling
- Clear error messages to users
- Recovery options are provided
- Data loss is prevented

### Test Suite 7: Performance and Load Testing

#### TC023: Page Load Performance
**Objective:** Verify acceptable page load times

**Performance Criteria:**
- Page load time < 3 seconds
- Time to interactive < 5 seconds

**Test Steps:**
1. Measure login page load time
2. Measure activation page load time
3. Measure help page load time
4. Test under various network conditions

**Expected Results:**
- All pages meet performance criteria
- Progressive loading for slow connections
- Optimized images and assets
- Minimal render blocking

#### TC024: Concurrent User Load
**Objective:** Verify system handles multiple users

**Test Environment:**
- 100 concurrent users
- Mixed usage patterns

**Test Steps:**
1. Simulate 100 users logging in
2. Mix of successful and failed attempts
3. Various user flows (login, reset, activate)
4. Monitor system response times

**Expected Results:**
- System remains responsive
- No significant performance degradation
- All user sessions handled correctly
- Database performance is acceptable

### Test Suite 8: Integration Testing

#### TC025: Email Service Integration
**Objective:** Verify email notifications work correctly

**Test Steps:**
1. Complete account activation process
2. Request password reset
3. Submit fraud report
4. Verify email delivery

**Expected Results:**
- All notification emails are sent
- Email content is accurate
- Delivery is timely (< 5 minutes)
- Email formatting is correct

#### TC026: Database Integration
**Objective:** Verify database operations

**Test Steps:**
1. Create user account
2. Update user information
3. Log authentication attempts
4. Query audit logs

**Expected Results:**
- All CRUD operations succeed
- Data integrity is maintained
- Transactions are atomic
- Performance is acceptable

#### TC027: Third-Party Service Integration
**Objective:** Verify external service integration

**Test Steps:**
1. Test SMS service for 2FA
2. Test fraud detection service
3. Test payment processing hooks
4. Test security monitoring integration

**Expected Results:**
- All integrations function correctly
- Error handling for service failures
- Fallback mechanisms work
- Service level agreements are met