import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/Products";

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    console.log(this.props);
    const products = this.props.products;
    return (
      <div>
        <h1>All Products</h1>
        <ul>
          {products.map(product => {
            return (
              <li key={product.id}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <img src={product.imageUrl} />
                <p>{product.inventory}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
