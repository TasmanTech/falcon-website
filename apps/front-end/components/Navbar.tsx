"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isMobileMenuOpen
        ? "bg-brand-dark"
        : "bg-brand-dark/90 backdrop-blur-md"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/falcon_access_logo.webp" alt="Falcon Access Logo" width={180} height={48} className="h-12 w-auto rounded-xl p-1 bg-white" style={{ width: 'auto' }} priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center text-brand-light font-inter">
          <div className="relative group">
            <div className="flex items-center hover:text-brand-accent transition-colors py-2 cursor-pointer">
              <span>Services</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-160 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-brand-dark border border-brand-light/10 rounded-lg shadow-xl overflow-hidden grid grid-cols-3 p-6 gap-6">
                <div>
                  <h4 className="font-bold text-brand-accent mb-3 text-sm uppercase tracking-wider">Lock Services</h4>
                  <div className="flex flex-col space-y-2">
                    <Link href="lock/lockout" className="text-sm text-brand-light/80 hover:text-brand-accent transition-colors">Lockout</Link>
                    <Link href="lock/rekey" className="text-sm text-brand-light/80 hover:text-brand-accent transition-colors">Rekey</Link>
                    <Link href="lock/lock-change-and-installation" className="text-sm text-brand-light/80 hover:text-brand-accent transition-colors">Lock Change &amp; Install</Link>
                    <Link href="lock/lock-repair" className="text-sm text-brand-light/80 hover:text-brand-accent transition-colors">Lock Repair</Link>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-brand-accent mb-3 text-sm uppercase tracking-wider">Smart Locks</h4>
                  <div className="flex flex-col space-y-2">
                    <Link href="smart-lock/smart-lock-installation" className="text-sm text-brand-light/80 hover:text-brand-accent transition-colors">Installation</Link>
                    <Link href="smart-lock/smart-lock-change" className="text-sm text-brand-light/80 hover:text-brand-accent transition-colors">Change</Link>
                    <Link href="smart-lock/smart-lock-repair-and-programming" className="text-sm text-brand-light/80 hover:text-brand-accent transition-colors">Repair &amp; Programming</Link>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-brand-accent mb-3 text-sm uppercase tracking-wider">Auto</h4>
                  <div className="flex flex-col space-y-2">
                    <Link href="car-lockout" className="text-sm text-brand-light/80 hover:text-brand-accent transition-colors">Car Lockout</Link>
                    <Link href="auto/obdii-diagnostic" className="text-sm text-brand-light/80 hover:text-brand-accent transition-colors">OBDII Diagnostic</Link>
                    <Link href="auto/dead-battery-assistance" className="text-sm text-brand-light/80 hover:text-brand-accent transition-colors">Dead Battery Assist</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            <div className="border-b border-brand-light/10">
              <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => setIsServicesOpen(!isServicesOpen)}>
                <span className="text-xl py-4 hover:text-brand-accent flex-1">Services</span>
                <button aria-label="Toggle Services Menu" className="p-4 -mr-4">
                  <svg className={`w-5 h-5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              {isServicesOpen && (
                <div className="flex flex-col pl-4 pb-4 space-y-3">
                  <div className="text-sm font-bold text-brand-accent uppercase tracking-wider mt-2">Lock Services</div>
                  <Link href="/lock/lockout" className="text-lg text-brand-light/80 hover:text-brand-accent" onClick={() => setIsMobileMenuOpen(false)}>Lockout</Link>
                  <Link href="/lock/rekey" className="text-lg text-brand-light/80 hover:text-brand-accent" onClick={() => setIsMobileMenuOpen(false)}>Rekey</Link>
                  <Link href="/lock/lock-change-and-installation" className="text-lg text-brand-light/80 hover:text-brand-accent" onClick={() => setIsMobileMenuOpen(false)}>Lock Change &amp; Install</Link>
                  <Link href="/lock/lock-repair" className="text-lg text-brand-light/80 hover:text-brand-accent" onClick={() => setIsMobileMenuOpen(false)}>Lock Repair</Link>

                  <div className="text-sm font-bold text-brand-accent uppercase tracking-wider mt-4">Smart Locks</div>
                  <Link href="/smart-lock/smart-lock-installation" className="text-lg text-brand-light/80 hover:text-brand-accent" onClick={() => setIsMobileMenuOpen(false)}>Installation</Link>
                  <Link href="/smart-lock/smart-lock-change" className="text-lg text-brand-light/80 hover:text-brand-accent" onClick={() => setIsMobileMenuOpen(false)}>Change</Link>
                  <Link href="/smart-lock/smart-lock-repair-and-programming" className="text-lg text-brand-light/80 hover:text-brand-accent" onClick={() => setIsMobileMenuOpen(false)}>Repair &amp; Programming</Link>

                  <div className="text-sm font-bold text-brand-accent uppercase tracking-wider mt-4">Auto</div>
                  <Link href="/car-lockout" className="text-lg text-brand-light/80 hover:text-brand-accent" onClick={() => setIsMobileMenuOpen(false)}>Car Lockout</Link>
                  <Link href="/auto/obdii-diagnostic" className="text-lg text-brand-light/80 hover:text-brand-accent" onClick={() => setIsMobileMenuOpen(false)}>OBDII Diagnostic</Link>
                  <Link href="/auto/dead-battery-assistance" className="text-lg text-brand-light/80 hover:text-brand-accent" onClick={() => setIsMobileMenuOpen(false)}>Dead Battery Assistance</Link>
                </div>
              )}
            </div>
            <Link href="/about" className="text-xl py-4 border-b border-brand-light/10 hover:text-brand-accent" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link href="/contact" className="text-xl py-4 border-b border-brand-light/10 hover:text-brand-accent" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <Link href="/contact" className="mt-8 mb-4 bg-brand-accent text-brand-dark text-center px-6 py-3 rounded-lg font-bold" onClick={() => setIsMobileMenuOpen(false)}>
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
