import { useState } from "react";
import useAuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { register, errors, errorsEmail, isSubmitting } = useAuthContext();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    register({ username, email, password });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-lg font-bold mb-2">
          Create a New Account
        </h1>
        <div className="mb-2">
          <input
            type="name"
            value={username}
            onChange={(event) => setName(event.target.value)}
            className="border outline-none w-72 p-3 text-sm"
            placeholder="Enter Your Name"
          />
          {errors.username && (
            <p className="text-red-600">{errors.username.properties.message}</p>
          )}
        </div>
        <div className="mb-2">
          <input
            type="email"
            className="border outline-none w-72 p-3 text-sm"
            placeholder="E-mail Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.properties.message}</p>
          )}
          {errorsEmail && <p className="text-red-600">{errorsEmail}</p>}
        </div>
        <div className="mb-2">
          <input
            type="password"
            className="border outline-none w-72 p-3 text-sm"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.properties.message}</p>
          )}
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
        <p className="text-center font-medium">Already had an accout?<Link to="/sign-in" className="text-blue-900 font-bold"> Sign In</Link></p>
      </form>
    </div>
  );
};

export default SignUp;
