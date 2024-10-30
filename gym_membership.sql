CREATE DATABASE gym_membership;

USE gym_membership;

CREATE TABLE members (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  membership_type enum('bronze','silver','gold') NOT NULL,
  join_date date NOT NULL,
  PRIMARY KEY (id)
); 

INSERT INTO members (name, email, membership_type, join_date) 
VALUES 
("Norawit", "geminorawit@gmail.com", "silver", "2023-05-21");
("Nattawat", "4nattawat@gmail.com", "gold", "2024-08-01");