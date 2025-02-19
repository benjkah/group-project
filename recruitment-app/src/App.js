import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicantProfilePresenter from "./presenters/ApplicantProfilePresenter";
import ApplicantProfileView from "./views/ApplicantProfileView";
import AuthPresenter from './presenters/AuthPresenter';
import LoginView from './views/LoginView';
import RegistrationView from './views/RegistrationView';
import ApplicationListPresenter from "./presenters/ApplicationListPresenter";
import ApplicationListView from "./views/ApplicationListView";
import applicationModel from "./models/ApplicationListModel";
import axios from "axios"

function App({ userModel, recruitmentModel }) {

  return (
    <Router>
        <div>
            <h1>Recruitment Portal</h1>
            {/* Define Routes */}
            <Routes>
                <Route path="/" element={<AuthPresenter model={userModel} view={LoginView} mode={2} />} />
                <Route 
                    path="/profile" 
                    element={<ApplicantProfilePresenter model={recruitmentModel} view={ApplicantProfileView} />} 
                />
                <Route 
                  path="/register"
                  element={<AuthPresenter model={userModel} view={RegistrationView} />} 
                  
                />
                <Route path="/applications" element={<ApplicationListPresenter model={applicationModel} view={ApplicationListView} mode={1} />} />
            </Routes>
        </div>
    </Router>
);
}

export default App;
