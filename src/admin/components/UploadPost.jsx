import { useEffect, useState } from "react";
import useAuthContext from "../../context/AuthContext";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const UploadPost = () => {
  const { user, isSubmitting } = useAuthContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const [fetchedCategory, setFetchedCategory] = useState([])
  const [category, setCategory] = useState("");
  const [duplicate, setDuplicate] = useState([]);
  
    
  const token = user?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchCategory = async() => {
      try{
        const response = await axios.get('/category', { headers})
        setFetchedCategory(response.data)
        // console.log(response.data)
      }catch(error){
        console.log(error)
      }
    }
    fetchCategory()
  }, [])
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
        const response = await axios.post('/post', {photo, description, title, category}, {headers})
        if(response.status === 200){
          setSuccess(true)
          setError([])
          setPhoto("")
            setTitle("")
            setDescription("")
            setCategory("")
        }
    }catch(e){
      if(e.response.status === 400){
        setError(e.response.data.errors)
      }else if (e.response.status === 422) {

          setError([]);
          setDuplicate(e.response.data.error);
      }  
    }
  };

  const convertToBase64 = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            console.log(reader.result)
            setPhoto(reader.result)
            
        }
        reader.onerror = error => {
            console.log("Error: ", error)
        }
  }


  const sanitizeInput = (input) => {
    return input.replace(/:/g, '');
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
    <div className='flex justify-center'>
            <Link to="/blog-posts" className='px-4 py-2 mt-10 font-semibold hover:text-gray-900'>Blog Posts</Link>
            <Link to="/new-category" className='px-4 py-2 mt-10 font-semibold hover:text-gray-900'>New Category</Link>
            <Link to="/categories" className='px-4 py-2 mt-10 font-semibold hover:text-gray-900'>Categories</Link>
        </div>
    <div className="flex px-5 py-10 justify-center">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-lg font-bold mb-2">
          Upload New Blog Post
        </h1>
        {success && (<p className="text-center text-green-800 m-3">Blog post added sucessfully</p>)}
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
          {duplicate && (
            <p className="text-red-600">{duplicate}</p>
          )}
        </div>

        <div className="mb-2">
          <select
            className="border outline-none w-80 md:w-96 p-3 text-sm"
            value={category}
            onChange={(e) => {setCategory(e.target.value)}}
          >
            <option disabled value="">Select category</option>
            {fetchedCategory.map((item) => (
              <option key={item._id} value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>


        <div className="mb-2">
          <textarea rows="10"
            className="border outline-none w-80 md:w-96 p-3 text-sm"
            placeholder="Enter Blog Description"
            value={description}
            onChange={handleInputChange2}
          />
          {error.description && (
            <p className="text-red-600">{error.description.properties.message}</p>
          )}
        </div>
        
        <div className="mb-2">
          <input
            type="file"
            className="border outline-none w-80 md:w-96 p-3 text-sm"
            onChange={convertToBase64}
          />
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
    </>
  );
};

export default UploadPost;
