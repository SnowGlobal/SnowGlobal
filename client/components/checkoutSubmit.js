import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/Cart";

export class CheckoutSubmit extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <h1>Thank you for your order!</h1>
    )
  }
}
const mapDispatch = (dispatch) => ({
  fetchCart: () => dispatch(fetchCart())
})

export default connect (null,mapDispatch)(CheckoutSubmit)
