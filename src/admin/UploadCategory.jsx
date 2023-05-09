import { useState } from "react";
import useAuthContext from "../context/AuthContext";
import axios from "../api/axios";
import Navbar from "./components/Navbar";
import Footer from "../components/Footer";


const UploadCategory = () => {
    const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [error, setError] = useState([]);
  const [duplicate, setDuplicate] = useState([]);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const token = user?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(false)
    try{
        const response = await axios.post('/category', {name}, {headers})
        if(response.status === 200){
          setSuccess(true)
          setError([])
          setDuplicate([])
          setName("")
          setIsSubmitting(false)
        }
    }catch(e){
        if(e.response.status === 400){
          setError(e.response.data.errors)
          setIsSubmitting(false)
        }else if (e.response.status === 422) {
            setError([]);
            setDuplicate(e.response.data.error);
            setIsSubmitting(false)
        }
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="flex px-5 py-32 mb-10 justify-center">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-lg font-bold mb-2">
          Create New Blog Category
        </h1>
        {success && (<p className="text-center text-green-800 m-3">Category added sucessfully</p>)}
        <div className="mb-2">
          <input
            type="text"
            className="border outline-none w-80 md:w-96 p-3 text-sm"
            placeholder="Enter Blog Category"
            value={name}
            onChange={(e) => {setName(e.target.value)}}
          />
          {error.name && (
            <p className="text-red-600">{error.name.properties.message}</p>
          )}
          {duplicate && (
            <p className="text-red-600">{duplicate}</p>
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
            {isSubmitting ? "Submitting..." : "Submit Category"}
          </button>
        </div>
        
        
      </form>
    </div>
    <Footer></Footer>
    </>
  )
}

export default UploadCategory