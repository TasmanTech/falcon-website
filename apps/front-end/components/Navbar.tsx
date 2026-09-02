"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isMobileMenuOpen
          ? "bg-brand-dark"
          : "bg-brand-dark/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-brand-light font-montserrat">
          [Brand Name]
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center text-brand-light font-inter">
          <Link href="/services" className="hover:text-brand-accent transition-colors">Services</Link>
          <Link href="/about" className="hover:text-brand-accent transition-colors">About</Link>
          <Link href="/contact" className="hover:text-brand-accent transition-colors">Contact</Link>
          <Link href="/contact" className="bg-brand-accent text-brand-dark px-6 py-2 rounded-lg font-bold hover:bg-brand-accent/90 transition-colors">
            Get Started
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-brand-light"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-brand-dark h-[calc(100vh-100%)] overflow-y-auto border-t border-brand-light/10">
          <nav className="flex flex-col min-h-full px-4 py-6 text-brand-light font-inter">
            <Link href="/services" className="text-xl py-4 border-b border-brand-light/10 hover:text-brand-accent" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
            <Link href="/about" className="text-xl py-4 border-b border-brand-light/10 hover:text-brand-accent" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link href="/contact" className="text-xl py-4 border-b border-brand-light/10 hover:text-brand-accent" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <Link href="/contact" className="mt-auto mb-4 bg-brand-accent text-brand-dark text-center px-6 py-3 rounded-lg font-bold" onClick={() => setIsMobileMenuOpen(false)}>
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
