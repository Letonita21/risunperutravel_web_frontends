'use client'
import React, { useState, Fragment } from 'react'
import Image from 'next/image'
import { Dialog, Transition, TransitionChild, DialogPanel } from '@headlessui/react'

const GaleriaBlog = ({ galeria, url, portada }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [imagenSeleccionada, setImagenSeleccionada] = useState('')

    const abrirModal = (imgUrl) => {
        setImagenSeleccionada(imgUrl)
        setIsOpen(true)
    }

    const cerrarModal = () => {
        console.log("click")
        setIsOpen(false);
    }

    // 🔥 Excluimos explícitamente la portada
    const imagenesGaleria = galeria?.filter(
        (img) => img.url !== portada
    )

    if (!imagenesGaleria || imagenesGaleria.length === 0) return null

    return (
        <>
            <section className="border-t border-gray-200 pt-16 mt-10">
                <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-10">
                    Galería del artículo
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
                    {imagenesGaleria.map((img) => (
                        <div
                            key={img.id}
                            onClick={() => abrirModal(img.url)}
                            className="
                                relative
                                aspect-square
                                rounded-2xl
                                overflow-hidden
                                cursor-pointer
                                group
                                shadow-sm
                                hover:shadow-2xl
                                transition-all
                                duration-300">
                            <Image
                                src={`${url}${img.url}`}
                                alt={img.nombre}
                                fill
                                unoptimized
                                sizes="(max-width: 768px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay hover elegante */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </div>
                    ))}
                </div>
            </section>

            {/* MODAL */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={cerrarModal}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/90 backdrop-blur-md" />
                    </TransitionChild>

                    <div className="fixed inset-0 flex items-center justify-center p-6">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="relative w-full max-w-6xl">
                                <button
                                    onClick={() => cerrarModal()}
                                    className="absolute top-4 right-4 font-bold text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition z-10"
                                >
                                    ✕
                                </button>

                                <div className="relative w-full h-[85vh]">
                                    <Image
                                        src={`${url}${imagenSeleccionada}`}
                                        alt="Vista ampliada"
                                        fill
                                        sizes="100vw"
                                        className="object-contain rounded-2xl"
                                    />
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default GaleriaBlog