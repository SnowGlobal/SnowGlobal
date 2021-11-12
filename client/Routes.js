import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import { Login, Signup } from "./components/AuthForm";
import LandingPage from "./components/LandingPage";
import Checkout from "./components/Checkout";
import SingleProductPage from "./components/SingleProduct";
import Cart from "./components/Cart";
import AdminHomePage from "./components/AdminHomePage";
import AdminEditProductPage from "./components/AdminEditProductPage";

/**
 * COMPONENT
 */
const Routes = () => {
  // componentDidMount() {
  //   this.props.loadInitialData();
  // }

  // render() {
  // const { isLoggedIn } = this.props;
  return (
    <div>
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:id" component={SingleProductPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route exact path="/admin" component={AdminHomePage} />
        <Route path="/admin/edit/:id" component={AdminEditProductPage} />
        {/* Displays our Login component as a fallback */}
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
//     // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
//     isLoggedIn: !!state.auth.id,
//   };
// };

// const mapDispatch = dispatch => {
//   return {
//     loadInitialData() {
//       dispatch(me());
//     },
//   };
// };

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes));

export default withRouter(Routes);
