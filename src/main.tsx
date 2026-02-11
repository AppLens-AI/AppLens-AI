import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { getGoogleFontsUrl } from "./lib/fonts";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = getGoogleFontsUrl();
fontLink.crossOrigin = "anonymous";
document.head.appendChild(fontLink);

createRoot(document.getElementById("root")!).render(<App />);
