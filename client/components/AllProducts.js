import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/Products";
import { addToCart, fetchCart } from "../store/Cart";

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      search: "",
      category: "",
      size: "",
      quantity: 1,
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }
  componentDidMount() {
    this.props.fetchProducts();
  }

  // add product to cart
  async handleAddToCart(id) {
    if (this.props.auth.id) {
      await this.props.addToCart(id, 1);
      await this.props.fetchCart();
    } else {
      if (!window.localStorage.cart) {
        window.localStorage.cart = JSON.stringify([]);
      }
      let cart = JSON.parse(window.localStorage.cart);
      let productInCart = cart.filter(item => item.productId === id);
      if (productInCart.length > 0) {
        productInCart[0].quantity += +this.state.quantity;
      } else {
        let product = this.props.products[id - 1];
        cart.push({
          id,
          name: product.name,
          price: product.price,
          quantity: +this.state.quantity,
        });
      }
      window.localStorage.cart = JSON.stringify(cart);
      this.props.history.push("/cart");
    }
  }

 render() {
   const products = this.props.products;
   return (
     <div className={'all-products-container'}>
       <h1>Shop All Snowglobes</h1>
       <select
         value={this.state.category}
         onChange={(e) => {
           this.setState({ category: e.target.value });
         }}
       >
         <option value={''}>Select Season</option>
         <option value="fall">Fall</option>
         <option value="winter">Winter</option>
       </select>
       <select
         value={this.state.size}
         onChange={(e) => {
           this.setState({ size: e.target.value });
         }}
       >
         <option value={''}>Select Size</option>
         <option value="small">Small</option>
         <option value="medium">Medium</option>
         <option value="large">Large</option>
       </select>
       <div className={'gallery'}>
         {products
           .filter((product) => {
            if (this.state.category == '') {
               return product;
             } else if (this.state.category == product.category) {
               return product;
             } else if (this.state.size == '') {
              return product;
            } else if (this.state.size == product.size) {
              return product;
            }
           })
           .map((product) => {
             return (
               <div className={'content'} key={product.id}>
                 <Link to={`/products/${product.id}`}>
                   <img className={'all-products-image'} src={product.imageUrl} />
                 </Link>
                 <h2 className={'all-products-name'}>{product.name}</h2>
                 <div className={'all-product-description-container'}>
                   <p className={'all-product-description'}>{product.description}</p>
                 </div>
                 <p className={'all-products-size'}>{product.size}</p>
                 <p className={'all-products-price'}>{`$${product.price}.00`}</p>
                 <button className={'all-products-button'} onClick={() => this.handleAddToCart(product.id)}>
                   Add to Cart
                 </button>
               </div>
             );
           })}
       </div>
     </div>
   );
 }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addToCart: (id, quantity) => dispatch(addToCart(id, quantity)),
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
