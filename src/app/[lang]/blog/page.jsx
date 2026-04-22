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
      <div className="relative w-full h-48 overflow-hidden group">
        <Image
          src={`/buscador.webp`}
          alt="andes peruanos"
          priority
          unoptimized
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-10000 ease-out scale-120"
        />
      </div>
      <div className="w-full mt-[3vh]">
        <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 gap-20 min-h-screen">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-medium text-gray-900 leading-none mb-6 text-balance">
              {dict.titulo}
              <span className="block -mt-1 md:-mt-1 text-lg md:text-2xl text-transparent bg-clip-text bg-linear-to-r from-[#00751d] to-[#000000]">
                {dict.subtitulo}
              </span>
            </h1>

            <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: dict.p1 }}
              />
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: dict.p2 }}
              />
            </div>

            <div className="mt-2 text-center">
              <div
                className="prose max-w-none text-2xl font-medium text-gray-900 tracking-tight"
                dangerouslySetInnerHTML={{ __html: dict.p3 }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
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
