// import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicantProfilePresenter from "./presenters/ApplicantProfilePresenter";
import ApplicantProfileView from "./views/ApplicantProfileView";
import AuthPresenter from './presenters/AuthPresenter';
import LoginView from './views/LoginView';
import RegistrationView from './views/RegistrationView';
import ApplicationListPresenter from "./presenters/ApplicationListPresenter";
import ApplicationListView from "./views/ApplicationListView";

import ReqruiterApplicantView from './views/ReqruiterApplicantView';
import ReqruiterApplicantPresenter from './presenters/ReqruiterApplicantPresenter';

import The404Presenter from "./presenters/The404Presenter";

function App({ userModel, recruitmentModel, applicationListModel }) {

    const routesLoggin = [
        <Routes>
        <Route path="/" element={<AuthPresenter userModel={userModel} view={LoginView} mode={2} />} />
        <Route 
            path="/profile" 
            element={<ApplicantProfilePresenter model={recruitmentModel} view={ApplicantProfileView} />} 
        />
        <Route 
          path="/register"
          element={<AuthPresenter model={userModel} view={RegistrationView} />} 
          
        />
        <Route path="/applications" 
        element={<ApplicationListPresenter model={applicationListModel} view={ApplicationListView} mode={1} />}
        
        />
        <Route path="/applications/:id"
        element={<ReqruiterApplicantPresenter model={recruitmentModel} view={ReqruiterApplicantView} mode={1} />}

        />
        <Route path="/*" element={<The404Presenter />} /> 
    </Routes>
    ]

  return (
    <Router>
        <div>

            <h1>Recruitment Portal</h1>
            
            {routesLoggin }
            
        </div>
    </Router>
);
}

export default App;
