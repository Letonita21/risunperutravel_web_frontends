"use client";
import { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { numeroWhatsapp } from "./numero";

export default function WidgetWhatsapp() {
  const [open, setOpen] = useState(false);

  const mensaje = encodeURIComponent(
    "Hola, quiero información sobre los tours en Cusco",
  );

  return (
    <div className="fixed bottom-8 right-6 z-50">
      {/* Panel */}
      {open && (
        <div className="absolute bottom-20 right-0 w-[320px] bg-white rounded-xl shadow-2xl overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 flex items-center gap-3">
            <FaWhatsapp size={28} />
            <div>
              <p className="font-semibold text-lg">Iniciar una conversación</p>
              <p className="text-sm opacity-90">
                Haz clic para chatear por WhatsApp
              </p>
            </div>
          </div>

          {/* Asesor */}
          <div className="p-4 bg-gray-50">
            <a
              href={`https://wa.me/${numeroWhatsapp}?text=${mensaje}`}
              target="_blank"
              className="flex items-center justify-between bg-white p-3 rounded-lg shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src="/colibri_risun.svg"
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    Risun asesor de viajes
                  </p>
                  <p className="text-sm text-gray-500">
                    Siempre atento a tus consultas
                  </p>
                </div>
              </div>

              <FaWhatsapp className="text-green-500" size={22} />
            </a>
          </div>
        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={() => setOpen(!open)}
        className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition"
      >
        {open ? <FaTimes size={28} /> : <FaWhatsapp size={32} />}
      </button>
    </div>
  );
}
