import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/Products"

class GuestCart extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      something: "something"
    }
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount(){
    this.props.fetchProducts();
  }

  handleQuantity(event){
    let productArray = JSON.parse(window.localStorage.getItem("cart"));
    let id = event.target.id;

    productArray.forEach(item => {
      if(+item.id === +id){
        if(event.target.name === 'increment'){
          item.quantity += 1;
        } else {
          item.quantity -= 1;
        }
      }
    });
    productArray = productArray.filter(item => +item.quantity > 0);
    window.localStorage.setItem("cart", JSON.stringify(productArray));
    this.forceUpdate();
  }

  handleRemove(id){
    let productArray = JSON.parse(window.localStorage.getItem("cart"));
    productArray = productArray.filter(item => item.id !== id);
    window.localStorage.setItem("cart", JSON.stringify(productArray));
    this.forceUpdate();
  }

  render(){
    let productArray = JSON.parse(window.localStorage.getItem("cart"));
    if(productArray === null){
      productArray = [];
    }
    return (
      <div className="guest-cart">
        {productArray.length === 0 ?
        <h3>Your cart is empty</h3> : (
            productArray.map(item => {
              return (
                <div key={item.id}>
                  <h3>{item.name}</h3>
                  <h4>
                    {`$`}
                    {item.price} * {item.quantity} = {`$`} {item.price * item.quantity}
                  </h4>
                  <p>
                    Total Quantity: {item.quantity} <br />
                    <span>
                      <button
                        onClick={this.handleQuantity}
                        name="increment"
                        id={item.id}
                        className="increment-button"
                        value = {item.quantity}
                      >+</button>
                      <button
                        onClick={this.handleQuantity}
                        name="decrement"
                        id={item.id}
                        className="decrement-button"
                        value = {item.quantity}
                      >-</button>
                    </span>
                  </p>
                  <button onClick={() => this.handleRemove(item.id)}>
                    Remove from Cart
                  </button>
                </div>
              );
            })
        )
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  }
}

export default connect(mapState, mapDispatch)(GuestCart);
