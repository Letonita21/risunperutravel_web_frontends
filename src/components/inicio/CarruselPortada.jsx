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
            <div className="absolute inset-0 bg-black/30" />

            {/* CONTENIDO */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8 text-white min-h-[100svh]">
              {/* LOGO */}
              <Image
                src="/risun_logo2.png"
                width={500}
                height={80}
                sizes="(max-width:640px) 220px, (max-width:1024px) 320px, 500px"
                className="drop-shadow-lg w-[220px] sm:w-[320px] lg:w-[500px] h-auto"
                priority
                alt="Risun Peru Travel"
              />

              {/* PANEL INFO */}
              <div className="mt-6 w-full max-w-5xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* CARD */}
                  <div className="rounded-2xl bg-white/80 backdrop-blur px-4 py-3">
                    <div className="inline-flex items-center justify-center rounded-xl bg-black/5 p-2 mx-auto">
                      <GroupIcon className="w-7 h-7 text-[#047B3E]" />
                    </div>
                    <p className="mt-2 text-lg font-extrabold text-gray-800">
                      {dict.operador}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/80 backdrop-blur px-4 py-3">
                    <div className="inline-flex items-center justify-center rounded-xl bg-black/5 p-2 mx-auto">
                      <div className="flex items-center justify-center gap-0.5 ">
                        {[...Array(5)].map((_, i) => (
                          <StarInternoIcon
                            key={i}
                            className="w-7 h-7 text-[#047B3E]"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-1 text-2xl font-extrabold text-gray-900">
                      +1000
                    </p>
                    <p className="text-xs font-semibold text-gray-600">
                      Operaciones
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/80 backdrop-blur px-4 py-3">
                    <div className="inline-flex items-center justify-center rounded-xl bg-black/5 p-2 mx-auto">
                      <TravelIcon className="w-7 h-7 text-[#047B3E]" />
                    </div>
                    <p className="mt-2 text-lg font-extrabold text-gray-800">
                      {dict.medida}
                    </p>
                  </div>

                  <a
                    href="#opiniones"
                    className="rounded-2xl bg-white/80 backdrop-blur px-4 py-3"
                  >
                    <div className="flex justify-center gap-2">
                      <div className="rounded-xl bg-black/5 p-2">
                        <TripAdvisorIcon className="w-7 h-7 text-[#047B3E]" />
                      </div>
                      <div className="rounded-xl bg-black/5 p-2">
                        <GorGoogleIcon className="w-7 h-7 text-[#047B3E]" />
                      </div>
                    </div>
                    <p className="mt-1 text-2xl font-extrabold text-gray-900">
                      4.9+
                    </p>
                    <p className="text-xs font-semibold text-gray-600">
                      {dict.opiniones}
                    </p>
                  </a>
                </div>

                {/* ACCIONES */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="#filantropia"
                    className="rounded-2xl bg-white/80 backdrop-blur px-4 py-3 flex items-center justify-center gap-3"
                  >
                    <div className="rounded-xl bg-black/5 p-2">
                      <HelpIcon className="w-7 h-7 text-[#047B3E]" />
                    </div>
                    <span className="font-bold text-gray-900">
                      {dict.ayuda}
                    </span>
                  </a>

                  <a
                    href={`https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(
                      message,
                    )}`}
                    target="_blank"
                    className="rounded-2xl bg-[#047B3E] px-4 py-3 flex items-center justify-center gap-3 text-white font-bold"
                  >
                    <div className="rounded-xl bg-white/10 p-2">
                      <ReserIcon className="w-7 h-7 text-white" />
                    </div>
                    {dict.reserva}
                  </a>
                </div>
              </div>

              {/* TITULO + CTA */}
              {idx === currentIndex && (
                <div className="mt-8 space-y-3">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold drop-shadow-lg">
                    {src.nombre}
                  </h2>
                  <Link
                    href={`/${lang}/${src.tipo}/${src.slug}`}
                    className="flex gap-2 px-6 py-2 mt-3 bg-white/90 text-gray-900 font-semibold rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all"
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
