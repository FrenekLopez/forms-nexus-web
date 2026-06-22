"use client";

import React from "react";
import { motion } from "framer-motion";
import { experienceData, educationData } from "../data/resumeData";
import { fadeUpVariant, staggerContainer, staggerItem } from "../constants/animations";

interface TimelineSectionProps {
  activeTab: "experience" | "education";
  setActiveTab: (tab: "experience" | "education") => void;
}

export default function TimelineSection({ activeTab, setActiveTab }: TimelineSectionProps) {
  const currentTimelineData = activeTab === "experience" ? experienceData : educationData;

  return (
    <motion.section 
      id="experience" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUpVariant}
      className="pt-16 flex flex-col items-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
        My Work <br className="md:hidden" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Experience</span>
      </h2>
      
      <div className="flex gap-4 mb-16 bg-[#131b2c] p-2 rounded-full border border-slate-800/50">
        <button 
          onClick={() => setActiveTab("experience")} 
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === "experience" ? "bg-[#1a2332] text-blue-400 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]" : "text-slate-500 hover:text-slate-300 transparent border border-transparent"}`}
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://w3.org">
            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
          </svg> 
          Experience
        </button>
        <button 
          onClick={() => setActiveTab("education")} 
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === "education" ? "bg-[#1a2332] text-blue-400 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]" : "text-slate-500 hover:text-slate-300 transparent border border-transparent"}`}
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://w3.org">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/>
          </svg> 
          Education
        </button>
      </div>
      
      <motion.div 
        key={activeTab} 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl flex flex-col gap-10"
      >
        {currentTimelineData.map((item) => (
          <motion.div 
            variants={staggerItem} 
            key={item.id} 
            className="flex flex-col md:flex-row gap-4 md:gap-8 items-start border-b border-slate-800/50 pb-10 last:border-0 hover:bg-slate-800/10 p-4 rounded-xl transition-colors"
          >
            <div className="w-full md:w-1/3">
              <h4 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">{item.role}</h4>
              <p className="text-blue-500 font-bold text-sm tracking-wide uppercase">{item.company}</p>
            </div>
            <div className="w-full md:w-1/4">
              <span className="text-slate-400 font-semibold bg-slate-800/50 px-3 py-1 rounded-full text-sm">{item.period}</span>
            </div>
            <div className="w-full md:w-5/12">
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
