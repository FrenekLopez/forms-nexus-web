"use client";

import React, { useState, useRef } from "react";

export default function Home() {
  // Form UI state for visual feedback
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  // Native ref to reset the form without triggering React re-renders
  const formRef = useRef<HTMLFormElement>(null);

  // Form submission handler utilizing React 19+ Action standard
  const actionSubmit = async (formData: FormData) => {
    setStatus("loading");

    try {
      // Endpoint configured via Vercel environment variables
      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || "https://tu-api-id.execute-api.us-east-2.amazonaws.com/notifications";

    
      // Extract payload using native FormData API for optimal memory usage
      const payload = {
        nombre: formData.get("nombre"),
        correo: formData.get("correo"),
        destino: formData.get("destino"),
        mensaje: formData.get("mensaje"),
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-32 flex flex-col gap-24">
        
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="w-40 h-40 shrink-0 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-xl shadow-blue-900/20">
            <span className="text-4xl font-bold text-white">EL</span>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Eric Lopez Rosales <span className="text-blue-500">.</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-zinc-400 font-medium mb-6">
              Software Engineer | Backend & Cloud Architecture
            </h2>
            <p className="text-lg text-zinc-500 leading-relaxed max-w-2xl">
              Especializado en construir sistemas robustos, escalables y orientados a eventos. 
              Apasionado por Go, las arquitecturas Serverless en AWS y el diseño de APIs limpias. 
              Transformo problemas complejos en código eficiente.
            </p>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="border-t border-zinc-800 pt-16">
          <h3 className="text-2xl font-bold mb-8">Mi Stack Principal</h3>
          <div className="flex flex-wrap gap-3">
            {["Go (Golang)", "AWS CDK", "Serverless", "Gin Framework", "Next.js", "Docker", "TypeScript", "DynamoDB"].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm font-medium text-zinc-300">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="border-t border-zinc-800 pt-16" id="contacto">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-12">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Contactame.</h3>
            </div>

            <form ref={formRef} action={actionSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nombre" className="text-sm font-medium text-zinc-400">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="correo" className="text-sm font-medium text-zinc-400">Correo Electrónico</label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    required
                    className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="destino" className="text-sm font-medium text-zinc-400">Canal de Notificación Preferido</label>
                <select
                  id="destino"
                  name="destino"
                  defaultValue="telegram"
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors appearance-none"
                >
                  <option value="telegram">Telegram</option>
                  <option value="email">Email</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="mensaje" className="text-sm font-medium text-zinc-400">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={4}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Hola Eric, me interesa platicar sobre una oportunidad..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {status === "loading" ? "Enviando mensaje..." : "Enviar Mensaje"}
              </button>

              {status === "success" && (
                <p className="text-green-400 text-sm font-medium text-center bg-green-400/10 py-2 rounded-lg">
                  ¡Mensaje enviado con éxito!
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm font-medium text-center bg-red-400/10 py-2 rounded-lg">
                  Hubo un error al enviar. Intenta más tarde.
                </p>
              )}
            </form>
          </div>
        </section>

      </div>
    </main>
  );
}