"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fecha o menu ao clicar em um link ou no fundo
  const closeMenu = () => setIsMenuOpen(false);

  // Trava o scroll do corpo da página quando o menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-[100] w-full bg-white border-b border-slate-200">
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[-1] animate-in fade-in duration-300"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-red-700 flex size-9 sm:size-11 items-center justify-center rounded-lg bg-red-100 shrink-0">
            <span className="material-symbols-outlined text-2xl sm:text-3xl">
              school
            </span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm sm:text-xl font-bold leading-tight text-slate-900">
              FATEC Sorocaba
            </h2>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-red-700 font-bold">
              Portal Alumni
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-4">
            <a
              href="#top"
              className="text-sm font-semibold px-4 py-2 hover:text-red-700 transition"
            >
              Início
            </a>
            <a
              href="#about"
              className="text-sm font-semibold px-4 py-2 hover:text-red-700 transition"
            >
              Sobre
            </a>
          </nav>
          <Link
            href="/sign-in"
            className="bg-red-700 text-white text-sm font-bold px-6 py-2 rounded-lg hover:bg-red-800 transition"
          >
            Acessar sistema
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-slate-900 focus:outline-none transition-transform active:scale-90"
        >
          <span className="material-symbols-outlined text-3xl">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-2xl animate-in fade-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-4 gap-2">
            <a
              href="#top"
              onClick={closeMenu}
              className="text-base font-semibold p-4 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Início
            </a>
            <a
              href="#about"
              onClick={closeMenu}
              className="text-base font-semibold p-4 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Sobre
            </a>
            <Link
              href="/sign-in"
              onClick={closeMenu}
              className="bg-red-700 text-white text-center font-bold p-4 rounded-lg mt-2 active:bg-red-800 transition-colors"
            >
              Acessar sistema
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
