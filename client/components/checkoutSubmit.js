import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/Cart";
import { Link } from "react-router-dom";

export class CheckoutSubmit extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.auth.id){
      this.props.fetchCart();
    }
  }

  render() {
    const cart = this.props.cart
    const auth = this.props.auth;
    return (
      <div>
        <h1>Thank you for your order!</h1>
        <Link to="/products">
          <button>Keep Shopping</button>
        </Link>
      </div>
    );
  }
}
const mapState = state => {
  return {
    cart: state.cart,
    auth: state.auth,
  };
};
const mapDispatch = (dispatch) => ({
  fetchCart: () => dispatch(fetchCart()),
});

export default connect(mapState, mapDispatch)(CheckoutSubmit);
