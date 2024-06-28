import { useState } from "react";

const SalaryLiquidationCalculator = () => {
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [benefits, setBenefits] = useState(0);
  const [deductions, setDeductions] = useState(0);
  const [monthsWorked, setMonthsWorked] = useState(0);
  const [liquidationAmount, setLiquidationAmount] = useState(0);

  const calculateLiquidation = () => {
    if (
      !isNaN(monthlySalary) &&
      !isNaN(monthsWorked) &&
      !isNaN(benefits) &&
      !isNaN(deductions)
    ) {
      const calculatedLiquidation =
        monthlySalary * monthsWorked + benefits - deductions;
      setLiquidationAmount(calculatedLiquidation);
    } else {
      setLiquidationAmount(0);
    }
  };

  const handleSalaryChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setMonthlySalary(value);
  };

  const handleBenefitsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setBenefits(value);
  };

  const handleDeductionsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setDeductions(value);
  };

  const handleMonthsWorkedChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setMonthsWorked(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    calculateLiquidation();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
      <div className="bg-white border border-gray-100 ml-4 mr-4 shadow-md shadow-black/5 p-6 rounded-md">
        <h2 className="font-bold mb-4 text-xl">
          Salary Liquidation Calculator
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Monthly Salary:
              <input
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                type="number"
                value={monthlySalary}
                onChange={handleSalaryChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Months Worked:
              <input
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                type="number"
                value={monthsWorked}
                onChange={handleMonthsWorkedChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Additional Benefits:
              <input
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                type="number"
                value={benefits}
                onChange={handleBenefitsChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Deductions:
              <input
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                type="number"
                value={deductions}
                onChange={handleDeductionsChange}
              />
            </label>
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            type="submit"
          >
            Calculate Liquidation
          </button>
        </form>
      </div>

      <div className="mt-4">
        <p className="font-semibold">Liquidation Amount:</p>
        <p>${liquidationAmount.toFixed(2)}</p>
        {console.log(liquidationAmount)}
      </div>
    </div>
  );
};

export default SalaryLiquidationCalculator;
