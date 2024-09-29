import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const Hero = () => {
  const [params, setParams] = useSearchParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    //aratilan kelimeye eris
    const text = e.target[0].value;
    //url'e parametre olarak formadan alinan teti ekle
    setParams({ query: text });
  };
  return (
    <div className="p-10 py-15  lg:px-32 mb-10 ">
      <h1 className=" text-3xl md:text-5xl font-bold text-yellow-600">
        Welcome
      </h1>
      <h2 className=" text-xl md:text-3xl text-yellow-600">
        Discover millions of movies, TV series and actors.
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex mt-5 gap-5 relative items-center"
      >
        <input
          placeholder="Movies, TV series, actors"
          type="text"
          className="w-full h-12 rounded-full py-2 px-5 text-black"
        />
        <button className=" text-yellow-500 text-2xl h-12 bg-black py-2 px-8  shadow-md shadow-yellow-500 font-semibold rounded-full  absolute end-0 hover:shadow-yellow-200">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default Hero;
