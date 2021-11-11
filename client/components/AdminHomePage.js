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
        <Link to="/admin/delete-product">Delete Product</Link>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Quantity</th>
              <th>Product Category</th>
              <th>Product Image</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category}</td>
                <button onClick={() => this.props.deleteProduct(product.id)}>
                  Delete
                </button>
                <td>
                  <img src={product.image} />
                </td>
              </tr>
            ))}
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
    deleteProduct: bindActionCreators(deleteProduct, dispatch),
    // editProduct: bindActionCreators(editProduct, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHomePage);
