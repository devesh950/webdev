'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, CheckCircle2, Clock, MessageSquare, Phone, User, Users } from 'lucide-react';
import { useState } from 'react';

import { restaurant } from '@/data/restaurant';

export function InlineReservation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '19:30',
    guests: '4',
    requests: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit mobile number';
    }
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const createWhatsAppUrl = () => {
    const text = `Hello The Taj Restaurant! I have made a reservation request:\n\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Date: ${formData.date}\n• Time: ${formData.time}\n• Guests: ${formData.guests}\n• Notes: ${formData.requests || 'None'}\n\nPlease confirm my booking.`;
    return `https://wa.me/${restaurant.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="reservation" className="relative bg-[#F4EFE8] py-24 sm:py-32">
      {/* Background Soft Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60rem_40rem_at_50%_40%,rgba(217,119,6,0.08),transparent_70%)]"
      />

      <div className="shell max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-amber-600" />
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.28em] text-amber-800">
              Book Your Experience
            </p>
            <span className="h-px w-6 bg-amber-600" />
          </div>

          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-stone-900">
            Reserve a Table
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-stone-700">
            We welcome walk-ins; table reservations are recommended for evening gatherings and weekend family feasts.
          </p>

          <div className="my-6 mx-auto h-px w-16 bg-amber-600/40" />
        </div>

        {/* Frosted Glassmorphism Form Card */}
        <div className="mt-12 rounded-3xl border border-white/90 bg-white/85 p-8 sm:p-12 shadow-2xl backdrop-blur-2xl">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="reservation-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name & Phone */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 mb-2 font-semibold">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-3.5 text-amber-700" />
                      <input
                        type="text"
                        placeholder="e.g., Rajesh Verma"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        className={`w-full rounded-xl border bg-white/95 py-3 pl-10 pr-4 text-sm font-medium text-stone-900 placeholder-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-colors shadow-sm ${
                          errors.name ? 'border-rose-500' : 'border-stone-300'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 mb-2 font-semibold">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3.5 top-3.5 text-amber-700" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        className={`w-full rounded-xl border bg-white/95 py-3 pl-10 pr-4 text-sm font-medium text-stone-900 placeholder-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-colors shadow-sm ${
                          errors.phone ? 'border-rose-500' : 'border-stone-300'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Date, Time, Guests */}
                <div className="grid gap-6 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 mb-2 font-semibold">
                      Date *
                    </label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3.5 top-3.5 text-amber-700" />
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => {
                          setFormData({ ...formData, date: e.target.value });
                          if (errors.date) setErrors({ ...errors, date: '' });
                        }}
                        className={`w-full rounded-xl border bg-white/95 py-3 pl-10 pr-2 text-sm font-medium text-stone-900 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-colors shadow-sm ${
                          errors.date ? 'border-rose-500' : 'border-stone-300'
                        }`}
                      />
                    </div>
                    {errors.date && (
                      <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.date}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 mb-2 font-semibold">
                      Time Slot *
                    </label>
                    <div className="relative">
                      <Clock size={16} className="absolute left-3.5 top-3.5 text-amber-700" />
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full rounded-xl border border-stone-300 bg-white/95 py-3 pl-10 pr-3 text-sm font-medium text-stone-900 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-colors shadow-sm"
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

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 mb-2 font-semibold">
                      Guests *
                    </label>
                    <div className="relative">
                      <Users size={16} className="absolute left-3.5 top-3.5 text-amber-700" />
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full rounded-xl border border-stone-300 bg-white/95 py-3 pl-10 pr-3 text-sm font-medium text-stone-900 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-colors shadow-sm"
                      >
                        <option value="2">2 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="6">6 Guests</option>
                        <option value="8">8 Guests</option>
                        <option value="12">10–12 Guests (Family)</option>
                        <option value="25">20+ Guests (Private Banquet)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 mb-2 font-semibold">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g., Pure vegetarian preferences, birthday celebration, high chair needed..."
                    value={formData.requests}
                    onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                    className="w-full rounded-xl border border-stone-300 bg-white/95 p-3 text-sm font-medium text-stone-900 placeholder-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-colors shadow-sm"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full py-4 text-xs uppercase tracking-[0.18em]"
                  >
                    {isSubmitting ? 'Confirming Your Table...' : 'Confirm Table Reservation'}
                  </button>
                  <p className="mt-3 text-center text-xs text-stone-500">
                    Zero advance booking fees · Direct table confirmation with restaurant team
                  </p>
                </div>
              </motion.form>
            ) : (
              /* Success Confirmation */
              <motion.div
                key="reservation-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-emerald-500/40 bg-emerald-50 text-emerald-600 shadow-sm">
                  <CheckCircle2 size={32} />
                </div>

                <h3 className="mt-5 font-display text-2xl sm:text-3xl font-bold text-stone-900">
                  Table Reserved Successfully
                </h3>

                <p className="mt-2 text-sm text-stone-700 max-w-md mx-auto">
                  Thank you, <strong className="text-stone-900">{formData.name}</strong>. Your reservation for <strong className="text-stone-900">{formData.guests} guests</strong> on <strong className="text-stone-900">{formData.date}</strong> at <strong className="text-stone-900">{formData.time}</strong> has been logged.
                </p>

                <div className="mt-6 rounded-2xl border border-stone-200 bg-white/90 p-5 text-xs text-stone-700 max-w-md mx-auto text-left space-y-2 shadow-sm">
                  <p>📍 <strong className="text-stone-900 font-semibold">Location:</strong> 2nd Floor, Above HDFC Bank, Lower Dakbunglow Rd, Hajipur</p>
                  <p>📞 <strong className="text-stone-900 font-semibold">Direct Helpline:</strong> {restaurant.contact.phoneFormatted}</p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={createWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary text-xs uppercase tracking-[0.16em] w-full sm:w-auto"
                  >
                    <MessageSquare size={14} />
                    Send Confirmation via WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        date: '',
                        time: '19:30',
                        guests: '4',
                        requests: '',
                      });
                    }}
                    className="btn btn-ghost text-xs uppercase tracking-[0.16em] w-full sm:w-auto"
                  >
                    Book Another Table
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
