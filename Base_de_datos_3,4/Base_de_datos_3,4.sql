CREATE DATABASE tablas_3_4;
USE tablas_3_4;

CREATE TABLE cursos_online (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    resumen TEXT,
    duracion_horas INT,
    nivel VARCHAR(30),
    fecha_publicacion DATE,
    publicado BOOLEAN DEFAULT FALSE
);

CREATE TABLE reservas_hotel (
    id INT PRIMARY KEY AUTO_INCREMENT,
    huesped_nombre VARCHAR(120) NOT NULL,
    habitacion_numero VARCHAR(10) NOT NULL,
    fecha_entrada DATE NOT NULL,
    fecha_salida DATE NOT NULL,
    total_pago DECIMAL(12,2),
    estado VARCHAR(30)
);
