use UDABuildCompany;
create table WorkersAppoint(
workerAppID int not NULL AUTO_INCREMENT primary key,
workerFK int not NULL,
appointmentFK int not NULL
);
Alter table WorkersAppoint add constraint workerFK foreign key (workerFK)
references Workers (workerID);
Alter table WorkersAppoint add constraint appointmentFK foreign key (appointmentFK)
references Appointment (appointmentID);