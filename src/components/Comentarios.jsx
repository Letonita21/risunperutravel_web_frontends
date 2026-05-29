import React from 'react'
import { FacebookIcon, TripAdvisorIcon, GoogleIcon, StarIcon } from '../icons'

const Comentarios = ({ comentarios }) => {

    const CreateCard = ({ comentario }) => {
        const icons = {
            facebook: <FacebookIcon className="w-10 h-10 text-blue-600" />,
            tripadvisor: <TripAdvisorIcon className="w-10 h-10 text-green-600" />,
            google: <GoogleIcon className="w-10 h-10" />
        };

        return (
            <div className="group relative bg-white border border-gray-300 p-3 rounded-xl mx-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-64 shrink-0 flex flex-col justify-between overflow-hidden">
                <div>
                    <div className="flex items-center gap-1 mb-1">
                        <div className="rounded-lg group-hover:scale-110 transition-transform">
                            {icons[comentario.tipo.toLowerCase()] || <GoogleIcon className="w-10 h-10" />}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium text-gray-900 truncate tracking-tight">
                                {comentario.nombre}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-green-600 font-medium">
                                Verified Reviewer
                            </span>
                        </div>
                        {/* hola */}
                    </div>
                    <span className="inline-flex items-center justify-center gap-1">
                        {[...Array(comentario.puntaje)].map((_, i) => (
                            <StarIcon key={i} className="w-4 h-4" color="#E6C800" />
                        ))}
                    </span>

                    <p className="text-xs leading-relaxed text-gray-700 italic line-clamp-3 mb-1">
                        "{comentario.comentario}"
                    </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 text-[11px] font-medium text-gray-950">
                    <div className="flex items-center">
                        <span className="capitalize text-gray-950">{comentario.tipo}</span>
                    </div>

                    <time className="px-2 rounded-full">{comentario.fecha}</time>
                </div>
            </div>
        );
    };
    return (
        <>
            <style>{`
            @keyframes marqueeScroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }

            .marquee-inner {
                animation: marqueeScroll 25s linear infinite;
            }

            .marquee-reverse {
                animation-direction: reverse;
            }
        `}</style>

            <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-5 md:w-10 z-10 pointer-events-none bg-linear-to-r from-white to-transparent"></div>
                <div className="marquee-inner flex transform-gpu min-w-[200%] pt-5 pb-5">
                    {[...comentarios, ...comentarios].map((comentario, index) => (
                        <CreateCard key={index} comentario={comentario} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-5 md:w-10 z-10 pointer-events-none bg-linear-to-l from-white to-transparent"></div>
            </div>
        </>
    )
}

export default Comentarios