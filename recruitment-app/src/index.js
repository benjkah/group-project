import model from './models/RecruitmentModel';

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { createElement } from "react"; 
window.React = { createElement: createElement }; 

createRoot(document.getElementById("root")).render(
    <App model={model} />
);

window.myModel = model;
