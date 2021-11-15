import React from 'react'
import { connect } from 'react-redux'
import { fetchSingleProduct } from '../store/singleProduct';
import { Link } from "react-router-dom";

export class SingleProductPage extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
  }

  addToCart = (id) => {
    // JOE_CR: This seems like a possible bug.
    event.preventDefault();
    //in this if statement check if the user id exists
    if(this.props.auth.id){
      console.log('hello world i can see you are logged in as ', this.props.auth)
      //if the user exists, get an array of the user's cart items by id
      // let idArray = this.props.cart.map(product => product.productId) //pseudocode
      // if(idArray.includes(id)){
      //   //if the user's cart already has the item, update the quantity
      //   this.props.updateQuantity(id) //pseudocode
      // } else {
      //   //if the user's cart does not have the item, add the item to the cart
      //   this.props.addToCart(id) //pseudocode
      // }
    } else {
      //if there is no user, check if there is a localstorage cart
      if(!window.localStorage.cart){
        window.localStorage.cart = JSON.stringify([]);
      }
      let cart = JSON.parse(window.localStorage.cart);
      let productInCart = cart.filter(item => item.productId === id)
    }
  }

  render() {
    const { id } = this.props.auth;
    console.log('this is the auth in the single product', id)
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
              {/* JOE_CR: Nice emoji :D */}
              <div>{'⭐'.repeat(product.rating)}</div>
              <p>{`$${product.price}`}</p>
            </h3>
            <form>
            <p className='quantity-box'>
              <label htmlFor='quantity'>Quantity: </label>
              <input className='quantity' type="number" name="quantity" min="1" max="10" defaultValue="1"/>
            </p>
              <button
                type="submit"
                onClick={() => this.addToCart(product.id)}
              >Add to Cart</button>
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
    auth: state.auth
  };
};

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProductPage);
