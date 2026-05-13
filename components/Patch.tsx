// Reusable circular club patch / sticker SVG.
// Used as a decorative "badge" element across the magazine layout.
export default function Patch({
  text = "MCT 2000 · MOTO CLUB · DEPUIS L'AN 2000 ·",
  size = 180,
  className = "",
  variant = "flame",
}: {
  text?: string;
  size?: number;
  className?: string;
  variant?: "flame" | "bone" | "blood";
}) {
  const palette = {
    flame: { bg: "#ff5410", fg: "#06060a", inner: "#06060a", ring: "#ffe6d4" },
    bone: { bg: "#f5eedb", fg: "#06060a", inner: "#06060a", ring: "#c72b07" },
    blood: { bg: "#8c1c14", fg: "#fbf7ee", inner: "#fbf7ee", ring: "#ff5410" },
  }[variant];

  const id = `patch-${Math.random().toString(36).slice(2, 8)}`;
  // Build a circular text path
  const r = size / 2 - 16;
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <path
          id={id}
          d={`M ${size / 2}, ${size / 2} m -${r}, 0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
        />
      </defs>
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} fill={palette.bg} />
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 8} fill="none" stroke={palette.ring} strokeWidth={1.5} strokeDasharray="2 4" />
      <circle cx={size / 2} cy={size / 2} r={size / 2 * 0.58} fill={palette.inner} />
      <text fill={palette.fg} fontFamily="Bebas Neue, Impact, sans-serif" fontSize={size * 0.075} letterSpacing="2">
        <textPath href={`#${id}`} startOffset="0">
          {text}
        </textPath>
      </text>
      {/* Center icon: stylized flame */}
      <g transform={`translate(${size / 2 - size * 0.13}, ${size / 2 - size * 0.18})`}>
        <path
          d={`M ${size * 0.13} 0 C ${size * 0.07} ${size * 0.1}, 0 ${size * 0.13}, 0 ${size * 0.22}
              C 0 ${size * 0.3}, ${size * 0.07} ${size * 0.33}, ${size * 0.13} ${size * 0.36}
              C ${size * 0.19} ${size * 0.33}, ${size * 0.26} ${size * 0.3}, ${size * 0.26} ${size * 0.22}
              C ${size * 0.26} ${size * 0.13}, ${size * 0.19} ${size * 0.1}, ${size * 0.13} 0 Z`}
          fill={palette.bg}
        />
      </g>
    </svg>
  );
}
