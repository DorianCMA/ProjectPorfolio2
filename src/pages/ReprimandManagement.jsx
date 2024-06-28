import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import AuthContext from "../components/AuthContext";

const ReprimandManagement = () => {
  const [reprimands, setReprimands] = useState([]);
  const [customers, setCustomers] = useState(null);
  const [newReprimand, setNewReprimand] = useState({
    name: "",
    last_name: "",
    Identification_Document: "",
    date: "",
    type: "",
    description: "",
  });
  const { token } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredReprimands = reprimands.filter((reprimand) =>
    reprimand.Identification_Document.toLowerCase().includes(
      searchTerm.toLowerCase()
    )
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
    setNewReprimand((prevReprimand) => ({
      ...prevReprimand,
      [name]: value,
    }));
  };

  const handleAddReprimand = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3002/reprimend/",
        newReprimand,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      if (response.data) {
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log("error con reprimenta", error);
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
          await axios.delete(`http://localhost:3002/reprimend/${id}`, {
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

  const fetchData = async () => {
    
    // console.log("token afuera de try",token)
    try {
     
      const response = await axios.get("http://localhost:3002/reprimend/", {
        headers: {
          Authorization: ` Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setReprimands(response.data.docs);
    } catch (error) {
      setError(error);
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
            <h1 className="font-bold mb-4 text-xl">Reprimand Management</h1>
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
          <form onSubmit={handleAddReprimand}>
            <label className="block text-sm font-medium text-gray-600">
              Name:
              <input
                type="text"
                name="name"
                value={newReprimand.name}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-sm font-medium text-gray-600">
              Last name:
              <input
                type="text"
                name="last_name"
                value={newReprimand.last_name}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-sm font-medium text-gray-600">
              Identification_Document:
              <input
                type="number"
                name="Identification_Document"
                value={newReprimand.Identification_Document}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-sm font-medium text-gray-600">
              Date:
              <input
                type="date"
                name="date"
                value={newReprimand.date}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-sm font-medium text-gray-600">
              Type:
              <input
                type="text"
                name="type"
                value={newReprimand.type}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-sm font-medium text-gray-600">
              Description:
              <textarea
                name="description"
                value={newReprimand.description} 
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-sm font-medium text-gray-600">
              <select
                name="customer_id"
                value={newReprimand.customer_id}
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
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              type="submit"
            >
              Add Reprimand
            </button>
          </form>
        </div>
      </div>

      {/* Display Reprimands */}
      <div className="overflow-x-auto mb-4">
        <table
          className=" w-full min-w-[540px] "
          data-tab-for="order"
          data-page="active"
        >
          <thead>
            <tr>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                Name
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                Last name
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                I.D
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                Date
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                Type
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-2 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReprimands.map((reprimand, index) => (
              <tr key={index} className="h-8">
                <td className="items-center">
                  <div className="text-[13px] font-medium text-gray-400">
                    <Link
                      to={`/reprimanddetails?name=${encodeURIComponent(
                        reprimand.name
                      )}&last_name=${encodeURIComponent(
                        reprimand.last_name
                      )}&Identification_Document=${encodeURIComponent(
                        reprimand.Identification_Document
                      )}&date=${encodeURIComponent(
                        reprimand.date
                      )}&type=${encodeURIComponent(
                        reprimand.type
                      )}&description=${encodeURIComponent(
                        reprimand.description
                      )}`}
                      className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                    >
                      {reprimand.name}
                    </Link>
                  </div>
                </td>
                <td className=" items-center">
                  <div className="text-[13px] font-medium text-gray-400">
                    <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">
                      {reprimand.last_name}
                    </div>
                  </div>
                </td>
                <td className=" items-center">
                  <div className="text-[13px] font-medium text-gray-400">
                    <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">
                      {reprimand.Identification_Document}
                    </div>
                  </div>
                </td>
                <td className=" items-center">
                  <div className="text-[13px] font-medium text-gray-400">
                    <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">
                      {reprimand.date}
                    </div>
                  </div>
                </td>
                <td className=" items-center">
                  <div className="text-[13px] font-medium text-gray-400">
                    <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">
                      {reprimand.type}
                    </div>
                  </div>
                </td>
                <td className=" items-center">
                  <div className="text-[13px] font-medium text-gray-400">
                    <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">
                      {reprimand.description.length > 10
                        ? `${reprimand.description.substring(0, 10)}...`
                        : reprimand.description}
                    </div>
                  </div>
                </td>
                <td className=" items-center">
                  <div className="text-[13px] font-medium text-gray-400">
                    <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">
                      <button
                        onClick={() => handleDelete(reprimand._id)}
                        className="text-white  bg-red-500 text-sm font-bold  px-2 rounded-md"
                      >
                        X
                      </button>
                    </div>
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

export default ReprimandManagement;
