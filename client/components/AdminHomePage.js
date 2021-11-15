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

  componentDidMount() {
    this.props.fetchProducts();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ products: nextProps.products });
  }

  render() {
    return (
      <div>
        <h1>Admin Home Page</h1>
        <h2>Products</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              {/* <th>Image</th> */}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                {/* <td>
                  <img src={product.imageUrl} alt={product.name} />
                </td> */}
                <td>
                  <Link to={`admin/edit/${product.id}`}>Edit</Link>
                </td>
                <td>
                  <button onClick={() => this.props.deleteProduct(product.id)}>
                    Delete
                  </button>
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
    deleteProduct: productId => dispatch(deleteProduct(productId)),
    // editProduct: bindActionCreators(editProduct, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHomePage);
