import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";

function ApplicationListView({ model }) {
  const navigate = useNavigate();

  console.log("ApplicationListView model: ", model)

  useEffect(() => {
    // If there's an error indicating unauthorized access, redirect after a delay
    if (model.error && (model.error.includes("Unauthorized") || model.error.includes("Forbidden"))) {
      const timer = setTimeout(() => {
        if (model.error.includes("Unauthorized")){
          navigate("/");
        }else if (model.error.includes("Forbidden")){
          navigate("/profile");
        }
      }, 3000); // 3 second delay
      return () => clearTimeout(timer);
    }
  }, [model.error, navigate]);

  if (model.error && model.error.includes("Unauthorized")) {
    // Display the error message and inform the user about the redirect
    return (
      <div>
        <p>{model.error}</p>
        <p>Redirecting to login...</p>
      </div>
    );
  }

  if (model.error && model.error.includes("Forbidden")) {
    // Display the error message and inform the user about the redirect
    return (
      <div>
        <p>{model.error}</p>
        <p>Redirecting to profile...</p>
      </div>
    );
  }

  if (model.loading) {
    return <p>Loading applications...</p>;
  }


  return (
    <div>
      <h2>Job Applications</h2>
      {!model.loading ? (
        <p>Loading applications...</p>
      ) : model.sortedApplications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul>
          {model.sortedApplications.map((app) => (
            <li key={app.application_id}>
              <Link to={`/applications/${app.application_id}`}>
                <strong>Application ID:</strong> {app.application_id}{" "}
                <strong>Applicant:</strong> {app.name} {app.surname}{" "}
                <strong>Status:</strong> {app.status}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default observer(ApplicationListView);
