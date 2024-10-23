import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader/Loader";
import GlobalContext from "../Context/GlobalContext";

export default function Login() {
  const { setIsLoggedIn, userType, logInApi } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isAdmin: userType,
  });

  const [isLoading, setIsLoading] = useState(false);

  async function loginHandler() {
    try {
      setIsLoading(true);

      const response = await axios.post(logInApi, formData);

      if (response.status === 200) {
        const res_data = response.data;

        localStorage.setItem("token", res_data.token);
        localStorage.setItem("user", JSON.stringify(res_data.user));

        setIsLoggedIn(true);
        toast.success("Logged In Successfully 😊");
        console.log(res_data);
        console.log("User:", userType);

        navigate(userType ? "/admin/dashboard" : "/cust/dashboard");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(`Login failed: ${errorMessage}`);
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-md w-full mx-auto mt-12 p-8 bg-gray-800 text-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <div className="space-y-6">
          <h4 className="text-xl font-semibold">
            Login as {userType ? "Admin" : "Customer"}
          </h4>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              required
              className="w-full p-2 mt-2 text-gray-900 rounded-lg border border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              required
              className="w-full p-2 mt-2 text-gray-900 rounded-lg border border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
            />
          </div>

          <button
            onClick={loginHandler}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
          >
            Log in
          </button>

          {isLoading && (
            <div className="flex justify-center mt-4">
              <Loader />
            </div>
          )}

          <h5 className="text-sm font-medium text-center mt-6">
            Not Registered Yet?
          </h5>
          <Link to="/signup">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg mt-2 transition duration-300">
              SignUp As {userType ? "Admin" : "Customer"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
