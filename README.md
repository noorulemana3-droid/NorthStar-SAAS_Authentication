# NORTHSTAR · SaaS Authentication Module

> Your secure path to better digital experiences.

A production-quality frontend internship project that demonstrates a polished SaaS authentication experience with React, Vite, Tailwind CSS, reusable components, protected routing, and browser-only mock persistence. NORTHSTAR is intentionally client-only: it simulates authentication without creating a fake backend or API layer.

## Overview

Northstar gives a user a realistic path from account creation to a protected workspace dashboard. The module includes inline validation, loading and error states, email verification, password recovery, password strength feedback, OTP verification, remember-me persistence, and a configurable session timeout warning. All data is stored in the browser using `localStorage` and `sessionStorage`.

## Features

- Login with email, password visibility toggle, validation, loading state, error messaging, and Remember Me.
- Registration with full name, email, strong password requirements, password confirmation, and terms consent.
- Email verification screen with mock verification, status feedback, resend action, and cooldown timer.
- Forgot Password and Reset Password flows with local reset request persistence.
- Reusable PasswordStrength meter that checks length, uppercase, lowercase, number, and special character requirements.
- Six-input OTP verification interface with auto-advance, backspace navigation, arrow-key navigation, paste support, countdown timer, resend action, invalid-code state, and success state.
- React Router protected route for `/dashboard` and public-only handling for login/register.
- Remember Me storage behavior: checked uses `localStorage`; unchecked uses `sessionStorage`.
- Session timeout warning modal with remaining time, Stay Logged In, Logout, and automatic expiration.
- Responsive dashboard shell with sidebar, mobile navigation, top navigation, session integrity card, profile card, metrics, and activity log.
- Reusable components for buttons, inputs, password inputs, alerts, OTP inputs, password strength, authentication shells, navigation, and session timeout handling.

## Technology

- React 19
- Vite
- JavaScript / JSX (no TypeScript in the frontend)
- Tailwind CSS v4
- React Router DOM
- Context API
- LocalStorage and sessionStorage
- Lucide React icons

## Authentication flow

### Login

Use the documented demo credentials or create a new account. Login validates the inputs, checks the local mock user store, creates a session, and redirects to `/dashboard`. Unverified users are asked to complete email verification first.

### Registration and email verification

Registration validates all required fields and stores a pending user in `localStorage`. The app redirects to `/verify-email`, where the Verify email action updates the user record, marks the user as verified, starts a remembered session, and redirects to the dashboard.

### Password recovery

Forgot Password creates a local reset request for an existing user. Reset Password validates the request age, enforces a strong password, updates the local user record, and returns to Login after success.

### OTP verification

The separate `/verify-otp` screen simulates a six-digit verification challenge. In demo mode, the app generates a temporary six-digit OTP and displays it in the demo UI. The code expires after 90 seconds. The screen also includes resend behavior, paste support, and invalid or expired code feedback.

### Session behavior

Session duration is controlled from one object in `client/src/context/AuthContext.jsx`:

```js
export const sessionConfig = {
  durationMs: 10 * 60 * 1000,
  warningMs: 60 * 1000,
  otpDurationSeconds: 90,
  resendCooldownSeconds: 30,
};
```

Adjust `durationMs` to a smaller number when demonstrating timeout behavior locally. A warning modal appears during the final minute, and the session is automatically cleared when the timer reaches zero.

## Project structure

```text
client/
  index.html
  src/
    components/
      AuthShell.jsx
      DashboardLayout.jsx
      OTPInput.jsx
      PasswordStrength.jsx
      SessionTimeoutModal.jsx
      ui.jsx
    context/
      AuthContext.jsx
    pages/
      DashboardPage.jsx
      ForgotPasswordPage.jsx
      LoginPage.jsx
      NotFoundPage.jsx
      RegisterPage.jsx
      ResetPasswordPage.jsx
      VerifyEmailPage.jsx
      VerifyOtpPage.jsx
    utils/
      auth.js
    App.jsx
    index.css
    main.jsx
server/
  index.ts             # scaffold-provided static serving wrapper
README.md
package.json
```

## Installation

Requirements: Node.js 18+ and npm or pnpm.

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Open the Vite development URL shown in the terminal. The app is fully client-side and does not require environment variables, database setup, or API keys.

## Demo credentials

| Field | Value |
| --- | --- |
| Email | `demo@example.com` |
| Password | `Demo@123` |
| OTP | Generated dynamically in the demo UI |

The Login screen also includes a **Use demo account** shortcut that fills the credentials for you.

## Screenshots

_Add screenshots here after capturing the final project preview._

Suggested captures:

- Login screen at desktop width
- Registration with password strength feedback
- Protected dashboard
- Mobile dashboard navigation
- OTP verification state
- Session timeout warning modal

## Deployment

### Vercel

This repository is prepared for Vercel as a Vite + React single-page application.

1. Push the project to GitHub.
2. Import the GitHub repository into Vercel.
3. Vercel will use the included `vercel.json`.
4. The build command is `npm run build`.
5. The output directory is `dist/public`.
6. The SPA rewrite keeps React Router routes such as `/login`, `/register`, and `/dashboard` working after deployment.

The project is fully client-side and does not require environment variables, a database, an API key, or a backend server for the demo.

### Local production build

```bash
npm install
npm run build
```

The generated frontend bundle is written to `dist/public`.

## Future improvements

A production version would replace the mock persistence layer with a server-side identity provider, secure HTTP-only sessions, email delivery, rate limiting, device/session management, MFA enrollment, audit logs, password hashing, account recovery safeguards, and automated end-to-end coverage. The frontend component system is intentionally structured so those capabilities can be introduced without rebuilding the page-level UI.

## Quality notes

The module keeps authentication logic separate from presentation, centralizes validation helpers, uses accessible labels and focus states, respects reduced-motion preferences, and keeps session configuration in one place for demonstrations. It is designed to be readable by an early-career frontend developer while still presenting as a credible portfolio project.

## 📱 Mobile QR & App Installation

The deployed Northstar app includes a QR code on the desktop authentication screen. Scan it with a phone camera to open the live Vercel site on mobile.

Northstar is also configured as a Progressive Web App (PWA). On supported browsers, an **Install Northstar App** button appears when the browser makes installation available. On iPhone/iPad, use the browser's **Share → Add to Home Screen** option.

The QR code currently points to the live deployment:
`https://northstar-saas-authentication.vercel.app/`
