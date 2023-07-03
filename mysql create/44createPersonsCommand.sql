use UDABuildCompany;
create table PersonCommand(
PerCommID int not NULL AUTO_INCREMENT primary key,
workerAppFK int not NULL,
CommandFK int not NULL
);
Alter table PersonCommand add constraint workerAppFK foreign key (workerAppFK)
references WorkersAppoint (workerAppID);
Alter table PersonCommand add constraint CommandFK foreign key (CommandFK)
references BuildCommand (commandID);