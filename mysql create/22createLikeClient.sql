use UDABuildCompany;
create table LikeClient (
UniqueID int not NULL AUTO_INCREMENT primary key,
likableFK int not NULL,
clientFK int not NULL
);
Alter table LikeClient add constraint likableFK foreign key (likableFK)
references Likable (likableID);
Alter table LikeClient add constraint clientFK foreign key (clientFK)
references Clients (clientID);