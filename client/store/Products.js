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
export default function (state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
