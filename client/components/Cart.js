import React from "react";
import { connect } from "react-redux";
import { fetchCart, removeFromCart } from "../store/Cart";
import { Link } from "react-router-dom";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      products: [],
      total: 0,
    };
    // this.calculateTotal = this.calculateTotal.bind(this);
  }

  // calculateTotal(array) {
  //   this.setState({
  //     total: array.reduce(
  //       (acc, cur) =>
  //         (acc += cur.products.price * cur.products.cart_products.quantity),
  //       0
  //     ),
  //   });
  // }

  componentDidMount() {
    //if there is a user logged in, they'll want their cart, right?
    if (this.props.auth.id) {
      this.props.fetchCart();
    }
    // this.calculateTotal(this.props.cart); //this is not working
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart) {
      this.setState({
        cart: this.props.cart,
        products: this.props.cart.products,
      });
    }
  }

  //re-render the cart when the cart changes

  render() {
    const { cart } = this.state;
    const auth = this.props.auth;
    if (cart.length === 0) {
      return (
        <div className="cart-container">
          <h1>Your Cart</h1>
          <h2>Your cart is empty</h2>
          <Link to="/products">
            <button>Continue Shopping</button>
          </Link>
        </div>
      );
    }
    return (
      <div>
        <h1>Cart</h1>
        <h1>Greetings {auth.firstName || "Guest"}, here is your cart!</h1>
        {console.log(cart)}
        <div>
          {this.props.cart.products.map((cartItem, index) => {
            return (
              <div key={cartItem.id}>
                <div>
                  <div>Product: {cartItem.name}</div>
                  <div>Quantity: {cartItem.cart_products.quantity}</div>
                  <div>Price: {cartItem.price}</div>
                  <button
                    onClick={() =>
                      this.props.removeFromCart(cartItem.cart_products.id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <h2>Total: {this.props.cart.total}</h2>
        <Link to="/checkout">
          <button>Checkout</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    products: state.products,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    removeFromCart: id => dispatch(removeFromCart(id, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
