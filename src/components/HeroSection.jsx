

const HeroSection = () => {
  return (
    <div className='px-5 md:px-24 py-12 w-full flex flex-col items-center'>
        <h1 className="font-bold text-4xl mb-6">Unlocking the Power of Emerging Technologies:</h1>
        <p className="font-medium">Exploring the Latest Trends and Innovations in the Tech World</p>
        <form className="relative mt-6">
        <input
          className="px-4 py-2 border w-80 md:w-96 border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent"
          type="text"
          placeholder="Search a query"
        />
        <button type="submit" className="absolute top-0 right-0 px-4 py-2 bg-black text-white rounded-full">
          Search
        </button>
      </form>
    </div>
  )
}

export default HeroSection