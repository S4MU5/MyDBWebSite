use UDABuildCompany;
create table Development (
devID int not NULL AUTO_INCREMENT primary key,
devName varchar(50) not NULL,
devStart date not NULL,
devEndPlan date not NULL,
devEnd date not NULL
);