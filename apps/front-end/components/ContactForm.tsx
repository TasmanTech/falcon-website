"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    };

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const combinedMessage = `[Service Requested: ${data.service}]\n\n${data.message}`;

      const response = await fetch(`${backendUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: combinedMessage,
        }),
      });

      if (!response.ok) {
        setStatus("error");
        setErrorMessage("Failed to send message. Please try again later.");
        return;
      }

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Failed to send message.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-brand-dark/5 space-y-6 animate-card-ready animate-play">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-bold font-montserrat text-brand-dark mb-1">Full Name</label>
          <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all font-inter" placeholder="John Doe" />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-bold font-montserrat text-brand-dark mb-1">Email Address</label>
          <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all font-inter" placeholder="john@example.com" />
        </div>
        
        <div>
          <label htmlFor="service" className="block text-sm font-bold font-montserrat text-brand-dark mb-1">Service Needed</label>
          <select id="service" name="service" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all font-inter bg-white">
            <option value="">Select a service</option>
            <option value="general">General Maintenance</option>
            <option value="hardware">Hardware Repair</option>
            <option value="locksmithing">Locksmithing / Security</option>
            <option value="emergency">Emergency Assistance</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold font-montserrat text-brand-dark mb-1">Message</label>
          <textarea id="message" name="message" rows={4} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all font-inter resize-none" placeholder="How can we help you?"></textarea>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={status === "submitting" || status === "success"}
        className="w-full bg-brand-accent text-brand-dark font-bold py-4 rounded-full hover:bg-brand-accent/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-green-600 text-center font-inter text-sm">Thank you! We will get back to you shortly.</p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-center font-inter text-sm">{errorMessage}</p>
      )}
    </form>
  );
}
