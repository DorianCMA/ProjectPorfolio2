import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import loginImg from "../../../public/assets/imageLogin.jpg";
import AuthContext from "../AuthContext";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { setToken, setCustomer_id } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3004/auth/login", 
        loginData
      );
      console.log(loginData);
      if (response.status === 200) {
        const token = response.data.token;
        const customer_id = response.data.customer_id;
        localStorage.setItem("token", token);
        localStorage.setItem("customer_id", customer_id);
        setToken(token);
        setCustomer_id(customer_id);
        navigate("/employees");
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión1:", error);
      Swal.fire("email or password incorrect!");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full ">
      <div className=" hidden sm:block h-full overflow-hidden ">
        <img
          className="w-full h-full object-cover"
          src={loginImg}
          alt="presentation"
        />
      </div>

      <div className="bg-gray-800 flex flex-col justify-center ">
        <form
          onSubmit={handleLogin}
          className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
        >
          <h2 className="text-4xl dark:text-white font-bold text-center">
            SIGN IN
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label className="">Email</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              className=" rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type={showPassword ? "text" : "password"}
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between text-gray-400 py-2">
            <p className=" flex items-center">
              <input
                className="mr-2"
                type="checkbox"
                onChange={handleTogglePassword}
                checked={showPassword}
              />{" "}
              Show password
            </p>
            <Link>Forgot Password</Link>
          </div>

          <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 text-white font-semibold rounded-lg">
            Sign in
          </button>
          <div className="flex justify-center text-gray-400 py-2 ">
            Dont have account?
            <Link
              to="/register"
              className="ml-2 hover:text-gray-600"
            >
              create a new account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
