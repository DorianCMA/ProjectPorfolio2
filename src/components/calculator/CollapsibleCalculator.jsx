import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const CollapsibleCalculator = () => {
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
          <FontAwesomeIcon className="mr-2" icon={faCalculator} />
          Calculators
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
          <li className="mb-1 group">
            <div className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md sidebar-dropdown-toggle">
              <div className="ri-flashlight-line mr-3 text-lg"></div>
              <Link to="/aguinaldocalculator" className="text-sm">
                Christmas Bonus Calculator
              </Link>
              <div className="ri-arrow-right-s-line ml-auto"></div>
            </div>
          </li>
          <li className="mb-1 group">
            <div className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md sidebar-dropdown-toggle">
              <div className="ri-flashlight-line mr-3 text-lg"></div>
              <Link to="/benefistcalculator" className="text-sm">
                Benefist Calculator
              </Link>
              <div className="ri-arrow-right-s-line ml-auto"></div>
            </div>
          </li>
          <li className="mb-1 group">
            <div className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md sidebar-dropdown-toggle">
              <div className="ri-flashlight-line mr-3 text-lg"></div>
              <Link to="/vacationcalculation" className="text-sm">
                Vacation Calculator
              </Link>
              <div className="ri-arrow-right-s-line ml-auto"></div>
            </div>
          </li>
          <li className="mb-1 group">
            <div className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md sidebar-dropdown-toggle">
              <div className="ri-flashlight-line mr-3 text-lg"></div>
              <Link to="/salaryliquidationcalculator" className="text-sm">
                Liquidation Calculator
              </Link>
              <div className="ri-arrow-right-s-line ml-auto"></div>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CollapsibleCalculator;
