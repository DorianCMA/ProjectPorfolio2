import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { differenceInMonths, parseISO } from "date-fns";
import unknownImg from "../../public/assets/images.png";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import moment from "moment";
import AuthContext from "../components/AuthContext";

const EmployeeDetails = () => {

  const [reprimands, setReprimands] = useState([]);
  const [faults, setFaults] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const first_name = searchParams.get("first_name");
  const last_name = searchParams.get("last_name");
  const date_of_birth = searchParams.get("date_of_birth");
  const Identification_Document_Personal = searchParams.get(
    "Identification_Document"
  );
  const position = searchParams.get("position");
  const country = searchParams.get("country");
  const city = searchParams.get("city");
  const department = searchParams.get("department");
  const salary = searchParams.get("salary");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const status = searchParams.get("status");
  const image = searchParams.get("image");
  const Identification_Document = searchParams.get("Identification_Document");
  const date_of_hire = searchParams.get("date_of_hire");
  const {token} = useContext(AuthContext);

  // Validate if essential parameters are present

  /* const handleEdit = (employeeData) => {
    navigate(`/edit-employees`, { state: { employeeData } });
  }; */

  useEffect(() => {
    fetchData();
    fetchDataFaults();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://deploy-sand-mu.vercel.app/reprimend/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setReprimands(response.data.docs);
      if (response.data) console.log("here");
    } catch (error) {
      setReprimands([]);
      console.error("Error fetching reprimands:", error);
    }
  };
  const fetchDataFaults = async () => {
    try {
      const response = await axios.get("https://deploy-sand-mu.vercel.app/fault/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setFaults(response.data.docs);
      console.log("fault:", response.data.docs);
    } catch (error) {
      setFaults([]);
      console.error("Error fetching reprimands:", error);
    }
  };

  const hasReprimand = reprimands.some(
    (reprimand) =>
      reprimand.name === first_name.trim() &&
      reprimand.last_name === last_name.trim() &&
      reprimand.Identification_Document === Identification_Document.trim()
  );

  const matchingReprimand = reprimands.find(
    (reprimand) =>
      reprimand.name === first_name.trim() &&
      reprimand.last_name === last_name.trim() &&
      reprimand.Identification_Document === Identification_Document.trim()
  );

  const hasFault = faults.some(
    (fault) =>
      fault.firstName === first_name.trim() &&
      fault.lastName === last_name.trim() &&
      fault.identificationDocument === Identification_Document.trim()
  );

  const matchingFault = faults.find(
    (fault) =>
      fault.firstName === first_name.trim() &&
      fault.lastName === last_name.trim() &&
      fault.identificationDocument === Identification_Document.trim()
  );

  // Months worked
  const trimmedDateOfHire = date_of_hire.trim();
  //const dateOfHire = parseISO(trimmedDateOfHire);
  const currentDate = new Date();
  const monthsWorked = differenceInMonths(currentDate, trimmedDateOfHire);

  // Calculate bonus
  const [aguinaldoAmount, setAguinaldoAmount] = useState(0);
  const calculateBonus = () => {
    const calculateBonus = (salary / 12) * monthsWorked;
    setAguinaldoAmount(calculateBonus);
  };

  useEffect(() => {
    calculateBonus();
    // eslint-disable-next-line
  }, [salary, monthsWorked]);

  const downloadEmployeeInfo = () => {
    const workbook = XLSX.utils.book_new();
    const employeeInfoSheet = XLSX.utils.json_to_sheet([
      {
        "Employee Name": `${first_name} ${last_name}`,
        Position: position,
        "Date of Birth": date_of_birth,
        "Identification Document": Identification_Document_Personal,
        Country: country,
        City: city,
        Department: department,
        Salary: salary,
        Email: email,
        Phone: phone,
        Status: status,
        "Date of Hire": date_of_hire,
        "Has Reprimand": hasReprimand ? "Yes" : "No",
        "Reprimand Type": hasReprimand ? matchingReprimand.type : "",
        "Reprimand Description": hasReprimand
          ? matchingReprimand.description
          : "",
        "Has Fault": hasFault ? "Yes" : "No",
        "Fault Type": hasFault ? matchingFault.faultType : "",
        "Fault Start Date": hasFault ? matchingFault.startDate : "",
        "Fault End Date": hasFault ? matchingFault.endDate : "",
        "Fault Description": hasFault ? matchingFault.description : "",
        "Months Worked": monthsWorked,
        "Accumulated Bonus Amount": aguinaldoAmount,
      },
    ]);

    XLSX.utils.book_append_sheet(workbook, employeeInfoSheet, "Employee Info");

    const excelFileName = "Employee_Info.xlsx";
    XLSX.writeFile(workbook, excelFileName);
    saveAs(workbook, excelFileName);
  };

  // Dividir la cadena en año, mes y día
  const parts = date_of_hire.split("-");
  const year = parts[0];
  const month = parts[1];
  const day = parts[2].split("T")[0];

  // Crear la cadena de fecha en el formato ISO 8601
  const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}T00:00:00.000Z`;

  const dateFormateOfHire = moment(formattedDate).format("YYYY/MM/DD");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8 ">
      <div className="bg-white border border-gray-100 ml-4 mr-4 shadow-md shadow-black/5 p-6 rounded-md">
        <div className="flex justify-between mb-4 items-start">
          <div className="font-bold">Employee Details</div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-40 h-40 bg-gray-300 rounded-full overflow-hidden">
            <img
              src={image ? `${image}` : unknownImg}
              alt="Employee image"
              className="w-full h-full object-cover rounded-full"
            />
            {console.log(image)}
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium">
              {first_name} {last_name}
            </h2>
            <p className="text-gray-500">{position}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-600">
              Personal Information
            </h3>
            <p>Date of Birth: {date_of_birth}</p>

            <p>Identification Document: {Identification_Document_Personal}</p>
            <p>Country: {country}</p>
            <p>City: {city}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">
              Work Information
            </h3>
            <p>Department: {department}</p>
            <p>Salary: {salary}</p>

            <p>Date of Hire: {dateFormateOfHire}</p>
            {console.log("Date of Hire:", date_of_hire)}
            {console.log("Date of Hire:", parseISO(date_of_hire))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <h3 className="text-sm font-medium text-gray-600">
              Contact Information
            </h3>
            <p>Email Address: {email}</p>
            <p>Phone Number: {phone}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">Bonus</h3>
            <p>Monthly Salary: ${salary}</p>
            <p>{`Months Worked: ${monthsWorked}`}</p>
            <p>{`Accumulated bonus amount: $${aguinaldoAmount}`}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 ">
          <div>
            {hasReprimand ? (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-600">
                  This user has a reprimand
                </h3>
                <div>
                  <div>
                    <strong>Type of reprimand: </strong>
                    {matchingReprimand.type}
                  </div>
                  <div>
                    <strong>Description of reprimand: </strong>
                    {matchingReprimand.description}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-600">
                  This user does not have a reprimand
                </h3>
              </div>
            )}
          </div>
          <div>
            {hasFault ? (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-600">
                  This user has a Faults
                </h3>
                <div>
                  <div>
                    <strong>Type of Fault: </strong>
                    {matchingFault.faultType}
                  </div>
                  <div>
                    <strong>Start of fault: </strong>
                    {matchingFault.startDate}
                  </div>
                  <div>
                    <strong>End of fault: </strong>
                    {matchingFault.endDate}
                  </div>
                  <div>
                    <strong>Description: </strong>
                    {matchingFault.description}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-600">
                  This user does not have faults
                </h3>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4"></div>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300 "
          onClick={downloadEmployeeInfo}
        >
          Download Excel
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
