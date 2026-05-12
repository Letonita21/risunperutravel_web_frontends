"use client";
import React, { useState, Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";

const GaleriaBlog = ({ galeria, url, portada }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState("");

  const abrirModal = (imgUrl) => {
    setImagenSeleccionada(imgUrl);
    setIsOpen(true);
  };

  const cerrarModal = () => setIsOpen(false);

  const imagenesGaleria = galeria?.filter((img) => img.url !== portada);

  if (!imagenesGaleria || imagenesGaleria.length === 0) return null;

  return (
    <>
      <section className="border-t border-gray-200 pt-16 mt-10 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center uppercase tracking-[0.3em]">
          Galería Fotográfica
        </h2>

        {/* Mosaico Dinámico con Grid Auto-rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
          {imagenesGaleria.map((img, index) => (
            <div
              key={img.id}
              onClick={() => abrirModal(img.url)}
              className={`
                                relative overflow-hidden rounded-lg cursor-pointer group bg-black shadow-lg
                                transition-all duration-500
                                ${index % 7 === 0 ? "md:col-span-2 md:row-span-2" : ""} 
                                ${index % 5 === 0 ? "md:row-span-2" : ""}
                                ${index % 3 === 0 ? "md:col-span-2" : ""}
                            `}
            >
              <img
                src={`${url}${img.url}`}
                alt={img.nombre}
                className="w-full h-full object-cover 
                                           grayscale group-hover:grayscale-0 
                                           opacity-85 group-hover:opacity-100
                                           transition-all duration-1000 ease-out
                                           group-hover:scale-110"
              />

              {/* Overlay de color suave al pasar el mouse */}
              <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Líneas de enfoque (esquinas) que aparecen en hover */}
              <div className="absolute inset-4 border-l border-t border-white/0 group-hover:border-white/40 transition-all duration-700 pointer-events-none" />
              <div className="absolute inset-4 border-r border-b border-white/0 group-hover:border-white/40 transition-all duration-700 pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={cerrarModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/95 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <DialogPanel className="relative max-w-6xl w-full flex items-center justify-center">
                <button
                  onClick={cerrarModal}
                  className="absolute -top-14 right-0 text-white/60 hover:text-white text-4xl p-2 transition-all hover:rotate-90"
                >
                  ✕
                </button>
                <img
                  src={`${url}${imagenSeleccionada}`}
                  alt="Full color"
                  className="max-h-[85vh] w-auto object-contain shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default GaleriaBlog;
