
import React from 'react'
import { WhatsAppIcon } from '@/icons';

const FlyerBlog = ({ dict, numero }) => {

    const mensaje = dict.consulta;
    const enlaceWhatsApp = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    const imagenFondo = '/flyer-machu-picchu.webp';
    return (
        <div className="relative w-full h-[480px] rounded-4xl overflow-hidden shadow-2xl group mb-8" >

            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${imagenFondo})` }}
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/20 to-black/80" />

            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 rounded-bl-[80px] opacity-95 z-0">
                <div className="absolute top-4 right-4 text-white/80">
                    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="50" cy="50" r="45" />
                        <circle cx="50" cy="50" r="30" fill="currentColor" />
                    </svg>
                </div>
            </div>

            <div className="relative z-10 p-7 flex flex-col h-full text-white">
                <h2 className="text-[2.5rem] font-medium leading-[1.1] mt-10 tracking-tight drop-shadow-md">
                    {dict.reserva}
                    <svg className="inline-block w-10 h-10 ml-2 mb-2 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                </h2>

                <div className="mt-auto mb-6">
                    <p className="text-xl font-medium leading-snug drop-shadow-md">
                        {dict.consulta}
                    </p>
                </div>

                <a
                    href={enlaceWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 py-2 px-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium text-xl shadow-lg transition-transform duration-300 hover:scale-[1.03] active:scale-95">
                    <WhatsAppIcon className="w-8 h-8" />
                    {dict.ahora}
                </a>

            </div>
        </div>
    )
}

export default FlyerBlog