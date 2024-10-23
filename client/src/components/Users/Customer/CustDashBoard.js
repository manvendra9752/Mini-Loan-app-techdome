import React from "react";
import { Link } from "react-router-dom";

const CustHome = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      <div className="text-center max-w-lg">
        <h2 className="text-3xl font-semibold mb-8 text-teal-500">
          Customer Dashboard
        </h2>

        <div className="flex justify-center space-x-4 mb-12">
          <Link to="/cust/reqloan">
            <button className="w-fit bg-blue-500 text-white p-3 rounded-lg shadow-lg hover:bg-blue-600 transition-all">
              Apply for New Loan
            </button>
          </Link>

          <Link to="/cust/viewloan">
            <button className="w-fit bg-green-500 text-white p-3 rounded-lg shadow-lg hover:bg-green-600 transition-all">
              View All Loans
            </button>
          </Link>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-medium mb-4 text-pink-700">
            Terms and Conditions
          </h3>
          <p className="text-md leading-relaxed text-gray-300">
            By applying for a loan through our platform, you agree to our terms
            and conditions. Loan approval is subject to eligibility criteria,
            including a credit check and income verification. The loan amount
            and interest rate may vary based on the applicant’s financial
            profile. Please ensure that you review the repayment schedule before
            submitting your application. Late payments may incur additional fees
            and affect your credit score. For more details, please contact our
            support team or refer to the full terms and conditions document.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustHome;
