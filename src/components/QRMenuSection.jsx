import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function QRMenuSection() {
  const qrContainerRef = useRef(null);
  const [menuUrl, setMenuUrl] = useState("https://smartresto-demo.example");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMenuUrl(window.location.href);
    }
  }, []);

  const handleDownloadQr = () => {
    const canvas = qrContainerRef.current?.querySelector("canvas");
    if (!canvas) {
      return;
    }

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "smartresto-menu-qr.png";
    link.click();
  };

  return (
    <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70 sm:p-6">
      <div className="grid gap-5 md:grid-cols-[1.2fr_auto] md:items-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Scan QR to View Menu</h2>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            Customers can scan this QR code to open the menu.
          </p>
          <p className="mt-2 break-all text-xs text-slate-400">{menuUrl}</p>
          <button
            onClick={handleDownloadQr}
            className="pressable mt-4 rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-[var(--brand-dark)]"
          >
            Download QR Menu
          </button>
        </div>

        <div
          ref={qrContainerRef}
          className="inline-flex rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
        >
          <QRCodeCanvas
            value={menuUrl}
            size={180}
            includeMargin
            level="H"
            bgColor="#FFFFFF"
            fgColor="#0f172a"
          />
        </div>
      </div>
    </section>
  );
}

export default QRMenuSection;
