import type { PhotoAngleKey } from "@/lib/types";

const STROKE = "rgba(251,250,246,0.85)";

function FrontGuide() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <rect x="30" y="55" width="140" height="45" rx="10" fill="none" stroke={STROKE} strokeWidth="2" />
      <path d="M45 55 Q60 30 100 30 Q140 30 155 55" fill="none" stroke={STROKE} strokeWidth="2" />
      <circle cx="55" cy="100" r="14" fill="none" stroke={STROKE} strokeWidth="2" />
      <circle cx="145" cy="100" r="14" fill="none" stroke={STROKE} strokeWidth="2" />
      <rect x="80" y="88" width="40" height="12" rx="2" fill="none" stroke={STROKE} strokeWidth="1.5" />
    </svg>
  );
}

function SideGuide({ mirror }: { mirror?: boolean }) {
  return (
    <svg
      viewBox="0 0 220 120"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      style={mirror ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M20 85 L30 55 Q45 35 75 35 L120 35 Q145 35 160 55 L195 65 L195 85 Z"
        fill="none"
        stroke={STROKE}
        strokeWidth="2"
      />
      <circle cx="60" cy="90" r="15" fill="none" stroke={STROKE} strokeWidth="2" />
      <circle cx="165" cy="90" r="15" fill="none" stroke={STROKE} strokeWidth="2" />
    </svg>
  );
}

function ViewfinderGuide() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {[
        [24, 24, 1, 1],
        [176, 24, -1, 1],
        [24, 116, 1, -1],
        [176, 116, -1, -1],
      ].map(([x, y, sx, sy], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${sx} ${sy})`}>
          <path d="M0 0 L20 0 M0 0 L0 20" fill="none" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

export function AngleGuide({ angle }: { angle: PhotoAngleKey }) {
  switch (angle) {
    case "front":
    case "back":
      return <FrontGuide />;
    case "left":
      return <SideGuide />;
    case "right":
      return <SideGuide mirror />;
    case "dashboard":
    case "plate":
      return <ViewfinderGuide />;
  }
}
