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
          className="w-full flex items-center justify-center gap-3 
    bg-[#A30923] text-white font-semibold 
    py-3 px-4 rounded-xl 
    shadow-md hover:shadow-lg
    hover:scale-[1.02] 
    transition-all duration-300"
        >
          <CalendarioIcon className="w-5 h-5" />
          {dict.reserva}
        </button>

        {/* BOTON WHATSAPP */}
        <a
          href={`https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(`${dict.mensaje}: ${titulo}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => changeWhatsapp()}
          className="w-full flex items-center justify-center gap-3 
    bg-[#047B3E] text-white font-semibold 
    py-3 px-4 rounded-xl
    shadow-md hover:shadow-lg
    hover:bg-green-600
    hover:scale-[1.02]
    transition-all duration-300"
        >
          <WhatsAppIcon className="w-5 h-5" />
          {dict.whatsapp}
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
