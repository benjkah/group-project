
import {useEffect} from 'react';

import { observer } from "mobx-react-lite";
import { fetchProfile, fetchCompetences } from "../services/ApplicantProfileAPI";
import ApplicantProfileView from "../views/ApplicantProfileView";

export default observer(function ApplicantProfilePresenter({ model }) {



    console.log("ENTERING AppProfPres");

    useEffect(() => {
        async function loadApplicantProfile() {
            try {
                const competences = await fetchCompetences();

                model.availableCompetences = competences.map(comp => ({
                    id: comp.competence_id,
                    name: comp.name,
                }));

                const data = await fetchProfile();
                console.log("Profile data received:", data);

                model.setFirstName(data.name);
                model.setLastName(data.surname);
                model.setEmail(data.email);
                console.log(data)

                model.competencies = data.competencies.map(comp => ({
                    id: comp.competence_id,
                    name: comp.name,
                    yearsOfExperience: parseFloat(comp.years_of_experience.toFixed(2)) 
                }));

                model.availability = data.availability.map(avail => ({
                    fromDate: new Date(avail.from_date).toISOString().split('T')[0], 
                    toDate: new Date(avail.to_date).toISOString().split('T')[0]
                }));

            } catch (error) {
                console.error("Error fetching profile:", error.message);
            }
        }

        loadApplicantProfile();
    }, []);

    function handleAddCompetence(name, startDate, endDate) {
        model.addCompetence(name, startDate, endDate);
    }

    function handleRemoveCompetence(id) {
        model.removeCompetence(id);
    }

    function handleAddAvailability(fromDate, toDate) {
        model.addAvailability(fromDate, toDate);
    }

    function handleRemoveAvailability(index) {
        model.removeAvailability(index);
    }
    return (
        <ApplicantProfileView
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
        />
    );
});
