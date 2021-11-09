import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import { Login, Signup } from "./components/AuthForm";
import LandingPage from "./components/LandingPage";
import { me } from "./store";

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
        <Route path="/products" component={AllProducts} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
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
