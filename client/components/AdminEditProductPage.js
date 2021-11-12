import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { Link } from "react-router-dom";
import { editProduct } from "../store/Products";

export class AdminEditProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.product.name,
      price: this.props.product.price,
      description: this.props.product.description,
      imageUrl: this.props.product.imageUrl,
      category: this.props.product.category,
      inventory: this.props.product.inventory,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.editProduct({ ...this.props.product, ...this.state });
  }

  render() {
    const { product } = this.props;
    const { name, price, description, imageUrl, category, inventory } =
      this.state;
    // edit a product form, edit the title, description, price, and image
    return (
      <div>
        <h1>Edit Product</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="description">
            Description:
            <input
              type="text"
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="price">
            Price:
            <input
              type="number"
              name="price"
              value={price}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="imageUrl">
            Image:
            <input
              type="text"
              name="imageUrl"
              value={imageUrl}
              onChange={this.handleChange}
            />
            <label htmlFor="catagory">
              Category:
              <input
                type="text"
                name="category"
                value={category}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="inventory">
              Inventory:
              <input
                type="number"
                name="inventory"
                value={inventory}
                onChange={this.handleChange}
              />
            </label>
          </label>
          <button type="submit">Submit</button>
        </form>
        <Link to="/admin">Back to Admin</Link>
      </div>
    );
  }
}

const mapState = state => {
  return {
    product: state.singleProduct,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    editProduct: product => dispatch(editProduct(product, history)),
  };
};

export default connect(mapState, mapDispatch)(AdminEditProductPage);
