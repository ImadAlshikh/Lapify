"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../sections/Header";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/store/slices/cartSlice";
import Link from "next/link";
import CheckoutModal from "../components/CheckoutModal";
import SuspenseWrapper from "../components/SuspenseWrapper";

const CartPageContent = () => {
  const dispatch = useDispatch();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const { items, totalAmount } = useSelector((state) => state.cart);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0 && newQuantity <= 99) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleConfirmCheckout = () => {
    dispatch(clearCart());
    setIsCheckoutModalOpen(false);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-right">سلة المشتريات</h1>

        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">السلة فارغة</p>
            <Link
              href="/"
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
            >
              تسوق الآن
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 mb-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <Link
                    href={`/details?id=${item.id}`}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={`/api/proxy?url=${item.image}`}
                      alt={item.name}
                      className="w-24 h-24 object-contain"
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-yellow-500">${item.price}</p>
                    </div>
                  </Link>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                      >
                        <FaMinus size={12} />
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-12 text-center border rounded"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t pt-4">
              <button
                onClick={handleCheckout}
                className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900"
              >
                إتمام الشراء
              </button>
              <div className="text-xl">
                المجموع: <span className="font-bold">${totalAmount}</span>
              </div>
            </div>
          </>
        )}
      </div>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onConfirm={handleConfirmCheckout}
        totalAmount={totalAmount}
      />
    </div>
  );
};

const CartPage = () => {
  return (
    <SuspenseWrapper>
      <CartPageContent />
    </SuspenseWrapper>
  );
};

export default CartPage;
