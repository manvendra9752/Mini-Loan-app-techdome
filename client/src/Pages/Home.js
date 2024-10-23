import React from "react";
import { Link } from "react-router-dom";

const HomePage = ({ user }) => {
  console.log("home", user);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="main-container flex flex-col justify-center items-center max-w-6xl p-6 pt-16 text-center">
        <div className="header mb-12">
          <h3 className="text-2xl text-gray-200 mb-2">
            Welcome to the future of
          </h3>
          <h1 className="text-6xl font-bold tracking-wider text-purple-500 mb-4">
            InstantCash
            <span className="text-3xl text-purple-400">Pro</span>
          </h1>
          <p className="text-purple-400 text-xl mb-4">
            "Your trusted partner for fast and reliable financial solutions!"
          </p>
          <p className="text-gray-400">
            Get quick loans at competitive rates and manage your financial
            health efficiently.
          </p>
        </div>

        <div className="features flex flex-wrap justify-center space-x-4 mb-12">
          <div className="feature bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 w-full sm:w-1/2 lg:w-1/3 mb-4">
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              Instant Approvals
            </h2>
            <p className="text-gray-400">
              Get approved for a loan within minutes and access funds instantly
              without any hassle.
            </p>
          </div>
          <div className="feature bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 w-full sm:w-1/2 lg:w-1/3 mb-4">
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              Flexible Repayment
            </h2>
            <p className="text-gray-400">
              Choose a repayment plan that fits your budget. We offer flexible
              terms for every customer.
            </p>
          </div>
          <div className="feature bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 w-full sm:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              Secure & Private
            </h2>
            <p className="text-gray-400">
              Your data is protected with industry-leading security standards.
              We value your privacy.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="how-it-works mb-12">
          <h2
            className="text-3xl font-bold text-purple-500 mb-6"
            data-aos="fade-right"
          >
            How It Works
          </h2>
          <div className="steps flex flex-col md:flex-row justify-center space-x-0 md:space-x-8 space-y-8 md:space-y-0">
            <div className="step bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 text-center w-full md:w-1/3">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">
                Step 1: Apply Online
              </h3>
              <p className="text-gray-400">
                Fill out our simple online application form. It takes only a few
                minutes to get started.
              </p>
            </div>
            <div className="step bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 text-center w-full md:w-1/3">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">
                Step 2: Get Approved
              </h3>
              <p className="text-gray-400">
                Once your application is reviewed, you'll receive instant
                approval and loan details.
              </p>
            </div>
            <div className="step bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 text-center w-full md:w-1/3">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">
                Step 3: Receive Funds
              </h3>
              <p className="text-gray-400">
                Once approved, funds are transferred directly to your account
                within minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="btn-cntnr mt-8" data-aos="zoom-in" data-aos-delay="300">
          <Link to="/about">
            <button className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-purple-400 transition duration-300 ease-out border-2 border-purple-400 rounded-full shadow-md group hover:bg-purple-400 hover:text-white">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-400 group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-purple-400 transition-all duration-300 transform group-hover:translate-x-full ease">
                About Us
              </span>
              <span className="relative invisible">About Us</span>
            </button>
          </Link>
          <Link to="/apply">
            <button className="ml-4 relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-purple-400 transition duration-300 ease-out border-2 border-purple-400 rounded-full shadow-md group hover:bg-purple-400 hover:text-white">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-400 group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-purple-400 transition-all duration-300 transform group-hover:translate-x-full ease">
                Apply Now
              </span>
              <span className="relative invisible">Apply Now</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
