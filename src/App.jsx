import { Route, Routes } from "react-router-dom"
import LandingPage from "./LandingPage"
import SinglePost from "./components/SinglePost"
import SignIn from "./auth/SignIn"
import SignUp from "./auth/SignUp"
import SearchResultPage from "./components/SearchResultPage"
import AdminIndex from "./admin/AdminIndex"
import UploadCategory from "./admin/UploadCategory"
import BlogPosts from "./admin/components/BlogPosts"
import EditPost from "./admin/components/EditPost"
import Categories from "./admin/components/Categories"
import EditCategory from "./admin/components/EditCategory"
import AdminRoutes from "./components/AdminRoutes"
import GuestRoutes from "./components/GuestRoutes"
import NotFoound from "./components/NotFoound"


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/post/:blogId" element={<SinglePost />}></Route>
      <Route path="/search" element={<SearchResultPage />}></Route>

      <Route element={<GuestRoutes />}>
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      </Route>

      <Route element={<AdminRoutes />}>
      <Route path="/dashboard" element={<AdminIndex />}></Route>
      <Route path="/new-category" element={<UploadCategory />}></Route>
      <Route path="/blog-posts" element={<BlogPosts />}></Route>
      <Route path="/categories" element={<Categories />}></Route>
      <Route path="/edit-post/:id" element={<EditPost />}></Route>
      <Route path="/edit-category/:id" element={<EditCategory />}></Route>
      </Route>

      <Route path="*" element={<NotFoound />}></Route>
      
    </Routes>
     
    </>
  )
}

export default App
