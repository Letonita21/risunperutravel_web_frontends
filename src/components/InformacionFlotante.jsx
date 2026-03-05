"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  DolarIcon,
  GroupIcon,
  LugarIcon,
  ClockIcon,
  MountainIcon,
  ShoeIcon,
} from "@/icons";

const InformacionFlotante = ({
  allPrecios,
  departamento,
  duracion,
  picos,
  dificultad,
  dict,
}) => {
  const [precios, setPrecios] = useState([]);
  const [precio, setPrecio] = useState("--");
  const [altura, setAltura] = useState({});
  const [intensidad, setIntensidad] = useState({});

  useEffect(() => {
    if (allPrecios != null) {
      const aux = JSON.parse(allPrecios);
      setPrecios(aux);
      setPrecio(aux[1].precio);
    }
    calcularAltura(picos);
    calcularDificultad(dificultad);
  }, [allPrecios]);

  const RANGOS_ALTURA_BARRA = {
    1: {
      rango: "0 - 1,500 m",
      nivel: "Baja",
      porcentaje: "20%",
      colorBarra: "bg-green-800",
      textoColor: "text-green-800",
    },
    2: {
      rango: "1,500 - 3,000 m",
      nivel: "Moderada",
      porcentaje: "40%",
      colorBarra: "bg-yellow-800",
      textoColor: "text-yellow-800",
    },
    3: {
      rango: "3,000 - 4,500 m",
      nivel: "Alta",
      porcentaje: "60%",
      colorBarra: "bg-orange-800",
      textoColor: "text-orange-800",
    },
    4: {
      rango: "4,500 - 6,000 m",
      nivel: "Muy Alta",
      porcentaje: "80%",
      colorBarra: "bg-red-800",
      textoColor: "text-red-800",
    },
    5: {
      rango: "> 6,000 m",
      nivel: "Extrema",
      porcentaje: "100%",
      colorBarra: "bg-orange-950",
      textoColor: "text-orange-950",
    },
    default: {
      rango: "Sin especificar",
      nivel: "---",
      porcentaje: "0%",
      colorBarra: "bg-gray-300",
      textoColor: "text-gray-500",
    },
  };

  const RANGOS_DIFICULTAD = {
    1: {
      nivel: dict.muyFacil,
      desc: "Apto para todos",
      porcentaje: "20%",
      colorBarra: "bg-teal-400",
      textoColor: "text-teal-800",
    },
    2: {
      nivel: dict.facil,
      desc: "Caminata suave",
      porcentaje: "40%",
      colorBarra: "bg-green-500",
      textoColor: "text-green-800",
    },
    3: {
      nivel: dict.moderado,
      desc: "Requiere esfuerzo",
      porcentaje: "60%",
      colorBarra: "bg-yellow-500",
      textoColor: "text-yellow-800",
    },
    4: {
      nivel: dict.difcil,
      desc: "Terreno exigente",
      porcentaje: "80%",
      colorBarra: "bg-orange-500",
      textoColor: "text-orange-800",
    },
    5: {
      nivel: dict.extremo,
      desc: "Solo expertos",
      porcentaje: "100%",
      colorBarra: "bg-red-600",
      textoColor: "text-red-800",
    },
    default: {
      nivel: "---",
      desc: "Sin especificar",
      porcentaje: "0%",
      colorBarra: "bg-gray-300",
      textoColor: "text-gray-500",
    },
  };

  const calcularAltura = (rango) => {
    setAltura(RANGOS_ALTURA_BARRA[rango]);
  };

  const calcularDificultad = (rango) => {
    setIntensidad(RANGOS_DIFICULTAD[rango]);
  };
  const tiposPrecio = {
    2: "Privado",
    6: "Compartido",
  };

  return (
    <div className="relative z-20 flex justify-center w-5/6">
      <div
        className="
    -mt-26
    w-full
    rounded-2xl
    bg-white/60
    backdrop-blur-xl
    shadow-xl
    ring-1 ring-black/10
  "
      >
        <div
          className="
      grid
      grid-cols-2
      md:grid-cols-3
      lg:grid-cols-6
      divide-y
      md:divide-y-0
      md:divide-x
      divide-gray-200
    "
        >
          {/* PRECIO */}
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-100">
              <DolarIcon size={28} color="#B04F00" />
            </div>

            <div>
              <p className="text-xs text-[#A30923] font-semibold">
                {dict.precio} (pp)
              </p>

              <p className="text-xl md:text-2xl font-bold text-gray-900">
                ${precio}
              </p>
            </div>
          </div>

          {/* GRUPO */}
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-100">
              <GroupIcon size={28} color="#B04F00" />
            </div>

            <div className="w-full">
              <p className="text-xs text-[#A30923] font-semibold mb-1">
                {dict.grupo}
              </p>

              <select
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="
              w-full
              text-sm
              font-semibold
              rounded-lg
              border
              border-gray-200
              bg-white
              px-3
              py-1.5
              focus:ring-2
              focus:ring-amber-500
              outline-none
            "
              >
                {precios.map((p, i) => (
                  <option key={i} value={p.precio}>
                    {tiposPrecio[p.cantidad] || p.cantidad}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* UBICACION */}
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-100">
              <LugarIcon size={28} color="#B04F00" />
            </div>

            <div>
              <p className="text-xs text-[#A30923] font-semibold">
                {dict.ubicacion}
              </p>

              <p className="text-lg font-bold text-gray-900">{departamento}</p>
            </div>
          </div>

          {/* DURACION */}
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-100">
              <ClockIcon size={28} color="#B04F00" />
            </div>

            <div>
              <p className="text-xs text-[#A30923] font-semibold">
                {dict.duracion}
              </p>

              <p className="text-lg font-bold text-gray-900">
                {duracion} {duracion > "1" ? dict.dias : dict.dia}
              </p>
            </div>
          </div>

          {/* ALTURA */}
          <div className="flex items-start gap-3 px-4 py-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-100">
              <MountainIcon size={28} color="#B04F00" />
            </div>

            <div>
              <p className="text-xs text-[#A30923] font-semibold">
                {dict.altura} ({picos})
              </p>

              <p className={`text-sm font-bold ${altura.textoColor}`}>
                {altura.rango}
              </p>

              <div className="w-24 h-2 mt-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${altura.colorBarra}`}
                  style={{ width: altura.porcentaje }}
                />
              </div>
            </div>
          </div>

          {/* DIFICULTAD */}
          <div className="flex items-start gap-3 px-4 py-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-100">
              <ShoeIcon size={28} color="#B04F00" />
            </div>

            <div>
              <p className="text-xs text-[#A30923] font-semibold">
                {dict.dificultad} ({dificultad})
              </p>

              <p className={`text-sm font-bold ${intensidad.textoColor}`}>
                {intensidad.nivel}
              </p>

              <div className="w-24 h-2 mt-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${intensidad.colorBarra}`}
                  style={{ width: intensidad.porcentaje }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformacionFlotante;
