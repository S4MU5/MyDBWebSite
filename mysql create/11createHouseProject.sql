use UDABuildCompany;
create table HouseProject (
HouseProjID int not NULL AUTO_INCREMENT primary key,
floors int not NULL,
apartmentsNum int not NULL,
style varchar(20) not NULL,
height int not NULL,
lift binary not NULL,
chertejFK int not NULL
);
Alter table HouseProject add constraint chertejFK foreign key (chertejFK)
references Chertejs (chertejID)