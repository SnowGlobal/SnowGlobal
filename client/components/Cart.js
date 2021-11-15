import React from "react";
import { connect } from "react-redux";
import { removeFromCart, fetchCart } from "../store/Cart";
import { Link } from "react-router-dom";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  async componentDidMount() {
    if (this.props.auth.id) {
      await this.props.fetchCart();
    }
  }

  async handleRemove(e) {
    e.preventDefault();
    await this.props.removeFromCart(e.target.id);
    await this.props.fetchCart();
  }

  render() {
    let CartProducts;
    if (this.props.cart.products.length > 0) {
      CartProducts = this.props.cart.products.map(item => {
        return (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <button id={item.cart_products.id} onClick={this.handleRemove}>
              Remove
            </button>
          </div>
        );
      });
    }
    if (this.props.cart.products.length === 0) {
      CartProducts = <h3>Your cart is empty</h3>;
    }
    // dont show the checkout button if cart is empty
    let CheckoutButton;
    if (this.props.cart.products.length > 0) {
      CheckoutButton = (
        <Link to="/checkout">
          <button>Checkout</button>
        </Link>
      );
    }
    return (
      <div>
        <h1>Cart</h1>
        {CartProducts}
        {CheckoutButton}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { removeFromCart, fetchCart })(Cart);
