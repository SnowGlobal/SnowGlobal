import axios from "axios";

//action types
const GET_PRODUCTS = "GET_PRODUCTS";
const DELETE_PRODUCT = "DELETE_PRODUCT";

//action creators
const getProducts = products => ({
  type: GET_PRODUCTS,
  products,
});

const _deleteProduct = product => ({
  type: DELETE_PRODUCT,
  product
})

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

export const deleteProduct = (id) => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/api/products/${id}`)
      dispatch(_deleteProduct(data))
    }
    catch(error){
      console.error(error)
    }
  }
}

//reducer
const initialState = [];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
      case DELETE_PRODUCT:
        return [...state]
    default:
      return state;
  }
}
