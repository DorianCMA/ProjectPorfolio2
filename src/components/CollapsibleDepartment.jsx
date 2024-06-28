import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const CollapsibleDepartment = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div
        className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md cursor-pointer"
        onClick={toggleMenu}
      >
        <div className="ri-home-2-line mr-3 text-lg"></div>
        <span className="text-sm">
          <FontAwesomeIcon className="mr-2" icon={faUsers} />
          Departments
        </span>
        <div className="ml-auto">
          <FontAwesomeIcon
            icon={menuOpen ? faAngleDown : faAngleRight}
            className="text-sm transition-transform duration-300 transform"
          />
        </div>
      </div>
      {menuOpen && (
        <ul>
          <li className="mb-1">
            <div className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md">
              <div className="ri-user-line mr-3 text-lg"></div>
              <Link to="/department" className="text-sm">
                - Department
              </Link>
            </div>
          </li>
          <li className="mb-1">
            <div className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md">
              <div className="ri-user-line mr-3 text-lg"></div>
              <Link to="/departmentcreation" className="text-sm">
                - Create Department
              </Link>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CollapsibleDepartment;
