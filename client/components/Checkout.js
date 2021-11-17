import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../store/Products";
import { fetchCart, clearCart } from "../store/Cart";
import CheckoutSubmit from "./checkoutSubmit";

///this is not explicitly laid out yet, but presuming
///the checkout component is being passed several product objects
//the component should bring you to a confirmation page
//on submit remove items from db

export class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.auth.id) {
      await this.props.fetchCart();
    }
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    await this.props.clearCart();
    this.props.history.push("/checkout-submit");
  }

  render() {
    const cart = this.props.cart.products;
    let productTotal = 0;
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
              productTotal += product.price * product.cart_products.quantity;

              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.cart_products.quantity}</td>
                  <td>{product.price * product.cart_products.quantity}</td>
                </tr>
              );
            })}
            <tr>
              <td>Total: ${productTotal}.00</td>
            </tr>
          </tbody>
        </table>
        <h3>Order Information</h3>
        <form className="checkout-form" onSubmit={this.handleSubmit}>
          <label>Shipping Information</label>
          <input
            name="address"
            placeholder={
              this.props.auth.address ? this.props.auth.address : "Address"
            }
          />
          <input name="state" placeholder="State" />
          <input name="zipcode" placeholder="Zipcode" />
          <label>Customer Information</label>
          <input
            name="firstName"
            placeholder={
              this.props.auth.firstName
                ? this.props.auth.firstName
                : "First Name"
            }
          />
          <input
            name="lastName"
            placeholder={
              this.props.auth.lastName ? this.props.auth.lastName : "Last Name"
            }
          />
          <Link to={`/checkout-submit`}>
            <button type="submit" onClick={this.handleSubmit}>
              Confirm Checkout
            </button>
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
  clearCart: () => dispatch(clearCart()),
});

export default connect(mapState, mapDispatch)(Checkout);
