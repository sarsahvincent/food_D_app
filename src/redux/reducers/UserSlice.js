import { createSlice } from "@reduxjs/toolkit";
const UserSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    categories: [],
    searchData: [],
    location: {},
    cart: {},
    cartTotalUnit: 0,
    cartTotalAmount: 0,
    postalCode: "",
    loading: false,
    status: null,
    message: null,
    error: null,
  },
  reducers: {
    getLocationDetails(state, action) {
      state.location = action.payload;
    },
    getPostalCode(state, action) {
      state.postalCode = action.payload;
    },
    getSearchData(state, action) {
      state.searchData = action.payload;
    },
    fetchData(state, action) {
      state.data = action.payload;
    },
    getCategories(state, action) {
      state.categories = action.payload;
    },

    addToCart(state, action) {
      const itemIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      state.cart[itemIndex].unit += 1;
    },

    decreaseCart(state, action) {
      const itemIndex = state.cart.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      const nextCartItem = state.cart.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );

      if (state.cart[itemIndex].unit > 1) {
        state.cart[itemIndex].unit -= 1;
      } else if (state.cart[itemIndex].unit === 1) {
        state.cart = nextCartItem;
      }
    },

    getCartItems(state, action) {
      if (!Array.isArray(state.cart)) {
        let temFood = { ...action.payload, unit: 1 };
        return {
          ...state,

          cart: [temFood],
        };
      }

      const existingFoods = state.cart.filter(
        (item) => item.__id === action.payload._id
      );

      if (existingFoods.length > 0) {
        let updateCart = state.cart.map((food) => {
          if (food._id === action.payload._id) {
            food.unit = action.payload.unit;
          }
          return food;
        });

        return {
          ...state,
          cart: updateCart.filter((item) => item.unit > 0),
        };
      } else {
        let temFood = { ...action.payload, unit: 1 };

        return {
          ...state,
          cart: [...state.cart, temFood],
        };
      }
    },

    getTotals(state) {
      let allTotals = [];
      if (state?.cart.length > 0) {
        state?.cart?.map((item, _) => {
          let itemTotal = item?.unit * item?.price;
          allTotals.push(itemTotal);
        });
        let sum = allTotals.reduce(function (previousValue, currentValue) {
          return previousValue + currentValue;
        }, 0);

        state.cartTotalAmount = sum;
      }
    },
  },

  extraReducers: {},
});

export const {
  getCategories,
  getSearchData,
  getPostalCode,
  addToCart,
  getTotals,
  decreaseCart,
  getLocationDetails,
  fetchData,
  getCartItems,
} = UserSlice.actions;
export default UserSlice.reducer;
