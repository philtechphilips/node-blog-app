import { Link, useLocation } from "react-router-dom"
import { blog } from "../constants/data";

const BlogPost = () => {
    const location = useLocation();

  return (
    <div className="w-full px-5 md:px-24 py-8 md:py-16">
        <div className="flex flex-wrap gap-4 md:gap-12 md:px-4">
            <Link to='/' className={`text-gray-600 font-bold ${location.pathname === '/' ? 'text-black border-b-2 border-black pb-1' : ''}`}>View All</Link>
            <Link to='/blog-category/design' className={`text-gray-600 font-bold ${location.pathname === '/blog-category/design' ? 'text-black border-b-2 border-black pb-1' : ''}`}>Design</Link>
            <Link to='/blog-category/product' className={`text-gray-600 font-bold ${location.pathname === '/blog-category/product' ? 'text-black border-b-2 border-black pb-1' : ''}`}>Product</Link>
            <Link to='/blog-category/web-development' className={`text-gray-600 font-bold ${location.pathname === '/blog-category/web-development' ? 'text-black border-b-2 border-black pb-1' : ''}`}>Web Development</Link>
            <Link to='/blog-category/cyber-security' className={`text-gray-600 font-bold ${location.pathname === '/blog-category/cyber-security' ? 'text-black border-b-2 border-black pb-1' : ''}`}>Cyber Security</Link>
        </div>

        <div className="w-full">
            <h4 className="md:px-4 py-4 md:py-6 font-bold">All Blog Posts</h4>
            <div className="w-full flex flex-wrap md:px-4 py-3 md:py-3">
                {blog.map((item, index) => (
                <div key={index} className="w-full md:w-1/3 pr-4 mb-5">
                    <img src={item.image} />
                    <p className="font-bold text-xs mt-3">Isola Pelumi: June 14, 2023</p>
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold mt-1 text-lg">{item.topic}</h1>
                        <i className="ri-arrow-right-up-fill text-lg"></i>
                    </div>
                    <p className="mt-1 text-sm">{item.body.slice(0, 120)+'...'}</p>
                    <div className="flex flex-wrap mt-3 mb-4">
                        <p className="px-4 py-1 mr-1 border rounded-full text-sm border-gray-800">Design</p>
                        <p className="px-4 py-1 mr-1 border rounded-full text-sm border-gray-800">Technology</p>
                    </div>
                </div>
                ))
                }
            </div>
        </div>
    </div>
  )
}

export default BlogPost