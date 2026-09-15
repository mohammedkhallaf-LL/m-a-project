import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import type { DashboardData } from "./types";

// The app can't render anything useful without the dataset, so fetch it before
// the first render rather than mounting into a loading state.
const data: DashboardData = await fetch("/data.json").then((res) => res.json());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App data={data} />
  </StrictMode>,
);
