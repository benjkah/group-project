import "../styles.css";

import { observer } from "mobx-react-lite";

export default observer(function ReqruiterApplicantView(props) {

  function displayCompetenceStatusACB(comp) 
  {
    return isNaN(comp.yearsOfExperience) ? "0.00" : comp.yearsOfExperience;
  }

  function displayAvailabilityACB(avail) {
    return `${avail.fromDate} to ${avail.toDate}`;
  }

  return (
    <div className="profile-container">
      <h2>Applicant Profile</h2>
      <h3>Application Status</h3>
      <div className="status-label">
          {props.handledId === 1 ? "Pending" :
           props.handledId === 2 ? "Accepted" :
           props.handledId === 3 ? "Denied" :
           "Unknown"} {/* Fallback for unexpected values */}
        </div>

      <h3>Personal Information</h3>
      <p>
        <strong>Name:</strong> {props.firstName} {props.lastName}
      </p>
      <p>
        <strong>Email:</strong> {props.email}
      </p>

      <h3>Competence Profile</h3>
      <ul>
        {props.competencies.length > 0 ? (
          props.competencies.map((comp) => (
            <li key={`${comp.competence_profile_id}-${comp.id}`}>
              {comp.name} - {displayCompetenceStatusACB(comp)} years
            </li>
          ))
        ) : (
          <p>No competences added yet.</p>
        )}
      </ul>


      <h3>Availability</h3>
      <ul>
        {props.availability.length > 0 ? (
          props.availability.map((avail) => (
            <li key={`${avail.availability_id}-${avail.fromDate}`}>
              {displayAvailabilityACB(avail)}
            </li>
          ))
        ) : (
          <p>No availability added yet.</p>
        )}
      </ul>
      
      <br />
      <div className="button-container">
        <button className="deny-btn" onClick={() => props.handleApplication(3)}>Deny</button>
        <button className="skip-btn" onClick={() => props.handleApplication(1)}>Skip</button>
        <button className="accept-btn" onClick={() => props.handleApplication(2)}>Accept</button>
      </div>
    </div>
  );
});
