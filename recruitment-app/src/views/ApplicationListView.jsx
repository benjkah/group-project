import React from "react";
import { observer } from "mobx-react-lite";

const ApplicationListView = observer(({ model }) => {
  console.log("AppListView");
  
  if (model.loading) {
    return <p>Loading applications...</p>;
  }

  if (model.error) {
    return <p>Error: {model.error}</p>;
  }

  return (
    <div>
      <h2>Job Applications</h2>
      {model.applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul>
          {model.applications.map((app) => (
            <li key={app.application_id}>
              <strong>Applicant:</strong> {app.name} {app.surname} {" | "}
              <strong>Status:</strong> {app.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default ApplicationListView;
