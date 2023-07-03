use UDABuildCompany;
create table ObjectPass(
objectPassID int not NULL AUTO_INCREMENT primary key,
developmentFK int not NULL,
houseProjFK int not NULL,
buildCommandFK int not NULL,
cityName varchar(20) not NULL,
streetName varchar(20) not NULL,
houseNum int not NULL
);
Alter table ObjectPass add constraint developmentFK foreign key (developmentFK)
references Development (devID);
Alter table ObjectPass add constraint houseProFK foreign key (houseProjFK)
references HouseProject (HouseProjID);
Alter table ObjectPass add constraint buildCommandFK foreign key (buildCommandFK)
references BuildCommand (commandID);