import {
  Activity,
  Bell,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings2,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { formatDateTime, getInitials } from "../utils/auth";
import { BrandMark } from "./ui";

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
  },
  {
    label: "Activity",
    icon: Activity,
    to: "/activity",
  },
  {
    label: "Settings",
    icon: Settings2,
    to: "/settings",
  },
  {
    label: "Profile",
    icon: UserRound,
    to: "/profile",
  },
];

function NotificationPanel({ notifications, onRead }) {
  return (
    <div className="absolute left-1/2 top-12 z-50 w-[min(320px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-ink/[0.08] bg-white shadow-[0_18px_50px_rgba(10,23,55,0.16)]">
      {/* Notification Header */}
      <div className="flex items-center justify-between border-b border-ink/[0.07] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-ink">
            Notifications
          </p>

          <p className="text-[11px] text-slate-400">
            Recent security events
          </p>
        </div>

        <button
          onClick={onRead}
          className="text-[11px] font-semibold text-coral hover:text-[#dd5d52]"
        >
          Mark read
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-[280px] overflow-auto">
        {notifications.length ? (
          notifications
            .slice(0, 5)
            .map((notification) => (
              <div
                key={notification.id}
                className={`border-b border-ink/[0.05] px-4 py-3 ${
                  notification.read
                    ? "bg-white"
                    : "bg-coral/[0.035]"
                }`}
              >
                <div className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-mint" />

                  <div>
                    <p className="text-xs font-semibold text-ink">
                      {notification.title}
                    </p>

                    <p className="mt-1 text-[11px] leading-4 text-slate-500">
                      {notification.detail}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      {formatDateTime(notification.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="px-4 py-8 text-center text-xs text-slate-400">
            No notifications yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  const {
    currentUser,
    logout,
    getNotifications,
    markNotificationsRead,
  } = useAuth();

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = getNotifications();

  const signOut = () => {
    logout();

    navigate("/login", {
      replace: true,
      state: {
        reason: "signed-out",
      },
    });
  };

  const navItems = (
    <nav
      aria-label="Primary navigation"
      className="space-y-1.5"
    >
      {navigation.map(
        ({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 ${
                isActive
                  ? "bg-white/[0.09] text-white"
                  : "text-slate-500 hover:bg-white/[0.055] hover:text-slate-200"
              }`
            }
          >
            <Icon size={17} strokeWidth={1.8} />

            <span>{label}</span>

            {label === "Activity" &&
              notifications.some(
                (item) => !item.read
              ) && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-coral" />
              )}
          </NavLink>
        )
      )}
    </nav>
  );

  return (
    <div className="dashboard-shell min-h-screen bg-[#f5f7fb] text-ink">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[250px] flex-col bg-ink px-5 py-6 lg:flex">
        <BrandMark />

        <p className="mt-3 px-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
          Secure workspace
        </p>

        <div className="mt-12">
          {navItems}
        </div>

        <div className="mt-auto space-y-5">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4">
            <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-600">
              <span>Workspace plan</span>

              <span className="text-mint">
                Free
              </span>
            </div>

            <p className="text-xs leading-5 text-slate-400">
              Your local Northstar workspace is ready.
            </p>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-coral to-[#ffb294]" />
            </div>

            <p className="mt-2 text-[10px] text-slate-600">
              68% of starter checklist
            </p>
          </div>

          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-500 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        aria-label="Mobile navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col bg-ink px-5 py-6 transition-transform duration-200 lg:hidden ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <BrandMark />

          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-slate-500 hover:bg-white/[0.05] hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-12">
          {navItems}
        </div>

        <button
          onClick={signOut}
          className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-500 hover:text-white"
        >
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-[250px]">
        {/* Header */}
        <header className="dashboard-header sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-ink/[0.08] bg-[#f5f7fb]/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              className="grid h-10 w-10 place-items-center rounded-xl bg-white text-ink shadow-sm ring-1 ring-ink/[0.06] lg:hidden"
            >
              <Menu size={18} />
            </button>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                NORTHSTAR / WORKSPACE
              </p>

              <p className="mt-0.5 font-display text-lg font-semibold tracking-[-0.03em] text-ink">
                Good morning,{" "}
                {currentUser?.name?.split(" ")[0] ||
                  "there"}
              </p>
            </div>
          </div>

          {/* Header Right */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                aria-label="Notifications"
                aria-expanded={notificationsOpen}
                onClick={() =>
                  setNotificationsOpen(
                    (value) => !value
                  )
                }
                className="relative grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-ink/[0.06] transition hover:text-ink"
              >
                <Bell size={17} />

                {notifications.some(
                  (item) => !item.read
                ) && (
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-coral ring-2 ring-white" />
                )}
              </button>

              {notificationsOpen && (
                <NotificationPanel
                  notifications={notifications}
                  onRead={() => {
                    markNotificationsRead();
                    setNotificationsOpen(false);
                  }}
                />
              )}
            </div>

            {/* Profile */}
            <button
              aria-label="Open profile"
              onClick={() => navigate("/profile")}
              className="ml-1 flex items-center gap-2 rounded-xl p-1 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-xs font-bold text-white">
                {getInitials(currentUser?.name)}
              </span>

              <ChevronDown
                size={15}
                className="hidden text-slate-400 sm:block"
              />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
