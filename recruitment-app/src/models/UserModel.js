import { makeAutoObservable } from "mobx";

class UserModel {
  person_id = null;  
  name = "";          
  surname = "";      
  pnr = "";          
  email = "";       
  password = "";     
  role_id = 1;        // 1=Recruiter, 2=Applicant (placeholder?)
  username = "";      


  isLoggedIn = false;

  constructor() {
    makeAutoObservable(this);
  }

  
  setName(value) { this.name = value; }
  setSurname(value) { this.surname = value; }
  setPNR(value) { this.pnr = value; }
  setEmail(value) { this.email = value; }
  setPassword(value) { this.password = value; }
  setUsername(value) { this.username = value; }
  setRole(role) { this.role_id = role; }
  setLoggedIn(status) { this.isLoggedIn = status; }
  setPersonID(value) {this.person_id = value}

}

const userModel = new UserModel();
console.log("userModel ", userModel);
export default userModel;