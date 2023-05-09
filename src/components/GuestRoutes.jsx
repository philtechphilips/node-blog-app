import { Navigate, Outlet } from "react-router-dom"
import useAuthContext from "../context/AuthContext"

const GuestRoutes = () => {
    const { user } = useAuthContext()
  return (
    !user ? <Outlet /> : <Navigate to="/" />
  )
}

export default GuestRoutes