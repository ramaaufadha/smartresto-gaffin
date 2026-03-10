function Footer() {
  return (
    <footer className="border-t border-white/70 bg-white/80 py-8 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <p>(c) {new Date().getFullYear()} SmartResto Gaffin Demo</p>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="pressable rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-emerald-500 hover:text-emerald-600"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm8.5 1.5h-8.5A4.25 4.25 0 003.5 7.75v8.5a4.25 4.25 0 004.25 4.25h8.5a4.25 4.25 0 004.25-4.25v-8.5a4.25 4.25 0 00-4.25-4.25zM17.5 6.75a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
            </svg>
          </a>
          <a
            href="#"
            className="pressable rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-emerald-500 hover:text-emerald-600"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M13.5 8V6.75c0-.69.56-1.25 1.25-1.25H16V3h-1.25A3.75 3.75 0 0011 6.75V8H9v2.5h2V21h2.5V10.5h2.25L16 8h-2.5z" />
            </svg>
          </a>
          <a
            href="#"
            className="pressable rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-emerald-500 hover:text-emerald-600"
            aria-label="TikTok"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M14.5 3v9.1a3.4 3.4 0 11-2.4-3.24V6.1a5.9 5.9 0 105 5.66V8.44A5.37 5.37 0 0019.9 9V6.6a3 3 0 01-2.6-2.6H14.5z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
