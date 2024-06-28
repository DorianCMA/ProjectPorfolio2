import { useLocation } from "react-router-dom";

const ReprimandDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const last_name = searchParams.get("last_name");
  const Identification_Document = searchParams.get("Identification_Document");
  const type = searchParams.get("type");
  const date = searchParams.get("date");
  const description = searchParams.get("description");

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8 ">
        <div className="bg-white border border-gray-100 ml-4 mr-4 shadow-md shadow-black/5 p-6 rounded-md">
          <div className="font-bold ">Reprimand Details</div>
          <h2>{decodeURIComponent(name)}</h2>
          <p>last name: {decodeURIComponent(last_name)}</p>
          <p>
            Identification Document:{" "}
            {decodeURIComponent(Identification_Document)}
          </p>
          <p>Type: {decodeURIComponent(type)}</p>
          <p>Date: {decodeURIComponent(date)}</p>
          <p>Description: {decodeURIComponent(description)}</p>
        </div>
      </div>
    </div>
  );
};

export default ReprimandDetails;
