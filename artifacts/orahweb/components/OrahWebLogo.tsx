"use client";

import { useState, useEffect, useId } from "react";

interface LogoIconProps {
  size?: number;
  isOnline?: boolean;
}

export function OrahWebLogoIcon({ size = 48, isOnline = true }: LogoIconProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <span className="relative inline-flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      {/* Pulsing outer glow ring — green when online */}
      {isOnline && (
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ backgroundColor: "#22c55e", animationDuration: "2s" }}
        />
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Green glow — light source upper-left */}
          <radialGradient id={`${uid}g`} cx="38%" cy="34%" r="62%">
            <stop offset="0%"  stopColor="#d4ff70" />
            <stop offset="20%" stopColor="#86efac" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="78%" stopColor="#166534" />
            <stop offset="100%" stopColor="#052e16" />
          </radialGradient>
          {/* Red glow when offline */}
          <radialGradient id={`${uid}r`} cx="38%" cy="34%" r="62%">
            <stop offset="0%"  stopColor="#fca5a5" />
            <stop offset="25%" stopColor="#f87171" />
            <stop offset="55%" stopColor="#dc2626" />
            <stop offset="80%" stopColor="#7f1d1d" />
            <stop offset="100%" stopColor="#450a0a" />
          </radialGradient>
          {/* Ambient halo */}
          <radialGradient id={`${uid}h`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor={isOnline ? "#4ade80" : "#f87171"} stopOpacity="0.3" />
            <stop offset="100%" stopColor={isOnline ? "#16a34a" : "#dc2626"} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer ring — black in light theme, white in dark themes */}
        <circle cx="50" cy="50" r="49" fill="var(--logo-ring)" />
        {/* Middle ring — white in light, dark in dark themes */}
        <circle cx="50" cy="50" r="38" fill="var(--logo-mid)" />
        {/* Inner ring — matches outer */}
        <circle cx="50" cy="50" r="28" fill="var(--logo-ring)" />
        {/* Ambient halo on inner ring */}
        <circle cx="50" cy="50" r="28" fill={`url(#${uid}h)`} />
        {/* Main glow sphere */}
        <circle cx="50" cy="50" r="20.5" fill={isOnline ? `url(#${uid}g)` : `url(#${uid}r)`} />
        {/* Specular highlight */}
        <ellipse
          cx="43"
          cy="42.5"
          rx="5.2"
          ry="3.6"
          fill="white"
          opacity="0.55"
          transform="rotate(-18 43 42.5)"
        />
      </svg>
    </span>
  );
}

interface LogoFullProps {
  iconSize?: number;
  className?: string;
}

export function OrahWebLogoFull({ iconSize = 46, className = "" }: LogoFullProps) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Read initial state after hydration
    setIsOnline(navigator.onLine);

    const handleOnline  = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const textSize = Math.round(iconSize * 0.82);

  return (
    <span
      className={`inline-flex items-center select-none ${className}`}
      title={isOnline ? "Connected" : "Offline"}
    >
      {/* The circle IS the "O" of "Orah" */}
      <OrahWebLogoIcon size={iconSize} isOnline={isOnline} />

      {/* "rah" — continues the letter sequence from the O icon */}
      <span
        className="font-black leading-none tracking-tight"
        style={{
          fontSize: textSize,
          color: "var(--text)",
          marginLeft: 2,
          letterSpacing: "-0.02em",
        }}
      >
        rah
      </span>

      {/* "WEB" in green gradient */}
      <span
        className="font-black leading-none tracking-tight"
        style={{
          fontSize: textSize,
          background: "linear-gradient(to right, #4ade80, #16a34a)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.02em",
        }}
      >
        WEB
      </span>
    </span>
  );
}
