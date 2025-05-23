"use client";
import React from "react";
import Link from "next/link";

const ProductCard = ({ id, name, price, img }) => {
  return (
    <div className="group w-full max-w-sm mx-auto">
      <Link href={`/details?id=${id}`} className="block">
        <div className="bg-white flex-1 justify-center rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <img
              src={`/api/proxy?url=${img}`}
              alt={name}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="p-4">
            <h2 className="text-lg font-semibold text-center text-gray-800 line-clamp-2 mb-2 min-h-[3.5rem]">
              {name}
            </h2>
            <div className="text-xl font-bold text-center text-yellow-500">
              ${price}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
