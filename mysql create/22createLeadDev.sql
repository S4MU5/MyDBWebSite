use UDABuildCompany;
create table LeadDevelopment(
leadDevID int not NULL AUTO_INCREMENT primary key,
developmentFK int not NULL,
leaderFK int not NULL
);
Alter table LeadDevelopment add constraint devFK foreign key (developmentFK)
references Development (devID);
Alter table LeadDevelopment add constraint leaderFK foreign key (leaderFK)
references Leaders (leaderID);