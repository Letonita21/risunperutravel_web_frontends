"use client";
import { useState, useEffect, useRef } from "react"; // Añadimos hooks para control de estado
import Link from "next/link";
import { ClockIcon, ShoeIcon, MountainIcon } from "@/icons";

const Card = ({
  image,
  price,
  duration,
  title,
  description,
  masDetalles,
  picos,
  zapatos,
  lang,
  slug,
  tipo,
}) => {
  // Estado para manejar el "tap" en móviles
  const [active, setActive] = useState(false);
  const cardRef = useRef(null);

  // Cerrar el card si el usuario toca fuera de él (opcional pero recomendado)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() => setActive(!active)} // Alterna el estado al tocar
      className={`group relative w-[340px] flex flex-col items-center p-4 transition-all duration-500 cursor-pointer ${
        active ? "is-active" : ""
      }`}
    >
      {/* Contenedor Circular con Borde y Sombra Constante */}
      <div className="relative w-full aspect-square rounded-full p-2 border-2 border-[#A30923]/20 group-hover:border-[#A30923] group-[.is-active]:border-[#A30923] shadow-xl group-hover:shadow-[0_0_40px_rgba(163,9,35,0.25)] group-[.is-active]:shadow-[0_0_40px_rgba(163,9,35,0.25)] transition-all duration-700 ease-in-out bg-white">
        <div className="relative w-full h-full rounded-full overflow-hidden bg-[#111] z-10">
          {/* Imagen con Zoom y Blur */}
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-110 group-[.is-active]:scale-110 group-hover:opacity-40 group-[.is-active]:opacity-40 group-hover:blur-[1px] group-[.is-active]:blur-[1px]"
          />

          {/* Overlay Gradiente */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 group-hover:bg-black/40 group-[.is-active]:bg-black/40 transition-colors duration-500" />

          {/* Badge de Precio */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 backdrop-blur-md bg-black/40 border border-white/20 text-white px-5 py-1.5 rounded-full text-[10px] font-bold tracking-widest shadow-2xl transition-transform duration-500 group-hover:scale-105 group-[.is-active]:scale-105">
            {price}
          </div>

          {/* CONTENIDO INTERNO (Visible en Hover y en Tap de Móvil) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 group-[.is-active]:translate-y-0 z-40">
            {/* Iconos */}
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 rounded-full bg-white/10 border border-white/20">
                  <ShoeIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-[8px] text-white/80 uppercase font-bold tracking-tighter">
                  {zapatos}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 rounded-full bg-white/10 border border-white/20">
                  <MountainIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-[8px] text-white/80 uppercase font-bold tracking-tighter">
                  {picos}
                </span>
              </div>
            </div>

            {/* Descripción */}
            <p className="text-gray-100 text-[11px] leading-snug font-medium italic mb-6 line-clamp-3">
              "
              {description ||
                "Una experiencia curada para exploradores de corazón."}
              "
            </p>

            {/* Botón */}
            <Link
              href={`/${lang}/${tipo}/${slug}`}
              onClick={(e) => e.stopPropagation()} // Importante: evita que el click en el botón cierre el card
              className="group/btn bg-[#A30923] text-white px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            >
              {masDetalles}
            </Link>
          </div>
        </div>
      </div>

      {/* Título y Duración (Fuera del círculo) */}
      <div className="text-center mt-6 z-20">
        <div className="flex justify-center items-center gap-2 text-[14px] uppercase tracking-[0.3em] text-[#A30923] font-bold mb-1">
          <ClockIcon className="w-3.5 h-3.5" />
          {duration}
        </div>

        <h3 className="text-xl font-extrabold text-gray-800 uppercase tracking-tight group-hover:text-black group-[.is-active]:text-black transition-colors duration-300">
          {title}
        </h3>

        {/* Línea de detalle dinámica */}
        <div className="relative h-[2px] w-10 bg-gray-200 mx-auto mt-3 overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-[#A30923] -translate-x-full group-hover:translate-x-0 group-[.is-active]:translate-x-0 transition-transform duration-500 ease-out" />
        </div>
      </div>
    </div>
  );
};

export default Card;
