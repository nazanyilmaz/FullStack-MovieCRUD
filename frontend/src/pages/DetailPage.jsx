import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Modal from "../components/Modal";

const DetailPage = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  //url'den film ID ulasma
  const { id } = useParams();
  //console.log(id);
  //API'dan film verileri al
  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => setError(err?.response?.data?.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="p-10">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : (
        movie && (
          <div>
            <div className=" flex justify-end" onClick={() => setIsOpen(true)}>
              <button className=" bg-red-600 text-white p-3 text-2xl rounded-full hover:bg-red-400">
                <FaTrashAlt />
              </button>
            </div>
            <div className="flex flex-col gap-10 items-center md:flex-row">
              <div className="mt-[-30px]">
                <img
                  src={movie.image}
                  className="rounded-lg max-w-[500px] max-h-[500px]relative"
                />
              </div>
              <div className="">
                <h1 className="text-5xl font-semibold mb-10">
                  {movie.title} <span> ({movie.year})</span>
                </h1>

                <div className=" shadow-sm shadow-yellow-500 rounded-full mb-5">
                  <span className="px-3 py-1 justify-center  flex text-xl text-white fony-semibold rounded-full ">
                    {movie.genre}
                  </span>
                </div>
                <div className="flex flex-row gap-3 mt-10 justify-center">
                  <button className="shadow-md shadow-yellow-500 mb-5 text-yellow-500 p-5 rounded-full hover:shadow-yellow-300 hover:shadow-lg text-xl">
                    <FaHeart />
                  </button>
                  <button className="shadow-md shadow-yellow-500 mb-5 text-yellow-500 p-5 rounded-full hover:shadow-yellow-300 hover:shadow-lg text-xl">
                    <FaBookmark />
                  </button>
                  <button className=" shadow-md shadow-yellow-500 mb-5 text-yellow-500 p-5 rounded-full hover:shadow-yellow-300 hover:shadow-lg text-xl">
                    <FaStar />
                  </button>
                </div>
              </div>
            </div>
            <p className=" p-4 my-3 py-48font-medium text-gray-600 text-lg">
              {movie.description}
            </p>
            {movie.cast && (
              <div className="flex flex-row gap-16 justify-center">
                <div className="flex justify-center items-center flex-col cursor-pointer rounded-full gap-3">
                  <img
                    src={movie?.cast[0]?.image}
                    alt={movie?.cast[0]?.name}
                    className="w-20 h-20 rounded-full"
                  />
                  <p className=" font-normal hover:font-bold">
                    {movie?.cast[0]?.name}
                  </p>
                </div>
                <div className="flex justify-center items-center flex-col cursor-pointer  rounded-full gap-3">
                  <img
                    src={movie?.cast[1]?.image}
                    alt={movie?.cast[1]?.name}
                    className="w-20 h-20 rounded-full "
                  />
                  <p className=" font-normal hover:font-bold">
                    {movie?.cast[1]?.name}
                  </p>
                </div>
                <div className="flex justify-center items-center flex-col cursor-pointer  rounded-full gap-3">
                  <img
                    src={movie?.cast[2]?.image}
                    alt={movie?.cast[2]?.name}
                    className="w-20 h-20 rounded-full"
                  />
                  <p className=" font-normal hover:font-bold">
                    {movie?.cast[2]?.name}
                  </p>
                </div>
                <div className="flex justify-center items-center flex-col cursor-pointer  rounded-full gap-3">
                  <img
                    src={movie?.cast[3]?.image}
                    alt={movie?.cast[3]?.name}
                    className="w-20 h-20 rounded-full"
                  />
                  <p className=" font-normal hover:font-bold">
                    {movie?.cast[3]?.name}
                  </p>
                </div>
              </div>
            )}
          </div>
        )
      )}

      {isOpen && <Modal movie={movie} close={() => setIsOpen(false)} />}
    </div>
  );
};

export default DetailPage;
