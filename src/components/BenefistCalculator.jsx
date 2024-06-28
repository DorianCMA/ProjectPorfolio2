import { useState } from "react";

const BenefitsCalculator = () => {
  const [employee, setEmployee] = useState({
    baseSalary: 0,
    healthInsurance: 0,
    lifeInsurance: 0,
    pension: 0,
  });

  const [totalCost, setTotalCost] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value.replace(/^0+/, "") || "0",
    }));
  };

  const calculateTotalCost = () => {
    const { baseSalary, healthInsurance, lifeInsurance, pension } = employee;

    const totalBenefitsCost =
      parseFloat(baseSalary) +
      parseFloat(healthInsurance) +
      parseFloat(lifeInsurance) +
      parseFloat(pension);

    setTotalCost(totalBenefitsCost);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateTotalCost();
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
        <div className="bg-white border border-gray-100 ml-4 mr-4 shadow-md shadow-black/5 p-6 rounded-md">
          <h2 className="font-bold mb-4 text-xl">Benefits Calculator</h2>
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-600">
              Base Salary:
              <input
                type="number"
                name="baseSalary"
                value={employee.baseSalary}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <br />

            <label className="block text-sm font-medium text-gray-600">
              Health Insurance:
              <input
                type="number"
                name="healthInsurance"
                value={employee.healthInsurance}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <br />

            <label className="block text-sm font-medium text-gray-600">
              Life Insurance:
              <input
                type="number"
                name="lifeInsurance"
                value={employee.lifeInsurance}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <br />

            <label className="block text-sm font-medium text-gray-600">
              Pension:
              <input
                type="number"
                name="pension"
                value={employee.pension}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <br />

            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              type="submit"
            >
              Calculate
            </button>
          </form>
        </div>
      </div>

      <div>
        <h3>Total Benefits Cost:</h3>
        <p>${totalCost}</p>
      </div>
    </div>
  );
};

export default BenefitsCalculator;
