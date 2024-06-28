import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AuthContext from "../components/AuthContext";

const EditDepartment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { departmentData } = location.state ?? {};
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    departmentName: "",
    departmentSalary: "",
    descriptionName: "",
  });

  useEffect(() => {
    if (departmentData) {
      setFormData({
        departmentName: departmentData.department_name || "",
        departmentSalary: departmentData.departmentSalary || "",
        descriptionName: departmentData.description_name || "",
      });
    }
  }, [departmentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedDepartmentData = {
      department_name: formData.departmentName,
      department_salary: formData.departmentSalary,
      description_name: formData.descriptionName,
    };

    try {
      const response = await axios.patch(
        `http://localhost:3002/department/${departmentData._id}`,
        updatedDepartmentData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );

      console.log(response.data);

      if (response.data) {
        console.log("Department updated successfully");
      }

      navigate("/department");
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
      <div className="bg-white border border-gray-100 ml-4 mr-4 shadow-md shadow-black/5 p-6 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Department Creation</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2">
            Department Name:
            <input
              type="text"
              name="departmentName"
              value={formData.departmentName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="mb-2">
            Department Salary:
            <input
              type="text"
              name="departmentSalary"
              value={formData.departmentSalary}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="mb-2">
            Department Description:
            <textarea
              name="descriptionName"
              value={formData.descriptionName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;
