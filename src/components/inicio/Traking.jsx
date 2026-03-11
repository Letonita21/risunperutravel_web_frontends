import { Fragment } from "react";
import React from "react";
import { Transition } from "@headlessui/react";
import Card from "../Card";
import { getCaminatas } from "@/lib/infoPortada";

const Traking = async ({ dict, lang }) => {
  const ids = [
    dict.caminatas.caminoInca2d.id,
    dict.caminatas.caminoInca4d.id,
    dict.caminatas.palcoyo.id,
    dict.caminatas.wacrapucara.id,
    dict.caminatas.vallesagrado.id,
    dict.caminatas.humantay.id,
  ];

  //const caminatas = await getCaminatas(ids);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_URL}/portada/caminatas.php?ids=${ids.join(",")}`,
  );
  const caminatas = await res.json();
  const dataInit = [
    {
      title: "",
      description: dict.caminatas.caminoInca2d.descripcion,
      price: "",
      image: "/caminatas/inca-trail.webp",
      picos: 0,
      zapatos: 0,
      id: dict.caminatas.caminoInca2d.id,
      slug: "",
      tipo: "",
    },
    {
      title: "",
      description: dict.caminatas.caminoInca4d.descripcion,
      price: "",
      image: "/caminatas/camino-inca-4d-3n.webp",
      picos: 0,
      zapatos: 0,
      id: dict.caminatas.caminoInca4d.id,
      slug: "",
      tipo: "",
    },
    {
      title: "",
      description: dict.caminatas.palcoyo.descripcion,
      price: "",
      image: "/caminatas/Montana-Palcoyo-Cusco.webp",
      picos: 0,
      zapatos: 0,
      id: dict.caminatas.palcoyo.id,
      slug: "",
      tipo: "",
    },
    {
      title: "",
      description: dict.caminatas.wacrapucara.descripcion,
      price: "",
      image: "/caminatas/waqrapukara.webp",
      picos: 0,
      zapatos: 0,
      id: dict.caminatas.wacrapucara.id,
      slug: "",
      tipo: "",
    },
    {
      title: "",
      description: dict.caminatas.vallesagrado.descripcion,
      price: "",
      image: "/caminatas/valle-sagrado-cusco.webp",
      picos: 0,
      zapatos: 0,
      id: dict.caminatas.vallesagrado.id,
      slug: "",
      tipo: "",
    },
    {
      title: "",
      description: dict.caminatas.humantay.descripcion,
      price: "",
      image: "/caminatas/laguna-humantay.webp",
      picos: 0,
      zapatos: 0,
      id: dict.caminatas.humantay.id,
      slug: "",
      tipo: "",
    },
  ];

  const cards = dataInit.map((data) => {
    const match = caminatas.find((item) => item.id === data.id);
    return match
      ? {
          ...data,
          title: match.title || match.nombre || "",
          price: match.precio_enganche || match.precio || "",
          picos: match.picos || 0,
          zapatos: match.dificultad || 0,
          slug: match.slug || "",
          tipo: match.tipo || "",
        }
      : data;
  });

  return (
    <section className="py-5 px-4 md:px-8 lg:px-16  justify-items-center bg-white-900">
      <h2 className="text-3xl font-bold text-green-600 mb-4 drop-shadow-xs drop-shadow-gray-950">
        {dict.nombreCaminatas}
      </h2>

      <div className="w-44 h-1 bg-[#a30923] mt-3 mb-8 rounded-full" />
      <div className="w-5/6 sm:3/4 m-5 text-md xl:text-lg">
        <div
          className="prose max-w-none text-black text-lg leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: dict.descripcionCaminatas }}
        />
      </div>
      <div
        className="
    max-w-7xl mx-auto
    grid grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    gap-10 lg:gap-15
    justify-items-center
  "
      >
        {/* seccion cards */}
        {cards.map((card, index) => (
          <Transition
            as="div"
            show={true}
            enter="transition-opacity duration-700"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            key={index}
          >
            <div key={index}>
              <Card
                image={card.image}
                price={`${dict.desde}: $${card.price}`}
                duration={`${dict.duracion}: ${dict.dia1}`}
                title={card.title}
                picos={card.picos}
                zapatos={card.zapatos}
                description={card.description}
                masDetalles={dict.masDetalles}
                id={card.id}
                lang={lang}
                slug={card.slug}
                tipo={card.tipo}
                color="green"
              />
            </div>
          </Transition>
        ))}
      </div>
    </section>
  );
};
export default Traking;
