"use client";

import React from 'react';
import { useToast } from '@/component/Toast';

export default function ContactForm() {
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Thanks for reaching out. Our team will review your message shortly.', 'success', 3500);
    e.currentTarget.reset();
  };

  return (
    <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="md:col-span-1 bg-white/5 dark:bg-black/5 border border-gray-200/30 dark:border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500 transition-colors placeholder:text-gray-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        className="md:col-span-1 bg-white/5 dark:bg-black/5 border border-gray-200/30 dark:border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500 transition-colors placeholder:text-gray-500"
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        className="md:col-span-2 bg-white/5 dark:bg-black/5 border border-gray-200/30 dark:border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500 transition-colors placeholder:text-gray-500"
      />
      <textarea
        name="message"
        rows="6"
        placeholder="Tell us how we can help"
        className="md:col-span-2 bg-white/5 dark:bg-black/5 border border-gray-200/30 dark:border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500 transition-colors placeholder:text-gray-500 resize-none"
      />
      <button
        type="submit"
        className="md:col-span-2 inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] hover:bg-gray-200 transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
