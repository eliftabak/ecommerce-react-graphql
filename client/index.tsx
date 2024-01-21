import React from "react";
import { App } from "./app"
import { createRoot } from "react-dom/client"
import "./index.css"

const appElement = document.getElementById("root")

if (appElement) {
    const root = createRoot(appElement)
    root.render(<App />)
}
