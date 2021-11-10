import React from "react";
import { connect } from "react-redux";
import { deleteProduct } from "../store/Products";

///this is not explicitly laid out yet, but presuming
///the checkout component is being passed several product objects
//the component should bring you to a confirmation page
//on submit remove items from db

export class Checkout extends React.Component {

  handleSubmit(evt){
    evt.preventDefault();
  }

  render(){
    return (
      <div>
      <h1>Checkout</h1>
      <form id ="payment-form" onSubmit={this.handleSubmit}>
        <button type="submit">Confirm Checkout</button>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    products : state.products,
  }
}
const mapDispatch = (dispatch, { history }) => ({
  deleteProduct : (id) => dispatch(deleteProduct(id))
})

export default connect(mapState,mapDispatch)(Checkout)
