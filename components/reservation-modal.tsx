'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, CheckCircle2, Clock, MessageSquare, Phone, Send, Sparkles, User, Users, X } from 'lucide-react';
import { useState } from 'react';

import { restaurant } from '@/data/restaurant';

type ReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '19:30',
    guests: '4',
    occasion: 'Family Dinner',
    requests: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const createWhatsAppUrl = () => {
    const text = `*New Table Reservation Request*\n` +
      `*Restaurant:* ${restaurant.name}, Hajipur\n` +
      `*Name:* ${formData.name || 'Guest'}\n` +
      `*Phone:* ${formData.phone || 'Not provided'}\n` +
      `*Date:* ${formData.date || 'Today'}\n` +
      `*Time:* ${formData.time}\n` +
      `*Guests:* ${formData.guests} people\n` +
      `*Occasion:* ${formData.occasion}\n` +
      (formData.requests ? `*Notes:* ${formData.requests}\n` : '');

    return `https://wa.me/${restaurant.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-card border border-[rgba(200,169,107,0.35)] bg-[var(--surface-raised)] p-6 sm:p-8 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close reservation modal"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-ivory transition-colors"
            >
              <X size={18} />
            </button>

            {!submitted ? (
              <>
                <div className="flex items-center gap-2.5 text-[var(--gold)]">
                  <Sparkles size={16} />
                  <span className="text-[0.6875rem] font-medium tracking-[0.22em] uppercase">
                    Direct Booking & Enquiries
                  </span>
                </div>

                <h3 className="mt-2 font-display text-2xl sm:text-3xl text-ivory">
                  Reserve Your Table
                </h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Join us at The Taj, Hajipur. We recommend reserving in advance for weekend dinners and family celebrations.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1.5 font-semibold">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-3.5 text-stone-500" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rajesh Kumar"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-lg border border-stone-300 bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-stone-900 placeholder-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 focus:outline-none shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1.5 font-semibold">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-3.5 text-stone-500" />
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-lg border border-stone-300 bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-stone-900 placeholder-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 focus:outline-none shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {/* Date */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1.5 font-semibold">
                        Date *
                      </label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3.5 top-3.5 text-stone-500" />
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full rounded-lg border border-stone-300 bg-white py-2.5 pl-10 pr-2 text-sm font-medium text-stone-900 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 focus:outline-none shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Time */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1.5 font-semibold">
                        Time Slot *
                      </label>
                      <div className="relative">
                        <Clock size={16} className="absolute left-3.5 top-3.5 text-stone-500" />
                        <select
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full rounded-lg border border-stone-300 bg-white py-2.5 pl-10 pr-2 text-sm font-medium text-stone-900 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 focus:outline-none shadow-sm"
                        >
                          <option value="12:00">12:00 PM (Lunch)</option>
                          <option value="13:00">01:00 PM (Lunch)</option>
                          <option value="14:00">02:00 PM (Lunch)</option>
                          <option value="17:00">05:00 PM (Snacks & Tea)</option>
                          <option value="19:00">07:00 PM (Dinner)</option>
                          <option value="19:30">07:30 PM (Dinner)</option>
                          <option value="20:00">08:00 PM (Dinner)</option>
                          <option value="20:30">08:30 PM (Dinner)</option>
                          <option value="21:00">09:00 PM (Dinner)</option>
                        </select>
                      </div>
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1.5 font-semibold">
                        Guests *
                      </label>
                      <div className="relative">
                        <Users size={16} className="absolute left-3.5 top-3.5 text-stone-500" />
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full rounded-lg border border-stone-300 bg-white py-2.5 pl-10 pr-2 text-sm font-medium text-stone-900 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 focus:outline-none shadow-sm"
                        >
                          <option value="2">2 Guests (Couple)</option>
                          <option value="4">4 Guests</option>
                          <option value="6">6 Guests</option>
                          <option value="8">8 Guests (Large Table)</option>
                          <option value="12">10-15 Guests (Family)</option>
                          <option value="25">20+ Guests (Party Banquet)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Occasion */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1.5 font-semibold">
                      Occasion
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full rounded-lg border border-stone-300 bg-white py-2.5 px-3 text-sm font-medium text-stone-900 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 focus:outline-none shadow-sm"
                    >
                      <option value="Family Dinner">Family Dinner / Lunch</option>
                      <option value="Birthday Party">Birthday Celebration</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Corporate / Meeting">Business / Team Gathering</option>
                      <option value="Casual Gathering">Casual Friends Get-Together</option>
                    </select>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1.5 font-semibold">
                      Special Notes / Dietary Preferences (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g., Pure vegetarian preferences, high chair needed, cake arrangement..."
                      value={formData.requests}
                      onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                      className="w-full rounded-lg border border-stone-300 bg-white p-3 text-sm font-medium text-stone-900 placeholder-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 focus:outline-none shadow-sm"
                    />
                  </div>

                  {/* Actions */}
                  <div className="mt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="btn btn-primary flex-1 justify-center py-3 text-sm"
                    >
                      Confirm Reservation
                    </button>
                    <a
                      href={createWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost justify-center py-3 text-sm border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10"
                    >
                      <MessageSquare size={16} />
                      Book via WhatsApp
                    </a>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-6 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[rgba(200,169,107,0.15)] text-[var(--gold)]">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="mt-4 font-display text-2xl text-ivory">
                  Reservation Received!
                </h4>
                <p className="mt-2 max-w-md mx-auto text-sm leading-relaxed text-[var(--muted)]">
                  Thank you, <strong className="text-ivory">{formData.name}</strong>. We look forward to hosting your table of{' '}
                  <strong className="text-ivory">{formData.guests}</strong> on{' '}
                  <strong className="text-ivory">{formData.date || 'your selected date'}</strong> at{' '}
                  <strong className="text-ivory">{formData.time}</strong>.
                </p>

                <div className="mt-6 p-4 rounded-lg bg-[var(--charcoal)] border border-[var(--line)] text-left text-xs text-[var(--muted)] space-y-1">
                  <p>📍 <strong className="text-ivory">Location:</strong> 2nd Floor, Above HDFC Bank, Lower Dakbunglow Rd, Hajipur</p>
                  <p>📞 <strong className="text-ivory">Direct Helpline:</strong> {restaurant.contact.phoneFormatted}</p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={createWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary justify-center text-sm"
                  >
                    <Send size={15} />
                    Send Confirmation on WhatsApp
                  </a>
                  <button
                    onClick={onClose}
                    className="btn btn-ghost justify-center text-sm"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
