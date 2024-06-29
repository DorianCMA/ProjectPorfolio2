import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AuthContext from "../components/AuthContext";

const Department = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [filterOption, setFilterOption] = useState("all");
  const { token } = useContext(AuthContext);

  console.log(selectedTab)

  useEffect(() => {
    fetchData();
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

  /* const handleFilterOptionChange = (e) => {
     setFilterOption(e.target.value);
   };*/

  const fetchData = async () => {
    try {
      const response = await axios.get("https://deploy-sand-mu.vercel.app/department/", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        }
      });
      setAllUsers(response.data.docs);
      setFilteredUsers(response.data.docs);
    } catch (error) {
      console.error("Failed ", error.response.data);
    }
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setFilterOption(tab);
  };

  console.log(handleTabClick)

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
          await axios.delete(`https://deploy-sand-mu.vercel.app/department/${id}`, {
            Headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            }
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

  const handleEdit = (departmentData) => {
    navigate(`/editdepartment`, { state: { departmentData } });
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8 ">
        <div className="bg-white border border-gray-100 ml-4 mr-4 shadow-md shadow-black/5 p-6 rounded-md">
          <div className="flex justify-between mb-4 items-start">
            <div className="font-bold ">Departmen</div>
          </div>
          {filteredUsers.length === 0 ? (
            <p>No Department</p>
          ) : (
            <table
              className="w-full min-w-[540px]"
              data-tab-for="order"
              data-page="active"
            >
              <thead>
                <tr>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                    Name
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                    Salary
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    Deparmet description
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((department, i) => (
                  <tr key={i}>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <Link
                          to={`/departmentdetails?department_name=${encodeURIComponent(
                            department.department_name
                          )}`}
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          {department.department_name}
                        </Link>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        {department.department_salary || "Not specified"}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        {department.description_name}
                      </span>
                    </td>

                    <td className="flex space-x-2  py-2 px-4 border-b border-b-gray-50">
                      <button
                        onClick={() => handleEdit(department)}
                        className="text-white  bg-yellow-500 text-sm font-bold py-2 px-4 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(department._id)}
                        className="text-white  bg-red-500 text-sm font-bold py-2 px-4 rounded-md"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Department;
