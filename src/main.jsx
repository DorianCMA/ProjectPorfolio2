import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as App from "./App";
import "./index.css";
import ProtectedRouter from "./components/ProtectedRouter";
import Layout from "./components/Layout";
import { AuthContextProvider } from "./components/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<App.Login />} />
          <Route path="/login" element={<App.Login />} />
          <Route path="/register" element={<App.Register />} />
          <Route path="/forgotpassword" element={<App.ForgotPassword />} />
          <Route path="/resetpassword" element={<App.ResetPassword />} />
          <Route element={<ProtectedRouter />}>
            <Route path="/employees" element={<Layout><App.Employees /> </Layout>} />
            <Route path="/employeesdetails" element={<Layout><App.EmployeesDetails /></Layout>} />
            <Route path="/createemployees" element={<Layout><App.CreateEmployees /></Layout>} />
            <Route path="/editemployees" element={<Layout><App.EditEmployees /></Layout>} />
            <Route path="/salarygeneral" element={<Layout><App.SalaryGeneral /></Layout>} />
            <Route path="/departmentcreation" element={<Layout><App.DepartmentCreation /></Layout>} />
            <Route path="/department" element={<Layout><App.Department /></Layout>} />
            <Route path="/benefistcalculator" element={<Layout><App.BenefistCalculator /></Layout>} />
            <Route path="/reprimanddetails" element={<Layout><App.ReprimandDetails /></Layout>} />
            <Route path="/reprimandmanagement" element={<Layout><App.ReprimandManagement /></Layout>} />
            <Route
              path="/aguinaldocalculator"
              element={<Layout><App.ChristmasBonusCalculator /></Layout>}
            />
            <Route path="/vacationcalculation" element={<Layout><App.VacationCalculation /></Layout>} />
            <Route path="/simplebarcharts" element={<Layout><App.SimpleBarCharts /></Layout>} />
            <Route path="/departmentdetails" element={<Layout><App.DepartmentDetails /></Layout>} />
            <Route path="/faultmanagement" element={<Layout><App.FaultManagement /></Layout>} />
            <Route path="/editdepartment" element={<Layout><App.EditDepartment /></Layout>} />
            <Route path="/faultsdetails" element={<Layout><App.FaultsDetails /></Layout>} />
            <Route
              path="/salaryliquidationcalculator"
              element={<Layout><App.SalaryLiquidationCalculator /></Layout>}
            />
            <Route path="*" element={<Layout><App.NoPage /></Layout>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);