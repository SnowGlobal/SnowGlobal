import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/Cart";
// test
const mock_shopping_cart = {
  data: [
    {
      id: 1,
      name: "victory snowglobe",
      imageUrl: "abc/def",
      quantity: 1,
      description: "a great snowglobe a",
      price: 14.99,
    },
    {
      id: 2,
      name: "dan snowglobe",
      imageUrl: "abc/def",
      quantity: 10,
      description: "a great snowglobe b",
      price: 12.99,
    },
    {
      id: 3,
      name: "brian snowglobe",
      imageUrl: "abc/def",
      quantity: 12,
      description: "a great snowglobe c",
      price: 20.99,
    },
    {
      id: 4,
      name: "tai snowglobe",
      imageUrl: "abc/def",
      quantity: 9,
      description: "a great snowglobe c",
      price: 40.99,
    },
  ],
};

//

const testCart = mock_shopping_cart.data;

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
          {testCart.map(item => {
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

const mapStateToProps = state => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
