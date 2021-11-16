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

  async handleRemove(id) {
    await this.props.removeFromCart(id);
    await this.props.fetchCart();
  }

  render() {
    let CartProducts;
    if (!this.props.cart.products || this.props.cart.products.length === 0) {
      console.log(this.props.cart.products);
      return <div>Cart Empty</div>;
    }
    if (this.props.cart.products.length > 0) {
      CartProducts = this.props.cart.products.map(item => {
        return (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <h4>
              {`$`}
              {item.price}
            </h4>
            <p>{item.cart_products?.quantity}</p>
            <button onClick={() => this.handleRemove(item.cart_products.id)}>
              Remove from Cart
            </button>
          </div>
        );
      });
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

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: id => dispatch(removeFromCart(id)),
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
