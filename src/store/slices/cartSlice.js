import { createSlice } from "@reduxjs/toolkit";
import { saveCartState } from "@/utils/localStorage";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
        state.totalQuantity++;
        state.totalAmount += newItem.price;
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.totalAmount -= existingItem.price;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        const diff = quantity - item.quantity;
        item.quantity = quantity;
        state.totalQuantity += diff;
        state.totalAmount += diff * item.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

// Middleware to save state to localStorage
export const saveCartStateMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("cart/")) {
    saveCartState(store.getState().cart);
  }
  return result;
};

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const selectIsInCart = (state, id) =>
  state.cart.items.some((item) => item.id === id);
export default cartSlice.reducer;
