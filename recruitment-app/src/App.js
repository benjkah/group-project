import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicantProfilePresenter from "./presenters/ApplicantProfilePresenter";
import ApplicantProfileView from "./views/ApplicantProfileView";
import RecruitmentModel from "./models/RecruitmentModel";
import Auth from "./views/Auth";

function App() {
    return (
        <Router>
            <div>
                <h1>Recruitment Portal</h1>
                {/* Define Routes */}
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route 
                        path="/profile" 
                        element={<ApplicantProfilePresenter model={RecruitmentModel} view={ApplicantProfileView} />} 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
