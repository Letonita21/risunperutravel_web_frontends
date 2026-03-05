"use client";
import React from "react";
import { PinIcon } from "../icons";
import { CircleIcon } from "../icons";
import Image from "next/image";
import { ManosIcon } from "../icons";
import Link from "next/link";

const GaleriaHorizontal = ({ dict, body, lang }) => {
  const [stopScroll, setStopScroll] = React.useState(false);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const urlImagenes = process.env.NEXT_PUBLIC_BASE_URL;
  const threshold = 12;

  const cardData = [
    {
      id: 0,
      url: "/filantropia/1.webp",
      nombre: "Paseo Risun Peru Travel",
    },
    {
      id: 1,
      url: "/filantropia/2.webp",
      nombre: "Ayudanos a ayudar",
    },
    {
      id: 2,
      url: "/filantropia/3.webp",
      nombre: "Ayudanos a educar",
    },
    {
      id: 3,
      url: "/filantropia/4.webp",
      nombre: "Niños en el valle",
    },
    {
      id: 4,
      url: "/filantropia/5.webp",
      nombre: "Conociendo nuestra cultura",
    },
    {
      id: 5,
      url: "/filantropia/6.webp",
      nombre: "Paseo con los niños",
    },
    {
      id: 6,
      url: "/filantropia/7.webp",
      nombre: "Compartiendo raices",
    },
    {
      id: 7,
      url: "/filantropia/8.webp",
      nombre: "Conociendo nuestra cultura",
    },
    {
      id: 8,
      url: "/filantropia/9.webp",
      nombre: "Por mas niños felices",
    },
    {
      id: 9,
      url: "/filantropia/10.webp",
      nombre: "Nuestra Cultura",
    },
    {
      id: 10,
      url: "/filantropia/11.webp",
      nombre: "Solidaridad Risun Peru Travel",
    },
    {
      id: 11,
      url: "/filantropia/12.webp",
      nombre: "Somos Risun Peru Travel",
    },
    {
      id: 12,
      url: "/filantropia/13.webp",
      nombre: "Compartiendo Raices",
    },
    {
      id: 13,
      url: "/filantropia/14.webp",
      nombre: "Costumbres",
    },
    {
      id: 14,
      url: "/filantropia/15.webp",
      nombre: "Niños jugando",
    },
  ];

  const handleMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: y * -threshold, y: x * threshold });
  };
  return (
    <>
      <style>{`
                .marquee-inner {
                    animation: marqueeScroll linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
      <section
        id="filantropia"
        className="py-5 px-4 md:px-8 lg:px-16  justify-items-center"
      >
        <h3 className="text-3xl font-bold text-black-600 mb-4 drop-shadow-xs drop-shadow-gray-950">
          {dict.titulo}
        </h3>
        <div className="w-5/6 sm:3/4 m-5 text-md xl:text-lg">
          <div
            className="prose max-w-none text-gray-700 text-lg leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: dict.p1 }}
          />
        </div>

        <div
          className="overflow-hidden w-full relative max-w-10/12 mx-auto"
          onMouseEnter={() => setStopScroll(true)}
          onMouseLeave={() => setStopScroll(false)}
        >
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-linear-to-r from-white to-transparent" />
          {/* carrusel */}
          {/* CUERDA */}
          <div className="absolute top-20 left-0 w-full h-[6px] bg-[#b08968] rounded-full shadow-inner z-0">
            {/* textura */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#00000015_0_2px,transparent_2px_6px)] rounded-full" />
          </div>
          <div
            className="marquee-inner flex w-fit"
            style={{
              animationPlayState: stopScroll ? "paused" : "running",
              animationDuration: cardData.length * 2500 + "ms",
            }}
          >
            <div className="flex">
              {[...cardData, ...cardData].map((card, index) => {
                const rot =
                  index % 4 === 0
                    ? "-rotate-6"
                    : index % 4 === 1
                      ? "rotate-4"
                      : index % 4 === 2
                        ? "-rotate-3"
                        : "rotate-6";

                return (
                  <div
                    key={index}
                    className="w-72 h-96 relative group transition-all duration-300"
                  >
                    <div
                      className={`relative p-5 ${rot} group-hover:rotate-0 group-hover:scale-105 transition-all duration-300`}
                    >
                      {/* GANCHO */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20">
                        <div className="w-10 h-10 bg-[#caa36a] rounded-sm shadow-md border border-black/20 rotate-6 relative">
                          {/* “metal” del gancho */}
                          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black/40" />
                        </div>
                      </div>

                      {/* POLAROID */}
                      <div
                        className="relative bg-white rounded-sm shadow-[0_12px_30px_rgba(0,0,0,0.35)] border border-black/10
                     p-3 pb-12"
                      >
                        {/* FOTO */}
                        <div className="relative w-full h-52 bg-black/10 overflow-hidden border border-black/10">
                          {/* brillo suave */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/25 opacity-60 z-[1]" />

                          <Image
                            src={`${urlImagenes}${card.url}`}
                            alt={card.nombre}
                            fill
                            sizes="(max-width: 768px) 100vw, 320px"
                            className="object-cover grayscale contrast-125 brightness-90 transition-all duration-500
                         group-hover:grayscale-0 group-hover:contrast-105 group-hover:brightness-100 group-hover:saturate-125"
                            priority={index < 4}
                          />
                        </div>

                        {/* TEXTO ABAJO (como polaroid) */}
                        <p className="absolute bottom-3 left-3 right-3 text-center text-sm font-semibold text-gray-700">
                          {card.nombre}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* carrusel */}
          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-linear-to-l from-white to-transparent" />
        </div>
        <Link
          href={`/${lang}/filantropia`}
          className="flex w-fit gap-2 mb-2 px-10 py-2 bg-[#A30923] text-white hover:bg-[#ffbf00] rounded-lg font-semibold text-sm drop-shadow-md drop-shadow-gray-800 transition-colors items-center"
        >
          <ManosIcon className="h-5 w-5" />
          {body.verMas}
        </Link>
      </section>
    </>
  );
};

export default GaleriaHorizontal;
