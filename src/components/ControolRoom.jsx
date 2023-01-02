import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import Planets from "./Planets";
import "./controlroom.css";
import { useNavigate, Link } from "react-router-dom";

function ControlRoom({
  vehicleCount,
  updateVehicleCount,
  targetPlanets,
  updateTargetPlanets,
  timeTaken,
  updateTimeTaken,
}) {
  const [planets, updatePlanets] = useState([]);
  const [vehicles, updateVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPlanets();
    getVehicles();
  }, []);

  async function getPlanets() {
    try {
      const responce = await axios.get(
        "https://findfalcone.herokuapp.com/planets"
      );
      // console.log(responce.data);
      updatePlanets(responce.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function getVehicles() {
    try {
      const responce = await axios.get(
        "https://findfalcone.herokuapp.com/vehicles"
      );

      const vehicleList = {};
      responce.data.forEach((veh) => {
        vehicleList[veh.name] = 0;
      });

      // console.log(responce.data, vehicleList);
      updateVehicleCount(vehicleList);
      updateVehicles(responce.data);
    } catch (e) {
      console.log(e);
    }
  }
  function returnVehicleNames() {
    const vehiclesListSel = [];
    for (let vhcl in vehicleCount) {
      for (let i = vehicleCount[vhcl]; i > 0; i--) {
        vehiclesListSel.push(vhcl);
      }
    }
    return vehiclesListSel;
  }

  async function handleClickFindFlcn() {
    if (targetPlanets.length === 4 && returnVehicleNames().length === 4) {
      try {
        const token = await axios.post(
          "https://findfalcone.herokuapp.com/token",
          {},
          {
            headers: {
              accept: "application/json",
            },
          }
        );
        // console.log(token.data.token);
        const body = {
          token: token.data["token"],
          planet_names: targetPlanets,
          vehicle_names: returnVehicleNames(),
        };
        const responce = await axios.post(
          "https://findfalcone.herokuapp.com/find",
          body,
          {
            headers: {
              accept: "application/json",
              "content-type": "application/json",
            },
          }
        );
        // console.log(responce.data);

        navigate("/success", {
          state: {
            vehicles: vehicles,
            data: responce.data,
            timeTaken: timeTaken,
          },
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("please select all fields");
    }
  }

  function showPlanetSelect() {
    const showPlanet = [];
    for (let i = 1; i <= 4; i++) {
      showPlanet.push(
        <Planets
          id={i}
          key={i}
          planets={planets}
          targetPlanets={targetPlanets}
          updateTargetPlanets={updateTargetPlanets}
          vehicles={vehicles}
          updateVehicles={updateVehicles}
          vehicleCount={vehicleCount}
          updateVehicleCount={updateVehicleCount}
          updateTimeTaken={updateTimeTaken}
          timeTaken={timeTaken}
        />
      );
    }
    return showPlanet;
  }

  return (
    <>
      <Header
        updateVehicleCount={updateVehicleCount}
        updateTargetPlanets={updateTargetPlanets}
        updateTimeTaken={updateTimeTaken}
        vehicles={vehicles}
      />
      <div className="time-taken">
        <p>Time Taken: {timeTaken}</p>
      </div>
      <div className="mission-panel">
        <p className="panel-decr">Select the planets you want to search in:</p>
        <div className="mission-planets">{showPlanetSelect()}</div>

        <div className="btn-cntr">
          <button onClick={handleClickFindFlcn} className="btn-fd-flcn">
            Find Falcone
          </button>
        </div>
      </div>
      <footer>
        <p>
          Coding Problem -{" "}
          <a href="https://www.geektrust.in/finding-falcone">
            www.geektrust.in/finding-falcone
          </a>
        </p>
      </footer>
    </>
  );
}

export default ControlRoom;
