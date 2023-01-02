import { useEffect, useState } from "react";
import "./planets.css";
import Vehicles from "./Vehicles";

function Planets({
  id,
  planets,
  targetPlanets,
  updateTargetPlanets,
  vehicles,
  updateVehicles,
  vehicleCount,
  updateVehicleCount,
  updateTimeTaken,
  timeTaken,
}) {
  const [planet, updatePlanet] = useState("");

  useEffect(() => {
    if (targetPlanets.length === 0) {
      updatePlanet("");
      document.getElementById(`planet${id}`).value = "";
    }
  }, [targetPlanets]);
 
  function handleChangeSelectplanet(e) {
    // console.log(e.target.value);
    const updatedTargetList = targetPlanets.filter((trg) => trg !== planet);
    updateTargetPlanets([...updatedTargetList, e.target.value]);
    updatePlanet(e.target.value);
  }
  function returnPlanet() {
    for (let plt of planets) {
      if (plt.name === planet) return plt;
    }
  }

  return (
    <div className="planet">
      <select
        onChange={handleChangeSelectplanet}
        className="planet-select"
        name=""
        id={`planet${id}`}
      >
        <option value="">Select Destination</option>
        {planets.map((planet, ind) => {
          if (targetPlanets.includes(planet.name))
            return (
              <option value={planet.name} key={ind} hidden>
                {planet.name}
              </option>
            );
          return (
            <option value={planet.name} key={ind}>
              {planet.name}
            </option>
          );
        })}
      </select>
      {planet.length !== 0 && (
        <Vehicles
          id={id}
          vehicles={vehicles}
          planet={returnPlanet()}
          vehicleCount={vehicleCount}
          updateVehicleCount={updateVehicleCount}
          updateTimeTaken={updateTimeTaken}
          timeTaken={timeTaken}
          targetPlanets={targetPlanets}
        />
      )}
    </div>
  );
}

export default Planets;
