"use client";

import React from "react";
import { motion } from "framer-motion";

// COMPONENT: MAIN NAVIGATION BAR HEADER
// Application header orchestration handling routing nodes and anchor references

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center md:pl-28 relative z-20"
    >
      <div className="text-xl font-bold text-white tracking-widest">
        DEVELOPER <span className="text-blue-500">.</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
        <a href="#" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-blue-500">Home</a>
        <a href="#experience" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-blue-500">Experience</a>
        <a href="#projects" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-blue-500">Projects</a>
        <a href="#contact" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-blue-500">Contact</a>
      </div>
    </motion.nav>
  );
}
