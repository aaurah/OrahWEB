"use client";

interface LogoIconProps {
  size?: number;
  className?: string;
}

export function OrahWebLogoIcon({ size = 40, className = "" }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Main green glow — light source from upper-left */}
        <radialGradient id="owGreenGlow" cx="40%" cy="36%" r="62%">
          <stop offset="0%"  stopColor="#d4ff70" />
          <stop offset="18%" stopColor="#86efac" />
          <stop offset="45%" stopColor="#22c55e" />
          <stop offset="72%" stopColor="#166534" />
          <stop offset="100%" stopColor="#052e16" />
        </radialGradient>
        {/* Subtle ambient halo on inner dark ring */}
        <radialGradient id="owHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#4ade80" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer dark ring — main black body */}
      <circle cx="50" cy="50" r="49" fill="#181818" />

      {/* White / bright ring */}
      <circle cx="50" cy="50" r="38.5" fill="#f0f0f0" />

      {/* Inner dark ring */}
      <circle cx="50" cy="50" r="28.5" fill="#181818" />

      {/* Ambient green halo on inner ring */}
      <circle cx="50" cy="50" r="28.5" fill="url(#owHalo)" />

      {/* Glowing green sphere */}
      <circle cx="50" cy="50" r="21" fill="url(#owGreenGlow)" />

      {/* Specular highlight — upper-left */}
      <ellipse
        cx="43.5"
        cy="42.5"
        rx="5.5"
        ry="3.8"
        fill="white"
        opacity="0.58"
        transform="rotate(-20 43.5 42.5)"
      />
    </svg>
  );
}

interface LogoWordmarkProps {
  iconSize?: number;
  className?: string;
}

export function OrahWebLogoFull({ iconSize = 36, className = "" }: LogoWordmarkProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <OrahWebLogoIcon size={iconSize} />
      <span
        className="font-black tracking-tight leading-none select-none"
        style={{ fontSize: iconSize * 0.72 }}
      >
        <span style={{ color: "var(--text)" }}>Orah</span>
        <span
          style={{
            background: "linear-gradient(to right, #4ade80, #16a34a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          WEB
        </span>
      </span>
    </span>
  );
}
