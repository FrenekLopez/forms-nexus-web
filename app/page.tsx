"use client";

import React, { useState, useRef } from "react";

export default function Home() {
  // Estado del Formulario
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Lógica de Envío Estricta (Forms Nexus)
  const actionSubmit = async (formData: FormData) => {
    setStatus("loading");

    // ESTRICTO: Solo usa la variable de entorno, sin URLs expuestas (Hardcoded).
    // El "as string" le asegura a TypeScript que no será undefined en runtime.
    const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

    if (!apiUrl) {
      console.error("ERROR CRÍTICO: La variable NEXT_PUBLIC_API_URL no está definida en Vercel o .env.local");
      setStatus("error");
      return;
    }

    try {
      const payload = {
        nombre: formData.get("nombre"),
        correo: formData.get("correo"),
        destino: formData.get("destino"),
        mensaje: formData.get("mensaje"),
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
    // Fondo oscuro estilo Slate/Navy de tu diseño de referencia
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
          
          {/* Lado Izquierdo: Textos */}
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

          {/* Lado Derecho: Foto con aros circulares */}
          <div className="flex-1 flex justify-center md:justify-end relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border-[12px] border-orange-500/10 flex items-center justify-center">
              <div className="absolute inset-6 rounded-full border border-orange-500/30"></div>
              
              {/* Contenedor de la Foto. Cuando subas tu imagen a la carpeta public,
                  puedes cambiar este div por un tag <img> */}
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-[#1a2332] z-10 overflow-hidden shadow-2xl flex items-center justify-center text-slate-600">
                [Tu Foto Aquí]
              </div>
            </div>
          </div>
        </section>

        {/* --- CINTA DE TECNOLOGÍAS --- */}
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

        {/* --- FORMS NEXUS (Diseño Minimalista) --- */}
        <section id="contact" className="pt-16">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            
            {/* Lado Izquierdo Contacto */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="h-[2px] w-12 bg-orange-500 inline-block"></span>
                <h3 className="text-slate-400 font-semibold uppercase tracking-wider">Contacts</h3>
              </div>
              <h2 className="text-5xl font-bold text-white mb-8 leading-tight">
                Have a project?<br/>Let's talk!
              </h2>
            </div>

            {/* Lado Derecho: Inputs Minimalistas */}
            <div className="flex-1 w-full">
              <form ref={formRef} action={actionSubmit} className="flex flex-col gap-8">
                
                <div>
                  <input
                    type="text"
                    name="nombre"
                    required
                    placeholder="Name"
                    className="w-full bg-transparent border-b border-slate-700 pb-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    name="correo"
                    required
                    placeholder="Email"
                    className="w-full bg-transparent border-b border-slate-700 pb-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <select
                    name="destino"
                    defaultValue="telegram"
                    className="w-full bg-transparent border-b border-slate-700 pb-3 text-slate-500 focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                  >
                    <option value="telegram" className="bg-[#0f1624]">Route to: Telegram</option>
                    <option value="email" className="bg-[#0f1624]">Route to: Email</option>
                  </select>
                </div>

                <div>
                  <textarea
                    name="mensaje"
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

                {status === "success" && <p className="text-orange-400 text-sm mt-2">¡Mensaje enviado exitosamente!</p>}
                {status === "error" && <p className="text-red-500 text-sm mt-2">Error al enviar. Revisa la consola o asegúrate de que AWS responda.</p>}
              </form>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}