import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

function ApplicationListView({ model }) {

  if (model.loading) {
    return <p>Loading applications...</p>;
  }

  console.log("ApplicationListModel model: ", model);

  return (
    <div>
      <h2>Job Applications</h2>
      {model.applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul>
          {model.sortedApplications.map((app) => (
            <li key={app.application_id}>
              <Link to={`/applications/${app.application_id}`}>
                <strong>Application ID:</strong> {app.application_id}{" "}
                <strong>Applicant:</strong> {app.name}{" "}{app.surname}{" "}
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
