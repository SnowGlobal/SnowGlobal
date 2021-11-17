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
          <aside className="cart-item" key={item.id}>
            <div className="cart-item-image">
              <img src={item.imageUrl} alt={item.name} />
            </div>
            <div className="cart-item-info">
              <div className="cart-item-name">
                <Link to={`/products/${item.id}`}>{item.name}</Link>
              </div>
              <div className="cart-item-price"> {`${item.price}`}</div>
              <div className="cart-item-quantity">
                Quantity: {item.quantity}
              </div>
              <div className="cart-item-remove">
                <button
                  className="btn-remove-from-cart"
                  onClick={() => this.handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </aside>
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
