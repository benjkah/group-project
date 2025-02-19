import { makeAutoObservable } from "mobx";

class ApplicationListModel {
  applications = []; // will store objects like { application_id, person_id, name, surname, handled_id, status }
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  setApplications(apps) {
    this.applications = apps;
  }

  setLoading(loading) {
    this.loading = loading;
  }

  setError(error) {
    this.error = error;
  }
}

console.log("AppListModel");

const applicationListModel = new ApplicationListModel();
export default applicationListModel;
