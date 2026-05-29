import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LugarIcon } from "@/icons";

const CardBlog = ({ dict, item, lang }) => {
  const url = `${process.env.IMAGENES_BLOG}`;

  /*  const fecha = new Date(item.created_at).toLocaleDateString(
    lang === "es" ? "es-ES" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  ); */

  const fecha = new Date(item.created_at)
    .toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
    })
    .replace(" de ", " ");


  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
      {/* IMAGE */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={`${url}/${item.imagen_portada}`}
          alt={item.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw,
             (max-width: 1200px) 50vw,
             33vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Ribbon Fecha estilo banner */}
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-lg text-center">
            {/* Día */}
            <div className="text-lg font-bold">{fecha.split(" ")[0]}</div>

            {/* Mes */}
            <div className="text-xs uppercase tracking-wide">
              {fecha.split(" ")[1]}
            </div>
          </div>
        </div>

        {/* Categoria */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-white text-gray-800 text-xs font-medium px-4 py-1 rounded-full shadow">
            Eventos
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col grow bg-gray-50">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-snug group-hover:text-[#047B3E] transition">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {item.resumen}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between text-sm">
          {/* Ubicación */}
          <div className="flex items-center gap-1 text-gray-500">
            <LugarIcon color="#047B3E" /> <span>Cusco</span>
          </div>

          {/* CTA */}
          <Link
            href={`/${item.lang}/blog/${item.slug}`}
            className="flex items-center gap-1 text-teal-600 font-medium hover:gap-2 transition-all"
          >
            Ver más
            <span className="inline-flex items-center justify-center w-5 h-5 border border-teal-600 rounded">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CardBlog;
