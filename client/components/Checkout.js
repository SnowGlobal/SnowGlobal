import React from "react";
import { connect } from "react-redux";

///this is not explicitly laid out yet, but presuming
///the checkout component is being passed several product objects
//the component should bring you to a payment and shipping page with forms
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


        </form>
      </div>
    )
  }
}
