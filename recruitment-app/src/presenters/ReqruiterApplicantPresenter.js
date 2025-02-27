import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../services/AuthAPI";
import { observer } from "mobx-react-lite";
import {fetchApplication} from "../services/ReqruiterApplicantAPI";

import ReqruiterApplicantView from "../views/ReqruiterApplicantView";

export default observer(function ReqruiterApplicantPresenter({ model }) {
    const { id } = useParams();
  useEffect(() => {
    async function loadApplicantProfile() {
      try {
        const data = await fetchApplication(id);
        model.setFirstName(data.name);
        model.setLastName(data.surname);
        model.setEmail(data.email);
        model.setId(data.person_id);
        model.setAppId(data.application_id);
        model.setHandledId(data.handled_id);

        if (Array.isArray(data.competencies)) {
          model.competencies = data.competencies.map((comp) => ({
            competence_profile_id: comp.competence_profile_id,
            id: comp.competence_id,
            name: comp.competence_name,
            yearsOfExperience: parseFloat(comp.years_of_experience.toFixed(2)),
          }));
        }

        if (Array.isArray(data.availability)) {
          model.availability = data.availability.map((avail) => ({
            availability_id: avail.availability_id,
            fromDate: new Date(avail.from_date).toISOString().split("T")[0],
            toDate: new Date(avail.to_date).toISOString().split("T")[0],
          }));
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      }
    }
    loadApplicantProfile();
  }, [model]);

  async function handleProfileHandling(handleId){

  }

  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  }

  
  return (
    <ReqruiterApplicantView
      id={model.id}
      appId={model.appId}
      handledId={model.handledId}
      firstName={model.firstName}
      lastName={model.lastName}
      email={model.email}
      competencies={model.competencies}
      availability={model.availability}
      handleProfileHandling={model.handleProfileHandling}
      logout={handleLogout}
    />
  );
});
