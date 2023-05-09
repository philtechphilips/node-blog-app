import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";
import axios from "../../api/axios";
import Navbar from "./Navbar";
import Footer from "../../components/Footer";

const EditPost = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const [duplicate, setDuplicate] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const token = user?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/post/${id}`, { headers });
        setTitle(response.data.title);
        setDescription(response.data.description);
        setError([]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true)
    try {
      const response = await axios.put(
        `/post/${id}`,
        { description, title },
        { headers }
      );
      if (response.status === 200) {
        setSuccess(true);
        setError([]);
        setTitle("");
        setDescription("");
        setIsSubmitting(false)
      }
    } catch (e) {
      if (e.response.status === 400) {
        setError(e.response.data.errors);
        setIsSubmitting(false)
      } else if (e.response.status === 422) {
        setError([]);
        setDuplicate(e.response.data.error);
        setIsSubmitting(false)
      }
    }
  };

  const sanitizeInput = (input) => {
    return input.replace(/:/g, "");
  };

  const handleInputChange = (event) => {
    const enteredText = event.target.value;
    const sanitizedText = sanitizeInput(enteredText);
    setTitle(sanitizedText);
  };

  const handleInputChange2 = (event) => {
    const enteredText = event.target.value;
    const sanitizedText = sanitizeInput(enteredText);
    setDescription(sanitizedText);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center">
        <Link
          to="/blog-posts"
          className="px-4 py-2 mt-10 font-semibold hover:text-gray-900"
        >
          Blog Posts
        </Link>
        <Link
          to="/new-category"
          className="px-4 py-2 mt-10 font-semibold hover:text-gray-900"
        >
          New Category
        </Link>
        <Link
          to="/categories"
          className="px-4 py-2 mt-10 font-semibold hover:text-gray-900"
        >
          Categories
        </Link>
      </div>
      <div className="flex px-5 py-10 pb-32 justify-center">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-lg font-bold mb-2">
            Upload New Blog Post
          </h1>
          {success && (
            <p className="text-center text-green-800 m-3">
              Blog Post Updated sucessfully
            </p>
          )}
          <div className="mb-2">
            <input
              type="text"
              className="border outline-none w-80 md:w-96 p-3 text-sm"
              placeholder="Enter Blog Title"
              value={title}
              onChange={handleInputChange}
            />
            {error.title && (
              <p className="text-red-600">{error.title.properties.message}</p>
            )}
            {duplicate && <p className="text-red-600">{duplicate}</p>}
          </div>

          <div className="mb-2">
            <textarea
              rows="10"
              className="border outline-none w-80 md:w-96 p-3 text-sm"
              placeholder="Enter Blog Description"
              value={description}
              onChange={handleInputChange2}
            />
            {error.description && (
              <p className="text-red-600">
                {error.description.properties.message}
              </p>
            )}
          </div>

          <div className="mb-2">
            <button
              disabled={isSubmitting}
              type="submit"
              className={`border outline-none w-80 md:w-96 p-3 bg-gray-900 hover:bg-gray-950 text-white text-md ${
                isSubmitting && "cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Upload Blog Post"}
            </button>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </>
  );
};

export default EditPost;
