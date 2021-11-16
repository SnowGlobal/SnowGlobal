import React from "react";
import { connect } from "react-redux";
import { removeFromCart, fetchCart, updateCart } from "../store/Cart";
import { Link } from "react-router-dom";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
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

  handleQuantity(event) {
    if(event.target.name === "increment") {
      //by setting a + in front of the value, we can use parseInt to convert it to an integer
      // console.log(+event.target.value + 1)
      this.props.updateCart(event.target.id, +event.target.value + 1);
    } else {
      // console.log(+event.target.value - 1)
      this.props.updateCart(event.target.id, +event.target.value - 1);
    }
  }

  render() {
    let cartProducts;
    if (!this.props.cart.products || this.props.cart.products.length === 0) {
      return <div>Cart Empty</div>;
    }
    if (this.props.cart.products.length > 0) {
      cartProducts = this.props.cart.products.map(item => {
        //by utilizing optional chaining, we can safely access the item quantity
        let quantity = item.cart_products?.quantity
        return (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <h4>
              {`$`}
              {item.price} * {quantity} = {`$`} {item.price * quantity}
            </h4>
            <p>
              Total Quantity: {quantity} <br />
              <span>
                <button
                  onClick={this.handleQuantity}
                  name="increment"
                  id={item.id}
                  className="increment-button"
                  value = {quantity}
                >+</button>
                <button
                  onClick={this.handleQuantity}
                  name="decrement"
                  id={item.id}
                  className="decrement-button"
                  value = {quantity}
                >-</button>
              </span>
            </p>
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
        {cartProducts}
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
    updateCart: (id, quantity) => dispatch(updateCart(id, quantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
