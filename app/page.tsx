"use client";

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    target_channel: "telegram", // Por defecto enviará a Telegram
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const response = await fetch("https://api.freneklopez.dev/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("¡Mensaje enviado con éxito!");
        setFormData({ name: "", email: "", message: "", target_channel: "telegram" }); // Limpiar formulario
      } else {
        setStatus("Error al enviar el mensaje. Revisa la consola.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      setStatus("Error de conexión con el servidor.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-900 p-4">
      <div className="bg-zinc-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-zinc-700">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Contacto Forms Nexus</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Destino de la Notificación</label>
            <select
              name="target_channel"
              value={formData.target_channel}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="telegram">Telegram</option>
              <option value="email">Correo Electrónico (SES)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Mensaje</label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
              placeholder="Escribe tu mensaje aquí..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Enviar Mensaje
          </button>
        </form>

        {status && (
          <p className="mt-4 text-center text-sm font-medium text-zinc-300">
            {status}
          </p>
        )}
      </div>
    </main>
  );
}