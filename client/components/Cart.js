import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/Cart";


class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  calculateTotal(array) {
    this.setState({
      total: array.reduce((acc, cur) => (acc += cur.price * cur.quantity), 0),
    });
  }

  componentDidMount() {
    this.props.fetchCart();
    this.calculateTotal(this.props.cart);
    // for testing:
    this.calculateTotal(testCart);
  }

  render() {
    console.log(this.props);
    const cart = this.props.cart;
    return (
      <div>
        <h1>Cart</h1>
        <ul>
          {testCart.map((item) => {
            return (
              <li key={item.id}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>{item.price}</p>
                <img src={item.imageUrl} />
                <p>{item.quantity}</p>
              </li>
            );
          })}
        </ul>
        <h2>Total: {this.state.total}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
