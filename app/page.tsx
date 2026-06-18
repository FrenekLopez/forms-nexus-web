"use client";

import React, { useState, useRef } from "react";

export default function Home() {
  // Form State
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Strict Submission Logic (Forms Nexus)
  const actionSubmit = async (formData: FormData) => {
    setStatus("loading");

    // STRICT: Uses only the environment variable, no hardcoded URLs.
    // The "as string" assertion guarantees TypeScript it won't be undefined at runtime.
    const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

    if (!apiUrl) {
      console.error("CRITICAL ERROR: NEXT_PUBLIC_API_URL variable is not defined in Vercel or .env.local");
      setStatus("error");
      return;
    }

    try {
      // ⚠️ FIX: Map data to the exact schema of the AWS (Go) backend
      const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        target_channel: formData.get("target_channel"),
        message: formData.get("message"),
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      
      setStatus("success");
      formRef.current?.reset(); 
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    // Dark background Slate/Navy style from your reference design
    <main className="min-h-screen bg-[#0f1624] text-slate-300 font-sans selection:bg-orange-500/30">
      
      {/* NAVBAR */}
      <nav className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="text-xl font-bold text-white tracking-widest">
          ERIC OMEGA <span className="text-orange-500">.</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-32 pb-32">
        
        {/* --- HERO SECTION --- */}
        <section className="flex flex-col-reverse md:flex-row gap-16 items-center justify-between pt-12">
          
          {/* Left Side: Texts */}
          <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[2px] w-12 bg-orange-500 inline-block"></span>
              <h2 className="text-2xl font-semibold text-white tracking-wide">
                Hello <span className="text-orange-500">.</span>
              </h2>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              I'm Eric Lopez
            </h1>
            
            <h2 className="text-3xl md:text-5xl font-bold text-slate-400 mb-10">
              Software Developer
            </h2>
            
            <div className="flex gap-4">
              <a href="#contact" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded text-sm font-semibold transition-all shadow-lg shadow-orange-500/20">
                Let's talk
              </a>
              <a href="#" className="border border-slate-600 hover:border-slate-400 text-white px-8 py-3 rounded text-sm font-semibold transition-all">
                My resume
              </a>
            </div>
          </div>

          {/* Right Side: Photo with circular rings */}
          <div className="flex-1 flex justify-center md:justify-end relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border-[12px] border-orange-500/10 flex items-center justify-center">
              <div className="absolute inset-6 rounded-full border border-orange-500/30"></div>
              
              {/* Photo Container. When you upload your image to the public folder,
                  you can change this div for an <img> tag */}
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-[#1a2332] z-10 overflow-hidden shadow-2xl flex items-center justify-center text-slate-600">
                [Your Photo Here]
              </div>
            </div>
          </div>
        </section>

        {/* --- TECHNOLOGIES RIBBON --- */}
        <section className="border-y border-slate-800/50 py-8">
          <div className="flex flex-wrap justify-center md:justify-between gap-6 md:gap-12 text-slate-500 text-sm font-semibold tracking-wider uppercase">
            <span>Go</span>
            <span>AWS</span>
            <span>Node.js</span>
            <span>React</span>
            <span>Docker</span>
            <span>GitHub</span>
          </div>
        </section>

        {/* --- FORMS NEXUS (Minimalist Design) --- */}
        <section id="contact" className="pt-16">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            
            {/* Left Side: Contact */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="h-[2px] w-12 bg-orange-500 inline-block"></span>
                <h3 className="text-slate-400 font-semibold uppercase tracking-wider">Contacts</h3>
              </div>
              <h2 className="text-5xl font-bold text-white mb-8 leading-tight">
                Have a project?<br/>Let's talk!
              </h2>
            </div>

            {/* Right Side: Minimalist Inputs */}
            <div className="flex-1 w-full">
              <form ref={formRef} action={actionSubmit} className="flex flex-col gap-8">
                
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Name"
                    className="w-full bg-transparent border-b border-slate-700 pb-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    className="w-full bg-transparent border-b border-slate-700 pb-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div className="relative">
                  <select
                    name="target_channel"
                    defaultValue="telegram"
                    className="w-full bg-transparent border-b border-slate-700 pb-3 text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="telegram" className="bg-[#0f1624] text-white">Route to: Telegram</option>
                    <option value="email" className="bg-[#0f1624] text-white">Route to: Email</option>
                  </select>
                  {/* Custom arrow */}
                  <div className="pointer-events-none absolute right-0 top-0 bottom-3 flex items-center px-2 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>

                <div>
                  <textarea
                    name="message"
                    required
                    rows={1}
                    placeholder="Message"
                    className="w-full bg-transparent border-b border-slate-700 pb-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors resize-none overflow-hidden"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-10 rounded transition-all disabled:opacity-50 inline-block shadow-lg shadow-orange-500/20"
                  >
                    {status === "loading" ? "Sending..." : "Submit"}
                  </button>
                </div>

                {status === "success" && <p className="text-orange-400 text-sm mt-2">Message sent successfully!</p>}
                {status === "error" && <p className="text-red-500 text-sm mt-2">Error sending message. Check the console or make sure AWS is responding.</p>}
              </form>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}