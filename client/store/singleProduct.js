import axios from 'axios'
import history from '../history'


/**
 * ACTION TYPES
 */
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

/**
 * ACTION CREATORS
 */
const setSingleProduct = product => ({ type: SET_SINGLE_PRODUCT, product })

/**
 * THUNK CREATORS
 */
export const fetchSingleProduct = (id) => async dispatch => {
  try {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch(setSingleProduct(data))
  } catch (error) {
    console.log('There was an error fetching a single product: ', error)
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
