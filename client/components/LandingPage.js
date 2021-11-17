import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const LandingPage = props => {
  return (
    <div className={"promotions"}>
      <div
        className={"promo-item"}
        style={{ backgroundImage: `url(/login.jpg)` }}
      >
        <div className={"promo-item-inner"}>
          <div>
            <Link to={"/Login"}>
              <h1>Login</h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={"promo-item"}
        style={{ backgroundImage: `url(/allproductsglobe.jpg)` }}
      >
        <div className={"promo-item-inner"}>
          <div>
            <Link to={"/products"}>
              <h1>ALL GLOBES</h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={"promo-item"}
        style={{ backgroundImage: `url(/signup.jpg)` }}
      >
        <div className={"promo-item-inner"}>
          <div>
            <Link to={"/signup"}>
              <h1>SIGN UP</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
