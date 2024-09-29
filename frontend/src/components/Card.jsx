import { Link } from "react-router-dom";

const Card = ({ movie, index }) => {
  const r = +movie.rating;

  // rating'e göre renk belirle
  const color =
    r > 9
      ? "#0073ff"
      : r > 7.5
      ? "#04de04"
      : r > 5
      ? "orange"
      : r > 3
      ? "#d6c918"
      : "red";
  return (
    <Link
      to={`/movie/${movie.id}`}
      className=" cursor-pointer flex flex-col items-center shadow-orange-200 shadow-md rounded-xl p-3"
    >
      <div className="relative">
        <img
          src={movie.image}
          alt="poster"
          className=" rounded-lg h-[200px] w-[400px] object-contain"
        />
        <span
          className=" bg-green-500 p-1 rounded-full text-white font-normal absolute right-1 bottom-1"
          style={{ background: color }}
        >
          {Number(movie.rating).toFixed(1)}
        </span>
        <h3 className=" mt-4 font-bold">{movie.title}</h3>
        <p className="text-gray-500 flex gap-5">
          <span>{movie.year}</span>
          <span>{movie.genre}</span>
        </p>
      </div>
    </Link>
  );
};

export default Card;
