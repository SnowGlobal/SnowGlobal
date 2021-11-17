import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../store/Products";
import { fetchCart } from "../store/Cart";
import checkoutSubmit, { CheckoutSubmit } from "./checkoutSubmit";

export class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    if (this.props.auth.id) {
      await this.props.fetchCart();
      this.state.total = 0
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    //while()
  }

  render() {
    const cart = this.props.cart.products
    console.log(cart);
    this.state.total = 0
    return (
      <div>
        <h1>Checkout</h1>
        <table>
          <tbody>
            <tr className="table-head">
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
            {cart.map((product) => {

              this.state.total += product.price * product.cart_products.quantity
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.cart_products.quantity}</td>
                  <td>{product.price * product.cart_products.quantity}</td>
                </tr>
              );
            })}
            <tr className="checkout-total">
              <td>Total</td>
              <td>${this.state.total}</td>
              </tr>
          </tbody>
        </table>
        <h3>Order Information</h3>
        <form className="checkout-form" onSubmit={this.handleSubmit}>
          <label>Shipping Information</label>
          <input name="address" placeholder={this.props.auth.address?this.props.auth.address:"Address"}/>
          <input name="state" placeholder="State" />
          <input name="zipcode" placeholder="Zipcode" />
          <label>Customer Information</label>
          <input name="firstName" placeholder={this.props.auth.firstName?this.props.auth.firstName:"First Name"} />
          <input name="lastName" placeholder={this.props.auth.lastName?this.props.auth.lastName:"Last Name"} />
          <Link to={`/checkout-submit`}>
            <button type="submit">Confirm Checkout</button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
  };
};
const mapDispatch = (dispatch) => ({
  fetchCart: () => dispatch(fetchCart()),
  deleteProduct: (id) => dispatch(deleteProduct(id)),
});

export default connect(mapState, mapDispatch)(Checkout);
