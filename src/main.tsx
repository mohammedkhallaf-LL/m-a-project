import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import { i18nReady } from "./i18n";
import type { DashboardData } from "./types";

// The app can't render anything useful without the dataset, so fetch it
// (alongside waiting for i18n) before the first render rather than mounting
// into a loading state.
const [, data]: [void, DashboardData] = await Promise.all([
  i18nReady,
  fetch("/data.json").then((res) => res.json()),
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App data={data} />
  </StrictMode>,
);
