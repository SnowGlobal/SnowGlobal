//build a cart redux store with actions and reducers

import axios from "axios";

//action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CHECKOUT_REQUEST = "CHECKOUT_REQUEST";
const CHECKOUT_SUCCESS = "CHECKOUT_SUCCESS";
const CHECKOUT_FAILURE = "CHECKOUT_FAILURE";

//action creators
export const addToCart = id => {
  return {
    type: ADD_TO_CART,
    id,
  };
};

export const removeFromCart = id => {
  return {
    type: REMOVE_FROM_CART,
    id,
  };
};

export const checkout = products => {
  return {
    type: CHECKOUT_REQUEST,
    products,
  };
};

//reducer
const initialState = {
  addedIds: [],
  quantityById: {},
  total: 0,
};

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.id) !== -1) {
        return state;
      }
      return [...state, action.id];
    case REMOVE_FROM_CART:
      return state.filter(id => id !== action.id);
    default:
      return state;
  }
};

const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id } = action;
      return { ...state, [id]: (state[id] || 0) + 1 };
    case REMOVE_FROM_CART:
      const { id: idToRemove } = action;
      const newState = { ...state };
      delete newState[idToRemove];
      return newState;
    default:
      return state;
  }
};

const total = (state = initialState.total, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return state + 1;
    case REMOVE_FROM_CART:
      return state - 1;
    default:
      return state;
  }
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
    case REMOVE_FROM_CART:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action),
        total: total(state.total, action),
      };
    case CHECKOUT_REQUEST:
      return initialState;
    case CHECKOUT_SUCCESS:
      return initialState;
    case CHECKOUT_FAILURE:
      return {
        addedIds: [],
        quantityById: {},
        total: 0,
      };
    default:
      return state;
  }
};

//thunk
export const fetchCart = () => {
  return (dispatch, getState) => {
    const { cart } = getState();
    if (cart.addedIds.length) {
      return Promise.resolve();
    }
    return axios.get("/api/cart").then(response => {
      const { addedIds, quantityById } = response.data;
      dispatch({
        type: "FETCH_CART_SUCCESS",
        addedIds,
        quantityById,
      });
    });
  };
};

export const addToCartUnsafe = id => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TO_CART,
      id,
    });
    return axios.post("/api/cart", { id }).then(() => {
      dispatch(fetchCart());
    });
  };
};

export const removeFromCartUnsafe = id => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_FROM_CART,
      id,
    });
    return axios.delete(`/api/cart/${id}`).then(() => {
      dispatch(fetchCart());
    });
  };
};

export const checkoutUnsafe = products => {
  return (dispatch, getState) => {
    dispatch({
      type: CHECKOUT_REQUEST,
      products,
    });
    return axios
      .post("/api/orders", products)
      .then(() => {
        dispatch({
          type: CHECKOUT_SUCCESS,
          products,
        });
      })
      .catch(() => {
        dispatch({
          type: CHECKOUT_FAILURE,
          products,
        });
      });
  };
};

export default cart;

// now creat a react component that will render the cart
