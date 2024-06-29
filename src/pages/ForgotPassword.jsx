import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../components/AuthContext";
import propTypes from "prop-types";

const ForgotPassword = ({ onCancel }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        "https://deploy-sand-mu.vercel.app/recoverpassword",
        { email: email },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200) {
        setMessage(
          "A password reset email has been sent. Please check your inbox."
        );
        setError("");
      }
    } catch (error) {
      setError(
        "Error processing the request. Please verify the provided email."
      );
      setMessage("");
    }
  };

  const handleLogin = () => {
    if (onCancel) {
      onCancel();
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md ">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <p className="text-gray-600 mb-4">
        Enter your email address, and well send you a link to reset your
        password.
      </p>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email:
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <button
        onClick={handleForgotPassword}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Send Password Reset Email
      </button>

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
      <div className="flex justify-between text-gray-400 py-2">
        <p className=" flex items-center"></p>
        <Link to="/login" onClick={handleLogin}>
          Login
        </Link>
      </div>
    </div>
  );
};

ForgotPassword.propTypes = {

  onCancel: propTypes.func
}

export default ForgotPassword;
