'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 md:hidden">
        <Link 
          href="/players/ab-de-villiers" 
          className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold"
        >
          AB Archive
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="fixed inset-x-0 top-[57px] bg-[#080c14]/98 border-b border-slate-800 backdrop-blur-xl p-5 shadow-2xl z-50 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold text-slate-200 hover:text-emerald-400 py-1.5 border-b border-slate-800/60"
          >
            Home
          </Link>
          <Link
            href="/players"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold text-slate-200 hover:text-emerald-400 py-1.5 border-b border-slate-800/60"
          >
            Players Directory
          </Link>
          <Link
            href="/players/ab-de-villiers"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold text-emerald-400 flex items-center justify-between py-1.5 border-b border-slate-800/60"
          >
            <span>AB de Villiers (Full Career Archive)</span>
            <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold">100% Calibrated</span>
          </Link>
          <Link
            href="/records"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold text-slate-200 hover:text-emerald-400 py-1.5 border-b border-slate-800/60"
          >
            Historical Records & Milestones
          </Link>
          <Link
            href="/analytics"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold text-slate-200 hover:text-emerald-400 py-1.5 border-b border-slate-800/60"
          >
            Interactive Analytics Hub
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold text-slate-200 hover:text-emerald-400 py-1.5"
          >
            Audit Report & Data Standards
          </Link>
        </div>
      )}
    </>
  );
}
