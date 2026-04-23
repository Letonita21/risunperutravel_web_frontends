import React from "react";
import Image from "next/image";
import CardBlog from "@/components/blog/CardBlog";
import { getDictionary } from "@/app/dictionaries/getDictionary";

const page = async ({ params }) => {
  const { lang } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_URL}/blog/blogs.php?lang=${lang}`,
    { cache: "no-store" },
  );
  const blog = await res.json();
  const diccionario = await getDictionary(lang);
  const dict = diccionario.blog;

  return (
    <>
      {/* HERO */}
      <div className="relative w-full h-56 md:h-64 overflow-hidden group">
        <Image
          src={`/buscador.webp`}
          alt="andes peruanos"
          priority
          unoptimized
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-[8000ms] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
      </div>

      {/* CONTENIDO */}
      <div className="w-full py-16 md:py-20">
        <div className="w-11/12 max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="max-w-3xl mb-10 md:mb-10">
            <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight">
              {dict.titulo}
            </h1>

            <span className="block mt-3 text-lg md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#00751d] to-black font-medium">
              {dict.subtitulo}
            </span>
          </div>

          {/* TEXTOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: dict.p1 }}
              />
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: dict.p2 }}
              />
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: dict.p3 }}
              />
            </div>

            {/* FRASE DESTACADA */}
            <div className="flex items-center justify-center">
              <div className="bg-gray-50 border-l-4 border-emerald-600 p-6 md:p-8 rounded-xl shadow-sm flex flex-col items-center text-center gap-4">
                {/* LOGO */}
                <Image
                  src="/risun_logo2.png" //
                  alt="Risun Peru Travel"
                  width={250}
                  height={250}
                  className="object-contain"
                />

                {/* TEXTO */}
                <div
                  className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug max-w-xl"
                  dangerouslySetInnerHTML={{ __html: dict.p4 }}
                />
              </div>
            </div>
          </div>

          {/* BLOG GRID */}
          <div className="mt-16 md:mt-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
              Últimos artículos
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {blog.map((item) => (
                <CardBlog key={item.id} item={item} lang={lang} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
