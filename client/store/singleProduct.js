import axios from 'axios'
import history from '../history'

//action types
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

//action creators
const setSingleProduct = product => ({ type: SET_SINGLE_PRODUCT, product })

//thunk creators
export const fetchSingleProduct = (id) => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/products/${id}`)
      dispatch(setSingleProduct(data))
    } catch (error) {
      console.log('There was an error fetching a single product: ', error)
    }
  }
}

//reducer
const initialState = {}

export default function singleProductReducer (state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
