import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/AuthAPI";
import { observer } from "mobx-react-lite";
import {fetchProfile, fetchCompetences,deleteAvailability,deleteCompetence,addCompetence,addAvailability,} from "../services/ApplicantProfileAPI";

import ApplicantProfileView from "../views/ApplicantProfileView";


export default observer(function ApplicantProfilePresenter({ model, userModel }) {

  const navigate = useNavigate();
  useEffect(() => {
    if (model.isLoggedIn === false) {
      navigate("/");
    }else if (userModel.role_id === 1) {
      navigate("/applications");
    }
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
        model.setLoggedIn(true);

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
        model.setLoggedIn(false);
        model.setError(error);
        console.error("Error fetching profile:", error.message);
      }
    }
    loadApplicantProfile();
  }, [model, navigate]);

  

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
  
  async function handleLogout() {
    try {
      await logout();
      model.setLoggedIn(false);
      navigate("/");
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
