import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, toggleCart }) => (
  <div>
    <Link to="/">
      <h1 className={"nav-title"}>SnowGlobal</h1>
    </Link>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/cart">
            <input
              type="button"
              className={"cart-btn"}
              onClick={toggleCart}
              value="Cart"
            />
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <Link to="/cart">
            <input
              type="button"
              className={"cart-btn"}
              onClick={toggleCart}
              value="Cart"
            />
          </Link>
          {/* The navbar will show these links before you log in */}
          {/* eventually replace with an icon */}
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
