import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, toggleCart }) => (
  // <div id={"nav"}>
  //   <ul className={"nav-navbar"}>
  //     <li className={"nav-item"}>
  //       <Link to="/" className={"nav-link"}>
  //         <h1>SnowGlobal</h1>
  //       </Link>
  //     </li>
  //   </ul>
  //   <ul className={"nav-navbar"}>
  //     <li className={"nav-item"}>
  //       <Link to="/cart" className={"nav-link"}>
  //         <i className={"fas fa-shopping-cart"}></i>
  //         <span className={"link-text"}>Cart</span>
  //       </Link>
  //     </li>
  //   </ul>

  <nav>
    <div className={"nav-title"}>
      <Link to="/">
        <h1>SnowGlobal</h1>
      </Link>
    </div>
    {isLoggedIn ? (
      <div>
        {/* The navbar will show these links after you log in */}
        <a href="#" onClick={handleClick}>
          Logout
        </a>
      </div>
    ) : (
      <div>
        <ul className={"nav-area"}>
          <li className={"nav-item"}>
            <Link to="/cart">
              <a href="#">Cart</a>
            </Link>
          </li>
        </ul>
        {/* The navbar will show these links before you log in */}
        {/* <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> */}
        {/* eventually replace with an icon */}
        {/* <input type="button" onClick={toggleCart} value="Cart" /> */}
      </div>
    )}
  </nav>
  // <hr />
  // </div>
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
