import { useState } from "react";

const VacationCalculation = () => {
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [serviceDays, setServiceDays] = useState(0);
  const [vacationDays, setVacationDays] = useState(0);

  const calculateVacation = () => {
    const calculatedVacationDays = Math.floor((serviceDays / 365) * 15);
    setVacationDays(calculatedVacationDays.toFixed(1));
  };

  const calculateVacationPayment = () => {
    const vacationAmount = monthlySalary * (vacationDays / 30);
    return vacationAmount.toFixed(2);
  };

  const handleSalary = (e) => {
    const value = e.target.value.replace(/^0+/, "");
    setMonthlySalary(value);
  };

  const handleServiceDays = (e) => {
    setServiceDays(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    calculateVacation();
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
        <div className="bg-white border border-gray-100 ml-4 mr-4 shadow-md shadow-black/5 p-6 rounded-md">
          <h2 className="font-bold mb-4 text-xl">Vacation Calculation</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Monthly Integral Salary:
                <input
                  type="number"
                  value={monthlySalary}
                  onChange={handleSalary}
                  className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Service Days:
                <input
                  type="number"
                  value={serviceDays}
                  onChange={handleServiceDays}
                  className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </label>
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              type="submit"
            >
              Calculate Vacation
            </button>
          </form>
        </div>
      </div>
      <p className="block text-sm font-medium text-gray-600">
        Vacation Days: {vacationDays} days
      </p>
      <p className="block text-sm font-medium text-gray-600">
        Vacation Amount: ${calculateVacationPayment()}
      </p>
    </div>
  );
};

export default VacationCalculation;
