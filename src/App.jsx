import { React, useState } from "react";
import Search from "./components/search";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("Heloo");
  return (
    <div>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <h1>
            <img src="./hero-img.png" alt="Hero Banner" />
            Find <span className="text-gradient"> Movies </span>you'll Enjoy
            without the Hassle
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </div>
  );
};

export default App;
