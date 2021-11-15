import axios from "axios";

//action types
const GET_CART = "GET_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_CART = "UPDATE_CART";
//action creators
const _updateCart = cart => ({
  type: UPDATE_CART,
  cart,
});

const _getCart = cart => ({
  type: GET_CART,
  cart,
});

const _removeFromCart = product => ({
  type: REMOVE_FROM_CART,
  productId: product.id,
});

//thunk creators
export const removeFromCart = (id, history) => {
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
        history.push("/cart");
      } catch (err) {
        console.error(err);
      }
    };
  }
};

export const updateCart = (id, quantity) => {
  const token = localStorage.getItem("token");
  if (token) {
    return async dispatch => {
      try {
        const { data } = await axios.put(
          `/api/cart/${id}`,
          { quantity },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        dispatch(_updateCart(data));
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

export const addToCart = (productId, quantity) => {
  const token = localStorage.getItem("token");
  if (token) {
    return async dispatch => {
      try {
        const { data } = await axios.post(`/api/cart/`, {
          productId,
          quantity,
        });
        dispatch(_updateCart(data));
      } catch (err) {
        console.error(err);
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

// products is a key value on the cart object
const initialState = {
  products: [],
  total: 0,
};

export default function cartReducer(state = initialState, action) {
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
    case UPDATE_CART:
      return {
        ...state,
        products: action.cart.products,
        total: action.cart.total,
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
