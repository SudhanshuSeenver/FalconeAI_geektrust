import { useEffect } from "react";
import "./header.css";

function Header({
  updateVehicleCount,
  updateTargetPlanets,
  updateTimeTaken,
  vehicles,
  found,
}) {
  function handleResetClick(e) {
    const vehicleList = {};

    vehicles.forEach((veh) => {
      vehicleList[veh.name] = 0;
    });
    updateVehicleCount({ ...vehicleList });
    updateTargetPlanets([]);
    updateTimeTaken(0);
  }

  return (
    <header className="falcone-header">
      <p className="heading">Finding Falcone!</p>
      <ul className="header-links">
        {!found && (
          <>
            <li onClick={handleResetClick}>Reset</li>
            <li>|</li>
          </>
        )}
        <li>
          <a href="https://www.geektrust.com/">Geek Trust Home</a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
