import { observer } from "mobx-react-lite";

export default observer(
    
    function  ApplicantProfilePresenter(props) 
{

    const { model } = props;
    

    function handleAddCompetence(name, startDate, endDate) {
        
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
        <props.view
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
