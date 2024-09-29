import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Card from "../components/Card";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useSearchParams } from "react-router-dom";

const MainPage = () => {
  const [params, setParams] = useSearchParams();
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const options = {
    params: {
      query: params.get("query"),
    },
  };

  useEffect(() => {
    setIsLoading(true);
    api
      .get("/api/movies")
      .then((res) => setMovies(res?.data?.movies))
      .catch((err) => setError(err?.response?.data?.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <Hero />
      <div>
        <h1 className=" text-[#fc9642] text-3xl m-5">
          <span className="bg-white text-[fc9642] rounded-xl p-2 mr-3 shadow-md shadow-[#fc9642]">
            {movies?.length}
          </span>
          Movies Found
        </h1>
      </div>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 ">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error message={error} />
        ) : (
          movies?.map((movie, i) => (
            <Card key={movie.id} movie={movie} index={i} />
          ))
        )}
      </div>
    </div>
  );
};

export default MainPage;
