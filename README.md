# API REST — Cursos Online & Reservas Hotel

API REST con Node.js + Express + MySQL para gestionar cursos online y reservas de hotel.

## Tecnologías
- Node.js, Express, MySQL2, nodemon

## Instalación
1. Clona el repo.
2. Instala dependencias en cada backend: `npm install`
3. Ejecuta el SQL: `Base_de_datos_3,4/Base_de_datos_3,4.sql`
4. Configura `db.js` con tus credenciales MySQL.
5. Inicia servidores: `npm run dev` (puertos 3000 y 3001)

## Base de Datos
```sql
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
    total_pago DECIMAL(14,2),  
    estado VARCHAR(30)
);
```

## Endpoints

### Cursos Online (puerto 3000)
- `GET /cursos_online` - Listar cursos
- `GET /cursos_online/:id` - Obtener curso
- `POST /cursos_online` - Crear curso
- `PUT /cursos_online/:id` - Actualizar curso
- `DELETE /cursos_online/:id` - Eliminar curso

**Validaciones:** `titulo` obligatorio, `duracion_horas` entero 1-500.

### Reservas Hotel (puerto 3001)
- `GET /reservas_hotel` - Listar reservas
- `GET /reservas_hotel/:id` - Obtener reserva
- `POST /reservas_hotel` - Crear reserva
- `PUT /reservas_hotel/:id` - Actualizar reserva
- `DELETE /reservas_hotel/:id` - Eliminar reserva

**Validaciones:** `huesped_nombre`, `habitacion_numero`, `fecha_entrada`, `fecha_salida` obligatorios. `total_pago` hasta 12 dígitos enteros + 2 decimales.

## Pruebas
Importa las colecciones Postman desde `postman/` y ejecuta los endpoints.

## Errores
- 200: OK
- 201: Creado
- 400: Datos inválidos
- 404: No encontrado
- 500: Error DB

