import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AuthContext from "../components/AuthContext";

const DepartmentDetails = () => {
  const [departments, setDepartments] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const departmentName = searchParams.get("department_name");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://deploy-sand-mu.vercel.app/rrhh/", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
      console.log("Employee data response:", response.data);
      setDepartments(response.data);
    } catch (error) {
      setDepartments([]);
      console.error("Error fetching employee data:", error);
    }
  };

  const matchingDepartments = departments.filter(
    (department) => department.department === departmentName
  );

  return (
    <div>
      {matchingDepartments.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8 ">
          <div className="bg-white border border-gray-100 ml-4 mr-4 shadow-md shadow-black/5 p-6 rounded-md ">
            <div className="font-bold mb-2 ">{departmentName}</div>
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
                      Salary
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left ">
                      Email Address
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                      Phone Number
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {matchingDepartments.map((matchingDepartment, i) => (
                    <tr key={i}>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center">
                          <span className="text-gray-600 text-sm font-medium  ml-2 truncate">
                            {matchingDepartment.first_name}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 px-2 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-400">
                          {matchingDepartment.last_name}
                        </span>
                      </td>

                      <td className="py-2 px-2 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-400">
                          {matchingDepartment.Identification_Document}
                        </span>
                      </td>
                      <td className="py-2 px-2 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-400">
                          {matchingDepartment.position}
                        </span>
                      </td>
                      <td className="py-2 px-2 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-400">
                          {matchingDepartment.country}
                        </span>
                      </td>
                      <td className="py-2 px-2 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-400">
                          {matchingDepartment.city}
                        </span>
                      </td>

                      <td className="py-2 px-2 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-400">
                          {matchingDepartment.salary}
                        </span>
                      </td>
                      <td className="py-2 px-2 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-400">
                          {matchingDepartment.email}
                        </span>
                      </td>
                      <td className="py-2 px-2 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-400">
                          {matchingDepartment.phone}
                        </span>
                      </td>
                      <td className="py-2 px-2 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-400">
                          {matchingDepartment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-600">
            This department does not have employees
          </h3>
        </div>
      )}
    </div>
  );
};

export default DepartmentDetails;
