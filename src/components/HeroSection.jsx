import { useState } from "react"
import axios from "../api/axios"
import { useNavigate } from "react-router-dom"


const HeroSection = () => {
  const [search, setSearch] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSearching(true)
    try {
      const response = await axios.get(`/post/search/${search}`)
      const data = response.data
      navigate('/search', {
        state: { data },
      });
      console.log(response.data)
      setIsSearching(false)
    } catch (error) {
      console.log(error)
      setIsSearching(false)
    }
  } 
  return (
    <div className='px-5 md:px-24 py-12 w-full flex flex-col items-center'>
        <h1 className="font-bold text-4xl mb-6">Unlocking the Power of Emerging Technologies:</h1>
        <p className="font-medium">Exploring the Latest Trends and Innovations in the Tech World</p>
        <form onSubmit={handleSubmit} className="relative mt-6">
        <input
          className="px-4 py-2 border w-80 md:w-96 border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent"
          type="text"
          placeholder="Search keyword"
          value={search}
          onChange={(e) => {setSearch(e.target.value)}}
        />
        <button disabled={isSearching} type="submit" className={`absolute top-0 right-0 px-4 py-2 bg-black text-white rounded-full ${isSearching && 'cursor-not-allowed bg-gray-600'}`}>
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  )
}

export default HeroSection