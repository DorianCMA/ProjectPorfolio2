import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import CollapsibleMenu from "../components/CollapsibleMenu";
import CollapsibleDepartment from "../components/CollapsibleDepartment";
import CollapsibleGraphic from "../components/CollapsibleGraphic";
import CollapsibleClaculator from "../components/calculator/CollapsibleCalculator";
import axios from "axios";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      axios.post("http://localhost:3004/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("customer_id");
      window.location.href = "/";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div
        onClick={handleBar}
        className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden ${
          isSidebarOpen ? "" : "hidden"
        }`}
      ></div>
      <div
        className={`fixed left-0 top-0 w-56 h-screen bg-gray-900 p-4 z-50 transition-transform transform ${
          isSidebarOpen ? "" : "-translate-x-full"
        }`}
        style={{
          transitionDuration: "0.3s",
          transitionTimingFunction: "ease-in-out",
        }}
      >
        <div className="flex items-center pb-4 border-b border-b-gray-800">
          <span className="text-lg font-bold text-white ml-3">Logo</span>
        </div>
        <ul className="mt-4">
          <CollapsibleMenu />
          <CollapsibleDepartment />
          <CollapsibleClaculator />
          <CollapsibleGraphic />
        </ul>
      </div>
      {/* Top bar content */}
      <div
        className={`w-full md:w-[calc(100%-225px)] bg-gray-50  transition-transform transform ${
          isSidebarOpen ? "md:ml-56" : "md:w-full "
        }`}
        style={{
          transitionDuration: "0.3s",
          transitionTimingFunction: "ease-in-out",
        }}
      >
        <div className="py-4 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30 mb-8">
          <button onClick={handleBar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <button
            className="ml-auto text-red-700 hover:text-red-900"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
