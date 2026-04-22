import React from "react";
import Link from "next/link";
import Image from "next/image";

const CardBlog = ({ dict, item, lang }) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/imagenesBlog/`;

    const fecha = new Date(item.created_at).toLocaleDateString(
        lang === "es" ? "es-ES" : "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    return (
        <article className="group relative bg-white rounded-3xl overflow-hidden border border-gray-300 hover:border-gray-300 transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col h-full">
            <div className="relative h-64 w-full overflow-hidden">
                <Image
                    src={`${url}${item.imagen_portada}`}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
                    priority={false}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-6 text-white text-sm font-medium tracking-wide z-10">
                    {fecha}
                </div>
            </div>
            <div className="p-4 flex flex-col grow">
                <h3 className="text-2xl font-medium text-gray-900 mb-4 leading-snug group-hover:text-blue-700 transition-colors duration-300">
                    {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 grow">
                    {item.resumen}
                </p>
                <div className="mt-4">
                    <Link
                        href={`/${item.lang}/blog/${item.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-all duration-300">
                        Leer artículo
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default CardBlog;