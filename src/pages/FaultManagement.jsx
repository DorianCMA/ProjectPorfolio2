import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../components/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

const FaultManagement = () => {
  const [faults, setFaults] = useState([]);
  const [customers, setCustomers] = useState(null);
  const [newFaults, setNewFaults] = useState({
    firstName: "",
    lastName: "",
    identificationDocument: "",
    faultType: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const { token } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredFaults = faults.filter((fault) =>
    fault.identificationDocument
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFaults((prevFault) => ({
      ...prevFault,
      [name]: value,
    }));
  };

  const handleAddFault = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3002/fault",
        newFaults,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );
        console.log(response.data);
      if (response.data) {
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: "Your fault has been recorded",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
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
          await axios.delete(`http://localhost:3002/fault/${id}`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          });
          fetchData();
          Swal.fire({
            title: "Deleted!",
            text: "The fault has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting fault:", error);
        }
      }
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/fault", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
      setFaults(response.data.docs);
    } catch (error) {
      setFaults([]);
      console.error("Error fetching fault:", error);
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
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
        <div className="bg-white border border-gray-100 ml-4 mr-4 shadow-md shadow-black/5 p-6 rounded-md">
          <div className="flex justify-between">
            <h1 className="font-bold mb-4 text-xl">Fault Management</h1>
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
          <form onSubmit={handleAddFault}>
            <label className="block text-sm font-medium text-gray-600">
              First Name:
              <input
                type="text"
                name="firstName"
                value={newFaults.firstName}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-sm font-medium text-gray-600">
              Last Name:
              <input
                type="text"
                name="lastName"
                value={newFaults.lastName}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-sm font-medium text-gray-600">
              Identification Document:
              <input
                type="number"
                name="identificationDocument"
                value={newFaults.identificationDocument}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-sm font-medium text-gray-600">
              Fault Type:
              <input
                type="text"
                name="faultType"
                value={newFaults.faultType}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-sm font-medium text-gray-600">
              Start Date:
              <input
                type="date"
                name="startDate"
                value={newFaults.startDate}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-sm font-medium text-gray-600">
              End Date:
              <input
                type="date"
                name="endDate"
                value={newFaults.endDate}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-sm font-medium text-gray-600">
              Description:
              <textarea
                name="description"
                value={newFaults.description}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-sm font-medium text-gray-600">
              <select
                name="customer_id"
                value={newFaults.customer_id}
                onChange={handleInputChange}
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
            </label>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mt-2"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Display Absences */}
      <div className="overflow-x-auto mb-4">
        <table
          className="w-full min-w-[540px]"
          data-tab-for="order"
          data-page="active"
        >
          <thead>
            <tr>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                First Name
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                Last Name
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                I.D
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                Start Date
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                End Date
              </th>

              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFaults.map((fault, index) => (
              <tr key={index} className="h-8">
                <td className="items-center">
                  <Link
                    to={`/faultsdetails?firstName=${encodeURIComponent(
                      fault.firstName
                    )}&lastName=${encodeURIComponent(
                      fault.lastName
                    )}&identificationDocument=${encodeURIComponent(
                      fault.identificationDocument
                    )}&startDate=${encodeURIComponent(
                      fault.startDate
                    )}&endDate=${encodeURIComponent(
                      fault.endDate
                    )}&description=${encodeURIComponent(fault.description)}`}
                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                  >
                    {fault.firstName}
                  </Link>
                </td>
                <td className=" items-center">
                  <div className="text-[13px] font-medium text-gray-400">
                    {fault.lastName}
                  </div>
                </td>
                <td className=" items-center">
                  <div className="text-[13px] font-medium text-gray-400">
                    {fault.identificationDocument}
                  </div>
                </td>
                <td className=" items-center">
                  <div className="text-[13px] font-medium text-gray-400">
                    {fault.startDate}
                  </div>
                </td>
                <td className=" items-center">
                  <div className="text-[13px] font-medium text-gray-400">
                    {fault.endDate}
                  </div>
                </td>
                <td className=" items-center">
                  <div className="text-[13px] font-medium text-gray-400">
                    <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">
                      {fault.description
                        ? fault.description.length > 10
                          ? `${fault.description.substring(0, 10)}...`
                          : fault.description
                        : ""}
                    </div>
                  </div>
                </td>

                <td className=" items-center">
                  <div className="text-[13px] font-medium text-gray-400">
                    <button
                      onClick={() => handleDelete(fault._id)}
                      className="text-white bg-red-500 text-sm font-bold px-2 rounded-md"
                    >
                      X
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FaultManagement;
