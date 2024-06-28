import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../components/AuthContext";

const EditEmployees = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { employeeData } = location.state ?? {};

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [Identification_Document, setIdentificationDocument] = useState("");
  const [phone, setPhone] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [position, setPosition] = useState(""); 
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [date_of_hire, setDateOfHire] = useState("");
  const [image, setImage] = useState("");
  const [status, setEstatus] = useState("")
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (employeeData) {
      setFirstName(employeeData.first_name || "");
      setLastName(employeeData.last_name || "");
      setEmail(employeeData.email || "");
      setAddress(employeeData.address || "");
      setIdentificationDocument(employeeData.Identification_Document || "");
      setPhone(employeeData.phone || "");
      setDateOfBirth(employeeData.date_of_birth || "");
      setPosition(employeeData.position || "");
      setCountry(employeeData.country || "");
      setCity(employeeData.city || "");
      setDepartment(employeeData.department || "");
      setSalary(employeeData.salary || "");
      setDateOfHire(employeeData.date_of_hire || "");
      setImage(employeeData.image || "");
      setEstatus(employeeData.status || "");

    }
  }, [employeeData]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    switch (name) {
      case "first_name":
        setFirstName(value);
        break;
      case "last_name":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "Identification_Document":
        setIdentificationDocument(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "date_of_birth":
        setDateOfBirth(value);
        break;
      case "position":
        setPosition(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "city":
        setCity(value);
        break;
      case "department":
        setDepartment(value);
        break;
      case "salary":
        setSalary(value);
        break;
      case "date_of_hire":
        setDateOfHire(value);
        break;
      case "image":
        if (files.length > 0) {
          const selectedImage = files[0];
          setImage(
            "assets/" + selectedImage.name.replace(/c:\\fakepath\\/i, "")
          );
         
        }
        break;
      case "status":
        setEstatus(value);
        break;
      default:
        console.warn(`Unhandled field: ${name}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEmployeeData = {
      first_name,
      last_name,
      email,
      address,
      Identification_Document,
      phone,
      date_of_birth,
      position,
      country,
      city,
      department,
      salary,
      date_of_hire,
      image,
      status
    };
    console.log(updatedEmployeeData);

    try {
      await axios.patch(
        `http://localhost:3002/rrhh/${employeeData._id}`,
        updatedEmployeeData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }
      );
      console.log(updatedEmployeeData)
      console.log("Employee updated successfully");
      navigate("/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
        <div className="bg-white border border-gray-100 ml-4 mr-4 shadow-md shadow-black/5 p-6 rounded-md">
          <h2 className="font-bold mb-4 text-xl">Edit Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                First Name:
              </label>
              <input
                type="text"
                name="first_name"
                value={first_name}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Last Name:
              </label>
              <input
                type="text"
                name="last_name"
                value={last_name}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Email:
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Identification Document:
              </label>
              <input
                type="number"
                name="Identification_Document"
                value={Identification_Document}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Phone Number:
              </label>
              <input
                type="number"
                name="phone"
                value={phone}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Date of Birth:
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={date_of_birth}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Position:
              </label>
              <input
                type="text"
                name="position"
                value={position}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Country:
              </label>
              <input
                type="text"
                name="country"
                value={country}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                City:
              </label>
              <input
                type="text"
                name="city"
                value={city}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Department:
              </label>
              <input
                type="text"
                name="department"
                value={department}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Salary:
              </label>
              <input
                type="number"
                name="salary"
                value={salary}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
               Fecha de contratacion:
              </label>
              <input
                type="date"
                name="date_of_hire"
                value={date_of_hire}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Image:
              </label>
              <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
              Estado:
              </label>
              <select
                name="status"
                value={status}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              >
                <option value="">Seleccionar estado</option>

                <option value="suspended">suspended</option>
                <option value="active">Active </option>
                <option value="vacation">vacation</option>
                <option value="inactive">inactive</option>
              </select>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployees;
