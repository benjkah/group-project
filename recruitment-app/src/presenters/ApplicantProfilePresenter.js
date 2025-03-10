import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/AuthAPI";
import { observer } from "mobx-react-lite";
import {fetchProfile, fetchCompetences,deleteAvailability,deleteCompetence,addCompetence,addAvailability,} from "../services/ApplicantProfileAPI";

import ApplicantProfileView from "../views/ApplicantProfileView";


export default observer(function ApplicantProfilePresenter({ model, userModel }) {

  const navigate = useNavigate();

  useEffect(() => {
    if (!userModel.isLoggedIn) {
      navigate("/");
    } else if (userModel.role_id === 1) {
        navigate("/applications");
      }
  }, [userModel.isLoggedIn, userModel.role_id, navigate]);
  
  useEffect(() => {
    
    /**
     * Loads applicant profile data, including personal details, competences, and availability.
     * Fetches data from the API and updates the model state accordingly.
     */
    async function loadApplicantProfile() {
      try {
        const competences = await fetchCompetences("en");
        model.setAvailableCompetences(competences.map((comp) => ({
          id: comp.competence_id,
          name: comp.name,
        })));

        const data = await fetchProfile();
        model.setFirstName(data.name);
        model.setLastName(data.surname);
        model.setEmail(data.email);
        model.setId(data.person_id);
        model.setAppId(data.application_id);
        model.setHandledId(data.handled_id);

        if (Array.isArray(data.competencies)) {
          model.setCompetencies(data.competencies.map((comp) => ({
            competence_profile_id: comp.competence_profile_id,
            id: comp.competence_id,
            name: comp.competence_name,
            yearsOfExperience: parseFloat(comp.years_of_experience.toFixed(2)),
          })));
        }

        if (Array.isArray(data.availability)) {
          model.setAvailability(data.availability.map((avail) => ({
            availability_id: avail.availability_id,
            fromDate: new Date(avail.from_date).toISOString().split("T")[0],
            toDate: new Date(avail.to_date).toISOString().split("T")[0],
          })));
        }


      } catch (error) {
        console.error("Error fetching profile:", error.message);
      }
    }
    loadApplicantProfile();
  }, [model]);

  
  /**
   * Adds a new competence to the applicant's profile.
   * Updates the model state after fetching the latest profile data.
   * 
   * @param {number} id - Applicant ID.
   * @param {number} comp_id - Competence ID.
   * @param {string} startDate - Start date for competence.
   * @param {string} endDate - End date for competence.
   * @returns {Promise<Object>} - Success or error message.
   */
  async function handleAddCompetence(id, comp_id, startDate, endDate) {
    try {
      await addCompetence(id, comp_id, startDate, endDate);
      const updatedProfile = await fetchProfile();
      model.competencies = updatedProfile.competencies.map((comp) => ({
        competence_profile_id: comp.competence_profile_id,
        id: comp.competence_id,
        name: comp.competence_name,
        yearsOfExperience: parseFloat(comp.years_of_experience.toFixed(2)),
      }));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }


  /**
   * Removes a competence from the applicant's profile.
   * Updates the model state after deletion.
   * 
   * @param {number} id - Competence profile ID.
   * @returns {Promise<Object>} - Success or error message.
   */
  async function handleRemoveCompetence(id) {
    if (!id) return { success: false, message: "Invalid ID for deletion." };
    try {
      await deleteCompetence(id);
      model.competencies = model.competencies.filter(
        (comp) => comp.competence_profile_id !== id
      );
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }


  /**
   * Adds an availability period to the applicant's profile.
   * Updates the model state after fetching the latest profile data.
   * 
   * @param {number} id - Applicant ID.
   * @param {string} fromDate - Start date of availability.
   * @param {string} toDate - End date of availability.
   * @returns {Promise<Object>} - Success or error message.
   */
  async function handleAddAvailability(id, fromDate, toDate) {
    try {
      await addAvailability(id, fromDate, toDate);
      const updatedProfile = await fetchProfile();
      model.availability = updatedProfile.availability.map((avail) => ({
        availability_id: avail.availability_id,
        fromDate: new Date(avail.from_date).toISOString().split("T")[0],
        toDate: new Date(avail.to_date).toISOString().split("T")[0],
      }));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }


  /**
   * Removes an availability period from the applicant's profile.
   * Updates the model state after deletion.
   * 
   * @param {number} id - Availability ID.
   * @returns {Promise<Object>} - Success or error message.
   */
  async function handleRemoveAvailability(id) {
    if (!id) return { success: false, message: "Invalid ID for deletion." };
    try {
      await deleteAvailability(id);
      model.availability = model.availability.filter(
        (avail) => avail.availability_id !== id
      );
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  
   /**
   * Toggles the language of the available competences.
   * Fetches competences in the selected language and updates the model state.
   * 
   * @param {string} lan - Language code (e.g., "en", "sv").
   * @returns {Promise<Object>} - Success or error message.
   */
  async function toggleLanguage(lan){
    try {
      const competences = await fetchCompetences(lan);
        model.availableCompetences = competences.map((comp) => ({
          id: comp.competence_id,
          name: comp.name,
        }));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  
  /**
   * Logs out the user by calling the logout API.
   * Redirects the user to the login page after logging out.
   */
  async function handleLogout() {
    try {
      await logout();
      model.reset();
      userModel.reset();
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  }

  
  return (
    <ApplicantProfileView
      id={model.id}
      appId={model.appId}
      handledId={model.handledId}
      firstName={model.firstName}
      lastName={model.lastName}
      email={model.email}
      competencies={model.competencies}
      availability={model.availability}
      availableCompetences={model.availableCompetences}
      addCompetence={handleAddCompetence}
      removeCompetence={handleRemoveCompetence}
      addAvailability={handleAddAvailability}
      removeAvailability={handleRemoveAvailability}
      logout={handleLogout}
      toggleLanguage={toggleLanguage}
    />
  );
});
