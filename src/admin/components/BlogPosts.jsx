import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuthContext from "../../context/AuthContext";

const BlogPosts = () => {
  const [fetchedPost, setFetchedPost] = useState([]);
  const { user } = useAuthContext();

  const token = user?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`/post/${id}`, { headers });
          if (response.status === 200) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        } catch (error) {
          console.log(error);
          console.log(error.response);
        }
      }
    });
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/post`);
        setFetchedPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [handleDelete]);

  return (
    <>
      <Navbar></Navbar>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-5 md:mx-24 mt-24 mb-36">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Description</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Category</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Edit</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Delete</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {fetchedPost.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.title}
                </th>
                <td className="px-6 py-4">
                  {item.description.slice(0, 80) + "..."}
                </td>
                <td className="px-6 py-4">{item.categories}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/edit-post/${item._id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <p
                    onClick={() => handleDelete(item._id)}
                    className="font-medium text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer></Footer>
    </>
  );
};

export default BlogPosts;
