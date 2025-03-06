import { makeAutoObservable } from "mobx";

class ApplicationListModel {
  applications = []; 
  loading = false;
  error = null;

  /**
   * Initializes the ApplicationListModel and makes its properties observable.
   * 
   * `makeAutoObservable` enables automatic tracking of state changes within the model.
   */
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Updates the list of applications with new data.
   * 
   * @param {Array} apps - The array of application objects retrieved from the API.
   */
  setApplications(apps) {
    this.applications = apps;
  }

  /**
   * Sets the loading state of the application list.
   * 
   * This is useful for displaying loading indicators while fetching data from the API.
   * 
   * @param {boolean} loading - The loading state (true if fetching data, false otherwise).
   */
  setLoading(loading) {
    this.loading = loading;
  }

  /**
   * Stores an error message if an error occurs while fetching applications.
   * 
   * @param {string|null} error - The error message or null if no error exists.
   */
  setError(error) {
    this.error = error;
  }

  /**
   * Computes a sorted list of applications, prioritizing unhandled applications first.
   * 
   * Applications with a status of "unhandled" appear before handled ones.
   * If two applications have the same status, they are sorted by their `application_id`.
   * 
   * @returns {Array} - A sorted array of application objects.
   */
  get sortedApplications() {
    const apps = this.applications.slice();
    apps.sort((a, b) => {
      const aIsUnhandled = a.status.toLowerCase() === "unhandled" ? 0 : 1;
      const bIsUnhandled = b.status.toLowerCase() === "unhandled" ? 0 : 1;
      
      if (aIsUnhandled !== bIsUnhandled) {
        return aIsUnhandled - bIsUnhandled;
      }
      return a.application_id - b.application_id;
    });
    return apps;
  }
}

const applicationListModel = new ApplicationListModel();

export default applicationListModel;

