"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import products from "../../data/products.json";
import Header from "../sections/Header";
import SimilarProducts from "../components/SimilarProducts";
import { FaOpencart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectIsInCart } from "@/store/slices/cartSlice";
import SuspenseWrapper from "../components/SuspenseWrapper";

const ImageMagnifier = ({ src, alt, className }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const imgRef = useRef(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (imgRef.current) {
      const updateSize = () => {
        const { width, height } = imgRef.current.getBoundingClientRect();
        setImgSize({ width, height });
      };

      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  const handleMouseMove = (e) => {
    const { left, top } = imgRef.current.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    setPosition({ x, y });
  };

  const magnifierSize = 150;
  const zoomLevel = 2.5;

  return (
    <div className="relative w-full h-[500px] bg-white">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
        onMouseMove={handleMouseMove}
      />
      {showMagnifier && (
        <div
          className="absolute pointer-events-none hidden md:block rounded-full border-2 border-yellow-500 shadow-lg"
          style={{
            left: Math.max(
              0,
              Math.min(position.x - magnifierSize / 2, imgSize.width - magnifierSize)
            ),
            top: Math.max(
              0,
              Math.min(position.y - magnifierSize / 2, imgSize.height - magnifierSize)
            ),
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            backgroundImage: `url(${src})`,
            backgroundPosition: `${-position.x * zoomLevel + magnifierSize / 2}px ${
              -position.y * zoomLevel + magnifierSize / 2
            }px`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgSize.width * zoomLevel}px ${
              imgSize.height * zoomLevel
            }px`,
          }}
        />
      )}
    </div>
  );
};

const DetailsPageContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const productId = searchParams.get("id");
  const product = products.products.find((p) => p.id === productId);
  const isInCart = useSelector((state) => selectIsInCart(state, productId));
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    // احتفظ بال URL الحالي وقم فقط بتحديث search params
    const newParams = new URLSearchParams(searchParams);
    if (term) {
      newParams.set("search", term);
    } else {
      newParams.delete("search");
    }
    // تحديث URL بدون إعادة تحميل الصفحة
    router.replace(`${window.location.pathname}?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        })
      );
    } else {
      router.push("/cart");
    }
  };

  if (!product) {
    return <div>المنتج غير موجود</div>;
  }

  return (
    <div>
      <Header onSearch={handleSearch} initialSearch={searchTerm} />
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* صورة المنتج */}
          <div className="md:w-1/2 border border-gray-100">
            <ImageMagnifier
              src={`/api/proxy?url=${product.image}`}
              alt={product.name}
              className="w-full  rounded-lg shadow-md"
            />
          </div>

          {/* تفاصيل المنتج */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center justify-between mb-8">
              <p className="text-2xl font-bold text-yellow-500">
                ${product.price}
              </p>
              <button
                onClick={handleAddToCart}
                className={`text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 
                  ${
                    isInCart
                      ? "bg-gray-800 hover:bg-gray-900"
                      : "bg-yellow-500 hover:bg-yellow-600 active:scale-95"
                  }`}
              >
                <FaOpencart className="scale-150" />
                {isInCart ? "عرض في السلة" : "إضافة إلى السلة"}
              </button>
            </div>

            {/* جدول المواصفات */}
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <tbody className="divide-y">
                  <tr className="hover:bg-gray-100">
                    <td className="py-2 font-semibold">المعالج</td>
                    <td className="py-2">{product.specs.cpu.name}</td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="py-2 font-semibold">كرت الشاشة</td>
                    <td className="py-2">{product.specs.graphics.name}</td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="py-2 font-semibold">الرام</td>
                    <td className="py-2">{product.specs.memory.size}GB</td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="py-2 font-semibold">التخزين</td>
                    <td className="py-2">
                      {product.specs.storage.size}GB{" "}
                      {product.specs.storage.type}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="py-2 font-semibold">الشاشة</td>
                    <td className="py-2">
                      {product.specs.display.size}"{" "}
                      {product.specs.display.resolution}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* إضافة المنتجات المشابهة */}
        <SimilarProducts
          products={products.products}
          currentProductId={productId}
        />
      </div>
      <div className="mb-32"></div>
    </div>
  );
};

const DetailsPage = () => {
  return (
    <SuspenseWrapper>
      <DetailsPageContent />
    </SuspenseWrapper>
  );
};

export default DetailsPage;
