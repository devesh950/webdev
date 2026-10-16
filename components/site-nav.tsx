'use client';

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

const linkMotion = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export function SiteNav() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer on navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0] ?? href);

  return (
    <>
      <header
        className={cn(
          'anim-fade-up fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500',
          scrolled || menuOpen
            ? 'border-b border-[var(--line)] bg-[rgba(16,16,16,0.82)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav
          aria-label="Primary"
          className="shell-wide flex h-[var(--nav-height)] items-center justify-between gap-6"
        >
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${siteConfig.name} — home`}
          >
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center rounded-full border border-[rgba(200,169,107,0.4)] bg-[rgba(200,169,107,0.08)] transition-colors duration-500 group-hover:border-[var(--gold)]"
            >
              <svg viewBox="0 0 40 40" className="h-[18px] w-[18px]" fill="none" stroke="var(--gold)" strokeWidth="2.4" strokeLinecap="round">
                <circle cx="20" cy="20" r="13" />
                <path d="M7 20h26" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.05rem] tracking-[0.02em] text-ivory">
                Hajipur Food
              </span>
              <span className="mt-1 text-[0.56rem] uppercase tracking-[0.34em] text-[var(--gold)]">
                {siteConfig.location.label}
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {siteConfig.primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'link-underline text-[0.875rem] transition-colors duration-300',
                    isActive(item.href) ? 'text-[var(--gold)]' : 'text-[var(--muted)] hover:text-ivory',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/partner" className="btn btn-primary min-h-[42px] px-5 text-[0.8125rem]">
              Partner With Us
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-strong)] text-ivory transition-colors duration-300 hover:border-[var(--gold)] hover:text-[var(--gold)] lg:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {/* Reading-progress rule — a quiet touch, hidden from assistive tech. */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="h-px origin-left bg-gradient-to-r from-[var(--gold)] to-[var(--bronze)]"
        />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-[rgba(16,16,16,0.97)] backdrop-blur-2xl lg:hidden"
          >
            <div className="shell flex h-full flex-col justify-center gap-8 pt-[var(--nav-height)]">
              <ul className="flex flex-col gap-1">
                {siteConfig.primaryNav.map((item, index) => (
                  <motion.li
                    key={item.href}
                    variants={linkMotion}
                    initial={reduceMotion ? undefined : 'hidden'}
                    animate="show"
                    transition={{ delay: 0.06 * index + 0.08, duration: 0.5 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-[var(--line)] py-4 font-display text-[2rem] text-ivory"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                variants={linkMotion}
                initial={reduceMotion ? undefined : 'hidden'}
                animate="show"
                transition={{ delay: 0.36, duration: 0.5 }}
                className="flex flex-col gap-3"
              >
                <Link
                  href="/partner"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-primary w-full"
                >
                  Partner With Us
                </Link>
                <p className="text-[0.8125rem] text-[var(--muted-dim)]">
                  {siteConfig.tagline}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}