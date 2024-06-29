import { useState, useContext } from "react";
import loginImg from "../../../public/assets/imageLogin.jpg";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import AuthContext from "../../components/AuthContext";
import propTypes from "prop-types";

const Register = ({ onToggle }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const { token } = useContext(AuthContext);
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirm_password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden',
      });
      return;
    }

    const { confirm_password, ...userData } = user;

    try {
      const response = await axios.post(
        "https://deploy-sand-mu.vercel.app/ProjectPorfolio2/signUp/",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );
      console.log(response.data);
      if (response.data) {
        Swal.fire("Successful registration!");
      }
    } catch (error) {
      console.error("Error creando usuario:", error);
      Swal.fire("User already exists!");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full ">
      <div className="hidden sm:block h-full overflow-hidden ">
        <img
          className="w-full h-full object-cover"
          src={loginImg}
          alt="presentation"
        />
      </div>

      <div className="bg-gray-800 flex flex-col justify-center ">
        <form
          onSubmit={handleSubmit}
          className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
        >
          <h2 className="text-4xl dark:text-white font-bold text-center">
            SIGN UP
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>User</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Confirm Password</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type={showPassword ? "text" : "password"}
              name="confirm_password"
              value={user.confirm_password}
              onChange={handleChange}
            />
          </div>
          <div className="flex item-center text-gray-400 py-2">
            <input
              type="checkbox"
              className="mr-2"
              onChange={handleTogglePassword}
              checked={showPassword}
            />
            <p>Show password</p>
          </div>
          <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 text-white font-semibold rounded-lg">
            Create Account
          </button>
          <div className="flex justify-center text-gray-400 py-2">
            <p>
              Already have an account?
              <Link
                to="/login"
                className="ml-2 hover:text-gray-600"
                onClick={handleToggle}
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  onToggle: propTypes.func.isRequired,
};

export default Register;
