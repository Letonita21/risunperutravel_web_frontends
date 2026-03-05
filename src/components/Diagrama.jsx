import Image from "next/image";
import React from "react";

const Diagrama = ({ lang, titulo, tour, contenido }) => {
  return (
    <div className="w-full flex flex-col items-start">
      <h2 className="text-2xl font-semibold text-orange-600 mb-2">{titulo}</h2>

      <p className="text-gray-700 text-lg mb-4 text-start max-w-3xl">
        {contenido}
      </p>

      <div className="w-full flex justify-start">
        <Image
          src={`/responsable/${lang}.webp`}
          alt="turismo responsable"
          priority
          width={800}
          height={600}
          className="w-full max-w-3xl h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Diagrama;
