import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AuthContext from "../components/AuthContext";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    Identification_Document: "",
    phone: "",
    date_of_birth: "",
    position: "",
    country: "",
    city: "",
    department: "",
    salary: "",
    date_of_hire: "",
    status: "",
    image: null,
    customer_id: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customers, setCustomers] = useState(null);
  const { token } = useContext(AuthContext);


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData);

    try {
      const formDataWithImage = new FormData();

      Object.keys(formData).forEach((key) => {
        formDataWithImage.append(key, formData[key]);
      });

      const response = await axios.post(
        "https://deploy-sand-mu.vercel.app/rrhh/",
        formDataWithImage,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      if (response.data) {
        // setFormData({
        //   first_name: "",
        //   last_name: "",
        //   email: "",
        //   address: "",
        //   Identification_Document: "",
        //   phone: "",
        //   date_of_birth: "",
        //   position: "",
        //   country: "",
        //   city: "",
        //   department: "",
        //   salary: "",
        //   date_of_hire: "",
        //   status: "",
        //   image: null,
        // });

        Swal.fire({
          position: "center-center",
          icon: "success",
          title: "User created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Error creating user. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
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
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
        <div className="bg-white border border-gray-100 ml-4 mr-4 shadow-md shadow-black/5 p-6 rounded-md">
          <h2 className="font-bold mb-4 text-xl">Create User</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Nombre:
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Apellido:
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Correo Electrónico:
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                address:
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
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
                value={formData.Identification_Document}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Número de Teléfono:
              </label>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Fecha de Nacimiento:
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Cargo:
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                País:
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Ciudad:
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Departamento:
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Salario:
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
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
                value={formData.date_of_hire}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Imagen:
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
                value={formData.status}
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
              <label className="block text-sm font-medium text-gray-600">
                Cliente:
              </label>
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
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              {isLoading ? "Guardando..." : "Guardar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
