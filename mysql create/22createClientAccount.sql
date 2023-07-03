use UDABuildCompany;
create table clientAccount (
accountID int not NULL AUTO_INCREMENT primary key,
clientsFK int not NULL,
login varchar(50) not NULL,
password varchar(16) not NULL
);

Alter table clientAccount add constraint clientsFK foreign key (clientsFK)
references clients (clientID);