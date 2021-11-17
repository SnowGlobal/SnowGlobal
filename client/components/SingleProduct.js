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
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
    if (this.props.auth.id) {
      this.props.fetchCart();
    }
  }


  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  addToCart (event, id){
    
    event.preventDefault();

    //basic validation
    if(this.state.quantity > 10){
      alert("You can only order up to 10 items at a time");
      return
    } else if(this.state.quantity < 1){
      alert("You must order at least 1 item");
      return
    }
    //in this if statement check if the user id exists
    if(this.props.auth.id){
      this.props.addToCart(id, +this.state.quantity);
      this.props.history.push('/cart');
    } else {
      //if there is no user, check if there is a localstorage cart
      if(!window.localStorage.cart){
        window.localStorage.cart = JSON.stringify([]);
      }
      let cart = JSON.parse(window.localStorage.cart);
      let productInCart = cart.filter(item => item.productId === id)
      if(productInCart.length > 0){
        productInCart[0].quantity += +this.state.quantity;
      } else {
        cart.push({
          id,
          name: this.props.product.name,
          price: this.props.product.price,
          quantity: +this.state.quantity
        });
      }
      window.localStorage.cart = JSON.stringify(cart);
      this.props.history.push('/cart');
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
                onChange={this.handleChange}
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

const mapState = state => { //
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