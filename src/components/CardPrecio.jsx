import React from "react";
import Image from "next/image";
import BotonesContactosWhatsApp from "./BotonesContactosWhatsApp";

const CardPrecio = ({ titulo, tours, dict, lang, precio_enganche }) => {
  return (
    <>
      <style>{`
        @keyframes latido {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .latido {
          animation: latido 2s infinite ease-in-out;
        }

        .latido:hover {
          animation: none;
          transform: scale(1.05);
        }
      `}</style>

      <div className="w-full flex justify-center">
        <div className="latido relative inline-block rotate-[-4deg] drop-shadow-md">
          {/* HEADER CON LOGO */}
          <div
            className="
            absolute
            -top-6
            left-1/2
            -translate-x-1/2
            bg-gray-300
            px-4
            py-2
            rounded-md
            shadow-md
          "
          >
            <Image
              src="/risun_logo2.png"
              width={80}
              height={30}
              alt="logo empresa"
              className="object-contain"
            />
          </div>

          {/* CARD */}
          <div className="bg-white border-2 border-[#A30923] shadow-lg p-8 text-center w-[220px] rounded-md">
            <div className="flex flex-col items-center mt-3">
              <p className="text-[#612505] text-sm font-semibold uppercase tracking-wide">
                {dict.flotanteVertical.desde}
              </p>

              <p className="font-extrabold text-5xl text-[#047B3E] leading-none">
                ${precio_enganche}
              </p>

              <p className="text-xs text-gray-400 mt-1">per person</p>
            </div>
          </div>
        </div>
      </div>

      <BotonesContactosWhatsApp
        titulo={titulo}
        tours={tours}
        dict={dict.flotanteVertical}
        formulario={dict.formulario}
        lang={lang}
      />
    </>
  );
};

export default CardPrecio;
