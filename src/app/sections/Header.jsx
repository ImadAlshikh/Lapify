"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaOpencart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = ({ onSearch = () => {}, initialSearch = "" }) => {
  const router = useRouter();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [showCount, setShowCount] = useState(false);

  useEffect(() => {
    setShowCount(true);
  }, []);

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  const handleLogoClick = () => {
    if (onSearch) {
      onSearch("");
    }
    router.push("/");
  };

  return (
    <div className="w-full bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <p
          onClick={handleLogoClick}
          className="logo text-gray-800 text-2xl font-bold hover:text-yellow-500 transition-colors cursor-pointer"
        >
          لابيفاي
        </p>
        <input
          type="text"
          placeholder="ابحث عن ..."
          className="w-1/3 p-2 px-4 text-gray-800 rounded-4xl border border-gray-100 outline outline-yellow-500"
          value={initialSearch}
          onChange={handleSearch}
        />
        <Link href="/cart">
          <div className="cart relative">
            <FaOpencart
              size={42}
              className="text-gray-800 cursor-pointer transform scale-x-[-1]"
            />
            {showCount && totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {totalQuantity}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
