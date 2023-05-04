import { Route, Routes } from "react-router-dom"
import LandingPage from "./LandingPage"
import SinglePost from "./components/SinglePost"
import SignIn from "./auth/SignIn"
import SignUp from "./auth/SignUp"


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/blog-single" element={<SinglePost />}></Route>
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
    </Routes>
     
    </>
  )
}

export default App
