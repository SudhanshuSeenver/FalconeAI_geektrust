import { useEffect, useState } from "react";
import "./vehicles.css";

function Vehicles({
  id,
  vehicles,
  vehicleCount,
  updateVehicleCount,
  planet,
  updateTimeTaken,
  timeTaken,
  targetPlanets,
}) {
  const [selVehcl, updateSelVehcl] = useState("");
  const [oldPlanet, updateOldPlanet] = useState({ ...planet });

  useEffect(() => {
    if (targetPlanets.length === 0) {
      updateSelVehcl("");
    }
  }, [targetPlanets]);

  useEffect(() => {
    if (selVehcl.length !== 0) {
      const obj = { ...vehicleCount };
      obj[selVehcl] = obj[selVehcl] + 1;
      // console.log({ ...obj }, "------vhcl updVC");
      updateVehicleCount({
        ...obj,
      });
    }
  }, [selVehcl]);

  useEffect(() => {
    // console.log(planet, oldPlanet, vehicleCount, vehicles);
    if (selVehcl.length !== 0) {
      const vehicle = vehicles.filter((vhcl) => vhcl.name === selVehcl)[0];
      if (vehicle.max_distance < planet.distance) {
        const obj = { ...vehicleCount };
        obj[selVehcl] = obj[selVehcl] - 1;
        updateVehicleCount({
          ...obj,
        });
        updateTimeTaken(timeTaken - prevTime(oldPlanet));
        updateSelVehcl("");
        document.getElementById(`${vehicle.name}${id}`).checked = false;
      } else {
        calTimeTaken(prevTime(oldPlanet), planet, selVehcl);
      }
    }
    updateOldPlanet({ ...planet });
  }, [planet]);

  function prevTime(planet) {
    if (selVehcl.length !== 0) {
      const vehicle = vehicles.filter((vhcl) => vhcl.name === selVehcl)[0];
      const prevTimeRequired = Math.floor(
        parseInt(planet.distance) / parseInt(vehicle.speed)
      );
      return prevTimeRequired;
    }
    return 0;
  }

  function calTimeTaken(prevTimeRequired, planet, value) {
    const vehicle = vehicles.filter((vhcl) => vhcl.name === value)[0];
    const timeRequired = Math.floor(
      parseInt(planet.distance) / parseInt(vehicle.speed)
    );
    // console.log(
    //   timeTaken,
    //   timeRequired,
    //   prevTimeRequired,
    //   "==",
    //   timeTaken + timeRequired - prevTimeRequired
    // );
    updateTimeTaken(timeTaken + timeRequired - prevTimeRequired);
  }

  function handleChangeVehicle(e) {
    // console.log(e.target.value, "----", e.target);
    updateSelVehcl(e.target.value);
    if (e.target.value !== "") {
      const obj = { ...vehicleCount };
      // console.log("1");
      calTimeTaken(prevTime(planet), planet, e.target.value);
      obj[selVehcl] = obj[selVehcl] - 1;
      updateVehicleCount({
        ...obj,
      });
    }
  }

  function vehicleListRender() {
    const vehicleList = vehicles.map((vehicle, i) => {
      let disable = false;

      if (
        planet.distance > vehicle.max_distance ||
        (vehicleCount[vehicle.name] >= vehicle.total_no &&
          selVehcl !== vehicle.name)
      )
        disable = true;

      return (
        <div className="vehicle-input" key={i}>
          <input
            type="radio"
            id={`${vehicle.name}${id}`}
            name={`vehicle${id}`}
            value={vehicle.name}
            disabled={disable}
          />
          <label
            className="vehicle-input-label"
            htmlFor={`${vehicle.name}${id}`}
          >
            {vehicle.name}
          </label>
        </div>
      );
    });
    return vehicleList;
  }

  return (
    <div onChange={handleChangeVehicle} className="vehicle-choose">
      <fieldset className="vehicle-field">
        <legend>Choose Vehicle</legend>
        {vehicleListRender()}
      </fieldset>
    </div>
  );
}

export default Vehicles;
