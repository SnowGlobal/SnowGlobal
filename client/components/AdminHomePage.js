import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts, deleteProduct } from "../store/Products";
import { Link } from "react-router-dom";

class AdminHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentWillMount() {
    this.props.fetchProducts();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ products: nextProps.products });
  }

  render() {
    return (
      <div>
        <h1>Admin Home Page</h1>
        {/* <Link to="/admin/add-product">Add Product</Link>
        <Link to="/admin/edit-product">Edit Product</Link> */}
        {/* <Link to="/admin/delete-product">Delete Product</Link> */}
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.deleteProduct(this.state.productId);
          }}
        >
          <label>
            Product Id:
            <input
              type="text"
              name="productId"
              onChange={e => {
                this.setState({ productId: e.target.value });
              }}
            />
          </label>
          <button type="submit">Delete Product</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map(product => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.image}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { products: state.products };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProducts: bindActionCreators(fetchProducts, dispatch),
    deleteProduct: productId => dispatch(deleteProduct(productId)),
    // editProduct: bindActionCreators(editProduct, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHomePage);
