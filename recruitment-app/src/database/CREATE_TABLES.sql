CREATE TABLE role (
    role_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    name VARCHAR(255) NOT NULL UNIQUE
);
INSERT INTO role (name) VALUES ('reqruiter'),('applicant');

CREATE TABLE person (
    person_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    pnr VARCHAR(255)  UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role_id INT NOT NULL REFERENCES role (role_id),
    username VARCHAR(255) UNIQUE
);

CREATE TABLE competence (
    competence_id INT PRIMARY KEY NOT NULL IDENTITY(1,1)
);
INSERT INTO competence DEFAULT VALUES;
INSERT INTO competence DEFAULT VALUES;
INSERT INTO competence DEFAULT VALUES;

CREATE TABLE language (
language_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
language_code VARCHAR(16)
);
INSERT INTO language (language_code) VALUES ('en');

CREATE TABLE competence_translation (
    translation_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    competence_id INT NOT NULL REFERENCES competence(competence_id) ON DELETE CASCADE,
    language_id INT NOT NULL REFERENCES language(language_id) ON DELETE CASCADE, 
    name VARCHAR(255) NOT NULL
);
INSERT INTO competence_translation (competence_id, language_id, name) 
VALUES 
    (1, '1', 'Ticket Sales'),
    (2, '1', 'Lotteries'),
    (3, '1', 'Roller Coaster Operation');

CREATE TABLE handled (
handled_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
name VARCHAR(255) NOT NULL UNIQUE
);
INSERT INTO handled
VALUES ('unhandled'),('accepted'),('denied')

CREATE TABLE application (
application_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
person_id INT NOT NULL REFERENCES person (person_id) ON DELETE CASCADE,
handled_id INT NOT NULL REFERENCES handled (handled_id)
);

CREATE TABLE competence_profile (
    competence_profile_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    application_id INT NOT NULL REFERENCES application (application_id) ON DELETE CASCADE,
    competence_id INT NOT NULL REFERENCES competence (competence_id) ON DELETE CASCADE,
    years_of_experience NUMERIC(4,2) NOT NULL CHECK (years_of_experience >= 0)
);

CREATE TABLE availability (
    availability_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    application_id INT REFERENCES application (application_id) ON DELETE CASCADE,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL
);