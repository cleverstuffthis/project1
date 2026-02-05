export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-white">Summit Ride Supply</p>
          <p>Enduro-grade bikes, built for riders who live above the treeline.</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <span>Global support</span>
          <span>Carbon-neutral logistics</span>
          <span>Ride labs + fit studios</span>
        </div>
      </div>
    </footer>
  );
}
