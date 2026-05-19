import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "h-8 w-auto", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-auto"
      >
        <defs>
          {/* Gold metallic gradient */}
          <linearGradient id="goldMetallic" x1="40" y1="40" x2="160" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF3D0" />
            <stop offset="20%" stopColor="#F3CA65" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA7C11" />
            <stop offset="90%" stopColor="#F3CA65" />
            <stop offset="100%" stopColor="#FFF3D0" />
          </linearGradient>

          {/* Dark shadow for ring overlap depth */}
          <filter id="overlapShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="-2" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Sparkles */}
        <path
          d="M145,55 L147,60 L152,62 L147,64 L145,69 L143,64 L138,62 L143,60 Z"
          fill="url(#goldMetallic)"
          opacity="0.8"
        />
        <path
          d="M158,40 L159,43 L162,44 L159,45 L158,48 L157,45 L154,44 L157,43 Z"
          fill="url(#goldMetallic)"
          opacity="0.9"
        />
        <circle cx="152" cy="30" r="1.5" fill="url(#goldMetallic)" />
        <circle cx="90" cy="40" r="1.2" fill="url(#goldMetallic)" />

        {/* Stylized Lotus Motif */}
        <g id="lotus">
          {/* Center Petal */}
          <path
            d="M100,28 C96,40 96,54 100,66 C104,54 104,40 100,28 Z"
            fill="url(#goldMetallic)"
          />
          {/* Left Petal 1 */}
          <path
            d="M100,66 C90,62 82,50 86,38 C92,44 97,56 100,66 Z"
            fill="url(#goldMetallic)"
          />
          {/* Right Petal 1 */}
          <path
            d="M100,66 C110,62 118,50 114,38 C108,44 103,56 100,66 Z"
            fill="url(#goldMetallic)"
          />
          {/* Left Petal 2 */}
          <path
            d="M100,66 C85,67 74,60 76,48 C84,51 92,60 100,66 Z"
            fill="url(#goldMetallic)"
          />
          {/* Right Petal 2 */}
          <path
            d="M100,66 C115,67 126,60 124,48 C116,51 108,60 100,66 Z"
            fill="url(#goldMetallic)"
          />
          {/* Bottom stabilizing curve under lotus */}
          <path
            d="M86,64 C94,62 106,62 114,64 C106,66 94,66 86,64 Z"
            fill="url(#goldMetallic)"
          />
        </g>

        {/* Interlocking Rings */}
        <g id="rings">
          {/* Left Ring (Back) */}
          <path
            d="M 80,105 C 80,85.67 95.67,70 115,70 C 134.33,70 150,85.67 150,105 C 150,124.33 134.33,140 115,140 C 95.67,140 80,124.33 80,105 Z"
            stroke="url(#goldMetallic)"
            strokeWidth="11"
            fill="none"
          />
          {/* Right Ring (Front) */}
          <path
            d="M 50,105 C 50,85.67 65.67,70 85,70 C 104.33,70 120,85.67 120,105 C 120,124.33 104.33,140 85,140 C 65.67,140 50,124.33 50,105 Z"
            stroke="url(#goldMetallic)"
            strokeWidth="11"
            fill="none"
            filter="url(#overlapShadow)"
          />
          {/* Left Ring Overlay Arc (forces the interlock effect) */}
          <path
            d="M 115,70 C 128.5,70 140,81.5 142.5,95"
            stroke="url(#goldMetallic)"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
      {showText && (
        <div className="leading-tight">
          <div className="font-serif text-lg font-medium text-gold-grad tracking-wide">
            ShubhVivah
          </div>
          <div className="text-[9px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Luxury Invitations
          </div>
        </div>
      )}
    </div>
  );
}
