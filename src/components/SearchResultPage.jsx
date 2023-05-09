import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../admin/components/Navbar";
import Footer from "./Footer";

const SearchResultPage = () => {
  const location = useLocation();
  const [fetchedPost, setFetchedPost] = useState([]);

  const { data } = location.state;
  useEffect(() => {
    setFetchedPost(data);
  }, [data]);

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full px-5 md:px-24 py-8 md:py-16">
        <h1 className="md:px-4 text-2xl font-bold mb-10">Search Results</h1>
        <div className="w-full">
          <h4 className="md:px-4 py-4 md:py-6 font-bold">Blog Posts</h4>
          <div className="w-full flex flex-wrap md:px-4 py-3 md:py-3">
            {fetchedPost.length > 0 ? (
              fetchedPost.map((item) => (
                <div key={item._id} className="w-full md:w-1/3 pr-4 mb-5">
                  <img src={item.photo} />
                  <p className="font-bold text-xs mt-3">
                    {item.author}:{" "}
                    {new Date(item.createdAt).toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link to={`/post/${item._id}`}>
                      <h1 className="font-bold mt-1 text-lg">{item.title}</h1>
                    </Link>
                    <i className="ri-arrow-right-up-fill text-lg"></i>
                  </div>
                  <p className="mt-1 text-sm">
                    {item.description.slice(0, 120) + "..."}
                  </p>
                </div>
              ))
            ) : (
              <p>No search results found.</p>
            )}
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default SearchResultPage;
