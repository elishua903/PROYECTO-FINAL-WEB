CREATE DATABASE SISTEMA_TICKETS;
USE SISTEMA_TICKETS;

CREATE TABLE CATEGORIAS
(
	ID INT NOT NULL AUTO_INCREMENT,
    NOMBRE NVARCHAR (50) NOT NULL,
    PRIMARY KEY (ID)
    
)ENGINE=INNODB;

CREATE TABLE PERSONAL
(
	ID INT NOT NULL AUTO_INCREMENT,
    NOMBRE NVARCHAR(50) NOT NULL,
    APELLIDOS NVARCHAR(80) NOT NULL,
    TELEFONO NVARCHAR(10) NULL,
    DIRECION NVARCHAR(150) NULL,
	PRIMARY KEY(ID)
    
)ENGINE=INNODB;

CREATE TABLE TICKETS
(
	ID INT NOT NULL AUTO_INCREMENT,
    NOMBRE NVARCHAR(50) NOT NULL,
    DESCRIPCION NVARCHAR(100) NULL,
    PRIORIDAD NVARCHAR(100) NOT NULL,
    PERSONALID INT NOT NULL,
    CATEGORIAID INT NOT NULL,
    ESTATUS NVARCHAR(3) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (PERSONALID)	REFERENCES PERSONAL(ID)	ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (CATEGORIAID) REFERENCES CATEGORIAS(ID) ON UPDATE CASCADE ON DELETE RESTRICT
    
)ENGINE=INNODB;
