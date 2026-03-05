import React from "react";
import { HomeIcon } from "@/icons";

const Breadcrumbs = ({ data = [] }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-[15px] md:text-base font-medium">
        {/* HOME */}
        <li className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition">
          <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100">
            <HomeIcon size={25} color="#000" />
          </span>
        </li>

        {data.map((ob, index) => {
          const isActive = index === data.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {/* separador */}
              <span className="text-gray-400 text-lg">›</span>

              <span
                className={`
              relative
              px-1
              transition-colors
              ${
                isActive
                  ? "text-[#A30923] font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }
            `}
              >
                {ob}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
