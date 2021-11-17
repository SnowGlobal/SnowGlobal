import React, { useState } from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Cart from "./components/Cart";

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div id="main">
      <div id="mainBody">
        <Navbar toggleCart={() => setCartOpen(!cartOpen)} />
        <Routes />
      </div>
    </div>
  );
};

export default App;
