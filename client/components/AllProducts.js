import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/Products";
import { addToCart, fetchCart } from "../store/Cart";

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      search: "",
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }
  componentDidMount() {
    this.props.fetchProducts();
  }

  // add product to cart
  async handleAddToCart(id) {
    await this.props.addToCart(id);
    await this.props.fetchCart();
  }

  render() {
    const products = this.props.products;
    return (
      <div>
        <h2 className={"all-products-title"}>Shop All Snowglobes</h2>
        <div className={"all-products"}>
          {products.map(product => {
            return (
              <div className={"product-item"} key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img
                    className={"product-item-image"}
                    src={product.imageUrl}
                    alt={product.name}
                  />
                  <h4 className={"product-item-name"}>{product.name}</h4>
                  <p
                    className={"all-products-price"}
                  >{`$${product.price}.00`}</p>
                </Link>
                <button
                  className={"btn-add-to-cart"}
                  onClick={() => this.handleAddToCart(product.id)}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addToCart: id => dispatch(addToCart(id)),
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
