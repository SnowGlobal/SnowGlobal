import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../store/Products";
import { fetchCart } from "../store/Cart";
import checkoutSubmit, { CheckoutSubmit } from "./checkoutSubmit";

///this is not explicitly laid out yet, but presuming
///the checkout component is being passed several product objects
//the component should bring you to a confirmation page
//on submit remove items from db

const dummyCart = [
  {
    id: 1,
    productId: "73-0144764",
    name: "Oriental short-clawed otter Snowglobe",
    price: 12,
    description:
      "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    imageUrl: "http://dummyimage.com/x.png/5fa2dd/ffffff",
    inventory: 51,
    category: "small",
    quantity: 2,
  },
  {
    id: 2,
    productId: "60-5809053",
    name: "Lizard (unidentified) Snowglobe",
    price: 54,
    description:
      "Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.",
    imageUrl: "http://dummyimage.com/x.png/5fa2dd/ffffff",
    inventory: 3,
    category: "small",
    quantity: 1,
  },
];

export class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit(evt) {
    evt.preventDefault();
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Checkout</h1>
        <table>
          <tbody>
            <tr className="table-head">
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
            {dummyCart.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price * product.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h3>Order Information</h3>
        <form className="checkout-form" onSubmit={this.handleSubmit}>
          <label>Shipping Information</label>
          <input name="address" placeholder="Address" />
          <input name="state" placeholder="State" />
          <input name="zipcode" placeholder="Zipcode" />
          <label>Customer Information</label>
          <input name="firstName" placeholder="First Name" />
          <input name="lastName" placeholder="Last Name" />
          <Link to={`/checkout-submit`}>
            <button type="submit">Confirm Checkout</button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatch = (dispatch) => ({
  fetchCart: () => dispatch(fetchCart()),
  deleteProduct: (id) => dispatch(deleteProduct(id)),
});

export default connect(mapState, mapDispatch)(Checkout);
