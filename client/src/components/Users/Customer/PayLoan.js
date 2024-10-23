import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";
import GlobalContext from "../../../Context/GlobalContext";

export default function PayLoan() {
  const { viewPaymentApi, payLoanApi } = useContext(GlobalContext);
  const params = useParams();
  const loanId = params.id;

  const [loanRequests, setLoanRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [repayments, setRepayments] = useState([]);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const authToken = localStorage.getItem("token");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}/${mm}/${yy}`;
  };

  useEffect(() => {
    fetchPaymentStatus();
  }, []);

  const hasPendingRepayments = repayments.some(
    (repayment) => repayment.status === "PENDING"
  );

  const openModal = () => {
    if (hasPendingRepayments) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPaymentAmount("");
  };

  const fetchPaymentStatus = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${viewPaymentApi}${loanId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      setLoanRequests(response.data.payments || []);
    } catch (error) {
      console.error("Error fetching loan requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (loanId, amount) => {
    try {
      setLoading(true);
      if (parseFloat(amount) > parseFloat(paymentAmount)) {
        toast.error(
          "Repayment amount should be greater than or equal to the required amount."
        );
        return;
      }

      closeModal();

      const response = await axios.post(
        `${payLoanApi}`,
        {
          amount: paymentAmount,
          loanId: loanId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.status === 200) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      toast.success("Payment Successful");
      fetchPaymentStatus();
    } catch (error) {
      console.error("Error updating loan status:", error);
    } finally {
      setLoading(false);
    }
  };

  function payHandler(amount) {
    setIsModalOpen(true);
    setAmount(amount);
  }

  return (
    <>
      {loading && <Loader />}

      <div className="payloan flex flex-col items-center pt-16 px-4 md:px-8 lg:px-16">
        <h1 className="text-3xl font-bold text-gray-100 mb-8">Pay Loan</h1>

        <div className="w-full max-w-4xl overflow-x-auto shadow-lg rounded-lg bg-gray-800 text-gray-200">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="px-4 py-2">Installment Amount</th>
                <th className="px-4 py-2">Remaining Amount</th>
                <th className="px-4 py-2">Deadline</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {loanRequests.map((payment) => (
                <tr
                  key={payment.id}
                  className="bg-gray-900 border-b border-gray-700"
                >
                  <td className="px-4 py-2">{payment.totalAmount}</td>
                  <td className="px-4 py-2">{payment.amount}</td>
                  <td className="px-4 py-2">{formatDate(payment.date)}</td>
                  <td className="px-4 py-2">
                    {payment.status === "PAID" ? (
                      <span className="text-green-400">PAID</span>
                    ) : (
                      <span className="text-red-400">NOT PAID</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {payment.status === "PENDING" ? (
                      <button
                        onClick={() => payHandler(payment.amount)}
                        className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-all"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-600 text-white px-4 py-2 rounded-full cursor-default"
                      >
                        Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="overlay fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg z-10 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">
              Make Payment of Rs.{amount}
            </h2>
            <label className="block text-gray-300 mb-2">Payment Amount</label>
            <input
              type="number"
              value={paymentAmount}
              placeholder="Enter Amount"
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button
              onClick={() => handleStatusChange(loanId, amount)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all"
            >
              Do Repay
            </button>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-200 mt-4 block"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
