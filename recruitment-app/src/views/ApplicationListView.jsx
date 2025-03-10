import React, { useEffect } from "react";
 import { observer } from "mobx-react-lite";
 import { Link, useNavigate } from "react-router-dom";
 
 function ApplicationListView({ model, logout }) {
   const navigate = useNavigate();
 
   console.log("ApplicationListView model: ", model)
 
   useEffect(() => {
     if (model.error && (model.error.includes("Unauthorized") || model.error.includes("Forbidden"))) {
       const timer = setTimeout(() => {
         if (model.error.includes("Unauthorized")){
           navigate("/");
         }else if (model.error.includes("Forbidden")){
           navigate("/profile");
         }
       }, 3000);
       return () => clearTimeout(timer);
     }
   }, [model.error, navigate]);
 
   if (model.error && model.error.includes("Unauthorized")) {
     return (
       <div>
         <p>{model.error}</p>
         <p>Redirecting to login...</p>
       </div>
     );
   }
 
   if (model.error && model.error.includes("Forbidden")) {
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
      <header>
        <h2>Job Applications</h2>
        <button onClick={logout}>Logout</button>
      </header>
      {model.sortedApplications.length === 0 ? (
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