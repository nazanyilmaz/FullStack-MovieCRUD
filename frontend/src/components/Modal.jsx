import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Modal = ({ movie, close }) => {
  const navigate = useNavigate();
  const handleDelete = (e) => {
    axios
      .delete(`http://127.0.0.1:5001/api/movies/${movie.id}`)
      .then((res) => {
        toast.warning(`${movie.title} deleted!!`);
        navigate("/");
      })
      .catch((err) => {
        toast.error("Deleting movie failed");
      });
  };
  return (
    <div className="fixed bg-black w-full h-full inset-0 bg-opacity-70 grid place-items-center">
      <div className="bg-black rounded-lg shadow-md shadow-yellow-500 ">
        <h1 className="text-xl flex flex-col gap-4 text-yellow-500 p-5 py-10">
          <span className=" text-center text-2xl">{movie.title}</span>
          <span> Are you sure you want to delete this film?</span>
        </h1>
        <h1 className=" text-gray-600 text-center font-semibold">
          {" "}
          Do you approve this transaction?
        </h1>
        <div className="flex justify-end gap-3 p-2 m-3">
          <button
            onClick={close}
            className="bg-gray-400 p-1 rounded-md hover:bg-gray-600 "
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className=" bg-gray-400 rounded-md hover:bg-red-600 p-1"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
