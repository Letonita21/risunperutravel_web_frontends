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
  StarIcon,
} from "@/icons";
import { numeroWhatsapp } from "../contactos/numero";
import { HandRightIcon } from "@/icons";

const message = "Hi!, Risun Peru Travel...";
const rating = 4.5;

const CarruselPortada = ({ portadaHome, dict, lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % portadaHome.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [portadaHome.length]);

  console.log("aqui", portadaHome);

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
              {/* LOGO */}
              <div className="mb-6 md:mb-8">
                <Image
                  src="/risun_logo2.png"
                  width={800} // Reducido de 600
                  height={100}
                  sizes="(max-width:640px) 180px, (max-width:1024px) 200px, 320px"
                  className="w-[140px] sm:w-[200px] lg:w-[320px] h-auto
           drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]
           transition-all duration-300
           hover:scale-105
           hover:drop-shadow-[0_12px_30px_rgba(0,0,0,0.8)]"
                  priority
                  alt="Risun Peru Travel"
                />
              </div>
              {/* PANEL DE INFORMACIÓN (Más compacto) */}
              <div className="w-full max-w-[340px] sm:max-w-xl md:max-w-4xl">
                <div className="rounded-2xl bg-white/10 md:bg-transparent backdrop-blur-sm md:backdrop-blur-0 p-2 md:p-0 shadow-2xl md:shadow-none ring-1 ring-white/20 md:ring-0">
                  {/* GRID DE STATS (4 columnas en desktop, 2 en móvil) */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
                    {/* 1) Operador */}
                    <div className="rounded-xl bg-white/80 md:bg-white/50 backdrop-blur p-2 md:p-3 flex flex-col items-center justify-center">
                      <GroupIcon className="w-5 h-5 md:w-6 md:h-6 text-[#047B3E]" />
                      <p className="mt-1 text-[11px] md:text-sm font-bold text-gray-800 uppercase tracking-tight">
                        {dict.operador}
                      </p>
                    </div>

                    {/* 2) Operaciones */}
                    <div className="rounded-xl bg-white/80 md:bg-white/50 backdrop-blur p-2 md:p-3 flex flex-col items-center justify-center">
                      <div className="flex gap-0.5 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className="w-3 h-3 md:w-4 md:h-4 text-[#ffbf00] fill-[#ffbf00]"
                          />
                        ))}
                      </div>
                      <p className="text-sm md:text-xl font-black text-gray-900 leading-none">
                        +1000
                      </p>
                      <p className="text-[9px] md:text-[10px] font-bold text-gray-600 uppercase">
                        Operaciones
                      </p>
                    </div>

                    {/* 3) Viajes a medida */}
                    <div className="rounded-xl bg-white/80 md:bg-white/50 backdrop-blur p-2 md:p-3 flex flex-col items-center justify-center">
                      <TravelIcon className="w-5 h-5 md:w-6 md:h-6 text-[#047B3E]" />
                      <p className="mt-1 text-[11px] md:text-sm font-bold text-gray-800 uppercase tracking-tight">
                        {dict.medida}
                      </p>
                    </div>

                    {/* 4) Opiniones */}
                    <a
                      href="#opiniones"
                      className="rounded-xl bg-white/80 md:bg-white/50 backdrop-blur p-2 md:p-3 no-underline hover:bg-white transition flex flex-col items-center justify-center"
                    >
                      <div className="flex gap-2 mb-1">
                        <TripAdvisorIcon className="w-4 h-4 md:w-5 md:h-5 text-[#047B3E]" />
                        <GorGoogleIcon className="w-4 h-4 md:w-5 md:h-5 text-[#047B3E]" />
                      </div>
                      <p className="text-sm md:text-xl font-black text-gray-900 leading-none">
                        4.9+
                      </p>
                      <p className="text-[9px] md:text-[10px] font-bold text-gray-600 uppercase">
                        {dict.opiniones}
                      </p>
                    </a>
                  </div>

                  {/* BOTONES DE ACCIÓN (Más estilizados) */}
                  <div className="mt-2 md:mt-4 grid grid-cols-2 gap-2 md:gap-4">
                    <a
                      href="#filantropia"
                      className="rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-2.5 md:py-3 transition flex items-center justify-center gap-2 border border-white/30"
                    >
                      <HelpIcon className="w-5 h-5 text-white" />
                      <div className="text-left leading-tight">
                        <p className="text-[11px] md:text-sm font-bold text-white uppercase">
                          Filantropía
                        </p>
                      </div>
                    </a>

                    <a
                      href={`https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-[#047B3E] hover:bg-[#036332] transition px-3 py-2.5 md:py-3 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <ReserIcon className="w-5 h-5 text-white" />
                      <div className="text-left leading-tight">
                        <p className="text-[11px] md:text-sm font-bold text-white uppercase">
                          {dict.reserva}
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
