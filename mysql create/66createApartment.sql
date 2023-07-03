use UDABuildCompany;
create table Apartment(
apartmentID int not NULL AUTO_INCREMENT primary key,
objectPassFK int not NULL,
floor int not NULL,
number int not NULL,
apartmentTypeFK int not NULL
);
Alter table Apartment add constraint apartmentTypeFK foreign key (apartmentTypeFK)
references AppartmentType (apartTypeID);
Alter table Apartment add constraint objectPassFK foreign key (objectPassFK)
references ObjectPass (objectPassID);