import React from "react";
import Image from "next/image";
import Link from "next/link";
import GaleriaBlog from "@/components/blog/GaleriaBlog";
import CardsTours from "@/components/CardsTours";
import { getDictionary } from "@/app/dictionaries/getDictionary";
import FlyerBlog from "@/components/blog/FlyerBlog";
/* import Comentarios from "@/components/Comentarios"; */
import { numeroWhatsapp } from "@/components/contactos/numero";

export async function generateMetadata({ params }) {
  const { slug, lang } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_URL}/blog/blog.php?slug=${slug}`,
    { cache: "no-store" },
  );
  const article = await res.json();
  const dominio = process.env.IMAGENES_BLOG;
  console.log("aca es el dominio ", dominio);

  return {
    title: article.title,
    description: article.resumen,
    alternates: {
      canonical: `${dominio}/${lang}/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.resumen,
      images: [`${dominio}/${article.galeria[0].url}`],
      type: "article",
    },
  };
}

export const revalidate = 300;
const page = async ({ params }) => {
  const { slug, lang } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_URL}/blog/blog.php?slug=${slug}`,
    { cache: "no-store" },
  );
  const post = await res.json();
  const rest = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_URL}/dataTour/cards.php?lang=${lang}`,
  );
  const tours = await rest.json();
  const url = `${process.env.IMAGENES_BLOG}/`;
  const dominio = process.env.BASE_URL;
  const diccionario = await getDictionary(lang);
  const dict = diccionario.blog;
  /* const resComentarios = await fetch(`${process.env.ADMIN_URL}/comentarios`);
    const comentarios = await resComentarios.json(); */

  const formatearFecha = (fechaString) => {
    const fechaValida = fechaString.replace(" ", "T");
    return new Date(fechaValida).toISOString();
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.resumen,
    url: `${dominio}/${lang}/blog/${post.slug}`,
    image: `${url}${post.galeria[0].url}`,
    author: {
      "@type": "Organization",
      name: "Terres des Incas",
    },
    publisher: {
      "@type": "Organization",
      name: "Terres des Incas",
      logo: {
        "@type": "ImageObject",
        url: `${dominio}/logotipo.png`,
      },
    },
    datePublished: formatearFecha(post.created_at),
    dateModified: formatearFecha(post.updated_at),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${dominio}/${lang}/blog/${post.slug}`,
    },
  };

  const fecha = new Date(post.created_at).toLocaleDateString(
    post.lang === "es" ? "es-ES" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );
  /*  const numero = await numeroWhatsapp(lang); */
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* HERO */}
      <section className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden group">
        {post.galeria && post.galeria.length > 0 && (
          <Image
            src={`${url}${post.galeria[0].url}`}
            alt={post.galeria[0].nombre}
            fill
            unoptimized
            priority
            className="object-cover transition-transform duration-[8000ms] ease-out group-hover:scale-110"
            sizes="100vw"
          />
        )}

        {/* overlay más elegante */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">
          <span className="text-xs md:text-sm font-semibold text-orange-400 tracking-[0.3em] uppercase">
            {fecha}
          </span>

          <h1 className="mt-4 text-3xl md:text-6xl font-semibold text-white leading-tight max-w-5xl">
            {post.title}
          </h1>

          <p className="mt-6 text-base md:text-xl text-gray-200 max-w-3xl leading-relaxed">
            {post.resumen}
          </p>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="w-11/12 mt-14 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* MAIN */}
        <div className="md:col-span-2 flex flex-col">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-orange-500 transition mb-6"
          >
            ← Volver al Blog
          </Link>

          {/* CARD CONTENT */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-orange-600 hover:prose-a:text-orange-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* GALERÍA */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Galería
            </h2>
            <GaleriaBlog galeria={post.galeria} url={url} />
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="md:col-span-1 flex flex-col gap-6">
          {/* Flyer */}
          <div className="bg-white rounded-2xl shadow-md p-5">
            <FlyerBlog dict={dict} numero={numeroWhatsapp} />
          </div>

          {/* Tours sticky */}
          <div className="sticky top-24 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Tours recomendados
              </h3>
              <CardsTours tours={tours} dict={dict} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
