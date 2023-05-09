import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

const BlogPost = () => {
  const location = useLocation();

  const [fetchedPost, setFetchedPost] = useState([]);
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const [loading, setLoading] = useState(false)
  

  
  useEffect(() => {
    const fetchPost = async () => {
        try {
            setLoading(true)
            const queryParams = new URLSearchParams(location.search);
            const category = queryParams.get('category');
    
            if (category) {
              const response = await axios.get(`/post?category=${category}`);
              setFetchedPost(response.data);
              setLoading(false)
            }else{
                const response = await axios.get(`/post`);
                setFetchedPost(response.data);
                setLoading(false)
            }
          } catch (error) {
            console.log(error);
            setLoading(false)
          }
        };
    
        fetchPost();
      }, [location]);


useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`/category`);
        setFetchedCategory(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategory();

  }, [location.search]);




  return (
    <div className="w-full px-5 md:px-24 py-8 md:py-16">
      <div className="flex flex-wrap gap-4 md:gap-12 md:px-4">
        <Link
          to="/"
          className={`text-gray-600 font-bold ${
            location.search === ""
              ? "text-black border-b-2 border-black pb-1"
              : ""
          }`}
        >
          View All
        </Link>
        {fetchedCategory.map((item) => (
            <Link
            key={item._id}
            to={`/?category=${item.name}`}
            className={`text-gray-600 font-bold ${
              location.search === `?category=${item.name}`
                ? "text-black border-b-2 border-black pb-1"
                : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="w-full">
        <h4 className="md:px-4 py-4 md:py-6 font-bold">Blog Posts</h4>
        {loading ? (<p className="mx-4 text-2xl font-semibold">Loading Post...</p>) : (
          <div className="w-full flex flex-wrap md:px-4 py-3 md:py-3">
          {fetchedPost.map((item) => (
            <div key={item._id} className="w-full md:w-1/3 pr-4 mb-5">
              <img src={item.photo} />
              <p className="font-bold text-xs mt-3">
                {item.author}: {new Date(item.createdAt).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
              </p>
              <div className="flex justify-between items-center">
                <Link to={`/post/${item._id}`}>
                <h1 className="font-bold mt-1 text-lg">{item.title}</h1>
                </Link>
                <i className="ri-arrow-right-up-fill text-lg"></i>
              </div>
              <p className="mt-1 text-sm">{item.description.slice(0, 120) + "..."}</p>
              {/* <div className="flex flex-wrap mt-3 mb-4">
                <p className="px-4 py-1 mr-1 border rounded-full text-sm border-gray-800">
                  {item.category}
                </p>
              </div> */}
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
