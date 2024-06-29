import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AuthContext from "../components/AuthContext";

const DepartmentCreation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState(null);
  const [formData, setFormData] = useState({
    department_name: "",
    department_salary: "",
    description_name: "",
  });
  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://deploy-sand-mu.vercel.app/department/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      if (response.data) {
        setFormData({
          department_name: "",
          department_salary: "",
          description_name: "",
        });

        Swal.fire({
          position: "center-center",
          icon: "success",
          title: "Department created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error creating department:", error);
      /*/ setError("Error creating department. Please try again.");
       // Assuming `ScreenPositive` is a component for displaying success messages
       <ScreenPositive message="Error" />;*/
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:3004/customers/");
        setCustomers(response.data.docs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
      <div className="bg-white border border-gray-100 ml-4 mr-4 shadow-md shadow-black/5 p-6 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Department Creation</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2">
            Department Name:
            <input
              type="text"
              name="department_name"
              value={formData.department_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="mb-2">
            Department Salary:
            <input
              type="text"
              name="department_salary"
              value={formData.department_salary}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="mb-2">
            Department Description:
            <textarea
              name="description_name"
              value={formData.description_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="mb-2">Customer:</label>
          <select
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          >
            <option value="">Seleccionar cliente</option>
            {customers &&
              customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white mt-2 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepartmentCreation;
