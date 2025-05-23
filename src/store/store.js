import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cartReducer, { saveCartStateMiddleware } from "./slices/cartSlice";
import { loadCartState } from "@/utils/localStorage";

const preloadedState = {
  cart: typeof window !== "undefined" ? loadCartState() : undefined,
};

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveCartStateMiddleware),
});
