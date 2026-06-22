"use client";

import React from "react";
import { motion } from "framer-motion";
import { developmentSkills, developmentTools } from "../data/resumeData";
import { fadeUpVariant } from "../constants/animations";

export default function SkillsSection() {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUpVariant}
      className="pt-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
        What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Offer</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative group bg-[#131b2c] rounded-[2rem] p-8 md:p-10 border border-slate-800/60 hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-[60px] group-hover:bg-blue-500/20 transition-all duration-500 pointer-events-none"></div>
          <h3 className="text-3xl font-bold text-white mb-4">Development <br/> <span className="text-blue-400">Skills</span></h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">Solid foundational knowledge in backend services creation, cloud infrastructure automation, and containerization.</p>
          <div className="flex flex-wrap gap-2.5">
            {developmentSkills.map((skill) => (
              <span key={skill} className="px-4 py-1.5 rounded-full border border-slate-700/80 bg-[#1a2332] text-slate-300 text-xs font-semibold tracking-wide hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default">{skill}</span>
            ))}
          </div>
        </div>
        <div className="relative group bg-[#131b2c] rounded-[2rem] p-8 md:p-10 border border-slate-800/60 hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 blur-[60px] group-hover:bg-blue-500/20 transition-all duration-500 pointer-events-none"></div>
          <h3 className="text-3xl font-bold text-white mb-4">Development <br/> <span className="text-blue-400">Tools</span></h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">Leveraging robust industry-standard tools to engineer automated CI/CD pipelines, document scalable APIs, and ensure seamless deployments.</p>
          <div className="flex flex-wrap gap-2.5">
            {developmentTools.map((tool) => (
              <span key={tool} className="px-4 py-1.5 rounded-full border border-slate-700/80 bg-[#1a2332] text-slate-300 text-xs font-semibold tracking-wide hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default">{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
