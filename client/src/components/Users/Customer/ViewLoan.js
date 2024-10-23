import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import GlobalContext from "../../../Context/GlobalContext";

const ViewLoan = () => {
  const { viewLoanApi } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const authToken = localStorage.getItem("token");
  const User = localStorage.getItem("user");
  const user = JSON.parse(User);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Axios request instead of fetch
      const response = await axios.get(`${viewLoanApi}${user._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const receivedLoans = response.data.loans || [];
      setLoans(receivedLoans);
      setError(null);
    } catch (error) {
      console.error("Error fetching customer loans:", error);
      setError("Error fetching customer loans. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayButtonClick = (loanId) => {
    navigate(`/cust/viewloan/payloan/${loanId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 pt-20 text-center">
      {loading && <Loader />}
      <h2 className="text-2xl font-bold mb-6">{user.name}'s Loans</h2>

      {error && <p className="text-red-500">{error}</p>}

      {loans.length === 0 ? (
        <p>No loan taken yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-sky-900">
            <thead>
              <tr className="bg-sky-700">
                <th className="border border-sky-900 px-4 py-2">Serial No.</th>
                <th className="border border-sky-900 px-4 py-2">Amount</th>
                <th className="border border-sky-900 px-4 py-2">Term</th>
                <th className="border border-sky-900 px-4 py-2">Status</th>
                <th className="border border-sky-900 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, index) => (
                <tr key={loan._id} className="bg-sky-800 ">
                  <td className=" px-4 py-2">{index + 1}.</td>
                  <td className=" px-4 py-2">Rs. {loan.amount}</td>
                  <td className=" px-4 py-2">{loan.term} weeks</td>
                  <td className=" px-4 py-2">
                    {loan.state === "PENDING" && (
                      <span className="text-blue-500">PENDING</span>
                    )}
                    {loan.state === "APPROVED" && (
                      <span className="text-green-500">APPROVED</span>
                    )}
                    {loan.state === "REJECTED" && (
                      <span className="text-red-500">REJECTED</span>
                    )}
                    {loan.state === "PAID" && (
                      <span className="text-yellow-500">PAID</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {loan.state === "APPROVED" && (
                      <button
                        onClick={() => handlePayButtonClick(loan._id)}
                        className="bg-green-500 text-violet-400 px-3 py-1 rounded-full hover:bg-sky-800 hover:text-green-500 transition"
                      >
                        PAY
                      </button>
                    )}
                    {loan.state === "PENDING" && (
                      <span className="bg-blue-400 text-black px-3 py-1 rounded-full">
                        WAIT
                      </span>
                    )}
                    {loan.state === "REJECTED" && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full">
                        REJECTED
                      </span>
                    )}
                    {loan.state === "PAID" && (
                      <span className="text-blue-500">NONE</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default ViewLoan;
