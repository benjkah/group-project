import { makeAutoObservable } from "mobx";

const RecruitmentModel = {
    firstName: "Benjamin",
    lastName: "Kahkeshan",
    email: "Benjamin@kth.se",

    competencies: [],
    availability: [],

    availableCompetences: [
        { id: 1, name: "Ticket Sales" },
        { id: 2, name: "Lotteries" },
        { id: 3, name: "Roller Coaster Operation" }
    ],


    // we can use it later for login and sign in
    setFirstName(firstName) 
    {
        this.firstName = firstName;
    },

    setLastName(lastName) 
    {
        this.lastName = lastName;
    },

    setEmail(email) 
    {
        this.email = email;
    },


    addCompetence(name, startDate,  endDate) 
    {
        var yearsOfExperience =  this.calculateYears(startDate, endDate);
        var newCompetence = 
        { 
            id: this.competencies.length + 1, 
            name: name, 

            yearsOfExperience: yearsOfExperience

        };

        this.competencies = this.competencies.concat(newCompetence);
        console.log("competencie gets updated:", this.competencies);
    },


    removeCompetence(id) 
    {
        this.competencies =  this.competencies.filter(function(comp) 
        {
            return comp.id !== id;

        });
        console.log("competence removed. :", this.competencies);
    },


    addAvailability(fromDate, toDate) 
    {
        var newAvailability = 
        { 
            id: this.availability.length + 1, 
            fromDate: fromDate, 
            toDate: toDate
        };

        this.availability = this.availability.concat(newAvailability);
        console.log("availablit upated in model", this.availability);
    },


    //remove availibitly fuction
    removeAvailability(id) 
    {
        this.availability = this.availability.filter(function(avail)
           {
            return avail.id !== id;
         });
        console.log("aavalibality removed in model :", this.availability);
    },

    calculateYears(startDate, endDate) 
    {
        const start = new Date(startDate);

        const end = new Date(endDate);
        
        const diffrens = (end - start) / (86400000); // change to days
        const years = diffrens / 365; 
        return parseFloat(years.toFixed(2)); 
    }
};

// not sutre about it  "object observable for MobX"
makeAutoObservable(RecruitmentModel);

export default RecruitmentModel;
