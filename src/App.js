import ControlRoom from "./components/ControolRoom";
import FoundFalcone from "./components/FoundFalcone";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [vehicleCount, updateVehicleCount] = useState({});
  const [targetPlanets, updateTargetPlanets] = useState([]);
  const [timeTaken, updateTimeTaken] = useState(0);

  return (
    <div className="container">
      <Routes>
        <Route
          path="/success"
          element={
            <FoundFalcone
              updateVehicleCount={updateVehicleCount}
              updateTargetPlanets={updateTargetPlanets}
              updateTimeTaken={updateTimeTaken}
            />
          }
        />
        <Route
          path="/"
          element={
            <ControlRoom
              vehicleCount={vehicleCount}
              updateVehicleCount={updateVehicleCount}
              targetPlanets={targetPlanets}
              updateTargetPlanets={updateTargetPlanets}
              timeTaken={timeTaken}
              updateTimeTaken={updateTimeTaken}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
