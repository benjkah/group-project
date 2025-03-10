import "../styles.css";

import { useState } from "react";
import { observer } from "mobx-react-lite";

export default observer(function ApplicantProfileView(props) {

  const languages = ["En", "Swe"];
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * Handles the removal of a competence by ID.
   * Ensures an ID is provided before attempting to remove.
   * 
   * @param {number} id - The ID of the competence to be removed.
   */
  function handleRemoveCompetenceACB(id) 
  {
    if (!id) {
      alert("Cannot delete competence: ID is missing.");
      return;
    }
    props.removeCompetence(id);
  }

  /**
   * Handles the removal of an availability entry by ID.
   * Ensures an ID is provided before attempting to remove.
   * 
   * @param {number} id - The ID of the availability entry to be removed.
   */
  function handleRemoveAvailabilityACB(id)
   {
    if (!id) {
      alert("Cannot delete availability: ID is missing.");
      return;
    }
    props.removeAvailability(id);
  }

  /**
   * Displays the competence status by returning years of experience.
   * Defaults to "0.00" if the value is not a valid number.
   * 
   * @param {Object} comp - The competence object.
   * @returns {string} - Formatted years of experience.
   */
  function displayCompetenceStatusACB(comp) 
  {
    return isNaN(comp.yearsOfExperience) ? "0.00" : comp.yearsOfExperience;
  }

  /**
   * Formats availability period as a string.
   * 
   * @param {Object} avail - The availability object.
   * @returns {string} - Formatted date range.
   */
  function displayAvailabilityACB(avail) {
    return `${avail.fromDate} to ${avail.toDate}`;
  }

  /**
   * Handles adding a new competence entry.
   * Validates inputs before submission.
   * 
   * @param {Event} event - Form submission event.
   */
  function handleAddCompetenceACB(event) {
    event.preventDefault();

    const selectedCompetence = event.target.competence;
    const selectedOption =
      selectedCompetence.options[selectedCompetence.selectedIndex];
    const selectedId = selectedOption.id;
    const startDate = event.target.startDate.value;
    const endDate = event.target.endDate.value;

    if (!selectedId || !startDate || !endDate) {
      alert("All fields are required!");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      alert("End date must be after start date!");
      return;
    }

    props.addCompetence(props.appId, selectedId, startDate, endDate);
    event.target.reset();
  }

  /**
   * Handles adding a new availability entry.
   * Ensures required fields are provided before submission.
   * 
   * @param {Event} event - Form submission event.
   */
  function handleAddAvailabilityACB(event) {
    event.preventDefault();

    const fromDate = event.target.fromDate.value;
    const toDate = event.target.toDate.value;

    if (!fromDate || !toDate) {
      alert("Both dates are required!");
      return;
    }

    if (new Date(toDate) <= new Date(fromDate)) {
      alert("End date must be after start date!");
      return;
    }

    props.addAvailability(props.appId, fromDate, toDate);
    event.target.reset();
  }

  /**
   * Toggles the language setting.
   * Cycles through the available language options.
   */
  function handleLanguageToggle() {
    const newIndex = (currentIndex + 1) % languages.length; // Cycle through languages
    setCurrentIndex(newIndex);
    props.toggleLanguage(languages[newIndex]); // Call the method with the new language
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
        <h3>Language</h3>
      <button onClick={handleLanguageToggle}>{languages[currentIndex]}</button>

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
              {props.handledId === 1 && (
              <button
                className="delete-btn"
                onClick={() =>
                  handleRemoveCompetenceACB(comp.competence_profile_id)
                }
              >
                X
              </button>
              )}
            </li>
          ))
        ) : (
          <p>No competences added yet.</p>
        )}
      </ul>

      {props.handledId ===1 && (
      <form onSubmit={handleAddCompetenceACB}>
        <select name="competence">
          <option value="">Select Competence</option>
          {props.availableCompetences.map((comp) => (
            <option key={comp.id} id={comp.id} value={comp.name}>
              {comp.name}
            </option>
          ))}
        </select>
        <input type="date" name="startDate" />
        <input type="date" name="endDate" />
        <button type="submit">Add Competence</button>
      </form>
      )}

      <h3>Availability</h3>
      <ul>
        {props.availability.length > 0 ? (
          props.availability.map((avail) => (
            <li key={`${avail.availability_id}-${avail.fromDate}`}>
              {displayAvailabilityACB(avail)}
              {props.handledId === 1 && (
              <button
                className="delete-btn"
                onClick={() =>
                  handleRemoveAvailabilityACB(avail.availability_id)
                }
              >
                X
              </button>
              )}
            </li>
          ))
        ) : (
          <p>No availability added yet.</p>
        )}
      </ul>
      
      {props.handledId === 1 && (
      <form onSubmit={handleAddAvailabilityACB}>
        <input type="date" name="fromDate" />
        <input type="date" name="toDate" />
        <button type="submit">Add Availability</button>
      </form>
      )}

      <br />
      <button onClick={props.logout}>Logout</button>
    </div>
  );
});
