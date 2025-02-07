import React from "react";
import { observer } from "mobx-react-lite";

const ApplicationListView = observer(({ model }) => {
  console.log("AppListModel");
  if (model.loading) {
    return <p>Loading applications...</p>;
  }
  /*
  if (model.error) {
    console.error("Error loading applications:", model.error);
  }*/

  return (
    <div>
      <h2>Job Applications</h2>
      {model.applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul>
          {model.applications.map((app) => (
            <li key={app.application_id}>
              <strong>Application ID:</strong> {app.application_id}{" "}
              <strong>Person ID:</strong> {app.person_id}{" "}
              <strong>Handled ID:</strong> {app.handled_id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default ApplicationListView;
