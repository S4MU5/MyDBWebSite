use UDABuildCompany;
create table Saler (
salerID int not NULL AUTO_INCREMENT primary key,
salerName varchar(20) not NULL,
salerSurname varchar(20) not NULL,
salerBirth date not NULL,
workDate date not NULL
);