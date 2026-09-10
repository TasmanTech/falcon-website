"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate network request
    setTimeout(() => setStatus("success"), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-brand-dark/5 space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-bold font-montserrat text-brand-dark mb-1">Full Name</label>
          <input type="text" id="name" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all font-inter" placeholder="John Doe" />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-bold font-montserrat text-brand-dark mb-1">Email Address</label>
          <input type="email" id="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all font-inter" placeholder="john@example.com" />
        </div>
        
        <div>
          <label htmlFor="service" className="block text-sm font-bold font-montserrat text-brand-dark mb-1">Service Needed</label>
          <select id="service" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all font-inter bg-white">
            <option value="">Select a service</option>
            <option value="general">General Maintenance</option>
            <option value="hardware">Hardware Repair</option>
            <option value="locksmithing">Locksmithing / Security</option>
            <option value="emergency">Emergency Assistance</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold font-montserrat text-brand-dark mb-1">Message</label>
          <textarea id="message" rows={4} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all font-inter resize-none" placeholder="How can we help you?"></textarea>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={status === "submitting" || status === "success"}
        className="w-full bg-brand-accent text-white font-bold py-4 rounded-full hover:bg-brand-accent/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-green-600 text-center font-inter text-sm">Thank you! We will get back to you shortly.</p>
      )}
    </form>
  );
}
