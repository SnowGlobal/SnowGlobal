import React from "react";
import { Link } from "react-router-dom";

class GuestCheckout extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push("/checkout-submit");
  }

  render() {
    let productArray = JSON.parse(localStorage.getItem("cart"));
    let productTotal = 0;
    return (
      <div>
        <h1>Checkout</h1>
        <table>
          <tbody>
            <tr className="table-head">
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
            {productArray.map((product) => {
              productTotal += product.price * product.quantity;
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price * product.quantity}</td>
                </tr>
              );
            })}
            <tr>
              <td>Total ${productTotal}.00</td>
            </tr>
          </tbody>
        </table>
        <h3>Customer Information</h3>
        <form className="checkout-form" onSubmit={this.handleSubmit}>
          <label>Shipping Information</label>
          <input name="address" placeholder="Address" />
          <input name="state" placeholder="State" />
          <input name="zipcode" placeholder="Zipcode" />
          <label>Customer Information</label>
          <input name="firstName" placeholder="First Name" />
          <input name="lastName" placeholder="Last Name" />
          <Link to={`/checkout-submit`}>
            <button type="submit" onClick={this.handleSubmit}>
              Confirm Checkout
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default GuestCheckout;
