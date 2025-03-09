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
  const [role, setRole] = useState(userModel.role_id);

  useEffect(() => {
    // Check if the user is authenticated (only once)
    const verifyAuth = async () => {
      if (!isAuthChecked && !userModel.isLoggedIn) {
        try {
          await checkAuth();
        } catch (error) {
          console.error("Auth check failed:", error);
        }
      }
      setIsAuthChecked(true);
    };
    verifyAuth();
  }, [isAuthChecked, userModel.isLoggedIn]);

  useEffect(() => {
    // React to changes in isLoggedIn
    const updateUI = reaction(
      () => userModel.isLoggedIn,
      (loggedIn) => setIsLoggedIn(loggedIn),
      { fireImmediately: false }
    );
    return () => updateUI();
  }, [userModel.isLoggedIn]);

  useEffect(() => {
    // React to changes in role
    const updateRole = reaction(
      () => userModel.role_id,
      (newRole) => setRole(newRole),
      { fireImmediately: false }
    );
    return () => updateRole();
  }, [userModel.role_id]);

  // While checking auth, show a loading message
  if (!isAuthChecked) return <div>Loading...</div>;

  return (
    <Router>
      <div>
        <h1>Recruitment Portal</h1>
        <Routes>
          {/* Public Routes (always available) */}
          <Route path="/" element={<AuthPresenter userModel={userModel} view={LoginView} />} />
          <Route path="/register" element={<AuthPresenter userModel={userModel} view={RegistrationView} />} />

          {/* Protected Routes for Recruiters (role === 1) */}
          {isLoggedIn && role === 1 && (
            <>
              <Route path="/applications" element={
                <ApplicationListPresenter
                  model={applicationListModel}
                  userModel={userModel}
                  view={ApplicationListView}
                />
              } />
              <Route path="/applications/:id" element={
                <ReqruiterApplicantPresenter
                  model={recruitmentModel}
                  userModel={userModel}
                  view={ReqruiterApplicantView}
                />
              } />
              {/* If recruiter tries to access profile, redirect to applications */}
              <Route path="/profile" element={<Navigate to="/applications" replace />} />
            </>
          )}

          {/* Protected Routes for Applicants (role === 2) */}
          {isLoggedIn && role === 2 && (
            <>
              <Route path="/profile" element={
                <ApplicantProfilePresenter
                  model={recruitmentModel}
                  userModel={userModel}
                  view={ApplicantProfileView}
                />
              } />
              {/* If applicant tries to access applications routes, redirect to profile */}
              <Route path="/applications" element={<Navigate to="/profile" replace />} />
              <Route path="/applications/:id" element={<Navigate to="/profile" replace />} />
            </>
          )}

          {/* If not logged in, redirect any other route to login */}
          {!isLoggedIn && (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}

          {/* Catch-all for logged in users: if no route matches, show 404 */}
          {isLoggedIn && (
            <Route path="*" element={<The404Presenter />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;