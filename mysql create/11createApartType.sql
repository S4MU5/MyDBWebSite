use UDABuildCompany;
create table AppartmentType (
apartTypeID int not NULL AUTO_INCREMENT primary key,
square int not NULL,
numRooms int not NULL,
overhaul binary not NULL
);