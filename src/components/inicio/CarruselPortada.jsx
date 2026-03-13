"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  StarInternoIcon,
  TripAdvisorIcon,
  GorGoogleIcon,
  GroupIcon,
  TravelIcon,
  ReserIcon,
  HelpIcon,
} from "@/icons";
import { numeroWhatsapp } from "../contactos/numero";
import { HandRightIcon } from "@/icons";

const message = "Hi!, Risun Peru Travel...";

const CarruselPortada = ({ portadaHome, dict, lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % portadaHome.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [portadaHome.length]);
  console.log(portadaHome);

  return (
    <div className="relative w-full min-h-[100svh] overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {portadaHome.map((src, idx) => (
          <div
            key={idx}
            className="relative w-full min-h-[100svh] shrink-0 overflow-hidden"
          >
            {/* IMAGEN */}
            <Image
              src={`${url}${src.ruta}`}
              alt={src.nombre}
              fill
              priority={idx === 0}
              sizes="100vw"
              className={`object-cover transition-transform duration-[12000ms] ${
                idx === currentIndex ? "scale-110" : "scale-100"
              }`}
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />

            {/* CONTENIDO (en móvil abajo, en desktop más abajo) */}
            <div className="relative z-10 flex flex-col items-center justify-end text-center px-4 sm:px-8 text-white min-h-[100svh] pb-14 md:pb-24">
              {/* CAMBIOS REALIZADOS ARRIBA:
      1. Se eliminó 'md:justify-center' para que en PC también use 'justify-end'.
      2. Se cambió 'md:pb-0' por 'md:pb-24' (puedes aumentar este número, ej: md:pb-32, para bajarlo más).
  */}

              {/* LOGO */}
              <Image
                src="/risun_logo2.png"
                width={600}
                height={100}
                sizes="(max-width:640px) 180px, (max-width:1024px) 270px, 450px"
                className="w-[180px] sm:w-[270px] lg:w-[450px] h-auto drop-shadow-[0_0_25px_rgba(0,0,0,0.9)] brightness-110 contrast-110"
                priority
                alt="Risun Peru Travel"
              />

              {/* PANEL INFO (compacto en móvil) */}
              <div className="mt-4 md:mt-6 w-full max-w-[360px] sm:max-w-xl md:max-w-5xl">
                {/* CAJA CONJUNTA SOLO EN MOBILE */}
                <div className="rounded-3xl bg-white/70 md:bg-transparent backdrop-blur-md md:backdrop-blur-0 p-3 md:p-0 shadow-xl md:shadow-none ring-1 ring-black/10 md:ring-0">
                  {/* GRID PRINCIPAL */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
                    {/* 1) Operador */}
                    <div className="rounded-2xl bg-white/50 backdrop-blur px-3 py-2 md:px-4 md:py-3">
                      <div className="inline-flex items-center justify-center rounded-xl bg-black/5 p-2 mx-auto">
                        <GroupIcon className="w-6 h-6 md:w-7 md:h-7 text-[#047B3E]" />
                      </div>
                      <p className="mt-1 md:mt-2 text-sm md:text-lg font-extrabold text-gray-800">
                        {dict.operador}
                      </p>
                    </div>

                    {/* 2) Operaciones */}
                    <div className="rounded-2xl bg-white/50 backdrop-blur px-3 py-2 md:px-4 md:py-3">
                      <div className="inline-flex items-center justify-center rounded-xl bg-black/5 p-2 mx-auto">
                        <div className="flex items-center justify-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <StarInternoIcon
                              key={i}
                              className="w-4 h-4 md:w-5 md:h-5 text-[#047B3E]"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-1 text-lg md:text-2xl font-extrabold text-gray-900 leading-none">
                        +1000
                      </p>
                      <p className="text-[10px] md:text-xs font-semibold text-gray-600">
                        Operaciones
                      </p>
                    </div>

                    {/* 3) Viajes a medida */}
                    <div className="rounded-2xl bg-white/50 backdrop-blur px-3 py-2 md:px-4 md:py-3">
                      <div className="inline-flex items-center justify-center rounded-xl bg-black/5 p-2 mx-auto">
                        <TravelIcon className="w-6 h-6 md:w-7 md:h-7 text-[#047B3E]" />
                      </div>
                      <p className="mt-1 md:mt-2 text-sm md:text-lg font-extrabold text-gray-800">
                        {dict.medida}
                      </p>
                    </div>

                    {/* 4) Opiniones */}
                    <a
                      href="#opiniones"
                      className="rounded-2xl bg-white/50 backdrop-blur px-3 py-2 md:px-4 md:py-3 no-underline hover:shadow-md transition"
                    >
                      <div className="flex justify-center gap-2">
                        <div className="rounded-xl bg-black/5 p-2">
                          <TripAdvisorIcon className="w-6 h-6 md:w-7 md:h-7 text-[#047B3E]" />
                        </div>
                        <div className="rounded-xl bg-black/5 p-2">
                          <GorGoogleIcon className="w-6 h-6 md:w-7 md:h-7 text-[#047B3E]" />
                        </div>
                      </div>
                      <p className="mt-1 text-lg md:text-2xl font-extrabold text-gray-900 leading-none">
                        4.9+
                      </p>
                      <p className="text-[10px] md:text-xs font-semibold text-gray-600">
                        {dict.opiniones}
                      </p>
                    </a>
                  </div>

                  {/* ACCIONES (2 columnas en móvil también) */}
                  <div className="mt-2 md:mt-4 grid grid-cols-2 sm:grid-cols-2 gap-2 md:gap-3">
                    {/* Filantropía */}
                    <a
                      href="#filantropia"
                      className="rounded-2xl bg-white/50 backdrop-blur px-3 py-2 md:px-4 md:py-3 no-underline hover:shadow-md transition flex items-center justify-center gap-2 md:gap-3"
                      rel="noopener noreferrer"
                    >
                      <div className="rounded-xl bg-black/5 p-2">
                        <HelpIcon className="w-6 h-6 md:w-7 md:h-7 text-[#047B3E]" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs md:text-base font-extrabold text-gray-900 leading-none">
                          {dict.ayuda}
                        </p>
                        <p className="text-[10px] md:text-xs font-semibold text-gray-600">
                          Filantropía
                        </p>
                      </div>
                    </a>

                    {/* Reserva */}
                    <a
                      href={`https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-2xl bg-[#047B3E] hover:bg-green-800 transition text-white px-3 py-2 md:px-4 md:py-3 no-underline flex items-center justify-center gap-2 md:gap-3"
                    >
                      <div className="rounded-xl bg-white/10 p-2">
                        <ReserIcon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs md:text-base font-extrabold leading-none">
                          {dict.reserva}
                        </p>
                        <p className="text-[10px] md:text-xs font-semibold text-white/80">
                          WhatsApp
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* TITULO + CTA */}
              {idx === currentIndex && (
                <div className="mt-6 md:mt-8 space-y-3">
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold drop-shadow-lg">
                    {src.nombre}
                  </h2>
                  <Link
                    href={`/${lang}/${src.tipo}/${src.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-white/90 text-gray-900 font-semibold rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all"
                  >
                    <HandRightIcon color="#000" /> {dict.verMas}
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarruselPortada;
