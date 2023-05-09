import { Navigate, Outlet } from "react-router-dom"


const AdminRoutes = () => {
    const  user  = JSON.parse(localStorage.getItem('user'))
    // console.log(user?.role)
    return user?.role === 'admin' ? <Outlet /> : <Navigate to="/" />;  
 
}

export default AdminRoutes