import React from 'react'
import { connect } from 'react-redux'
import { fetchSingleProduct } from '../store/singleProduct';
import { Link } from "react-router-dom";

export class SingleProductPage extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
  }

  render() {
    const { product } = this.props;
    return (
      <div>
        <div className="single-product-container">
          <div className="single-product-image">
            <h1>{product.name}</h1>
            <div className='single-product-image-container'>
              <img src ={product.imageUrl}/>
            </div>
          </div>
          <div className='single-product-description'>
            <h3>
              {product.name}
              <div>{'⭐'.repeat(product.rating)}</div>
              <p>{`$${product.price}`}</p>
            </h3>
            <form>
            <p className='quantity-box'>
              <label htmlFor='quantity'>Quantity: </label>
              <input className='quantity' type="number" name="quantity" min="1" max="10" defaultValue="1"/>
            </p>
              <button type="submit">Add to Cart</button>
            </form>
            <p>{product.description}</p>
            <Link to={'/products'}>
              <p>◄ Continue Shopping</p>
            </Link>
          </div>
        </div>
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
