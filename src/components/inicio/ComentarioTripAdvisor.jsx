"use client";
import { StarIcon, ComentarioIcon } from "@/icons";
import Image from "next/image";
import { useState } from "react";
/* 
const testimonials = [
  {
    name: "albert t",
    date: "ago. de 2025",
    titulo: "La mejor experiencia",
    text: "Excelente atención desde el primer momento. El equipo de TERRESDESINCAS se encargó de cada detalle y mi viaje fue perfecto. Muy recomendados por su profesionalismo, amabilidad y capacidad de resolver cualquier duda. ¡Sin duda volveré a viajar con ustedes!",
    calificacion: 5,
  },
  {
    name: "remmeryf",
    date: "jul. de 2019 • Solitario",
    titulo: "Une découverte du Pérou au top avec Jimmy",
    text: `J’ai passé 15 jours en la compagnie de Jimmy et de 9 autres voyageurs sur sur parcours mêlant trekking et visites des sites incontournables de ce magnifique pays.
Jimmy a été un excellant guide dans toutes les situations : à l'écoute des envies / capacités / limites du groupe sur la rando, Intarissable d’explications et de détails sur les sites visités et un parfait animateur / fédérateur du groupe.
Mieux qu’un guide, un parfait compagnon d’aventure... Merci encore Jimmy!!!
Fabien`,
    calificacion: 5,
  },
  {
    name: "Zouf B",
    date: "jul. de 2019 • Solitario",
    titulo: "Excellent !!",
    text: `Un voyage plein de surprises, un guide captivant avec lequel nous avons parcouru l'histoire (Et les chemins) Incas. Il connaît les bonnes adresses, les sentiers détournés à l'écart des touristes et les subtilités de ce beau pays. A faire !! :-)`,
    calificacion: 5,
  },
  {
    name: "Companion287461",
    date: "jul. de 2019 • Solitario",
    titulo: "Voyage de Rêve au Pérou",
    text: `Nous avons eu l’occasion de faire un voyage de rêve au Pérou grâce l’agence Terre des Incas. Il s’agissait d’un circuit d’aventure avec différents aspects :
- sportif avec des marches en altitude,
-ethnologique avec immersion dans la culture péruvienne,
-historique avec la découverte de la civilisation Inca.
Notre Guide Jimmy était exceptionnel, passionné de civilisation Inca avec un niveau étendu de connaissances, possédant une excellente maîtrise de la langue française et une très bonne approche des problèmes liés à l’altitude et à la préparation et adaptation des participants, toujours attentif aux besoins, problèmes et limites de chacun.`,
    calificacion: 5,
  },
  {
    name: "jlbaric",
    date: "jul. de 2019 • Solitario",
    titulo: "Voyage de Rêve au Pérou",
    text: `Nous avons eu l’occasion de faire un voyage de rêve au Pérou grâce l’agence Terre des Incas. Il s’agissait d’un circuit d’aventure avec différents aspects :
- sportif avec des marches en altitude,
-ethnologique avec immersion dans la culture péruvienne,
-historique avec la découverte de la civilisation Inca.
Notre Guide Jimmy était exceptionnel, passionné de civilisation Inca avec un niveau étendu de connaissances, possédant une excellente maîtrise de la langue française et une très bonne approche des problèmes liés à l’altitude et à la préparation et adaptation des participants, toujours attentif aux besoins, problèmes et limites de chacun.`,
    calificacion: 5,
  },
  {
    name: "Marianne S",
    date: "may. de 2019 • Amigos",
    titulo: "Mon voyage au Pérou est inoubliable",
    text: `Ce voyage s'est très bien passé car notre guide Jimmy a su parfaitement bien préparer tout le monde à l'altitude. Tout était bien géré et nous avons fait de belles rencontres.
Grâce à ses compétences , sa maitrise parfaite du français et son enthousiasme, nous avons découvert cette époustouflante civilisation inca.`,
    calificacion: 5,
  },
  {
    name: "Yves",
    date: "ago. de 2018 • Familia",
    titulo: "Mon voyage au Pérou est inoubliable",
    text: `J’ai eu l’occasion d’effectuer un trek avec mon fils de 18 ans dans la région du Lares au Pérou. C’était tout simplement magnifique. Notre guide, Jimmy, était génial. Serviable, attentif et compétent, il a su nous transmettre sa passion pour son pays et ses habitants. Merci !
Ps : voyage effectué en avril 2017 et non en août 2018`,
    calificacion: 5,
  },
  {
    name: "aude o",
    date: "ago. de 2018 • Familia",
    titulo: "Mon voyage au Pérou est inoubliable",
    text: `Une équipe dynamique et professionnelle. L'organisation est sans faille. Ajoutez un accompagnateur qui parle couramment français : tout y est pour passer de merveilleux moments
Nous avons fait du raft et une sortie à cheval en toute confiance.
A recommander`,
    calificacion: 5,
  },
]; */

const ComentarioTripAdvisor = ({ dict, comentarios }) => {
  const [stopScroll, setStopScroll] = useState(false);

  return (
    <>
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
        }

        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <section
        id="opiniones"
        className="bg-gradient-to-b from-white to-gray-50 pt-10 pb-14 px-4 md:px-8 lg:px-16"
      >
        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#a30923] mb-2">OPINIONES</h2>
          <h3 className="text-3xl font-semibold text-gray-900">
            {dict.tripAdvisorComentarios}
          </h3>

          <div className="w-24 h-1 bg-[#a30923] mx-auto mt-4 rounded-full" />

          <Image
            src="/trip-advisor-log.png"
            width={220}
            height={60}
            alt="Trip Advisor logo"
            className="mx-auto mt-6 opacity-90"
          />

          <a
            href="https://www.tripadvisor.com.pe/Attraction_Review-g294314-d32896514-Reviews-Risun_Peru_Travel-Cusco_Cusco_Region.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-6 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-full font-medium text-sm shadow-md transition"
          >
            <ComentarioIcon /> {dict.verMas}
          </a>
        </div>

        {/* CARRUSEL */}
        <div
          className="overflow-hidden relative max-w-6xl mx-auto"
          onMouseEnter={() => setStopScroll(true)}
          onMouseLeave={() => setStopScroll(false)}
        >
          {/* Fade lados */}
          <div className="absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          <div
            className="marquee-inner flex w-fit"
            style={{
              animationPlayState: stopScroll ? "paused" : "running",
              animationDuration: comentarios.length * 7000 + "ms",
            }}
          >
            <div className="flex gap-8 py-6">
              {[...comentarios, ...comentarios].map((item, index) => (
                <div key={index} className="shrink-0">
                  {/* CARD PRO */}
                  <div
                    className="
                      relative
                      w-80 md:w-96
                      backdrop-blur-sm
                      bg-white/80
                      rounded-3xl
                      px-6 pt-6 pb-10
                      border border-white/40
                      shadow-[0_8px_25px_rgba(0,0,0,0.08)]
                      hover:shadow-[0_12px_35px_rgba(16,185,129,0.2)]
                      hover:-translate-y-1
                      transition-all duration-500
                    "
                  >
                    {/* Comillas suaves */}
                    <div className="absolute -top-3 left-5 text-5xl text-gray-200">
                      “
                    </div>

                    {/* HEADER */}
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src="/tripadvisor.svg"
                        alt="Tripadvisor"
                        className="w-10 h-10 rounded-full bg-emerald-100 p-1"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {item.nombre}
                        </h3>
                        <p className="text-xs text-gray-500">{item.titulo}</p>
                        <p className="text-xs text-gray-400">{item.fecha}</p>
                      </div>
                    </div>

                    {/* RATING */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(item.puntaje)].map((_, i) => (
                        <span
                          key={i}
                          className="w-3.5 h-3.5 rounded-full bg-emerald-500"
                        />
                      ))}
                    </div>

                    {/* TEXTO */}
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                      {item.comentario}
                    </p>

                    {/* TRIÁNGULO LIMPIO */}
                    <div
                      className="
                        absolute -bottom-4 left-10
                        w-0 h-0
                        border-l-[14px] border-l-transparent
                        border-r-[14px] border-r-transparent
                        border-t-[16px] border-t-white
                      "
                    />

                    {/* ICONO FLOTANTE */}
                    <div className="absolute -right-3 -bottom-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
                        <img
                          src="/tripadvisor.svg"
                          alt="Tripadvisor"
                          className="w-5 h-5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ComentarioTripAdvisor;
