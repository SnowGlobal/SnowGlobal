import React from 'react'
import { connect } from 'react-redux'
import { fetchSingleProduct } from '../store/singleProduct';

export class SingleProductPage extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
  }

  render() {
    const { product } = this.props;

    return (
      <div>
        <h1>{product.name}</h1>
        <img src ={product.imageUrl}/>
        <p>{`rating: ${product.rating}`}</p>
        <p>{product.description}</p>
        <p>{`$${product.price}`}</p>
        <button>Add to Cart</button>
      </div>
    );
  }
}

const mapState = state => {
  return {
    product: state.singleProduct,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProductPage);
