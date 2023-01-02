import Header from "./Header";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./foundfalcone.css";
import { useNavigate, Navigate } from "react-router-dom";

function FoundFalcone({
  updateVehicleCount,
  updateTargetPlanets,
  updateTimeTaken,
}) {
  const location = useLocation();

  const navigate = useNavigate();

  const { vehicles, timeTaken, data } = checkLocationisNull();

  // const data = { status: "success", panet: "jebing" };

  function checkLocationisNull() {
    if (location.state) return location.state;
    return { vehicles: [], timeTaken: 0, data: {} };
  }

  function handleClick(e) {
    navigate("/");
    const vehicleList = {};

    vehicles.forEach((veh) => {
      vehicleList[veh.name] = 0;
    });
    updateVehicleCount({ ...vehicleList });
    updateTargetPlanets([]);
    updateTimeTaken(0);
  }

  return (
    <>
      {location.state && (
        <>
          <Header
            updateVehicleCount={updateVehicleCount}
            updateTargetPlanets={updateTargetPlanets}
            updateTimeTaken={updateTimeTaken}
            vehicles={vehicles}
            found
          />
          {data.status === "success" ? (
            <div className="success">
              <p className="scs-note">
                Congratulations! You found Queen Falcone on planet{" "}
                <span className="scs-planet">{data.planet_name}</span>
                <br />
                King Shan is mighty pleased!
              </p>
              <p className="scs-time-tkn">
                Total time taken: <strong>{timeTaken}</strong> hours
              </p>
              <button onClick={handleClick} className="btn try-again">
                Start Again
              </button>
            </div>
          ) : (
            <div className="failed">
              <p className="fld-note">
                You <span className="fld-np">Failed</span>.King Shan has faith
                in you and want to give you one more Chance, wanna <br />
                try again?
              </p>

              <button onClick={handleClick} className="btn try-again">
                Try Again
              </button>
            </div>
          )}
          <footer>
            <p>
              Coding Problem -{" "}
              <a href="https://www.geektrust.in/finding-falcone">
                www.geektrust.in/finding-falcone
              </a>
            </p>
          </footer>{" "}
        </>
      )}
      {location.state === null && (
        <>
          1
          <Navigate to="/" />
        </>
      )}
    </>
  );
}

export default FoundFalcone;
