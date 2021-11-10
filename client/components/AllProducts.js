import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
        <div className={'gallery'}>
          {products.map(product => {
            return (
              <div className={'content'} key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img className={'all-products-image'} src={product.imageUrl} />
                </Link>
                <h2 className={'all-products-name'}>{product.name}</h2>
                <p className={'all-product-description'}>{product.description}</p>
                <p className={'all-products-price'}>{`$${product.price}.00`}</p>
                <button className={'all-products-button'}>Add to Cart</button>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
