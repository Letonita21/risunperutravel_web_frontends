"use client";
import { useState, Fragment, useEffect } from "react"; // Añadimos useEffect
import Image from "next/image";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  Transition,
} from "@headlessui/react";
import { CerrarIcon, IzquierdaIcon, DerechaIcon } from "@/icons";

export const Galeria = ({ galeria, url }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const nextImage = () =>
    setSelectedIndex((prev) => (prev + 1) % galeria.length);
  const prevImage = () =>
    setSelectedIndex((prev) => (prev - 1 + galeria.length) % galeria.length);

  // --- LÓGICA DE AUTOPLAY (6 SEGUNDOS) ---
  useEffect(() => {
    // Solo rotar si hay más de una imagen
    if (galeria.length <= 1) return;

    const interval = setInterval(() => {
      nextImage();
    }, 6000); // 6000ms = 6 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    // o cuando el selectedIndex cambie (para reiniciar el contador)
    return () => clearInterval(interval);
  }, [selectedIndex, galeria.length]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-4">
      {/* 1. VISTA PREVIA PRINCIPAL */}
      <div className="flex justify-center items-center">
        <div
          className="relative w-full aspect-[16/10] md:aspect-[21/9] bg-gray-50 rounded-3xl overflow-hidden cursor-zoom-in shadow-sm hover:shadow-2xl transition-all duration-700 group"
          onClick={openModal}
        >
          {/* Usamos una key para que React sepa que la imagen cambió y aplique la transición de entrada */}
          <div className="relative w-full h-full p-4 md:p-8">
            <Image
              key={selectedIndex}
              src={`${url}/${galeria[selectedIndex].url}`}
              alt={galeria[selectedIndex].nombre}
              fill
              className="object-contain transition-all duration-1000 animate-in fade-in zoom-in-95"
              priority
            />
          </div>

          {/* Overlay de Agencia */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-end p-8">
            <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl">
              <p className="text-sm font-semibold text-gray-800 tracking-wide uppercase">
                Ver Galería Completa
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MINIATURAS CENTRADAS */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {galeria.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden transition-all duration-500 ${
              selectedIndex === idx
                ? "ring-4 ring-blue-500/30 scale-110 shadow-lg"
                : "opacity-40 hover:opacity-80 scale-90"
            }`}
          >
            <Image
              src={`${url}/${img.url}`}
              alt={img.nombre}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* 3. MODAL (PANTALLA COMPLETA) */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
          >
            <div className="fixed inset-0 bg-white/98 dark:bg-slate-950/98 backdrop-blur-xl" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="flex h-full items-center justify-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-500"
                enterFrom="opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-300"
              >
                <DialogPanel className="relative w-full h-full flex flex-col p-6">
                  {/* Botón Cerrar Flotante */}
                  <button
                    onClick={closeModal}
                    className="absolute top-8 right-8 z-50 p-4 bg-gray-100 dark:bg-white/10 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-full transition-all group"
                  >
                    <CerrarIcon className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                  </button>

                  {/* Imagen del Modal con Navegación */}
                  <div className="flex-1 relative flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 md:left-10 z-20 p-4 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <IzquierdaIcon size={48} />
                    </button>

                    <div className="relative w-[90%] h-[70vh]">
                      <Image
                        key={`modal-${selectedIndex}`}
                        src={`${url}/${galeria[selectedIndex].url}`}
                        alt={galeria[selectedIndex].nombre}
                        fill
                        className="object-contain animate-in fade-in duration-700"
                      />
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 md:right-10 z-20 p-4 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <DerechaIcon size={48} />
                    </button>
                  </div>

                  {/* Footer Modal */}
                  <div className="text-center py-6">
                    <h3 className="text-2xl font-light tracking-widest uppercase mb-4 text-gray-800 dark:text-white">
                      {galeria[selectedIndex].nombre}
                    </h3>
                    <div className="flex justify-center gap-3 overflow-x-auto max-w-2xl mx-auto px-4">
                      {galeria.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedIndex(idx)}
                          className={`relative shrink-0 w-10 h-10 rounded-full overflow-hidden transition-all duration-300 ${
                            selectedIndex === idx
                              ? "ring-2 ring-blue-500 scale-125"
                              : "opacity-30 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={`${url}/${img.url}`}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
