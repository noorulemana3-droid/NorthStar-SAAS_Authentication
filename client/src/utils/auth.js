export const DEMO_MODE = true;
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const STORAGE_KEYS = { users: "northstar_users", currentUser: "northstar_current_user", session: "northstar_session", otp: "northstar_otp", activities: "northstar_activities", notifications: "northstar_notifications", theme: "northstar_theme", preferences: "northstar_preferences", pendingEmail: "northstar_pending_email", reset: "northstar_reset" };
export function readJson(storage, key, fallback = null) { try { const value = storage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } }
export function writeJson(storage, key, value) { storage.setItem(key, JSON.stringify(value)); }
export function removeStored(key) { localStorage.removeItem(key); sessionStorage.removeItem(key); }
export function normalizeEmail(email = "") { return email.trim().toLowerCase(); }
export function validateEmail(email = "") { if (!email.trim()) return "Email is required."; if (!emailPattern.test(email.trim())) return "Enter a valid email address."; return ""; }
export function validatePassword(password = "") { if (!password) return "Password is required."; if (password.length < 8) return "Use at least 8 characters."; return ""; }
export function getInitials(name = "") { return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "U"; }
export function formatTime(seconds) { const safeSeconds = Math.max(0, Math.floor(seconds)); return `${Math.floor(safeSeconds / 60).toString().padStart(2, "0")}:${(safeSeconds % 60).toString().padStart(2, "0")}`; }
export function formatRemaining(ms) { return formatTime(Math.ceil(Math.max(0, ms) / 1000)); }
export function formatDate(dateValue, options = {}) { const date = dateValue instanceof Date ? dateValue : new Date(dateValue); return new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric", ...options }).format(date); }
export function formatDateTime(dateValue) { const date = dateValue instanceof Date ? dateValue : new Date(dateValue); return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }).format(date); }
export function formatTimeOfDay(dateValue) { const date = dateValue instanceof Date ? dateValue : new Date(dateValue); return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(date); }
export function isExpired(dateValue) { return new Date(dateValue).getTime() <= Date.now(); }
