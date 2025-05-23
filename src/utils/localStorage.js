export const loadCartState = () => {
  if (typeof window === "undefined") {
    return {
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
    };
  }

  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
    };
  }
};

export const saveCartState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    // ignore write errors
  }
};
