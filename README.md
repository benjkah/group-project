
# Projekt IV1201 VT25 p4
Build a new system for managing the company's job applications, which should be robust and scalable for future development, with a documented choice.

## General information
* Course: IV1201 Arkitektur och design av globala applikationer
* Grupp: 8
* Time: VT25
* Prodget: Build a new system for managing the company's job applications, which should be robust and scalable for future development, with a documented choice.
* Parts:
  * Frontend
  * Backend
  * Databas

### links

 - [Github](https://github.com/benjkah/group-project)
 - [Frontend website](https://red-coast-0ef75bd03.6.azurestaticapps.net)
 - [API backend](https://recruitment-backend-g8-ehcncmbphdc6a6ad.swedencentral-01.azurewebsites.net)


## Environment Variables .env

To run this project, you will need to add the following environment variables to your .env file
### Frontend
Set in map "recruitment-app"

`REACT_APP_BACKEND_URL` link to backend

### Backend
Set in map "backend"

`DB_AZURE_SERVER` link to server

`DB_AZURE_DATABASE` databas name

`DB_AZURE_USER` user to login

`DB_AZURE_PASSWORD` pasword

`DB_AZURE_PORT` port of the server

`DB_LOCAL_PORT` post backend host on

`JWT_SECRET` your secret key

## Run Locally

Clone the project

```bash
  git clone https://github.com/benjkah/group-project.git
```

Open 2 windos project directory

#### 1 of 2 backend
Go to the project directory

```bash
  cd group-project\backend
```

Install dependencies
```bash
  npm install
```

Add the `.env` backend file to the project

Start the backend server

```bash
  npm start
```

#### 2 of 2 Frontend
Go to the project directory

```bash
  cd group-project\recruitment-app
```

Install dependencies
```bash
  npm install
```

Add the `.env` frontend file to the project or run the program look on http://localhost:4000

Start the backend server

```bash
  npm start
```


## Paket / Technologies Used

#### Frontend:

* axios@1.8.1
* cookie-httponly@1.0.3
* cra-template@1.2.0
* jsonwebtoken@9.0.2
* mobx-react-lite@4.1.0
* mobx@6.13.6
* react-dom@19.0.0
* react-router-dom@7.2.0
* react-scripts@5.0.1
* react@19.0.0
* web-vitals@4.2.4





#### Backend:

Setup
* body-parser@1.20.3

Communication with frontend
* cookie-httponly@1.0.3
* cookie-parser@1.4.7
* cors@2.8.5
* dotenv@16.4.7
* helmet@8.0.0
* jsonwebtoken@9.0.2

Communication with database
* mssql@11.0.1
* express@4.21.2

Run the program
* nodemon@3.1.9

# Description about the product
The system distinguishes between two types of users, applicants and recruiters. An applicant applies for a position within the company while a recruiter manages applications. The system is divided into two parts: The registration of job applications and the administration of applications.

## Frontend

This is a React-based frontend application built using modern technologies to ensure a seamless user experience.


```
SRC:.
│   App.css
│   App.js
│   App.test.js
│   index.css
│   index.js
│   logo.svg
│   reportWebVitals.js
│   setupTests.js
│   styles.css
│
├───models
│   │   ApplicationListModel.js  # Handles application data
│   │   RecruitmentModel.js      # Manages recruitment-related data
│   │   UserModel.js             # Stores user data structure
│
├───presenters
│   │   ApplicantProfilePresenter.js  # Handles logic for applicant profiles
│   │   ApplicationListPresenter.js   # Manages applications list logic
│   │   AuthPresenter.js              # Handles authentication logic
│   │   ReqruiterApplicantPresenter.js # Logic for recruiter-applicant interactions
│   │   The404Presenter.js            # Logic for 404 error handling
│
├───services
│   │   ApplicantProfileAPI.js  # API calls for applicant profiles
│   │   ApplicationListAPI.js   # API calls for application list
│   │   AuthAPI.js              # Handles authentication requests
│   │   ReqruiterApplicantAPI.js # API calls for recruiter-applicant interactions
│
└───views
    │   404.jsx                    # 404 Page
    │   ApplicantProfileView.js     # UI for applicant profile
    │   ApplicationListView.jsx     # UI for applications list
    │   LoginView.jsx               # Login page
    │   RegistrationView.jsx        # Registration page
    │   ReqruiterApplicantView.js   # UI for recruiter-applicant interactions


```



## Backend
The backend value router maps strucktor,

![image](https://gits-15.sys.kth.se/storage/user/17638/files/cce504ac-590a-44ea-8fa3-346e81a294dd)

The backend server work as the programs API system. The use the komunication 





### API Reference


#### Test

A message for confirming the server is active. 

```http
  GET /
```

.





### 

#### Get the profile data

Get the cooki data for return data to person ID

```http
  GET /user/profile
```
.

#### Remo all availability from person whid id

```http
  DELETE /user/deleteAvail/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `req.params` | `id` | **Id**. of the user |

.

#### Delete Competence for the user

```http
  DELETE /user/deleteComp/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  `req.params` | `id` | **Id**. of the user |

.

#### Add competence to user

```http
  POST /user/addComp
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|   `req.body` | `{ id, comp_id, startDate, endDate }` | **req.body** Extract ID from request params |

.

#### Add availability to user

```http
  POST /user/addAvail
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|   `req.body` | `{ id, fromDate, toDate }` | **req.body** Extract ID from request params |


.

#### Get the application for the users

```http
  GET /user/applicantProfile/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `req.params` | `id` | **Id**. of the user |

.


#### Change Application Status

```http
  POST /user/applicationStatus/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `req.params.id` | `id` | **Id**. of the user change |
| `req.body` | `{ handleId }` | **Id**. of the handler person |






###

#### Login the user
return a cooki to the user,

```http
  POST /access/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `req.body.username` | `string` | **username**.  |
| `req.body.password` | `string` | **username**.  |

.

#### Logout and the signal to clear the cooki

```http
  POST /access/logout
```

.

#### Register new user

```http
  POST /access/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `req.body.name` | `String` | **name** of user |
| `req.body.surname` | `String` | **surname** of user |
| `req.body.pnr` | `YYYYMMDD-XXXX, YYMMDD-XXXX, YYYYMMDD+XXXX, YYMMDD+XXXX` | **pnr**. Personal identification number.  |
| `req.body.email` | `String` | **email** to user |
| `req.body.username` | `String` | **username**  |
| `req.body.password` | `String` | **password** |
| `req.body.role_id` | `int` | optional |

.

#### Route for fetching all applications

```http
  GET /access/applications
```

.

#### Route to check if the user is authenticated.
```http
  GET /access/auth-check
```

.

###

#### It will feches competencies based on the specified language.

The language code English and Swedish

```http
  GET /app/competences/:lan
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `lan` | `string` | **lan**.   |

.

#### Get all applications in the databas
Check if the user is loggin. 

```http
  GET /app/applications
```
.


## Database Model
The databas is design: 

![image](https://gits-15.sys.kth.se/storage/user/17638/files/c0e69185-104a-4565-b482-14df87df253f)

To import the database sql cod, see map struktur: /database on github.



