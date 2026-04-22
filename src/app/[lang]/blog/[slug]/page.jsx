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
  const dominio = process.env.BASE_URL;

  return {
    title: article.title,
    description: article.resumen,
    alternates: {
      canonical: `${dominio}/${lang}/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.resumen,
      images: [`${dominio}/imagenesBlog/${article.galeria[0].url}`],
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
  const url = `${process.env.IMAGENES_BLOG}`;
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
      <section className="relative w-full h-[80vh] md:h-[85vh] overflow-hidden group">
        {post.galeria && post.galeria.length > 0 && (
          <Image
            src={`${url}${post.galeria[0].url}`}
            alt={post.galeria[0].nombre}
            fill
            unoptimized
            priority
            className="object-cover transition-transform duration-8000 ease-out group-hover:scale-110"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10 mt-25">
          <span className="text-sm md:text-lg font-medium text-orange-400 drop-shadow-sm drop-shadow-gray-950 tracking-[0.2em] uppercase">
            {fecha}
          </span>

          <h1 className="mt-2 text-4xl md:text-6xl font-medium text-white drop-shadow-sm drop-shadow-gray-950 leading-tight max-w-7xl">
            {post.title}
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white max-w-5xl drop-shadow-sm drop-shadow-gray-950 leading-relaxed">
            {post.resumen}
          </p>
        </div>
      </section>

      <section className="w-11/12 mt-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 min-h-screen">
        <div className="md:col-span-2 flex flex-col justify-center">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors mb-5"
          >
            ← Volver al Blog
          </Link>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-5">
            <GaleriaBlog galeria={post.galeria} url={url} />
          </div>
        </div>
        <div className="md:col-span-1 md:block flex flex-col gap-5">
          <FlyerBlog dict={dict} numero={numeroWhatsapp} />
          <div className="sticky top-30 self-start">
            <CardsTours tours={tours} dict={dict} />
            {/* <Comentarios comentarios={comentarios} /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
