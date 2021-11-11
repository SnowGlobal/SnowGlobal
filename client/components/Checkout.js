import React from "react";
import { connect } from "react-redux";
import { deleteProduct } from "../store/Products";
import { fetchCart } from "../store/Cart";

///this is not explicitly laid out yet, but presuming
///the checkout component is being passed several product objects
//the component should bring you to a confirmation page
//on submit remove items from db

const dummyCart = [
  {
    productId: "73-0144764",
    name: "Oriental short-clawed otter Snowglobe",
    price: 12,
    description:
      "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    imageUrl: "http://dummyimage.com/x.png/5fa2dd/ffffff",
    inventory: 51,
    category: "small",
    rating: 0,
  },
  {
    productId: "60-5809053",
    name: "Lizard (unidentified) Snowglobe",
    price: 54,
    description:
      "Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.",
    imageUrl: "http://dummyimage.com/x.png/5fa2dd/ffffff",
    inventory: 3,
    category: "small",
    rating: 2,
  },
];

export class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props;
  }

  handleSubmit(evt) {
    evt.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <table>
          <tbody>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            {dummyCart.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>1</td>
                  <td>{product.price}</td>
                  <td>{product.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h3>Customer Information</h3>
        <form id="shipping-form" onSubmit={this.handleSubmit}>
          <label>Shipping Address</label>
          <input name="address" />
          <label>Name</label>
          <input name="name" />
          <button type="submit">Confirm Checkout</button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  };
};
const mapDispatch = (dispatch) => ({
  getCart: () => dispatch(fetchCart()),
  deleteProduct: (id) => dispatch(deleteProduct(id)),
});

export default connect(mapState, mapDispatch)(Checkout);
