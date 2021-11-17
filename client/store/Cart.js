import axios from "axios";

//action types
const GET_CART = "GET_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const ADD_TO_CART = "ADD_TO_CART";
const UPDATE_CART = "UPDATE_CART";
const CLEAR_CART = "CLEAR_CART";

//action creators
const _addToCart = product => ({
  type: ADD_TO_CART,
  product,
});

const _getCart = cart => ({
  type: GET_CART,
  cart,
});

const _removeFromCart = product => ({
  type: REMOVE_FROM_CART,
  productId: product.id,
});

const _updateCart = cart => ({
  type: UPDATE_CART,
  cart
});

const _clearCart = cart =>({
  type: CLEAR_CART,
  cart
})

//thunk creators
export const addToCart = id => {
  const token = localStorage.getItem("token");
  if (token) {
    return async dispatch => {
      try {
        const { data } = await axios.post(
          `/api/cart/${id}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        dispatch(_addToCart(data));
      } catch (err) {
        console.error(err);
      }
    };
  } else {
    //if no token, add to cart in localStorage
    return async dispatch => {
      try {
        const { data } = await axios.post(`/api/cart/${productId}`);
        dispatch(_addToCart(data));
      } catch (err) {
        console.error(err);
      }
    };
  }
};

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

export const clearCart = (cart) => {
  const token = localStorage.getItem("token");
  if (token){
    return async dispatch => {
      try {
        const { data } = await axios.delete('api/cart', {
          headers: {
            Authorization: token,
          }
        })
        dispatch(clearCart(data))
      }
      catch(err){
       console.error(err)
      }
    }
  }
}

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

export const updateCart = (id, quantity) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    return async dispatch => {
      try {
        const { data } = await axios.put(`/api/cart/${id}`, { quantity }, {
          headers: {
            authorization: token,
          },
        });
        return dispatch(_updateCart(data));
      } catch (error) {
        console.error(error);
      }
    };
  }
};



// guest cart

export const localCartProducts = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return _getCart(cart);
};

export const localCartAdd = product => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  return _addToCart(product);
};

export const localCartRemove = productId => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const newCart = cart.filter(product => product.id !== productId);
  localStorage.setItem("cart", JSON.stringify(newCart));
  return _removeFromCart(productId);
};

// export const clearCart = () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     return async dispatch => {
//       try {
//         const { data } = await axios.delete(`/api/cart/`, {
//           headers: {
//             Authorization: token,
//           },
//         });
//         dispatch(_updateCart(data));
//       } catch (err) {
//         console.error(err);
//       }
//     };
//   }
// };

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
    case CLEAR_CART:
      return {
        ...state
      }
    case ADD_TO_CART:
      return {
        ...state,
        products: action.products,
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
