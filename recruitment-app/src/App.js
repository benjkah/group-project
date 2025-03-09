import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { reaction } from "mobx";
import { checkAuth } from "./services/AuthAPI";

// Presenters
import ApplicantProfilePresenter from "./presenters/ApplicantProfilePresenter";
import AuthPresenter from "./presenters/AuthPresenter";
import ApplicationListPresenter from "./presenters/ApplicationListPresenter";
import ReqruiterApplicantPresenter from "./presenters/ReqruiterApplicantPresenter";
import The404Presenter from "./presenters/The404Presenter";

// Views
import ApplicantProfileView from "./views/ApplicantProfileView";
import LoginView from "./views/LoginView";
import RegistrationView from "./views/RegistrationView";
import ApplicationListView from "./views/ApplicationListView";
import ReqruiterApplicantView from "./views/ReqruiterApplicantView";

/**
 * Main application component.
 * Handles authentication and routing.
 */
function App({ recruitmentModel, applicationListModel, userModel }) {
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(userModel.isLoggedIn);

    useEffect(() => {
        /**
         * Checks if the user is authenticated. 
         */
        const verifyAuth = async () => {
            if (!userModel.isLoggedIn) {
                await checkAuth(); 
            }
            setIsAuthChecked(true);
        };

        verifyAuth();
    }, [userModel.isLoggedIn]);

    useEffect(() => {
        /**
         * Observes authentication state changes and updates UI accordingly.
         */
        const updateUI = reaction(
            () => userModel.isLoggedIn,
            (loggedIn) => setIsLoggedIn(loggedIn)
        );
        return () => updateUI();
    }, [userModel.isLoggedIn]);

    if (!isAuthChecked) return <div>Loading...</div>;

    return (
        <Router>
            <div>
                <h1>Recruitment Portal</h1>
                <Routes>
                    {/* Public Routes */}
                    {!isLoggedIn ? (
                        <>
                            <Route path="/" element={<AuthPresenter userModel={userModel} view={LoginView} />} />
                            <Route path="/register" element={<AuthPresenter userModel={userModel} view={RegistrationView} />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<Navigate to="/profile" replace />} />
                            <Route path="/register" element={<Navigate to="/profile" replace />} />
                        </>
                    )}

                    {/* Protected Routes */}
                    {isLoggedIn ? (
                        <>
                            <Route path="/profile" element={<ApplicantProfilePresenter model={recruitmentModel} userModel={userModel} view={ApplicantProfileView} />} />
                            <Route path="/applications" element={<ApplicationListPresenter model={applicationListModel} view={ApplicationListView} />} />
                            <Route path="/applications/:id" element={<ReqruiterApplicantPresenter model={recruitmentModel} userModel={userModel} view={ReqruiterApplicantView} />} />
                        </>
                    ) : (
                        <>
                            <Route path="/profile" element={<Navigate to="/" replace />} />
                            <Route path="/applications" element={<Navigate to="/" replace />} />
                            <Route path="/applications/:id" element={<Navigate to="/" replace />} />
                        </>
                    )}

                    {/* 404 Page */}
                    <Route path="/*" element={<The404Presenter />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
