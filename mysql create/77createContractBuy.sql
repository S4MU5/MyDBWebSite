use UDABuildCompany;
create table ContractBuy(
contractBuyID int not NULL AUTO_INCREMENT primary key,
apartmentFK int not NULL,
clientFK int not NULL,
salerFK int not NULL,
cost int not NULL,
contractDate date not NULL,
releaseDate date not NULL
);
Alter table ContractBuy add constraint apartmentFK foreign key (apartmentFK)
references Apartment (apartmentID);
Alter table ContractBuy add constraint clientsFK foreign key (clientFK)
references Clients (clientID);
Alter table ContractBuy add constraint salerFK foreign key (salerFK)
references Saler (salerID);