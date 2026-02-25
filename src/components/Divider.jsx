import React from "react";

const Divider = () => {
  return (
    <div className="flex items-center justify-center my-6">
      <div className="grow border-t border-green-700"></div>

      {/* Colibrí */}
      <img
        src="/colibri_risun.svg"
        alt="Colibrí Risun"
        className="mx-6 w-14 h-14 rounded-full border-2 border-green-700 p-1 bg-white"
      />

      <div className="grow border-t border-green-700"></div>
    </div>
  );
};

export default Divider;
