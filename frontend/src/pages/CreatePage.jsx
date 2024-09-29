import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";

const CreatePage = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    //console.log(data);

    api
      .post("/api/movies", data)
      .then((res) => {
        // show notification
        toast.success("New movie is added successfully 🥂!!!"),
          console.log(toast.success);
        // go back to home page
        navigate("/");
      })
      .catch((err) => {
        // show notification
        toast.error("Adding movie failed 😔");
      });
  };
  return (
    <div className="grid place-items-center mt-20">
      <div className=" rounded p-10 py-20 shadow-md shadow-yellow-500 w-[600px]">
        <h1 className="text-4xl text-yellow-500 font-bold mb-16 text-center">
          Create a New Movie
        </h1>
        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <CustomInput label="Title" type="text" name="title" />
          <CustomInput label="Category" type="text" name="genre" />
          <CustomInput label="Rating" type="number" name="rating" />
          <CustomInput label="Year" type="number" name="year" />
          <CustomInput label="Description" type="text" name="description" />
          <CustomInput label="Image" type="text" name="image" />

          <button
            // onClick={() => navigate("/")}
            className=" text-yellow-600 shadow-md shadow-yellow-500 rounded-full py-3 hover:shadow-yellow-300 text-xl"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
