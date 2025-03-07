import { makeAutoObservable } from "mobx";

class RecruitmentModelClass {
  id = "";
  appId = "";
  handledId = "";
  firstName = "";
  lastName = "";
  email = "";

  isLoggedIn = false;
  setLoggedIn(status) { this.isLoggedIn = status; }

  competencies = [];
  availability = [];
  availableCompetences = [];

  /**
   * Initializes the ApplicationListModel and makes its properties observable.
   * 
   * `makeAutoObservable` enables automatic tracking of state changes within the model.
   */
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Following set functions act to update the properties of the model.
   */
  setCompetences(competences){
    this.availableCompenences = competences;
  }
  setId(id){
    this.id = id;
  }
  setAppId(appId){
    this.appId = appId;
  }
  setHandledId(handledId){
    this.handledId = handledId;
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
  }
  setAvailableCompetences(setings){
      this.availableCompetences = setings;
    }
 
  /**
   * Adds a new availability period to the list.
   * 
   * This function creates a new availability object with a unique ID
   * and appends it to the existing list of availabilities.
   * 
   * @param {string} fromDate - The starting date of availability (YYYY-MM-DD).
   * @param {string} toDate - The ending date of availability (YYYY-MM-DD).
   */
  addAvailability(fromDate, toDate) {
    const newAvailability = {
      id: this.availability.length + 1,
      fromDate,
      toDate
    };
    this.availability = this.availability.concat(newAvailability);
  }

  /**
   * Calculates the number of years between two dates.
   * 
   * The difference is computed in days and then converted into years
   * with a precision of two decimal places.
   * 
   * @param {string} startDate - The start date (YYYY-MM-DD).
   * @param {string} endDate - The end date (YYYY-MM-DD).
   * @returns {number} - The difference in years, rounded to two decimal places.
   */
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
