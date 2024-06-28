import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import propTypes from "prop-types";

const ResetPassword = ({ onCancel }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setMessage("");
        return;
      }

      const url = window.location.href;
      const token = url.replace(
        /^https?:\/\/localhost:5173\/resetpassword\//,
        ""
      );
      console.log("token:" + token.split("/"));
      const response = await axios.patch("http://localhost:3002/signUp/", {
        newPassword: password,
        urlToken: token.split("/"),
      },
        {
        });
      if (response.status === 200) {
        setMessage("Password reset successfully.");
        setError("");
      } else {
        setError("Error resetting password. Please try again.");
        setMessage("");
      }
    } catch (error) {
      setError("Error resetting password. Please try again.");
      setMessage("");
    }
  };

  const handleLogin = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          New Password:
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />

          <div className="flex item-center text-gray-400 py-2">
            <input
              type="checkbox"
              className=" mr-2"
              onChange={handleCheckboxChange}
              checked={showPassword}
            />
            <p>Show password</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password:
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      </div>

      <button
        onClick={handleResetPassword}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Reset Password
      </button>

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      <div className="flex justify-between text-gray-400 py-2">
        <p className="flex items-center"></p>
        <Link to="/login" onClick={handleLogin}>
          Login
        </Link>
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  onCancel: propTypes.func,
}

export default ResetPassword;
