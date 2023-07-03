use UDABuildCompany;
create table CharacterHouse(
charHouseID int not NULL AUTO_INCREMENT primary key,
characterFK int not NULL,
houseProjFK int not NULL
);
Alter table CharacterHouse add constraint characterFK foreign key (characterFK)
references CharHS (characterID);
Alter table CharacterHouse add constraint houseProjectFK foreign key (houseProjFK)
references HouseProject (HouseProjID);