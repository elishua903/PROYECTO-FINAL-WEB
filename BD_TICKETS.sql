create database sistema_tickets;
use sistema_tickets;

create table categorias
(
	id int not null auto_increment,
    nombre nvarchar (50) not null,
    primary key (id)
    
)engine=innodb;

create table personal
(
	id int not null auto_increment,
    nombre nvarchar(50) not null,
    apellidos nvarchar(80) not null,
    telefono nvarchar(10) null,
    direccion nvarchar(150) null,
	primary key(id)
    
)engine=innodb;

create table tickets
(
	id int not null auto_increment,
    nombre nvarchar(50) not null,
    descripcion nvarchar(100) null,
    prioridad nvarchar(1) not null,
    personalid int null,
    categoriaid int null,
    estatus nvarchar(3) not null,
    primary key (id),
    foreign key (personalid)	references personal(id)	on update cascade on delete cascade,
	foreign key (categoriaid) references categorias(id) on update cascade on delete cascade
    
)engine=innodb;



insert into personal (nombre,apellidos,telefono,direccion) values ("josue","gamez carrasco","1234567890","alvaro obregon #115");
insert into personal (nombre,apellidos,telefono,direccion) values ("eliseo","blanco ramirez","1234567890","alvaro obregon #115");
insert into categorias (nombre) values ("incidencia");
insert into categorias (nombre) values ("consulta");
insert into categorias (nombre) values ("peticion");
insert into tickets (nombre, descripcion, prioridad, personalid, categoriaid,estatus) values("baja de materia","quisiera dar de baja la materia de graficacion.","1","1","1","esp");
insert into tickets (nombre, descripcion, prioridad, personalid, categoriaid,estatus) values("baja de materia","quisiera dar de baja la materia de graficacion.","1","1","2","abt");
insert into tickets (nombre, descripcion, prioridad, personalid, categoriaid,estatus) values("baja de materia","quisiera dar de baja la materia de graficacion.","1","2","1","fin");
insert into tickets (nombre, descripcion, prioridad, personalid, categoriaid,estatus) values("baja de materia","quisiera dar de baja la materia de graficacion.","1","2","2","esp");
insert into tickets (nombre, descripcion, prioridad, personalid, categoriaid,estatus) values("baja de materia","quisiera dar de baja la materia de graficacion.","1","1","3","abt");
insert into tickets (nombre, descripcion, prioridad, personalid, categoriaid,estatus) values("baja de materia","quisiera dar de baja la materia de graficacion.","1","2","3","fin");


create view vista_tickets as
select tickets.id, tickets.nombre,descripcion,prioridad,concat_ws(' ', personal.nombre, personal.apellidos) as personal,categorias.nombre categorias, estatus from tickets
inner join personal on  personal.id = tickets.personalid
inner join categorias on  categorias.id = tickets.categoriaid;

