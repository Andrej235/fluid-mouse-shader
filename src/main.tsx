import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//@ts-expect-error
import FPSStats from "react-fps-stats";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div id="root"></div>

    <FPSStats />
  </React.StrictMode>
);
