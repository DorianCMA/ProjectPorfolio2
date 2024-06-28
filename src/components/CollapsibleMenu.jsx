import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const CollapsibleMenu = () => {
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
          <FontAwesomeIcon className="mr-2" icon={faUser} />
          Employees
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
              <Link to="/employees" className="text-sm">
                - Employees
              </Link>
            </div>
          </li>
          <li className="mb-1">
            <div className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md">
              <div className="ri-add-circle-line mr-3 text-lg"></div>
              <Link to="/createemployees" className="text-sm">
                - Create Employees
              </Link>
            </div>
          </li>
          <li className="mb-1 group">
            <div className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md">
              <div className="ri-settings-2-line mr-3 text-lg"></div>
              <Link to="/reprimandmanagement" className="text-sm">
                - Reprimand
              </Link>
            </div>
          </li>
          <li className="mb-1 group">
            <div className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md">
              <div className="ri-settings-2-line mr-3 text-lg"></div>
              <Link to="/faultmanagement" className="text-sm">
                - Fault
              </Link>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CollapsibleMenu;
