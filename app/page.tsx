"use client";

import React, { useState, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

// Data Layers & Configuration Imports
import { ContactPayload } from "../types";
import { fadeUpVariant } from "../constants/animations";

// Decoupled Structural & Feature Components
import SocialSidebar from "../components/SocialSidebar";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import TimelineSection from "../components/TimelineSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsCarousel from "../components/ProjectsCarousel";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

// RESOURCE INTERACTIVE APPLICATION CORE LAYOUT
// Orchestration root component handling application layout, runtime global states,
// interface triggers, and external transactional API pipelines.

export default function Home() {
  // RUNTIME STATE LIFECYCLE MANAGEMENT
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" >("idle");
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");
  
  // DOM Elements Node References
  const formRef = useRef<HTMLFormElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isSubmitting = status === "loading";

  // USER INTERACTION INTERFACE HANDLERS
  
  /**
   * Triggers manual dynamic view scrolling inside viewport container elements
   * @param direction Lateral displacement direction target matrix
   */
  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  /**
   * Evaluates native payload parameters and dispatches data upstream to endpoint servers
   * @param formData Native browser form submission data snapshot layer
   */
  const handleFormSubmit = async (formData: FormData) => {
    setStatus("loading");
    const loadingToastId = toast.loading("Processing your message...");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

    if (!apiUrl) {
      setStatus("error");
      toast.error("Configuration Error: API Gateway URL is missing.", { id: loadingToastId });
      return;
    }

    try {
      const payload: ContactPayload = {
        name: (formData.get("name")?.toString() || "").trim(),
        email: (formData.get("email")?.toString() || "").trim(),
        target_channel: (formData.get("target_channel")?.toString() || "telegram"),
        message: (formData.get("message")?.toString() || "").trim(),
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`API Request Failed. Status: ${response.status}`);
      
      setStatus("success");
      toast.success("Message transmitted successfully! I'll get back to you soon.", { id: loadingToastId });
      formRef.current?.reset(); 
      setTimeout(() => setStatus("idle"), 3000);
      
    } catch (error) {
      console.error("Form dispatch failed:", error);
      setStatus("error");
      toast.error("Failed to transmit message. Please try again later.", { id: loadingToastId });
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  // CORE LAYOUT ORCHESTRATION VIEW
  return (
    <main className="min-h-screen bg-[#0f1624] text-slate-300 font-sans selection:bg-blue-500/30 relative overflow-hidden">
      
      {/* Global Framework Notifications Provider Layer */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: { background: '#1a2332', color: '#fff', border: '1px solid #334155' },
          success: { iconTheme: { primary: '#3b82f6', secondary: '#fff' } }
        }} 
      />

      {/* Global Interface Sticky Background Shell Elements */}
      <SocialSidebar />
      <Navbar />

            {/* Synchronized Content View Sections Staging Row */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-32 pb-16 md:pl-28">
        
        <HeroSection />
        
        <TimelineSection activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <SkillsSection />
        
        <ProjectsCarousel carouselRef={carouselRef} scrollCarousel={scrollCarousel} />
        
        <ContactForm formRef={formRef} onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        
        <Footer />
        
      </div>

    </main>
  );
}
