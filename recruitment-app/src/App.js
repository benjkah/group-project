import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicantProfilePresenter from "./presenters/ApplicantProfilePresenter";
import ApplicantProfileView from "./views/ApplicantProfileView";
import AuthPresenter from './presenters/AuthPresenter';
import LoginView from './views/LoginView';
import RegistrationView from './views/RegistrationView';
import ApplicationListPresenter from "./presenters/ApplicationListPresenter";
import ApplicationListView from "./views/ApplicationListView";
import applicationListModel from "./models/ApplicationListModel";
import axios from "axios"

function App({ userModel, recruitmentModel }) {
/*
    const makeAPICall = async () => {
        
        const id = {
            id: 2,
            namn: "kalle"
        }

        try {
            const response = await fetch('http://localhost:4000/user', id);
            const data = await response.json();
            console.log({data});
        } catch (e) {
            console.log(e);
        }
    };

*/
/*
    const axiosPostData = async() => {
        const postData = {
            id: 2,
            namn: "21"
        }

        await axios.get('http://localhost:4000/users', postData)
        .then(res => console.log(res.data))
    }

    
    useEffect(() => {
        // makeAPICall();
        axiosPostData();
    }, []);
*/


  console.log("App.js")
  return (
    <Router>
        <div>
            <h1>Recruitment Portal</h1>
            {/* Define Routes */}
            <Routes>
                <Route 
                    path="/" 
                    element={<AuthPresenter model={userModel} view={LoginView} mode={2} />} />
                <Route 
                    path="/profile" 
                    element={<ApplicantProfilePresenter model={recruitmentModel} view={ApplicantProfileView} />} 
                />
                <Route 
                    path="/register"
                    element={<AuthPresenter model={userModel} view={RegistrationView} />} 
                  
                />
                <Route 
                    path="/applications" 
                    element={<ApplicationListPresenter model={applicationListModel} view={ApplicationListView} mode={1} />} />
            </Routes>
        </div>
    </Router>
);
}

export default App;
