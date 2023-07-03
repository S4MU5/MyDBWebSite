use UDABuildCompany;
create table MaterialHouse(
materialHouseID int not NULL AUTO_INCREMENT primary key,
materialFK int not NULL,
houseProjFK int not NULL
);
Alter table MaterialHouse add constraint materialFK foreign key (materialFK)
references Material (materialID);
Alter table MaterialHouse add constraint houseProjFK foreign key (houseProjFK)
references HouseProject (HouseProjID);