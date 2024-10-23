import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import GlobalContext from "../Context/GlobalContext";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, userType, setUserType } =
    useContext(GlobalContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed left-0 top-0 w-full bg-gray-800 bg-opacity-80 backdrop-blur-lg shadow-lg z-50 ">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-2xl font-bold bg-violet-600 py-2 px-4 rounded-md"
        >
          Quick Loans
        </Link>
        <div className="block lg:hidden cursor-pointer" onClick={toggleMenu}>
          <div
            className={`w-8 h-1 bg-violet-400 my-1 transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`w-8 h-1 bg-violet-400 my-1 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`w-8 h-1 bg-violet-400 my-1 transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></div>
        </div>

        <div
          className={`lg:flex items-center space-x-8 ${
            menuOpen
              ? "flex flex-col space-y-4 lg:space-y-0 lg:flex-row absolute top-16 left-0 w-full bg-gray-800 bg-opacity-95 p-6 lg:static lg:bg-transparent"
              : "hidden lg:flex"
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0">
            <li>
              <NavLink
                to="/"
                exact
                className="text-white hover:text-violet-400 transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="text-white hover:text-violet-400 transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
          </ul>
          <div className="flex space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={() => {
                    setUserType(false);
                    setMenuOpen(false);
                  }}
                  className="text-white bg-blue-500 hover:bg-violet-600 transition duration-300 px-4 py-2 rounded-lg"
                >
                  Customer Login
                </Link>
                <Link
                  to="/login"
                  onClick={() => {
                    setUserType(true);
                    setMenuOpen(false);
                  }}
                  className="text-white bg-violet-500 hover:bg-violet-600 transition duration-300 px-4 py-2 rounded-lg"
                >
                  Admin Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setIsLoggedIn(false);
                    toast.success("Logged Out 👋");
                    setMenuOpen(false);
                  }}
                  className="text-white bg-red-500 hover:bg-red-600 transition duration-300 px-4 py-2 rounded-lg"
                >
                  Logout
                </Link>
                <Link
                  to={userType ? "/admin/dashboard" : "/cust/dashboard"}
                  className="text-white bg-violet-500 hover:bg-violet-600 transition duration-300 px-4 py-2 rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
