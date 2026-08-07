"use client";

import { useEffect, useState } from "react";
import usePreferences from "@/hooks/usePreferences";
import Navbar from "./Navbar";
import Footer from "./Footer";

const APPS_API = "https://applistapi.p9x9.online/api/all-data";

const FALLBACK_APPS = [
  {
    _id: "6a76071a526878d2027d14f6",
    imageLink: "https://i.ibb.co.com/0gCTjB4/ic-launcher.png",
    appName: "Social Status",
    appLink: "https://status.p9x9.online/",
  },
  {
    _id: "6a76069a526878d2027d14f3",
    imageLink: "https://i.ibb.co.com/zWtpg15G/app-icon-192.png",
    appName: "QR Code Scanner",
    appLink: "https://qr-code.p9x9.online/",
  },
  {
    _id: "6a760612526878d2027d14f0",
    imageLink: "https://i.ibb.co.com/r24t5XLF/playstore-icon.png",
    appName: "Image Compressor",
    appLink: "https://image-compressor.p9x9.online/",
  },
];

export default function MoreApps() {
  const { t } = usePreferences();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(APPS_API);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const json = await res.json();
        const list = Array.isArray(json.data) ? json.data : [];
        if (cancelled) return;
        setApps(list);
        setError(false);
      } catch {
        if (cancelled) return;
        setApps(FALLBACK_APPS);
        setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {t.appName} Apps
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Explore more useful apps and tools from the {t.appName} family.
        </p>
      </div>

      {loading && (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mx-auto h-16 w-16 rounded-2xl bg-slate-200 dark:bg-slate-800" />
              <div className="mx-auto mt-4 h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {apps.map((app) => (
            <a
              key={app._id}
              href={app.appLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500"
            >
              <img
                src={app.imageLink}
                alt={app.appName}
                loading="lazy"
                className="mx-auto h-16 w-16 rounded-2xl object-cover shadow-md shadow-slate-900/10 transition-transform group-hover:scale-105 dark:shadow-black/40"
              />
              <p className="mt-4 line-clamp-2 text-sm font-semibold leading-snug text-slate-800 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
                {app.appName}
              </p>
            </a>
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
          Live app list unavailable — showing the latest known apps.
        </p>
      )}
      </main>

      <Footer />
    </div>
  );
}
