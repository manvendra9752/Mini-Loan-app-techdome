import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loader from "../../Loader/Loader";
import toast from "react-hot-toast";
import GlobalContext from "../../../Context/GlobalContext";

const Request = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const authToken = localStorage.getItem("token");
  const { allLoansApi, updateLoansApi } = useContext(GlobalContext);

  useEffect(() => {
    fetchLoanRequests();
  }, []);

  const fetchLoanRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(allLoansApi, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setLoanRequests(response.data.loans || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching loan requests:", error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (loanId, newStatus) => {
    try {
      setLoading(true);
      await axios.put(
        updateLoansApi,
        { loanId, state: newStatus },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      fetchLoanRequests();
      toast.success("Loan Updated Successfully");
      setLoading(false);
    } catch (error) {
      console.error("Error updating loan status:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 pt-16 bg-gray-900 text-gray-100 min-h-screen">
      {loading && <Loader />}
      <h2 className="text-3xl font-bold mb-6 text-center">Loan Requests</h2>

      {loanRequests.length > 0 ? (
        <div className="overflow-x-auto max-w-6xl mx-auto">
          <table className="min-w-full bg-gray-800 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="px-6 py-3 text-gray-200 text-sm font-semibold">
                  User Name
                </th>
                <th className="px-6 py-3 text-gray-200 text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-3 text-gray-200 text-sm font-semibold">
                  Loan Amount
                </th>
                <th className="px-6 py-3 text-gray-200 text-sm font-semibold">
                  Term
                </th>
                <th className="px-6 py-3 text-gray-200 text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-3 text-gray-200 text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loanRequests.map((request) => (
                <tr key={request._id} className="border-b border-gray-700">
                  <td className="px-6 py-4 text-sm">{request.userId.name}</td>
                  <td className="px-6 py-4 text-sm">{request.userId.email}</td>
                  <td className="px-6 py-4 text-sm">Rs. {request.amount}</td>
                  <td className="px-6 py-4 text-sm">{request.term} weeks</td>
                  <td className="px-6 py-4 text-sm">
                    {request.state === "PENDING" && (
                      <span className="text-blue-400">PENDING</span>
                    )}
                    {request.state === "APPROVED" && (
                      <span className="text-green-400">APPROVED</span>
                    )}
                    {request.state === "REJECTED" && (
                      <span className="text-red-400">REJECTED</span>
                    )}
                    {request.state === "PAID" && (
                      <span className="text-yellow-400">PAID</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {request.state === "PENDING" ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleStatusChange(request._id, "APPROVED")
                          }
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(request._id, "REJECTED")
                          }
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-600 text-white px-4 py-2 rounded cursor-not-allowed"
                      >
                        Done
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-xl text-gray-400 mt-6 text-center">
          No loan requests to show.
        </p>
      )}
    </div>
  );
};

export default Request;
