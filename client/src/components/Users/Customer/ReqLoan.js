import React, { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import GlobalContext from "../../../Context/GlobalContext";

const ReqLoan = () => {
  const { createLoanApi } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState("");
  const [term, setTerm] = useState("");
  const [installments, setInstallments] = useState([]);
  const [showPayments, setShowPayments] = useState(false);
  const [loading, setLoading] = useState(false);

  const calculateInstallments = () => {
    if (!loanAmount || !term) {
      toast.error("Please enter loan amount and term.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const loanAmountFloat = parseFloat(loanAmount);
      const termInt = parseInt(term);

      const weeklyInstallment = Math.floor(loanAmountFloat / termInt);
      const remainingAmount = loanAmountFloat - weeklyInstallment * termInt;
      const currentDate = new Date();
      const installmentsData = [];

      for (let i = 1; i <= termInt; i++) {
        const installment = {
          date: new Date(currentDate.getTime() + i * 7 * 24 * 60 * 60 * 1000),
          amount: (weeklyInstallment + (i <= remainingAmount ? 1 : 0)).toFixed(
            2
          ),
        };
        installmentsData.push(installment);
      }

      setInstallments(installmentsData);
      setShowPayments(true);
      setLoading(false);
    }, 2000);
  };

  const sendLoanApplication = async () => {
    setLoading(true);

    if (!loanAmount || !term) {
      toast.error("Please enter loan amount and term.");
      setLoading(false);
      return;
    }

    if (loanAmount && term && installments.length === 0) {
      toast.error("Please calculate installments before applying.");
      setLoading(false);
      return;
    }

    const authToken = localStorage.getItem("token");
    const User = localStorage.getItem("user");
    const user = JSON.parse(User);

    try {
      await axios.post(
        `${createLoanApi}`,
        {
          amount: loanAmount,
          term,
          payments: installments,
          userId: user._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      toast.success("Loan Request Created Successfully");
      setLoanAmount("");
      setTerm("");
      setInstallments([]);
      setShowPayments(false);
      navigate("/cust/dashboard");
    } catch (error) {
      console.error("Error submitting loan application:", error);
      toast.error("An error occurred while submitting the loan application.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg p-6 text-gray-100">
        <div className="loan-form w-full p-6">
          <h2 className="text-3xl font-bold text-center mb-6">
            Request a Loan
          </h2>

          <label htmlFor="loanAmount" className="block text-gray-300 mb-2">
            Loan Amount
          </label>
          <input
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 text-gray-100 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter loan amount"
          />

          <label htmlFor="term" className="block text-gray-300 mb-2">
            Term/Installments (in weeks)
          </label>
          <input
            type="number"
            id="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 text-gray-100 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter term in weeks"
          />

          <div className="flex justify-between items-center">
            <button
              onClick={calculateInstallments}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
            >
              View Installments
            </button>

            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all"
              onClick={sendLoanApplication}
            >
              Apply
            </button>
          </div>
        </div>

        {showPayments && (
          <div className="payments-container mt-10">
            <h2 className="text-2xl font-bold mb-6">Installments</h2>

            {loading ? (
              <Loader />
            ) : (
              <ul className="installments-list space-y-4">
                {installments.map((installment, index) => (
                  <li key={index} className="bg-gray-800 p-4 rounded-lg">
                    {`Week ${index + 1}: ${formatDate(installment.date)} - ₹${
                      installment.amount
                    }`}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReqLoan;
