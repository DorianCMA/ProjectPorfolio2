import { useState } from "react";

const ChristmasBonusCalculator = () => {
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [monthsWorked, setMonthsWorked] = useState(0);
  const [christmasBonusAmount, setChristmasBonusAmount] = useState(0);

  const calculateChristmasBonus = () => {
    const calculatedChristmasBonus = (monthlySalary / 12) * monthsWorked;
    setChristmasBonusAmount(calculatedChristmasBonus);
  };

  const handleSalaryChange = (event) => {
    const value = event.target.value.replace(/^0+/, "");
    setMonthlySalary(value);
  };

  const handleMonthsWorkedChange = (event) => {
    const value = event.target.value.replace(/^0+/, "");
    setMonthsWorked(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    calculateChristmasBonus();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
      <div className="bg-white border border-gray-100 ml-4 mr-4 shadow-md shadow-black/5 p-6 rounded-md">
        <h2 className="font-bold mb-4 text-xl">Christmas Bonus Calculator</h2>
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
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            type="submit"
          >
            Calculate Christmas Bonus
          </button>
        </form>
      </div>

      <div className="mt-4">
        <p className="font-semibold">Christmas Bonus Amount:</p>
        <p>${christmasBonusAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ChristmasBonusCalculator;
