import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-6">
      <Link to={"/"} className="flex items-center">
        <img src="/logo3.png" width={200} />
      </Link>
      <Link
        to={"/create"}
        className=" rounded-full  text-yellow-500 text-md p-2 px-5 shadow-yellow-500 shadow-md hover:shadow-yellow-300 hover:shadow-lg"
      >
        Create Movie
      </Link>
    </header>
  );
};

export default Header;
