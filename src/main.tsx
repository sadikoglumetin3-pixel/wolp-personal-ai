import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WolpApp } from "../components/WolpApp";
import "../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WolpApp />
  </StrictMode>,
);
