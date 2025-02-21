import "../styles.css";
import { observer } from "mobx-react-lite";

export default observer(


    function ApplicantProfileView(props) 
    {

        
        console.log("ENTERING ApplProfView")

       // remove compenets
        async function handleRemoveCompetenceACB(id)
        {
            const result = await props.removeCompetence(id);
            if (!result.success) {
                alert(result.message);
            } else {

            }
        }

//remobve avalibility
        async function handleRemoveAvailabilityACB(id) 
        {
            const result = await props.removeAvailability(id);
            if (!result.success) {
                alert(result.message);
            } else {

            }
        }

//show on the display
        function displayCompetenceStatusACB(comp)
        
        {
            return isNaN(comp.yearsOfExperience) ? "0.00" : comp.yearsOfExperience;
        }



        function displayAvailabilityACB(avail) {
            return avail.fromDate + " to " + avail.toDate;
        }

        function handleAddCompetenceACB(event) {
            event.preventDefault();
    
            var selectedCompetence = event.target.competence;
            var selectedOption = selectedCompetence.options[selectedCompetence.selectedIndex]; // Get selected <option>
            var selectedId = selectedOption.id;
            var startDate = event.target.startDate.value;
            var endDate = event.target.endDate.value;

            if (!selectedId|| !startDate || !endDate) {
                alert("All fields are required!");
                return;
            }

            var start = new Date(startDate);
            var end = new Date(endDate);

            if (end <= start) {
                alert("End date must be after start date!");
                return;
            }

            props.addCompetence(props.appId, selectedId, startDate, endDate);
            event.target.reset();
        }





        function handleAddAvailabilityACB(event) {
            event.preventDefault();
            var fromDate = event.target.fromDate.value;
            var toDate = event.target.toDate.value;

            if (!fromDate || !toDate) {
                alert("Both dates are required!");
                return;
            }

            props.addAvailability(props.appId,fromDate, toDate);
            event.target.reset();
        }






        return (
            <div className="profile-container">
                <h2>Applicant Profile</h2>
                
                <h3>Personal Information</h3>
                <p><strong>Name:</strong> {props.firstName} {props.lastName}</p>
                <p><strong>Email:</strong> {props.email}</p>

                <h3>Competence Profile</h3>
                <ul>
    {props.competencies.length > 0 ? (
        props.competencies.map((comp, index) => (
            <li key={comp.id || index}>  {/* Ensure unique key */}
                {comp.name} - {displayCompetenceStatusACB(comp)} years 
                <button className="delete-btn" onClick={() => handleRemoveCompetenceACB(comp.competence_profile_id)}>X</button>
            </li>
        ))
    ) : (
        <p>No competences added yet.</p>
    )}
</ul>


                <form onSubmit={handleAddCompetenceACB}>
                    <select name="competence">
                        <option value="">Select Competence</option>
                        {props.availableCompetences.map(function(comp) {
                            return <option key={comp.id} id={comp.id} value={comp.name}>{comp.name}</option>;
                        })}
                    </select>
                    
                    <input type="date" name="startDate" />
                    <input type="date" name="endDate" />
                    <button type="submit">Add Competence</button>
                </form>

                <h3>Availability</h3>
                <ul>
    {props.availability.length > 0 ? (
        props.availability.map((avail, index) => (
            <li key={avail.id || index}>  {/* Ensure unique key */}
                {displayAvailabilityACB(avail)}
                <button className="delete-btn" onClick={() => handleRemoveAvailabilityACB(avail.availability_id)}>X</button>
            </li>
        ))
    ) : (
        <p>No availability added yet.</p>
    )}
</ul>

                

                <form onSubmit={handleAddAvailabilityACB}>
                    <input type="date" name="fromDate" />
                    <input type="date" name="toDate" />
                    <button type="submit">Add Availability</button>
                </form>
            </div>
        );
    }
);
