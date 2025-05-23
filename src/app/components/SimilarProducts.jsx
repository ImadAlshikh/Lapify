"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./swiper-custom.css"; // Add this import
import Link from "next/link";

const SimilarProducts = ({ products, currentProductId }) => {
  const similarProducts = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 10);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold pb-6 text-right ">منتجات مشابهة</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        dir="rtl"
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {similarProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <Link href={`/details?id=${product.id}`}>
              <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all hover:scale-105">
                <img
                  src={`/api/proxy?url=${product.image}`}
                  alt={product.name}
                  className="w-full h-40 object-contain mb-4 select-none"
                />
                <h3 className="text-lg font-semibold mb-2 select-none">
                  {product.name}
                </h3>
                <p className="text-yellow-500 font-bold select-none">
                  ${product.price}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimilarProducts;
