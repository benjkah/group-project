import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicantProfilePresenter from "./presenters/ApplicantProfilePresenter";
import ApplicantProfileView from "./views/ApplicantProfileView";
import AuthPresenter from './presenters/AuthPresenter';
import LoginView from './views/LoginView';
import RegistrationView from './views/RegistrationView';

function App({ userModel, recruitmentModel }) {
  console.log("App.js")
  return (
    <Router>
        <div>
            <h1>Recruitment Portal</h1>
            {/* Define Routes */}
            <Routes>
                <Route path="/" element={<AuthPresenter model={userModel} view={LoginView} mode={1} />} />
                <Route 
                    path="/profile" 
                    element={<ApplicantProfilePresenter model={recruitmentModel} view={ApplicantProfileView} />} 
                />
                <Route 
                  path="/register"
                  element={<AuthPresenter model={userModel} view={RegistrationView} />}
/>
            </Routes>
        </div>
    </Router>
);
}

export default App;
