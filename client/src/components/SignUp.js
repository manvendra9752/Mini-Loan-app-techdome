import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader/Loader";
import GlobalContext from "../Context/GlobalContext";

export default function SignUp() {
  const { setIsLoggedIn, userType, signUpApi } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: userType,
  });
  const [isLoading, setIsLoading] = useState(false);

  async function signUpHandler(event) {
    event.preventDefault();

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(signUpApi, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        const res_data = response.data;

        toast.success("Account Created Successfully 😊");
        setIsLoggedIn(true);
        localStorage.setItem("token", res_data.token);
        localStorage.setItem("user", JSON.stringify(res_data.user));

        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      toast.error(`Signup failed: ${errorMessage}`);
      console.error("Error during signup:", error);
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
      <div className="max-w-lg w-full mx-auto p-8 bg-gray-800 text-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        <form className="space-y-6" onSubmit={signUpHandler}>
          <h4 className="text-xl font-semibold">
            Sign Up as {userType ? "Admin" : "Customer"}
          </h4>

          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="name"
              value={formData.name}
              onChange={changeHandler}
              required
              className="w-full p-2 mt-2 text-gray-900 rounded-lg border border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
            />
          </div>

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
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
          >
            Sign Up
          </button>

          {isLoading && (
            <div className="flex justify-center mt-4">
              <Loader />
            </div>
          )}

          <div className="text-center mt-6">
            <h5 className="text-sm font-medium">Already Signed Up?</h5>
            <Link to="/login">
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg mt-2 transition duration-300">
                Login as {userType ? "Admin" : "Customer"}
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
