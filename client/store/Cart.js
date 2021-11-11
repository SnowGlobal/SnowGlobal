import axios from "axios";

//action types
const GET_CART = "GET_CART";

//action creators
const getCart = (cart) => ({
  type: GET_CART,
  cart,
});

//thunk creators
export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/${userId}`);
      dispatch(getCart(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//reducer
const initialState = [];

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      console.log("getting cart");
      return action.cart;
    default:
      return state;
  }
}
