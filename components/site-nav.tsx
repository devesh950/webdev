'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { restaurant } from '@/data/restaurant';

const navLinks = [
  { label: 'Story', href: '#story' },
  { label: 'Signatures', href: '#dishes' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Reservation', href: '#reservation' },
  { label: 'Location', href: '#contact' },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [drawerOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled || drawerOpen
            ? 'border-b border-stone-200/80 bg-white/85 backdrop-blur-xl shadow-sm py-3.5'
            : 'border-b border-transparent bg-transparent py-5'
        }`}
      >
        <div className="shell flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#hero"
            className="group flex flex-col leading-none"
            aria-label={`${restaurant.name} — Home`}
          >
            <span className="font-display text-2xl font-bold tracking-tight text-stone-900 transition-colors duration-300 group-hover:text-amber-800">
              {restaurant.name}
            </span>
            <span className="mt-1 text-[0.5625rem] font-bold uppercase tracking-[0.28em] text-amber-800">
              Fine Dining · Hajipur
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-700 transition-colors duration-300 hover:text-amber-800"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${restaurant.contact.phone}`}
              className="flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-3.5 py-2 text-xs font-semibold text-stone-800 shadow-sm hover:border-amber-600 hover:text-amber-800 transition-colors backdrop-blur-md"
            >
              <Phone size={13} className="text-amber-700" />
              <span>{restaurant.contact.phoneFormatted}</span>
            </a>

            <a
              href="#reservation"
              className="btn btn-primary min-h-[40px] px-5 text-xs uppercase tracking-wider font-semibold"
            >
              <Calendar size={13} />
              Book Table
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label={drawerOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            className="grid h-10 w-10 place-items-center rounded-full border border-stone-300 bg-white/80 text-stone-800 shadow-sm lg:hidden transition-colors hover:border-amber-600 hover:text-amber-800"
          >
            {drawerOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Frosted Glass) */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 flex flex-col justify-between bg-white/95 px-6 pt-28 pb-10 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col space-y-5 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  className="font-display text-2xl font-bold text-stone-900 transition-colors hover:text-amber-800"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 pt-8 border-t border-stone-200">
              <a
                href="#reservation"
                onClick={() => setDrawerOpen(false)}
                className="btn btn-primary w-full py-3.5 text-xs uppercase tracking-wider text-center justify-center font-semibold"
              >
                <Calendar size={14} />
                Reserve a Table
              </a>

              <a
                href={`tel:${restaurant.contact.phone}`}
                className="btn btn-ghost w-full py-3.5 text-xs uppercase tracking-wider text-center justify-center font-semibold"
              >
                <Phone size={14} className="text-amber-700" />
                Call {restaurant.contact.phoneFormatted}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}