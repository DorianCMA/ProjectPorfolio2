import { useState } from "react";

const SalaryGeneral = () => {
  const [baseSalary, setBaseSalary] = useState(0);
  const [bonuses, setBonuses] = useState(0);
  const [deductions, setDeductions] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);

  const calculateSalary = () => {
    const calculatedSalary = baseSalary + bonuses - deductions;
    setTotalSalary(calculatedSalary);
  };

  const handleBaseSalaryChange = (event) => {
    setBaseSalary(parseFloat(event.target.value) || 0);
  };

  const handleBonusesChange = (event) => {
    setBonuses(parseFloat(event.target.value) || 0);
  };

  const handleDeductionsChange = (event) => {
    setDeductions(parseFloat(event.target.value) || 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    calculateSalary();
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
        <div className="bg-white border border-gray-100 ml-4 mr-4 shadow-md shadow-black/5 p-6 rounded-md">
          <h2 className="font-bold mb-4 text-xl">Calculadora de Salario</h2>
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-600">
              Salario Base:
              <input
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                type="number"
                value={baseSalary}
                onChange={handleBaseSalaryChange}
              />
            </label>
            <br />
            <label className="block text-sm font-medium text-gray-600">
              Bonificaciones:
              <input
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                type="number"
                value={bonuses}
                onChange={handleBonusesChange}
              />
            </label>
            <br />
            <label className="block text-sm font-medium text-gray-600">
              Deducciones:
              <input
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                type="number"
                value={deductions}
                onChange={handleDeductionsChange}
              />
            </label>
            <br />
            <button type="submit">Calcular Salario</button>
          </form>
        </div>
      </div>

      <p>Salario General: ${totalSalary.toFixed(2)}</p>
    </div>
  );
};

export default SalaryGeneral;
