import React from "react";
import Image from "next/image";
import CardPrecio from "@/components/CardPrecio";
import Breadcrumbs from "@/components/Breadcrumbs";
import ModalVideo from "@/components/ModalVideo";
import { redirect } from "next/dist/server/api-utils";
import InformacionFlotante from "@/components/InformacionFlotante";
import TabTourSimple from "@/components/TabTourSimple";
import CarruselTours from "@/components/CarruselTours";
import { getDictionary } from "@/app/dictionaries/getDictionary";
import Divider from "@/components/Divider";
import { notFound } from "next/navigation";
import Diagrama from "@/components/Diagrama";

export const revalidate = 3600;
//Construsccion de medatesdcripciones para SEOO
export async function generateMetadata(props) {
  const params = await props.params;
  const { slug, lang, tipo } = params;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://risunperutravel.com";
  const imgStorage = process.env.NEXT_PUBLIC_URL;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_URL}/dataTour/metadata.php?slug=${slug}`,
      {
        /* cache: 'force-cache', */
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return { title: "Risun Peru Travel" };
    const tour = await res.json();
    if (!tour) {
      return {
        title: "Risun Peru Travel | Agencia de Viajes en Cusco",
      };
    }

    const canonical = `${process.env.BASE_URL}/${lang}/${tipo}/${slug}`;
    const imagenUrl = `${imgStorage}${tour.imagen_portada}`;
    return {
      metadataBase: new URL(baseUrl),
      title: tour.nombre,
      description: tour.frase_seo,
      /* keywords: tour.keywords ? tour.keywords : [], */
      alternates: {
        canonical: canonical,
      },
      openGraph: {
        title: tour.nombre,
        description: tour.frase_seo,
        url: canonical,
        siteName: "Risun Peru Travel",
        locale: lang === "en" ? "en_US" : "es_PE",
        images: {
          url: imagenUrl,
          width: 1200,
          height: 630,
          alt: `Reserva ${tour.nombre} en Risun Peru Travel`,
        },
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: tour.nombre,
        description: tour.frase_seo,
        images: [imagenUrl],
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return { title: "Risun Peru Travel" };
  }
}

const page = async ({ params }) => {
  const { slug, tipo, lang } = await params;
  //traermos los textos de el idioma
  const diccionario = await getDictionary(lang);
  const dict = diccionario.Tour;

  //traemos los datos del tour por slug(url)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_URL}/dataTour/tour.php?slug=${slug}`,
    {
      /* cache: 'force-cache', */
      next: { revalidate: 3600 },
    },
  );
  const tour = await res.json();
  //traermos 10 tours aleatorios en el idioma lang
  const rest = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_URL}/dataTour/cards.php?lang=${lang}`,
    {
      /* cache: 'force-cache', */
      next: { revalidate: 3600 },
    },
  );

  const tours = await rest.json();
  //construccion de la estructura de datos para la pagina
  const urlImagenes = process.env.NEXT_PUBLIC_URL;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://risunperutravel.com";
  const canonical = `${process.env.BASE_URL}/${lang}/${tipo}/${slug}`;
  const precio = parseFloat(tour.precio_enganche).toFixed(2);
  const duracion = `P${parseInt(tour.duracion) || 1}D`;

  const imagenAbsoluta = `${urlImagenes}${tour.imagen_portada}`;
  const faqEntities =
    tour.preguntas?.map((item) => ({
      "@type": "Question",
      name: item.pregunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.respuesta,
      },
    })) || [];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://risunperutravel.com/#agency",
        name: "Risun Peru Travel",
        url: "https://risunperutravel.com",
        image: "https://risunperutravel.com/risun_logo2.png",
        telephone: "+51 955 790 495",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "JR. LIBERTAD 1848 - B",
          addressLocality: "Cusco",
          postalCode: "08001",
          addressCountry: "PE",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "07:00",
          closes: "20:00",
        },
      },
      {
        "@type": ["Product", "TouristTrip"],
        name: tour.nombre,
        description: tour.frase_seo,
        image: {
          "@type": "ImageObject",
          url: imagenAbsoluta,
          width: 1200,
          height: 630,
          caption: tour.nombre,
        },
        touristType: tipo,
        duration: duracion,
        areaServed: {
          "@type": "Country",
          name: "Peru",
        },
        offeredBy: {
          "@id": "https://risunperutravel.com/#agency",
        },

        ...(tour.video != "" && {
          video: {
            "@type": "VideoObject",
            name: tour.nombre,
            description: tour.frase_seo,
            thumbnailUrl: imagenAbsoluta,
            uploadDate: tour.videoUploadDate || new Date().toISOString(),
            embedUrl: tour.video,
          },
        }),

        offers: {
          "@type": "Offer",
          price: precio,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: canonical,
          validFrom: new Date().toISOString().split("T")[0],
          priceValidUntil: "2026-12-31",
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "PE",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: "15",
            returnMethod: "https://schema.org/ReturnByMail",
            returnFees: "https://schema.org/FreeReturn",
          },
        },
      },

      // 3. LAS FAQs (Esto estaba perfecto)
      ...(faqEntities.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faqEntities,
            },
          ]
        : []),
    ],
  };
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "es" ? "Inicio" : "Home",
        item: `https://risunperutravel.com/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tour.tipo,
        item: `https://risunperutravel.com/${lang}/${tipo}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tour.nombre,
        item: `https://risunperutravel.com/${lang}/${tipo}/${slug}`,
      },
    ],
  };

  const lista = [lang, tour.tipo, tour.nombre];
  
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
      <header className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh] overflow-hidden group">
        <Image
          src={`${urlImagenes}${tour.imagen_portada}`}
          alt={tour.nombre}
          priority
          fill
          unoptimized
          sizes="(max-width: 768px) 100vh, 100vw"
          className="object-cover md:transition-transform md:duration-10000 md:group-hover:scale-105"
        />

        {/* overlays */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* TEXTO */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1
              className="
        text-3xl sm:text-4xl md:text-5xl lg:text-6xl
        font-extrabold text-white
        leading-tight
        drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]
        text-balance
        translate-y-2
      "
            >
              {tour.nombre || "Tour..."}
            </h1>
          </div>
        </div>
      </header>

      <InformacionFlotante
        allPrecios={tour.precio}
        departamento={tour.departamento}
        duracion={tour.duracion}
        picos={tour.picos}
        dificultad={tour.dificultad}
        dict={dict.flotanteHorizontal}
      />
      <main className="w-full mt-[3vh]">
        <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 min-h-screen">
          <article className="md:col-span-2 flex flex-col justify-center">
            <Breadcrumbs data={lista} />
            <div className="md:col-span-1 mt-5 md:hidden flex-col">
              <CardPrecio
                titulo={tour.nombre}
                tours={tours}
                dict={dict}
                lang={lang}
                precio_enganche={tour.precio_enganche}
              />
            </div>
            <section>
              <h2 className="text-sky-700 text-2xl font-bold">
                {dict.cuerpo.descripcion}:
              </h2>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: tour.descripcion }}
              />
            </section>
            <TabTourSimple
              itinerario={tour.itinerario}
              incluye={tour.incluye}
              no_incluye={tour.no_incluye}
              recomendaciones={tour.recomendaciones}
              mapa={tour.mapa}
              galeria={tour.galeria}
              dict={dict.cuerpo}
              url={urlImagenes}
              preguntas={tour.preguntas}
            />
            <Divider />
            <Diagrama
              lang={lang}
              titulo={dict.cuerpo.responsable}
              tour={tour.nombre}
              contenido={dict.cuerpo.responsableContenido}
            />
          </article>
          <aside className="md:col-span-1 hidden md:block">
            <div className="sticky top-27 z-30 flex flex-col">
              <CardPrecio
                titulo={tour.nombre}
                tours={tours}
                dict={dict}
                lang={lang}
                precio_enganche={tour.precio_enganche}
              />
            </div>
          </aside>
          <ModalVideo
            video={tour.video}
            titulo={tour.nombre}
            dict={dict.flotanteVertical}
            lang={lang}
            documento={tour.doc_itinerario}
          />
        </div>
      </main>
      <Divider />
      <CarruselTours tours={tours} dict={dict.flotanteVertical} />
    </>
  );
};

export default page;
