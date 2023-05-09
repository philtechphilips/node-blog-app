import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [errorsEmail, setErrorsEmail] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    setUser(userDetails);
  }, []);


  
  const register = async ({ ...data }) => {
    setErrors([]);
    setIsSubmitting(true);
    try {
      const response = await axios.post("/auth/register", data);

      if (response.status === 201) {
        const userResponse = {
          role: response.data.user.role,
          email: response.data.user.email,
          name: response.data.user.username,
          token: response.data.token,
        };
        setUser(userResponse);
        localStorage.setItem("user", JSON.stringify(userResponse));
        setIsSubmitting(false);
      }
      navigate("/");
    } catch (error) {
      // console.log(error.response.data)
      if (error.response.status === 400) {
        // console.log(error.response.data)
        setErrors(error.response.data.errors);
        setIsSubmitting(false);
      } else if (error.response.status === 422) {
        // console.log(error.response.data)
        setErrors([]);
        setErrorsEmail(error.response.data.error);
        setIsSubmitting(false);
      }
    }
  };

  const logout = async ({ ...data }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token; // extract token from localStorage
      await axios.post("/auth/logout", data, {
        headers: {
          Authorization: `Bearer ${token}`, // set Authorization header with token value
        },
      });
      //   console.log(response);
      localStorage.removeItem("user");
      setUser(null);
      navigate("/sign-in");
    } catch (error) {
      //   console.log(error);
    }
  };

  const login = async ({ ...data }) => {
    setErrors([]);
    setIsSubmitting(true);
    try {
      const response = await axios.post("/auth/login", data);
      if (response.status === 201) {
        const userResponse = {
          role: response.data.user.role,
          email: response.data.user.email,
          name: response.data.user.username,
          token: response.data.token,
        };
        setUser(userResponse);
        localStorage.setItem("user", JSON.stringify(userResponse));
        setIsSubmitting(false);
      }
      navigate("/");
    } catch (error) {
      // console.log(error.response)
      if (error.response.status === 400) {
        // console.log(error.response.data)
        setErrors(error.response.data);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        register,
        errorsEmail,
        isSubmitting,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default function useAuthContext() {
  return useContext(AuthContext);
}
