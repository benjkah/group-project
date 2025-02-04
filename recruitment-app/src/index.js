import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import userModel from "./models/UserModel";
import recruitmentModel from "./models/RecruitmentModel";


// If you're including an old trick with 'window.React' for a reason:
import { createElement } from "react";
window.React = { createElement: createElement };

// Render root
createRoot(document.getElementById("root")).render(
  <App 
    userModel={userModel}
    recruitmentModel={recruitmentModel} 
  />
);

// Optional for debugging in the console:
window.myUserModel = userModel;
window.myRecruitmentModel = recruitmentModel;

