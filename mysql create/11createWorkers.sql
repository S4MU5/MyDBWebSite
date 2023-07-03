use UDABuildCompany;
create table Workers (
workerID int not NULL AUTO_INCREMENT primary key,
workerName varchar(50) not NULL,
workerSurname varchar(50) not NULL,
workerBirthDate date not NULL,
workDate date not NULL
);