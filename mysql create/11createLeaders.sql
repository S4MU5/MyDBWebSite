use UDABuildCompany;
create table Leaders (
leaderID int not NULL AUTO_INCREMENT primary key,
leaderName varchar(20) not NULL,
leaderSurname varchar(20) not NULL,
leaderSalary int not NULL
);