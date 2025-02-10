import { observer } from "mobx-react-lite";
import userModel from "../models/UserModel";

import ApplicantProfileView from "../views/ApplicantProfileView";
export default observer(
    
    function  ApplicantProfilePresenter({model}) {

        console.log("ENTERING AppProfPres")

       
        


        function handleAddCompetence(name, startDate, endDate) 
        {
            model.addCompetence(name, startDate, endDate);
        }

        function handleRemoveCompetence(id)
        {
            model.removeCompetence(id);
        }

        function handleAddAvailability(fromDate , toDate) 
        {
            model.addAvailability(fromDate, toDate);   
        }

        function handleRemoveAvailability(index)
        {
            model.removeAvailability(index);
        }




        return (
            <ApplicantProfileView
                firstName={userModel.name}
                lastName={userModel.surname}
                email={userModel.email}
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
