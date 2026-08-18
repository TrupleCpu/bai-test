const STAR_7_POINTS =
  "8.68,18.02 0.00,8.50 -8.68,18.02 -6.65,5.30 -19.50,4.45 -8.29,-1.89 -15.64,-12.47 -3.69,-7.66 -0.00,-20.00 3.69,-7.66 15.64,-12.47 8.29,-1.89 19.50,4.45 6.65,5.30";

function SunRays() {
  const rays = Array.from({ length: 8 }, (_, i) => (
    <line
      key={i}
      x1={0}
      y1={-26}
      x2={0}
      y2={-44}
      stroke="white"
      strokeWidth={3}
      strokeLinecap="round"
      transform={`rotate(${i * 45})`}
    />
  ));
  return <g>{rays}</g>;
}

export default function HeroVisual() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-navy-600 via-navy-700 to-navy-950 shadow-xl sm:aspect-[5/6]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 520"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="sun" cx="50%" cy="42%" r="42%">
            <stop offset="0%" stopColor="#ffb800" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffb800" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bandRed" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d62828" stopOpacity="0" />
            <stop offset="50%" stopColor="#d62828" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#d62828" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bandBlue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4f78ca" stopOpacity="0" />
            <stop offset="50%" stopColor="#4f78ca" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4f78ca" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bandWhite" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f8fafc" stopOpacity="0" />
            <stop offset="50%" stopColor="#f8fafc" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#f8fafc" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect x={0} y={0} width={400} height={520} rx={24} fill="url(#sun)" />

        <rect x={-40} y={70} width={480} height={60} fill="url(#bandRed)" transform="rotate(-8 200 100)" />
        <rect x={-40} y={150} width={480} height={70} fill="url(#bandWhite)" transform="rotate(-8 200 185)" />
        <rect x={-40} y={250} width={480} height={80} fill="url(#bandBlue)" transform="rotate(-8 200 290)" />

        <g transform="translate(200 218)">
          <SunRays />
          <circle r={12} fill="none" stroke="#f5a623" strokeOpacity={0.6} strokeWidth={1.5} />
          <circle r={5} fill="#ffb800" fillOpacity={0.9} />
        </g>

        <g transform="translate(96 120)">
          <polygon
            points={STAR_7_POINTS}
            fill="none"
            stroke="white"
            strokeOpacity={0.5}
            strokeWidth={1.5}
          />
        </g>
        <g transform="translate(312 420)">
          <polygon
            points={STAR_7_POINTS}
            fill="none"
            stroke="white"
            strokeOpacity={0.28}
            strokeWidth={1.5}
            transform="scale(0.7)"
          />
        </g>

        <g transform="translate(120 400) scale(0.5)">
          <path
            d="M0,-16 L4,-4 L16,0 L4,4 L0,16 L-4,4 L-16,0 L-4,-4 Z"
            fill="#ffb800"
            fillOpacity={0.5}
          />
        </g>
        <g transform="translate(308 96) scale(0.4)">
          <path
            d="M0,-16 L4,-4 L16,0 L4,4 L0,16 L-4,4 L-16,0 L-4,-4 Z"
            fill="#ffb800"
            fillOpacity={0.4}
          />
        </g>

        <g transform="translate(300 258)" fill="none" stroke="white" strokeOpacity={0.18}>
          <path d="M0,10 L18,-14 M0,10 L-18,-14" strokeWidth={2} strokeLinecap="round" />
        </g>
      </svg>

      <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-gold-400" aria-hidden="true" />
        <span className="text-xs font-semibold tracking-widest text-white">
          AUSTRALIA · PHILIPPINES
        </span>
      </div>

      <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-navy-100">Application #BAI-2026-0148</p>
            <p className="mt-0.5 font-display text-sm font-semibold text-white">
              Home Loan · 5.29%
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold text-navy-950">
            Approved
          </span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400" />
        </div>
        <p className="mt-2 text-[11px] text-navy-100">Track every step in your secure client portal</p>
      </div>
    </div>
  );
}
