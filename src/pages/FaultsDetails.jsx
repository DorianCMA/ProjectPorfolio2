import { useLocation } from "react-router-dom";

const FaultsDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");
  const identificationDocument = searchParams.get("identificationDocument");
  const faultType = searchParams.get("faultType");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const description = searchParams.get("description");

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8 ">
        <div className="bg-white border border-gray-100 ml-4 mr-4 shadow-md shadow-black/5 p-6 rounded-md">
          <div className="font-bold ">Reprimand Details</div>
          <h2>{decodeURIComponent(firstName)}</h2>
          <p>last name: {decodeURIComponent(lastName)}</p>
          <p>
            Identification Document:{" "}
            {decodeURIComponent(identificationDocument)}
          </p>
          <p>Type: {decodeURIComponent(faultType)}</p>
          <p>Start Date: {decodeURIComponent(startDate)}</p>
          <p>End Date: {decodeURIComponent(endDate)}</p>
          <p>Description: {decodeURIComponent(description)}</p>
        </div>
      </div>
    </div>
  );
};

export default FaultsDetails;
