import React from "react";
import { connect } from "react-redux";
import { removeFromCart, fetchCart } from "../store/Cart";

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

  handleRemove(e) {
    e.preventDefault();
    this.props.removeFromCart(e.target.id);
    this.props.fetchCart();
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
    return (
      <div>
        <h2>Cart</h2>
        {CartProducts}
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
