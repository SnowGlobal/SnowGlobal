import React from 'react'
import { connect } from 'react-redux'
import { fetchSingleProduct } from '../store/singleProduct';
import { Link } from "react-router-dom";
import { addToCart, fetchCart } from "../store/Cart";

export class SingleProductPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quantity: 1
    }

    this.addToCart = this.addToCart.bind(this);
  }

  async componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
    if (this.props.auth.id) {
      await this.props.fetchCart();
    }
  }

  async addToCart (event, id){
    //in this if statement check if the user id exists
    event.preventDefault();
    if(this.props.auth.id){
      await this.props.addToCart(id, +this.state.quantity);
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
              <input
                className='quantity'
                type="number"
                name="quantity"
                min="1" max="10"
                defaultValue={this.state.quantity}
                onChange={(event) => this.setState({quantity: event.target.value})}
              />
            </p>
              <button
                type="submit"
                onClick={(event) => this.addToCart(event, product.id)}
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
    auth: state.auth,
    cart: state.cart,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    addToCart: (id, quantity) => dispatch(addToCart(id, quantity)),
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapState, mapDispatch)(SingleProductPage);
