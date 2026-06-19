"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  /**
   * Handles the contact form submission.
   * Maps client payload to match the AWS backend schema and dispatches the request.
   */
  const handleFormSubmit = async (formData: FormData) => {
    setStatus("loading");

    // Retrieve API endpoint from environment variables.
    // Fails fast if the environment is not properly configured to prevent silent failures.
    const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

    if (!apiUrl) {
      setStatus("error");
      throw new Error("Application configuration error: NEXT_PUBLIC_API_URL is undefined.");
    }

    try {
      // Map form data to match the exact JSON schema expected by the AWS Go backend.
      const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        target_channel: formData.get("target_channel"),
        message: formData.get("message"),
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP Request Failed with status: ${response.status}`);
      }
      
      setStatus("success");
      formRef.current?.reset(); 
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Form submission failed:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f1624] text-slate-300 font-sans selection:bg-orange-500/30">
      
      {/* Navigation Bar */}
      <nav className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="text-xl font-bold text-white tracking-widest">
          ERIC LOPEZ <span className="text-orange-500">.</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-32 pb-16">
        
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row gap-16 items-center justify-between pt-12">
          
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
              <a href="/cv-eric.pdf" target="_blank" rel="noopener noreferrer" className="border border-slate-600 hover:border-slate-400 text-white px-8 py-3 rounded text-sm font-semibold transition-all">
                My resume
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center md:justify-end relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border-[12px] border-orange-500/10 flex items-center justify-center">
              <div className="absolute inset-6 rounded-full border border-orange-500/30"></div>
              
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-[#1a2332] z-10 overflow-hidden shadow-2xl flex items-center justify-center text-slate-600 relative">
                <Image 
                  src="/desarrollador-eric.jpg" 
                  alt="Eric Lopez Profile"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Ribbon */}
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

        {/* Featured Projects Section */}
        <section id="projects" className="pt-16">
          <div className="flex items-center gap-4 mb-12">
            <span className="h-[2px] w-12 bg-orange-500 inline-block"></span>
            <h3 className="text-slate-400 font-semibold uppercase tracking-wider">Featured Projects</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Forms Nexus API Project */}
            <div className="group bg-[#1a2332] rounded-lg p-8 border border-slate-800/50 hover:border-orange-500/30 transition-all hover:-translate-y-1">
              <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">Forms Nexus API</h4>
              <p className="text-slate-400 mb-6 line-clamp-3">
                Serverless notification router built with Go and AWS. It securely processes contact forms and dispatches them to Telegram or Email using API Gateway and Lambda functions.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="text-xs font-medium px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full">Go</span>
                <span className="text-xs font-medium px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full">AWS API Gateway</span>
                <span className="text-xs font-medium px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full">AWS Lambda</span>
              </div>
              {/* Linked correctly to your real GitHub repo */}
              <a href="https://github.com/FrenekLopez/forms-nexus-api" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-orange-500 transition-colors">
                View on GitHub <span className="text-orange-500 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* Go User API Project */}
            <div className="group bg-[#1a2332] rounded-lg p-8 border border-slate-800/50 hover:border-orange-500/30 transition-all hover:-translate-y-1">
              <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">Go User API</h4>
              <p className="text-slate-400 mb-6 line-clamp-3">
                A high-performance backend service designed to fetch, process, and serve user data. Focuses on clean architecture and efficient data handling.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="text-xs font-medium px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full">Go</span>
                <span className="text-xs font-medium px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full">REST API</span>
              </div>
              {/* Linked correctly to your real GitHub repo */}
              <a href="https://github.com/FrenekLopez/go-user-api" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-orange-500 transition-colors">
                View on GitHub <span className="text-orange-500 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="pt-16">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="h-[2px] w-12 bg-orange-500 inline-block"></span>
                <h3 className="text-slate-400 font-semibold uppercase tracking-wider">Contacts</h3>
              </div>
              <h2 className="text-5xl font-bold text-white mb-8 leading-tight">
                Have a project?<br/>Let's talk!
              </h2>
            </div>

            <div className="flex-1 w-full">
              <form ref={formRef} action={handleFormSubmit} className="flex flex-col gap-8">
                
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
                    {status === "loading" ? "Processing..." : "Submit"}
                  </button>
                </div>

                {status === "success" && <p className="text-orange-400 text-sm mt-2">Message transmitted successfully.</p>}
                {status === "error" && <p className="text-red-500 text-sm mt-2">Failed to process request. Please check system logs.</p>}
              </form>
            </div>
          </div>
        </section>

        {/* --- FOOTER / SOCIAL NETWORKS --- */}
        <footer className="border-t border-slate-800/50 mt-16 pt-8 pb-4">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">
            
            <div className="text-slate-500 text-sm font-medium">
              © {new Date().getFullYear()} Eric Lopez. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6">
              {/* GitHub Link */}
              <a 
                href="https://github.com/FrenekLopez" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-orange-500 transition-colors"
                aria-label="GitHub Profile"
              >
                {/* SVG icon optimized for React */}
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>

              {/* LinkedIn Link */}
              <a 
                href="https://linkedin.com/in/eric-lopez-rosales" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-orange-500 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}