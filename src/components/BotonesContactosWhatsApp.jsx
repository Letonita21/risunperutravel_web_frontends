"use client";
import React, { useState } from "react";
import { CalendarioIcon, WhatsAppIcon } from "@/icons";
import { numeroWhatsapp } from "@/components/contactos/numero";
import { Dialog, DialogPanel } from "@headlessui/react";
import FormularioEmail from "./FormularioEmail";
import CardsTours from "./CardsTours";

const BotonesContactosWhatsApp = ({
  titulo,
  tours,
  dict,
  formulario,
  lang,
}) => {
  const [modal, setModal] = useState(false);
  const form = {
    tour: titulo,
    idioma: lang,
  };
  const CloseModal = () => {
    setModal(false);
  };
  const changeWhatsapp = async (e) => {
    try {
      const response = await fetch("/api/consulta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (error) {}
  };
  return (
    <div>
      <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6 ring-1 ring-gray-200 mt-6 space-y-3">
        {/* BOTON RESERVAR */}
        <button
          onClick={() => setModal(true)}
          className="relative flex items-center w-full max-w-[450px] group transition-transform duration-300 hover:scale-[1.02]"
        >
          {/* Icono principal (círculo grande) */}
          <div className="absolute -left-2 z-20 w-24 h-24 rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-[#A30923]">
            <CalendarioIcon className="w-10 h-10 text-white" />
          </div>

          {/* Cuerpo del botón */}
          <div className="flex flex-col justify-center w-full bg-[#A30923] hover:bg-[#8a081d] text-white pl-24 pr-8 py-3 rounded-full shadow-md transition-colors duration-300 ml-6 min-h-[80px]">
            {/* Icono pequeño */}
            <div className="absolute left-[76px] top-1/2 -translate-y-1/2 z-30 bg-[#612505] p-1.5 rounded-full shadow-sm">
              <WhatsAppIcon className="w-5 h-5 text-[#047B3E]" />
            </div>

            {/* Textos */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white/90">
                Reserva tu experiencia
              </span>

              <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-tighter backdrop-blur-sm">
                Hoy
              </span>
            </div>

            <p className="text-sm font-black leading-tight tracking-tight uppercase">
              {dict.reserva}
            </p>
          </div>
        </button>

        {/* BOTON WHATSAPP */}
        <a
          href={`https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(`${dict.mensaje}: ${titulo}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => changeWhatsapp()}
          className="relative flex items-center w-full max-w-[450px] group transition-transform duration-300 hover:scale-[1.02]"
        >
          {/* Foto del Asesor (Círculo externo) */}
          <div className="absolute -left-2 z-20 w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
            <img
              src="/equipo/equipo3.jpg" // Pon aquí la imagen del asesor
              alt="Carlos asesor"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Cuerpo del Botón */}
          <div className="flex flex-col justify-center w-full bg-[#047B3E] hover:bg-[#20ba5a] text-white pl-24 pr-8 py-3 rounded-full shadow-md transition-colors duration-300 ml-6 min-h-[80px]">
            {/* Contenedor del Icono WhatsApp pequeño */}
            <div className="absolute left-[76px] top-1/2 -translate-y-1/2 z-30 bg-[#047B3E] p-1.5 rounded-full shadow-sm">
              <WhatsAppIcon className="w-5 h-5 text-[#047B3E]" />
            </div>

            {/* Textos */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white/90">
                Risun asesor de viajes
              </span>
              <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-tighter backdrop-blur-sm">
                Online
              </span>
            </div>

            <p className="text-sm font-black leading-tight tracking-tight uppercase">
              Reserva por Whatsapp, AQUÍ
            </p>
          </div>
        </a>
      </div>

      <div className="mt-5">
        <CardsTours tours={tours} dict={dict} />
      </div>
      <Dialog open={modal} onClose={CloseModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-lg">
            <FormularioEmail
              onClose={CloseModal}
              titulo={titulo}
              isOpen={modal}
              form={formulario}
              lang={lang}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default BotonesContactosWhatsApp;
