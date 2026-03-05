"use client";
import React, { useState } from "react";
import {
  MapaIcon,
  PhotoIcon,
  ClipIcon,
  CheckIcon,
  FocoIcon,
  PreguntasIcon,
  XCheckIcon,
} from "@/icons";
import { Galeria } from "./Galeria";
import { ExpandirIcon, OcultarIcon } from "@/icons";

const TabTourSimple = ({
  itinerario,
  incluye,
  recomendaciones,
  no_incluye,
  galeria,
  mapa,
  dict,
  url,
  preguntas,
}) => {
  const [itinerarioExpandido, setItinerarioExpandido] = useState(false);
  const [recomendacionesExpandido, setRecomendacionesExpandido] =
    useState(false);
  const [incluyeExpandido, setIncluyeExpandido] = useState(false);
  const [noIncluyeExpandido, setNoIncluyeExpandido] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const tabs = [
    {
      id: "itinerario",
      label: dict.itinerario,
      icon: <ClipIcon color="#ffbf00" />,
      estado: itinerario != null ? true : false,
    },
    {
      id: "incluye",
      label: dict.incluye,
      icon: <CheckIcon color="#ffbf00" />,
      estado: incluye != null ? true : false,
    },
    {
      id: "recomendaciones",
      label: dict.recomendaciones,
      icon: <FocoIcon color="#ffbf00" />,
      estado: recomendaciones != null ? true : false,
    },
    {
      id: "galeria",
      label: dict.galeria,
      icon: <PhotoIcon color="#ffbf00" />,
      estado: galeria.length > 0 ? true : false,
    },
    {
      id: "mapa",
      label: dict.mapa,
      icon: <MapaIcon color="#ffbf00" />,
      estado: mapa != "" ? true : false,
    },
    {
      id: "pregunta",
      label: dict.pregunta,
      icon: <PreguntasIcon color="#ffbf00" />,
      estado: preguntas.length > 0 ? true : false,
    },
  ];

  return (
    <div className="mt-5">
      {/* menu flotante de itinerario */}
      <div className="sticky top-22 z-30 mb-6 backdrop-blur-md">
        <div className="mx-auto max-w-6xl rounded-2xl border-2 border-[#A30923] bg-white/90 shadow-lg shadow-gray-300">
          <nav className="flex flex-wrap justify-center gap-3 px-4 py-3">
            {tabs.map(({ id, label, icon: Icon, estado }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`
            ${!estado ? "hidden" : ""}
            flex items-center gap-2
            rounded-xl
            border-2 border-[#A30923]
            bg-white
            px-4 py-2
            text-sm md:text-base
            font-semibold
            text-[#A30923]
            shadow-sm
            transition-all duration-300
            hover:bg-[#A30923]/20
            hover:text-[#A30923]
            hover:shadow-md
          `}
              >
                <span className="text-lg text-[#ffbf00]">{Icon}</span>

                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <section id="itinerario" className="scroll-mt-24 mb-4">
        <h2 className="text-2xl font-semibold text-[#A30923] flex items-center gap-0.5">
          <ClipIcon color="#ffbf00" /> {dict.itinerario}
        </h2>
        <div
          className={`relative overflow-hidden transition-all duration-500 ${
            itinerarioExpandido ? "max-h-full" : "max-h-100"
          }`}
        >
          <div
            className="prose max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: itinerario }}
          />

          {!itinerarioExpandido && (
            <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-white to-transparent pointer-events-none"></div>
          )}
        </div>
        <button
          onClick={() => setItinerarioExpandido(!itinerarioExpandido)}
          aria-label="boton ampliar"
          className="mt-2 border-2 text-green-800 font-bold text-sm hover:underline w-full rounded-2xl justify-items-center items-center "
        >
          {itinerarioExpandido ? (
            <div className="flex items-center gap-2 text-lg">
              <OcultarIcon className={"w-10 h-10"} /> {dict.verMenos}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-lg">
              <ExpandirIcon className={"w-10 h-10"} /> {dict.verMas}
            </div>
          )}
        </button>
      </section>

      <section id="incluye" className="scroll-mt-24 mb-4">
        <h2 className="text-2xl font-semibold text-[#A30923] flex items-center gap-0.5">
          <CheckIcon color="#ffbf00" /> {dict.incluye}
        </h2>
        <div
          className={`relative overflow-hidden transition-all duration-500 ${
            incluyeExpandido ? "max-h-full" : "max-h-100"
          }`}
        >
          <div
            className="prose max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: incluye }}
          />

          {!incluyeExpandido && (
            <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-white to-transparent pointer-events-none"></div>
          )}
        </div>
        <button
          onClick={() => setIncluyeExpandido(!incluyeExpandido)}
          aria-label="boton ampliar"
          className="mt-2 border-2 text-green-800 font-bold text-sm hover:underline w-full rounded-2xl justify-items-center items-center "
        >
          {incluyeExpandido ? (
            <div className="flex items-center gap-2 text-lg">
              <OcultarIcon className={"w-10 h-10"} /> {dict.verMenos}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-lg">
              <ExpandirIcon className={"w-10 h-10"} /> {dict.verMas}
            </div>
          )}
        </button>

        <h2 className="text-2xl font-semibold text-[#A30923] flex items-center gap-0.5">
          <XCheckIcon color="#ffbf00" size={25} /> {dict.noIncluye}
        </h2>
        <div
          className={`relative overflow-hidden transition-all duration-500 ${
            noIncluyeExpandido ? "max-h-full" : "max-h-100"
          }`}
        >
          <div
            className="prose max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: no_incluye }}
          />

          {!noIncluyeExpandido && (
            <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-white to-transparent pointer-events-none"></div>
          )}
        </div>
        <button
          onClick={() => setNoIncluyeExpandido(!noIncluyeExpandido)}
          aria-label="boton ampliar"
          className="mt-2 border-2 text-green-800 font-bold text-sm hover:underline w-full rounded-2xl justify-items-center items-center "
        >
          {noIncluyeExpandido ? (
            <div className="flex items-center gap-2 text-lg">
              <OcultarIcon className={"w-10 h-10"} /> {dict.verMenos}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-lg">
              <ExpandirIcon className={"w-10 h-10"} /> {dict.verMas}
            </div>
          )}
        </button>
      </section>

      {/* menu flotante de recomendaciones */}
      <section id="recomendaciones" className="scroll-mt-24 mb-4">
        <h2 className="text-2xl font-semibold text-[#A30923] flex items-center gap-0.5">
          <FocoIcon color="#ffbf00" /> {dict.recomendaciones}
        </h2>
        <div
          className={`relative overflow-hidden transition-all duration-500 ${
            recomendacionesExpandido ? "max-h-full" : "max-h-100"
          }`}
        >
          <div
            className="prose max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: recomendaciones }}
          />

          {!recomendacionesExpandido && (
            <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-white to-transparent pointer-events-none"></div>
          )}
        </div>
        <button
          onClick={() => setRecomendacionesExpandido(!recomendacionesExpandido)}
          aria-label="boton ampliar"
          className="mt-2 border-2 text-green-800 font-bold text-sm hover:underline w-full rounded-2xl justify-items-center items-center "
        >
          {recomendacionesExpandido ? (
            <div className="flex items-center gap-2 text-lg">
              <OcultarIcon className={"w-10 h-10"} /> {dict.verMenos}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-lg">
              <ExpandirIcon className={"w-10 h-10"} /> {dict.verMas}
            </div>
          )}
        </button>
      </section>
      {/* menu flotante de galeria */}
      {galeria.length > 0 ? (
        <section id="galeria" className="scroll-mt-24 mb-4">
          <h3 className="text-2xl font-semibold text-[#A30923] flex items-center gap-0.5">
            <PhotoIcon color="#ffbf00" /> {dict.galeria}
          </h3>
          <Galeria galeria={galeria} url={url} />
        </section>
      ) : (
        <></>
      )}
      {mapa != "" ? (
        <section id="mapa" className="scroll-mt-24 mb-4">
          <h2 className="text-2xl font-semibold text-[#A30923] flex items-center gap-0.5">
            <MapaIcon color="#ffbf00" /> {dict.mapa}
          </h2>
        </section>
      ) : (
        <></>
      )}
      {preguntas.length > 0 ? (
        <section id="pregunta" className="scroll-mt-24 mb-10">
          <div className="w-full max-w-4xl mx-auto rounded-3xl border border-[#A30923]/20 bg-gradient-to-br from-white via-white to-red-50 shadow-xl p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#A30923] flex items-center gap-3 mb-6">
              <span className="bg-[#A30923] p-2 rounded-xl shadow">
                <PreguntasIcon color="#ffbf00" />
              </span>
              {dict.pregunta}
            </h2>

            <div className="flex flex-col gap-4">
              {preguntas.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden transition hover:shadow-md"
                >
                  {/* pregunta */}
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-4 md:p-5 text-left"
                  >
                    <h3 className="text-sm md:text-base font-semibold text-gray-800 pr-4">
                      {faq.pregunta}
                    </h3>

                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full bg-[#A30923]/10 transition ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                          stroke="#A30923"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* respuesta */}
                  <div
                    className={`transition-all duration-500 ease-in-out px-5 ${
                      openIndex === index
                        ? "max-h-[400px] opacity-100 pb-5"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed">
                      {faq.respuesta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TabTourSimple;
