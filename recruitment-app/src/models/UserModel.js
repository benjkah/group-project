import { makeAutoObservable } from "mobx";

class UserModel {
  person_id = null; 
  role_id = null;  
  name = "";          
  surname = "";      
  pnr = "";          
  email = "";       
  password = "";     
  username = "";     
  isLoggedIn = false;
  error = null;


  constructor() {
    makeAutoObservable(this);
  }

  
  setName(value) { this.name = value; }
  setSurname(value) { this.surname = value; }
  setPNR(value) { this.pnr = value; }
  setEmail(value) { this.email = value; }
  setPassword(value) { this.password = value; }
  setUsername(value) { this.username = value; }
  setLoggedIn(status) { this.isLoggedIn = status; }
  setPersonID(value) {this.person_id = value}
  setRoleID(value) {this.role_id = value}

  setError(error) {this.error = error}

}

const userModel = new UserModel();
export default userModel;