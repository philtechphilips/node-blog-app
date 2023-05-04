import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <div className="w-full px-5 md:px-32 py-3 md:py-3 flex flex-col md:flex-row  justify-between bg-white border">
        <p>© 2023 developed by Philip all right reserved</p>
        <div className="flex gap-2 items-center mt-2 md:mt-0">
            <Link to='https://github.com/philtechphilips' target="_blank"><i className="ri-github-fill text-2xl"></i></Link>
            <Link to='https://twitter.com/philipsdcoda' target="_blank"><i className="ri-twitter-fill text-2xl"></i></Link>
            <Link to='https://www.linkedin.com/in/isola-pelumi-84661821a' target="_blank"><i className="ri-linkedin-box-fill text-2xl"></i></Link>
        </div>
    </div>
  )
}

export default Footer