"use client";

import React from "react";

interface BrandLogoProps {
  brandName: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({ brandName, className = "", size = "md" }: BrandLogoProps) {
  const norm = brandName.toLowerCase().trim();

  // Size dimensions
  const dims = {
    sm: "h-6 text-[10px]",
    md: "h-9 text-xs",
    lg: "h-12 text-sm",
  }[size];

  // 1. Cipla (Red & Navy corporate look)
  if (norm.includes("cipla")) {
    return (
      <div className={`flex items-center justify-center gap-1 font-black tracking-tight text-[#d32f2f] ${dims} ${className}`}>
        <svg className="w-5 h-5 fill-[#d32f2f] shrink-0" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z"/>
        </svg>
        <span className="font-extrabold text-[#003366] text-sm tracking-tighter">
          Cip<span className="text-[#d32f2f]">la</span>
        </span>
      </div>
    );
  }

  // 2. Aristo (Deep Red & Navy styling with medical crest)
  if (norm.includes("aristo")) {
    return (
      <div className={`flex items-center justify-center gap-1 font-black ${dims} ${className}`}>
        <div className="w-5 h-5 rounded-full bg-[#b71c1c] text-white flex items-center justify-center font-serif text-xs font-bold shadow-xs">
          A
        </div>
        <span className="font-bold text-[#b71c1c] tracking-tight uppercase text-xs">
          ARISTO
        </span>
      </div>
    );
  }

  // 3. Alkem (Green leaf + Navy blue)
  if (norm.includes("alkem")) {
    return (
      <div className={`flex items-center justify-center gap-1 font-black ${dims} ${className}`}>
        <svg className="w-5 h-5 fill-[#2e7d32] shrink-0" viewBox="0 0 24 24">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.75C12 8 15 8 17 8z"/>
        </svg>
        <span className="font-extrabold text-[#002b49] text-xs tracking-tight">
          ALKEM
        </span>
      </div>
    );
  }

  // 4. Mankind (Signature Orange & Dark Blue)
  if (norm.includes("mankind")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <div className="w-5 h-5 rounded-md bg-[#ff6f00] flex items-center justify-center text-white font-black text-xs">
          M
        </div>
        <span className="font-black text-[#0d233a] tracking-tight text-xs">
          Mankind<span className="text-[#ff6f00]">!</span>
        </span>
      </div>
    );
  }

  // 5. Lupin (Royal Blue with flower mark)
  if (norm.includes("lupin")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <svg className="w-5 h-5 fill-[#0277bd] shrink-0" viewBox="0 0 24 24">
          <circle cx="12" cy="7" r="3"/>
          <circle cx="7" cy="14" r="3"/>
          <circle cx="17" cy="14" r="3"/>
          <circle cx="12" cy="13" r="2.5" fill="#fbc02d"/>
        </svg>
        <span className="font-extrabold text-[#0277bd] tracking-wide text-xs">
          LUPIN
        </span>
      </div>
    );
  }

  // 6. Abbott (Classic Blue Oval)
  if (norm.includes("abbott")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <div className="w-5 h-5 rounded-full border-2 border-[#0091da] flex items-center justify-center text-[#0091da] font-black text-xs">
          a
        </div>
        <span className="font-black text-[#0091da] tracking-tighter text-xs">
          Abbott
        </span>
      </div>
    );
  }

  // 7. Dr. Reddy's (Signature Plum / Purple circle)
  if (norm.includes("reddy")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <div className="w-5 h-5 rounded-full bg-[#5e2750] text-white flex items-center justify-center font-bold text-[10px]">
          DR
        </div>
        <span className="font-extrabold text-[#5e2750] tracking-tight text-xs">
          Dr.Reddy&apos;s
        </span>
      </div>
    );
  }

  // 8. Intas (Red & Blue Medical Cross)
  if (norm.includes("intas")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <div className="w-5 h-5 rounded-md bg-[#d32f2f] text-white flex items-center justify-center font-black text-[11px]">
          +
        </div>
        <span className="font-extrabold text-[#0d47a1] tracking-wider text-xs">
          INTAS
        </span>
      </div>
    );
  }

  // 9. Alembic (Classic Red Triangle emblem)
  if (norm.includes("alembic")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <div className="w-4 h-4 rotate-45 bg-[#c62828] text-white flex items-center justify-center text-[8px] font-bold">
          <span className="-rotate-45">A</span>
        </div>
        <span className="font-extrabold text-[#c62828] tracking-tight text-xs">
          Alembic
        </span>
      </div>
    );
  }

  // 10. Torque (Royal Blue & Crimson)
  if (norm.includes("torque")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <div className="w-5 h-5 rounded-md bg-[#1565c0] text-white flex items-center justify-center font-black text-[10px]">
          TQ
        </div>
        <span className="font-black text-[#1565c0] tracking-tight text-xs">
          TORQUE
        </span>
      </div>
    );
  }

  // 11. Biochem (Cyan & Navy Molecular Hexagon)
  if (norm.includes("biochem")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <div className="w-5 h-5 rounded-md bg-[#00838f] text-white flex items-center justify-center font-bold text-[10px]">
          BC
        </div>
        <span className="font-bold text-[#00838f] tracking-tight text-xs">
          BIOCHEM
        </span>
      </div>
    );
  }

  // 12. Medley (Teal & Navy)
  if (norm.includes("medley")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <div className="w-5 h-5 rounded-full bg-[#00695c] text-white flex items-center justify-center font-bold text-[10px]">
          M
        </div>
        <span className="font-bold text-[#00695c] tracking-tight text-xs">
          Medley
        </span>
      </div>
    );
  }

  // 13. Jacsonpal (Blue medical crest)
  if (norm.includes("jacsonpal")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <div className="w-5 h-5 rounded-md bg-[#283593] text-white flex items-center justify-center font-bold text-[9px]">
          JP
        </div>
        <span className="font-bold text-[#283593] tracking-tight text-[11px]">
          JACSONPAL
        </span>
      </div>
    );
  }

  // 14. Safeone (Surgical Green Cross)
  if (norm.includes("safeone")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <div className="w-5 h-5 rounded-full bg-[#2e7d32] text-white flex items-center justify-center font-bold text-xs">
          +
        </div>
        <span className="font-bold text-[#2e7d32] tracking-tight text-xs">
          SafeOne
        </span>
      </div>
    );
  }

  // 15. Smart Lab (Modern Teal Flask)
  if (norm.includes("smart lab")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <div className="w-5 h-5 rounded-md bg-[#00897b] text-white flex items-center justify-center font-bold text-[9px]">
          SL
        </div>
        <span className="font-bold text-[#00897b] tracking-tight text-xs">
          SmartLab
        </span>
      </div>
    );
  }

  // 16. Silver Cross (Silver/Slate Cross)
  if (norm.includes("silver cross")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <div className="w-5 h-5 rounded-md bg-slate-700 text-white flex items-center justify-center font-bold text-[11px]">
          +
        </div>
        <span className="font-bold text-slate-800 tracking-tight text-xs">
          Silver Cross
        </span>
      </div>
    );
  }

  // 17. Laborate (Red & Navy)
  if (norm.includes("laborate")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <div className="w-5 h-5 rounded-md bg-[#c2185b] text-white flex items-center justify-center font-bold text-[9px]">
          LB
        </div>
        <span className="font-bold text-[#c2185b] tracking-tight text-xs">
          Laborate
        </span>
      </div>
    );
  }

  // 18. Lee Ford (Green Health Shield)
  if (norm.includes("lee ford")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <div className="w-5 h-5 rounded-md bg-[#388e3c] text-white flex items-center justify-center font-bold text-[9px]">
          LF
        </div>
        <span className="font-bold text-[#388e3c] tracking-tight text-xs">
          Lee Ford
        </span>
      </div>
    );
  }

  // 19. Windlass (Deep Blue)
  if (norm.includes("windlass")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <div className="w-5 h-5 rounded-md bg-[#1976d2] text-white flex items-center justify-center font-bold text-[9px]">
          WL
        </div>
        <span className="font-bold text-[#1976d2] tracking-tight text-xs">
          Windlass
        </span>
      </div>
    );
  }

  // 20. Ramsans (Healthcare Indigo)
  if (norm.includes("ramsans")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <div className="w-5 h-5 rounded-md bg-[#3949ab] text-white flex items-center justify-center font-bold text-[9px]">
          RS
        </div>
        <span className="font-bold text-[#3949ab] tracking-tight text-xs">
          Ramsans
        </span>
      </div>
    );
  }

  // 21. Touchone (Amber / Gold)
  if (norm.includes("touchone")) {
    return (
      <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
        <div className="w-5 h-5 rounded-md bg-[#f57c00] text-white flex items-center justify-center font-bold text-[9px]">
          TO
        </div>
        <span className="font-bold text-[#f57c00] tracking-tight text-xs">
          Touchone
        </span>
      </div>
    );
  }

  // Default Fallback
  return (
    <div className={`flex items-center justify-center gap-1 ${dims} ${className}`}>
      <div className="w-5 h-5 rounded-md bg-slate-800 text-white flex items-center justify-center font-bold text-[10px]">
        {brandName.substring(0, 2).toUpperCase()}
      </div>
      <span className="font-bold text-slate-800 tracking-tight text-xs">
        {brandName}
      </span>
    </div>
  );
}
