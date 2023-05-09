import { Link, useParams } from "react-router-dom";
import userImg from "../assets/user.png";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuthContext from "../context/AuthContext";
import { timeAgo } from "../constants/data";

const SinglePost = () => {
  const [fetchedPost, setFetchedPost] = useState("")
  const [fetchedComment, setFetchedComment] = useState([])
  const { blogId } = useParams()
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState([])
  const { user } = useAuthContext()

  const token = user?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/post/${blogId}`);
        setFetchedPost(response.data);
        setIsLoading(false)
        // console.log(response.data)
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    };
    fetchPost();

  

    const fetchComment = async () => {
      try {
        const response = await axios.get(`/comment/${blogId}`);
        setFetchedComment(response.data);
        // console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchComment();
  }, [blogId, fetchedComment]);



  const submitComment = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await axios.post(`/comment`, { comment, postId: blogId }, { headers });
      setIsSubmitting(false)
      setComment("")
      console.log(response)
    } catch (error) {
      setIsSubmitting(false)
      if(error.response.status === 400){
        setError(error.response.data.errors)
      }
    }
  }
  return (
    <>
      <Navbar />
      <div className="w-full px-5 md:px-24 py-8 md:py-8 flex flex-col items-center">
       {isLoading ? (<p className="font-semibold text-lg">Loading...</p>) : ( <div className=" w-full md:w-3/4 flex flex-col  px-2">
          <img src={fetchedPost.photo} />
          <h1 className="mt-3 font-bold text-2xl text-left">
            {fetchedPost.title}
          </h1>
          <p className="mt-2 font-bold mb-2"> {fetchedPost.author}: {new Date(fetchedPost.createdAt).toLocaleString('en-US', { month: 'long', year: 'numeric' })} </p>
          <p>{fetchedPost.description}</p>

          <div className="mt-5">
            <h2 className="font-bold text-xl">Comments:</h2>
            <form onSubmit={submitComment}>
            <textarea value={comment} onChange={(e) => {setComment(e.target.value)}} className="border outline-none w-full h-48 p-3">
                Write a comment
            </textarea>
            {error.comment && 
              (<p className="text-red-700">{error.comment.properties.message}</p>)
            }
           {user != null ? ( <button disabled={isSubmitting} type="submit" className={`px-10 py-2 bg-gray-900 text-white hover:bg-gray-950 font-bold ${isSubmitting && 'cursor-not-allowed'}`}>{isSubmitting ? 'Submitting..' : 'Submit'}</button>): (<Link to="/sign-in" className="text-red-700 font-bold">Click to Login to post a Comment</Link>)}
            </form>
            <div className="mt-5 ">
              {fetchedComment.length < 1 && 'No Comment Yet!'}
              {fetchedComment.map((item) => ( 
                <div key={item._id} className="flex gap-2 border border-gray-100  p-2 mb-2">
                    <img src={userImg} width="50" height='50' style={{ maxHeight: 50 }}></img>
                    <div>
                    <h4 className="text-lg  font-bold">{item.username} <span className="text-sm font-medium">{timeAgo(new Date(item.createdAt))}</span></h4>
                    <p className="pt-1 text-sm">{item.comment}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>)}
      </div>

      <Footer />
    </>
  );
};

export default SinglePost;
