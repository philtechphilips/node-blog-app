import { useState } from "react";
import useAuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const SignIn = () => {
  const { login, errors, isSubmitting } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({  email, password });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-lg font-bold mb-2">
          Login to your account
        </h1>
        <div className="mb-2">
          <input
            type="email"
            className="border outline-none w-72 p-3 text-sm"
            placeholder="E-mail Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {errors && (
            <p className="text-red-600">{errors}</p>
          )}
        </div>
        <div className="mb-2">
          <input
            type="password"
            className="border outline-none w-72 p-3 text-sm"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="mb-2">
          <button
            disabled={isSubmitting}
            type="submit"
            className={`border outline-none w-72 p-3 bg-gray-900 hover:bg-gray-950 text-white text-md ${
              isSubmitting && "cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Create Account"}
          </button>
        </div>
        <p className="text-center font-medium">Don&lsquo;t have an accout?<Link to="/sign-up" className="text-blue-900 font-bold"> Sign Up</Link></p>
      </form>
    </div>
  );
};

export default SignIn;
