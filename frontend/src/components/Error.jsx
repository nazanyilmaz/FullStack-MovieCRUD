const Error = ({ info, refetch }) => {
  return (
    <div className=" text-center bg-red-500 p-5 rounded-md max-w-[800px]  text-white px-20 mt-[20vh] ">
      <h1>Oops! That page can't be found 😔</h1>

      <h1>This is Error</h1>

      <button
        onClick={refetch}
        className="border rounded-md px-3 py-1 mt-5 hover:bg-white hover:text-black transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default Error;
