import axios from "axios";

//action types
const GET_CART = "GET_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

//action creators
const _getCart = cart => ({
  type: GET_CART,
  cart,
});

const _removeFromCart = product => ({
  type: REMOVE_FROM_CART,
  productId: product.id,
});

//thunk creators
export const removeFromCart = id => {
  const token = localStorage.getItem("token");
  if (token) {
    return async dispatch => {
      try {
        const { data } = await axios.delete(`/api/cart/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        dispatch(_removeFromCart(data));
      } catch (err) {
        console.error(err);
      }
    };
  }
};

export const fetchCart = () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    return async dispatch => {
      try {
        const { data } = await axios.get(`/api/cart/`, {
          headers: {
            authorization: token,
          },
        });
        return dispatch(_getCart(data));
      } catch (error) {
        console.error(error);
      }
    };
  }
};

export const clearCart = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return async dispatch => {
      try {
        const { data } = await axios.delete(`/api/cart/`, {
          headers: {
            Authorization: token,
          },
        });
        dispatch(_updateCart(data));
      } catch (err) {
        console.error(err);
      }
    };
  }
};

const initialState = {
  products: [],
  total: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        products: action.cart.products,
        total: action.cart.total,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.productId
        ),
      };
    default:
      return state;
  }
}
// export default function cartReducer(state = initialState, action) {
//   switch (action.type) {
//     case GET_CART:
//       return action.cart;
//     case REMOVE_FROM_CART:
//       return state.products.filter(product => product.id !== action.productId);
//     case UPDATE_CART:
//       return action.cart;
//     default:
//       return state;
//   }
// }
// {
//   ...state,
//   products: state.products.filter(
//     product => product.id !== action.productId
//   ),
// };
