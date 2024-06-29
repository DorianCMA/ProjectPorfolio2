import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import AuthContext from "/src/components/AuthContext";
const Employees = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [filterOption, setFilterOption] = useState("all");
  const [loading, setLoading] = useState(true);

  const [dataQt] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  const indexFin = currentPage * dataQt;
  const indexIni = indexFin - dataQt;
  const nPages = Math.ceil(allUsers.length / dataQt);
  const { token } = useContext(AuthContext);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Filtra los usuarios según la opción seleccionada
    if (filterOption === "all") {
      setFilteredUsers(allUsers);
    } else {
      const filtered = allUsers.filter((user) => user.status === filterOption);
      setFilteredUsers(filtered);
    }
  }, [filterOption, allUsers]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://deploy-sand-mu.vercel.app/rrhh/", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setAllUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Failed ", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setFilterOption(tab);
  };

  const handleNextPage = () => {
    if (currentPage < nPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://deploy-sand-mu.vercel.app/rrhh/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          fetchData();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting employee:", error);
        }
      }
    });
  };

  const handleEdit = (employeeData) => {
    navigate(`/editemployees`, { state: { employeeData } });
  };

  const handleGoToLastPage = () => {
    if (currentPage < nPages) {
      setCurrentPage((prevPage) => prevPage + nPages - 1);
    }
    console.log(`Navigating to the last page: ${nPages}`);
  };

  const handleGoToFirstPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - nPages + 1);
    }
    console.log(`Navigating to the last page: ${nPages}`);
  };

  const [searchTerm, setSearchTerm] = useState("");
  /*const searchUserBy = allUsers.filter((users) =>
    users.Identification_Document.toLowerCase().includes(
      searchTerm.toLowerCase()
    )
  );*/

  const handleSearchInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = allUsers.filter((user) =>
      user.Identification_Document.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);
  };
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8 ">
        <div className="bg-white border border-gray-100 ml-4 mr-4 shadow-md shadow-black/5 p-6 rounded-md ">
          <div className="flex flex-col  md:flex-col justify-between mb-4 items-start lg:flex-row ">
            <div className="font-bold mb-2 ">Employees</div>
            <div className="flex-col">
              <div className="flex justify-center items-center mb-4 ">
                <button
                  type="button"
                  className={`bg-${
                    selectedTab === "all" ? "blue-500" : "gray-50"
                  } text-${
                    selectedTab === "all" ? "white" : "gray-400"
                  } text-sm font-medium py-2 px-2 md:px-4 lg:px-4 rounded-tl-md rounded-bl-md`}
                  onClick={() => handleTabClick("all")}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`bg-${
                    selectedTab === "active" ? "blue-500" : "gray-50"
                  } text-${
                    selectedTab === "active" ? "white" : "gray-400"
                  } text-sm font-medium py-2 px-2 md:px-4 lg:px-4 `}
                  onClick={() => handleTabClick("active")}
                >
                  Active
                </button>
                <button
                  type="button"
                  className={`bg-${
                    selectedTab === "suspended" ? "blue-500" : "gray-50"
                  } text-${
                    selectedTab === "suspended" ? "white" : "gray-400"
                  } text-sm font-medium py-2 px-2 md:px-4 lg:px-4`}
                  onClick={() => handleTabClick("suspended")}
                >
                  suspended
                </button>
                <button
                  type="button"
                  className={`bg-${
                    selectedTab === "vacation" ? "blue-500" : "gray-50"
                  } text-${
                    selectedTab === "vacation" ? "white" : "gray-400"
                  } text-sm font-medium py-2 px-2 md:px-4 lg:px-4`}
                  onClick={() => handleTabClick("vacation")}
                >
                  vacation
                </button>
                <button
                  type="button"
                  className={`bg-${
                    selectedTab === "inactive" ? "blue-500" : "gray-50"
                  } text-${
                    selectedTab === "inactive" ? "white" : "gray-400"
                  } text-sm font-medium py-2 px-2 md:px-4 lg:px-4 rounded-tr-md rounded-br-md`}
                  onClick={() => handleTabClick("inactive")}
                >
                  inactive
                </button>
              </div>
              <div className="flex items-center">
                <span className="mr-2">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <input
                  placeholder="Search by ID"
                  type="number"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex justify-center items-center">
              <p>No hay usuarios.</p>
            </div>
          ) : (
            <div className="overflow-x-auto md:overflow-x-auto">
              <table
                className="w-full min-w-[540px] overflow-x-auto"
                data-tab-for="order"
                data-page="active"
              >
                <thead>
                  <tr>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                      Name
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left">
                      Last Name
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left">
                      Date of Birth
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left">
                      I.D.
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left ">
                      Position or Job Title
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left ">
                      Country
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left ">
                      City
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left ">
                      Department
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left ">
                      Salary
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left ">
                      Email Address
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                      Phone Number
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                      Date Hire
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers
                    .slice(indexIni, indexFin)
                    .reverse()
                    .map((user, i) => (
                      <tr key={i}>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">
                            <Link
                              to={`/employeesdetails?first_name=${encodeURIComponent(
                                user.first_name
                              )}&last_name=${encodeURIComponent(
                                user.last_name
                              )}&date_of_birth=${encodeURIComponent(
                                formatDate(user.date_of_birth)
                              )}&Identification_Document=${encodeURIComponent(
                                user.Identification_Document
                              )}&position=${encodeURIComponent(
                                user.position
                              )}&country=${encodeURIComponent(
                                user.country
                              )}&city=${encodeURIComponent(
                                user.city
                              )}&department=${encodeURIComponent(
                                user.department
                              )}&salary=${encodeURIComponent(
                                user.salary
                              )}&email=${encodeURIComponent(
                                user.email
                              )}&phone=${encodeURIComponent(
                                user.phone
                              )}&status=${encodeURIComponent(
                                user.status
                              )}&date_of_hire=${encodeURIComponent(
                                user.date_of_hire
                              )} &image=${encodeURIComponent(user.image)}`}
                              className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                            >
                              {user.first_name}
                            </Link>
                          </div>
                        </td>
                        <td className="py-2 px-2 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {user.last_name}
                          </span>
                        </td>
                        <td className="py-2 px-2 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {formatDate(user.date_of_birth)}
                          </span>
                        </td>
                        <td className="py-2 px-2 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {user.Identification_Document}
                          </span>
                        </td>
                        <td className="py-2 px-2 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {user.position}
                          </span>
                        </td>
                        <td className="py-2 px-2 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {user.country}
                          </span>
                        </td>
                        <td className="py-2 px-2 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {user.city}
                          </span>
                        </td>
                        <td className="py-2 px-2 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {user.department}
                          </span>
                        </td>
                        <td className="py-2 px-2 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {user.salary}
                          </span>
                        </td>
                        <td className="py-2 px-2 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {user.email}
                          </span>
                        </td>
                        <td className="py-2 px-2 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {user.phone}
                          </span>
                        </td>
                        <td className="py-2 px-2 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {formatDate(user.date_of_hire)}
                          </span>
                        </td>
                        <td className="py-2 px-2 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {user.status}
                          </span>
                        </td>
                        <td className="flex space-x-2  py-2 px-2 border-b border-b-gray-50">
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-white  bg-yellow-500 text-sm font-bold py-2 px-4 rounded-md mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="text-white  bg-red-500 text-sm font-bold py-2 px-4 rounded-md"
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={handleGoToFirstPage}
              className={`${
                currentPage === 1 ? "hidden" : ""
              } bg-blue-500 text-white text-sm font-medium py-2 px-4 mr-2 rounded-md focus:outline-none focus:ring focus:border-blue-300`}
            >
              First Page
            </button>
            <button
              onClick={handlePrevPage}
              className={`${
                currentPage === 1 ? "hidden" : ""
              } bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-l-md focus:outline-none focus:ring focus:border-blue-300`}
            >
              Previous
            </button>
            <div className="mx-4 text-xl font-bold text-blue-700">
              Page {currentPage} of {nPages}
            </div>
            <button
              onClick={handleNextPage}
              className={`${
                currentPage === nPages ? "hidden" : ""
              } bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-r-md focus:outline-none focus:ring focus:border-blue-300`}
            >
              Next
            </button>
            <button
              onClick={handleGoToLastPage}
              className={`${
                currentPage === nPages ? "hidden" : ""
              } bg-blue-500 text-white text-sm font-medium py-2 px-4 ml-2 rounded-md focus:outline-none focus:ring focus:border-blue-300`}
            >
              Last Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
