import React from "react";

export default function About() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2
          className="text-4xl font-bold text-purple-500 mb-6"
          data-aos="fade-right"
        >
          About InstantCashPro
        </h2>
        <p className="text-gray-400 text-lg mb-12">
          InstantCashPro is your one-stop solution for fast and reliable loans,
          designed to meet your urgent financial needs. Whether you're looking
          for a short-term loan or need flexible repayment options, we've got
          you covered. Our process is quick, transparent, and secure, ensuring
          you can access funds without the hassle.
        </p>

        <div className="features grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="feature bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              Apply for a Loan
            </h2>
            <p className="text-gray-400">
              Submit a loan request with your desired amount and repayment terms
              through our user-friendly portal. The application process is fast
              and easy.
            </p>
          </div>
          <div
            className="feature bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              Admin Approval
            </h2>
            <p className="text-gray-400">
              Our experienced team of administrators will review your loan
              request and provide quick approval or rejection based on
              eligibility criteria.
            </p>
          </div>
          <div
            className="feature bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              Track Your Loans
            </h2>
            <p className="text-gray-400">
              Once your loan is active, track all the details, including
              payments, interest rates, and due dates, with full transparency.
            </p>
          </div>
          <div
            className="feature bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <h2 className="text-xl font-semibold text-purple-400 mb-2">
              Repayments
            </h2>
            <p className="text-gray-400">
              Easily repay your loan in manageable installments. Our platform
              helps you stay on top of your payments with reminders and progress
              tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
