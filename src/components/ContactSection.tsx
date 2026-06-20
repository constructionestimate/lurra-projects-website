"use client";

import { motion, useInView } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          details: data.get("details"),
          preferred_contact: data.get("preferred_contact"),
          website: data.get("website"),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");
      setStatus("success");
      setMessage("Thank you — Lachie will be in touch shortly.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please call 0400 810 107.");
    }
  };

  return (
    <section id="contact" ref={ref} className="lurra-section pb-32">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="lurra-card overflow-hidden"
      >
        <div className="grid lg:grid-cols-[1fr_1.1fr]">
          <div className="border-b border-white/8 p-8 md:p-12 lg:border-b-0 lg:border-r">
            <p className="lurra-label">Let&apos;s Create Your Sanctuary</p>
            <h2 className="lurra-display mt-4 text-4xl font-medium text-lurra-cream md:text-5xl">
              Request a private consultation.
            </h2>
            <p className="mt-6 text-sm leading-7 text-lurra-muted">
              Share a little about your property and vision. We respond personally — usually within one business day.
            </p>

            <ul className="mt-10 space-y-5 text-sm text-lurra-cream">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-lurra-gold" />
                <a href="tel:0400810107" className="hover:text-lurra-gold">0400 810 107</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-lurra-gold" />
                <a href="mailto:Lachie@lurraprojects.com.au" className="hover:text-lurra-gold">
                  Lachie@lurraprojects.com.au
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-lurra-gold" />
                <span>Mentone, Melbourne VIC 3194</span>
              </li>
            </ul>
          </div>

          <form onSubmit={onSubmit} className="space-y-5 p-8 md:p-12">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-xs uppercase tracking-widest text-lurra-muted">
                Name
                <input
                  required
                  name="name"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-lurra-cream outline-none focus:border-lurra-gold"
                />
              </label>
              <label className="block text-xs uppercase tracking-widest text-lurra-muted">
                Phone
                <input
                  name="phone"
                  type="tel"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-lurra-cream outline-none focus:border-lurra-gold"
                />
              </label>
            </div>
            <label className="block text-xs uppercase tracking-widest text-lurra-muted">
              Email
              <input
                required
                name="email"
                type="email"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-lurra-cream outline-none focus:border-lurra-gold"
              />
            </label>
            <label className="block text-xs uppercase tracking-widest text-lurra-muted">
              Project details
              <textarea
                required
                name="details"
                rows={4}
                className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-lurra-cream outline-none focus:border-lurra-gold"
                placeholder="Tell us about your property, timeline, and what you're envisioning..."
              />
            </label>
            <label className="block text-xs uppercase tracking-widest text-lurra-muted">
              Preferred contact
              <select
                name="preferred_contact"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-lurra-cream outline-none focus:border-lurra-gold"
                defaultValue="phone"
              >
                <option value="phone">Phone call</option>
                <option value="email">Email</option>
                <option value="either">Either</option>
              </select>
            </label>
            <button type="submit" disabled={status === "loading"} className="lurra-btn-primary w-full disabled:opacity-60">
              {status === "loading" ? "Sending..." : "Request a Private Consultation"}
            </button>
            {status === "success" && <p className="text-sm text-lurra-gold">{message}</p>}
            {status === "error" && <p className="text-sm text-red-300">{message}</p>}
          </form>
        </div>
      </motion.div>
    </section>
  );
}