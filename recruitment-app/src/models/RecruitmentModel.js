import { makeAutoObservable } from "mobx";

class RecruitmentModelClass {
  firstName = "";
  lastName = "";
  email = "";

  competencies = [];
  availability = [];
  availableCompetences = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCompetences(competences){
    this.availableCompenences = competences;
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }

  setEmail(email) {
    this.email = email;
  }
  setCompetencies(competencies) {
    
    this.competencies = competencies;
}

setAvailability(availability) {
 
  this.availability = availability;
}

  addCompetence(name, startDate, endDate) {
    const yearsOfExperience = this.calculateYears(startDate, endDate);
    const newCompetence = {
      id: this.competencies.length + 1,
      name,
      yearsOfExperience
    };
    this.competencies = this.competencies.concat(newCompetence);
    console.log("competencies updated:", this.competencies);
  }

  removeCompetence(id) {
    this.competencies = this.competencies.filter(comp => comp.id !== id);
    console.log("competence removed:", this.competencies);
  }

  addAvailability(fromDate, toDate) {
    const newAvailability = {
      id: this.availability.length + 1,
      fromDate,
      toDate
    };
    this.availability = this.availability.concat(newAvailability);
    console.log("availability updated:", this.availability);
  }

  removeAvailability(id) {
    this.availability = this.availability.filter(avail => avail.id !== id);
    console.log("availability removed:", this.availability);
  }

  calculateYears(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffrens = (end - start) / 86400000; 
    const years = diffrens / 365; 
    return parseFloat(years.toFixed(2)); 
  }
}

const recruitmentModel = new RecruitmentModelClass();
export default recruitmentModel;
