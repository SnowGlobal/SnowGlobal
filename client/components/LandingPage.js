import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const LandingPage = props => {
  return (
    <div>
      <h1>SnowGlobal</h1>
      <h2>Worlds #1 Dumb big Snow Globe Store</h2>
      <Link to="/products">
        <button>View Products</button>
      </Link>
    </div>
  );
};

export default LandingPage;
