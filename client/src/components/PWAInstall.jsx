import { Download, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

export default function PWAInstall({ compact = false }) {
  const [installEvent, setInstallEvent] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator.standalone === true;
    setInstalled(standalone);

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallEvent(event);
    };
    const handleInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const install = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
  };

  if (installed) {
    return (
      <div className={`flex items-center gap-2 text-xs ${compact ? "text-slate-500" : "text-slate-400"}`}>
        <Smartphone size={14} className="text-mint" />
        Northstar is installed
      </div>
    );
  }

  if (!installEvent) return null;

  return (
    <button
      type="button"
      onClick={install}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-coral px-4 py-2.5 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(255,111,97,.2)] transition hover:-translate-y-0.5 hover:bg-[#ff8173] ${compact ? "w-full" : ""}`}
    >
      <Download size={14} />
      Install Northstar App
    </button>
  );
}
