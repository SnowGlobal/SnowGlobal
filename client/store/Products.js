import axios from "axios";

//action types
const GET_PRODUCTS = "GET_PRODUCTS";

//action creators
const getProducts = products => ({
  type: GET_PRODUCTS,
  products,
});

//thunk creators
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get("/api/products");
      dispatch(getProducts(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//reducer
const initialState = [];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      console.log("geting products");
      return action.products;
    default:
      return state;
  }
}
