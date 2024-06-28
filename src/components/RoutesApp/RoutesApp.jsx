import { Routes, Route } from "react-router-dom";
import * as App from "../../App";
import ProtectedRouter from "../../components/ProtectedRouter";

const RoutesApp = () => {
  return (
    <Routes element={<ProtectedRouter />}>
      <Route path="/employees" element={<App.Employees />} />
      <Route path="/employeesdetails" element={<App.EmployeesDetails />} />
      <Route path="/createemployees" element={<App.CreateEmployees />} />
      <Route path="/editemployees" element={<App.EditEmployees />} />
      <Route path="/salarygeneral" element={<App.SalaryGeneral />} />
      <Route path="/departmentcreation" element={<App.DepartmentCreation />} />
      <Route path="/department" element={<App.Department />} />
      <Route path="/benefistcalculator" element={<App.BenefistCalculator />} />
      <Route path="/reprimanddetails" element={<App.ReprimandDetails />} />
      <Route path="/reprimandmanagement" element={<App.ReprimandManagement />} />
      <Route
        path="/aguinaldocalculator"
        element={<App.ChristmasBonusCalculator />}
      />
      <Route path="/vacationcalculation" element={<App.VacationCalculation />} />
      <Route path="/login" element={<App.Login />} />
      <Route path="/register" element={<App.Register />} />
      <Route path="/simplebarcharts" element={<App.SimpleBarCharts />} />
      <Route path="/forgotpassword" element={<App.ForgotPassword />} />
      <Route path="/departmentdetails" element={<App.DepartmentDetails />} />
      <Route path="/faultmanagement" element={<App.FaultManagement />} />
      <Route path="/resetpassword" element={<App.ResetPassword />} />
      <Route path="/editdepartment" element={<App.EditDepartment />} />
      <Route path="/faultsdetails" element={<App.FaultsDetails />} />
      <Route
        path="/salaryliquidationcalculator"
        element={<App.SalaryLiquidationCalculator />}
      />
      <Route path="*" element={<App.NoPage />} />
    </Routes>
  );
};

export default RoutesApp;
