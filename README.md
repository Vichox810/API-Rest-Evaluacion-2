# API REST — Cursos Online & Reservas Hotel

API REST construida con **Node.js + Express + MySQL** que gestiona dos recursos independientes: cursos online y reservas de hotel. Proyecto desarrollado como parte de la asignatura Programación Web — Ingeniería en Informática, Santo Tomás Puerto Montt.

---

## Tecnologías utilizadas

- Node.js
- Express 5
- MySQL2
- nodemon (desarrollo)

---

## Estructura del proyecto

```
Prueba_2/
├── Base_de_datos_3,4/
│   └── Base_de_datos_3,4.sql
├── curso_online/
│   └── Backend/
│       ├── controllers/
│       │   └── cursoOnlineController.js      # Lógica CRUD cursos
│       ├── routes/
│       │   └── cursosOnlineRoutes.js         # Rutas /cursos_online
│       ├── postman/
│       │   └── CursoOnline.postman_collection.json
│       ├── app.js
│       ├── db.js
│       └── package.json
│
└── reserva_hotel/
    └── Backend/
        ├── controllers/
        │   └── reservaHotelController.js     # Lógica CRUD reservas
        ├── routes/
        │   └── reservasHotelRoutes.js        # Rutas /reservas_hotel
        ├── postman/
        │   └── ReservasHotel.postman_collection.json
        ├── app.js
        ├── db.js
        └── package.json
```

---

## Configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
```

### 2. Instalar dependencias (en cada proyecto)

```bash
cd curso_online/Backend
npm install

cd ../../reserva_hotel/Backend
npm install
```

### 3. Crear la base de datos y tablas

Ejecutar el archivo `Base_de_datos_3,4/Base_de_datos_3,4.sql`:

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
    total_pago DECIMAL(12,2),
    estado VARCHAR(30)
);
```

### 4. Configurar la conexión a la base de datos

Edita el archivo `db.js` en cada backend con tus credenciales:

```javascript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'tu_password',
  database: 'tablas_3_4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```

### 5. Iniciar los servidores

```bash
# Cursos Online (Puerto 3000)
cd curso_online/Backend
npm run dev

# Reservas Hotel (Puerto 3001) - en otra terminal
cd reserva_hotel/Backend
npm run dev
```

---

## Endpoints — Cursos Online

Base URL: `http://localhost:3000/cursos_online`

| Método | Endpoint           | Descripción                |
|--------|-------------------|---------------------------|
| GET    | `/cursos_online`   | Listar todos los cursos    |
| GET    | `/cursos_online/:id` | Obtener un curso por ID  |
| POST   | `/cursos_online`   | Crear un nuevo curso       |
| PUT    | `/cursos_online/:id` | Actualizar un curso      |
| DELETE | `/cursos_online/:id` | Eliminar un curso        |

### POST `/cursos_online`
**Body:**
```json
{
    "titulo": "Introducción a Node.js",
    "resumen": "Aprende los fundamentos de Node.js",
    "duracion_horas": 15,
    "nivel": "Principiante",
    "fecha_publicacion": "2026-05-09",
    "publicado": true
}
```
**Respuesta (201):**
```json
{ "mensaje": "Curso guardado con éxito", "id": 1 }
```

### GET `/cursos_online`
**Respuesta (200):**
```json
[
    {
        "id": 1,
        "titulo": "Introducción a Node.js",
        "resumen": "Aprende los fundamentos de Node.js",
        "duracion_horas": 15,
        "nivel": "Principiante",
        "fecha_publicacion": "2026-05-09",
        "publicado": 1
    }
]
```

### GET `/cursos_online/:id`
**Respuesta (200):** objeto único con los mismos campos.

### PUT `/cursos_online/:id`
**Body:**
```json
{
    "titulo": "Introducción a Node.js - Actualizado",
    "resumen": "Contenido actualizado",
    "duracion_horas": 20,
    "nivel": "Intermedio",
    "fecha_publicacion": "2026-05-09",
    "publicado": true
}
```
**Respuesta (200):**
```json
{ "mensaje": "Curso actualizado con éxito", "affectedRows": 1 }
```

### DELETE `/cursos_online/:id`
**Respuesta (200):**
```json
{ "mensaje": "Curso eliminado con éxito" }
```

**Campo obligatorio:** `titulo`

---

## Endpoints — Reservas Hotel

Base URL: `http://localhost:3001/reservas_hotel`

| Método | Endpoint            | Descripción                  |
|--------|---------------------|------------------------------|
| GET    | `/reservas_hotel`   | Listar todas las reservas    |
| GET    | `/reservas_hotel/:id` | Obtener una reserva por ID |
| POST   | `/reservas_hotel`   | Crear una nueva reserva      |
| PUT    | `/reservas_hotel/:id` | Actualizar una reserva     |
| DELETE | `/reservas_hotel/:id` | Eliminar una reserva       |

### POST `/reservas_hotel`
**Body:**
```json
{
    "huesped_nombre": "Carlos López",
    "habitacion_numero": "201",
    "fecha_entrada": "2026-05-15",
    "fecha_salida": "2026-05-18",
    "total_pago": 450.00,
    "estado": "Confirmada"
}
```
**Respuesta (201):**
```json
{ "mensaje": "Reserva guardada con éxito", "id": 1 }
```

### GET `/reservas_hotel`
**Respuesta (200):**
```json
[
    {
        "id": 1,
        "huesped_nombre": "Carlos López",
        "habitacion_numero": "201",
        "fecha_entrada": "2026-05-15",
        "fecha_salida": "2026-05-18",
        "total_pago": 450.00,
        "estado": "Confirmada"
    }
]
```

### GET `/reservas_hotel/:id`
**Respuesta (200):** objeto único con los mismos campos.

### PUT `/reservas_hotel/:id`
**Body:**
```json
{
    "huesped_nombre": "Carlos López",
    "habitacion_numero": "205",
    "fecha_entrada": "2026-05-15",
    "fecha_salida": "2026-05-20",
    "total_pago": 600.00,
    "estado": "Confirmada"
}
```
**Respuesta (200):**
```json
{ "mensaje": "Reserva actualizada con éxito", "affectedRows": 1 }
```

### DELETE `/reservas_hotel/:id`
**Respuesta (200):**
```json
{ "mensaje": "Reserva eliminada con éxito" }
```

**Campos obligatorios:** `huesped_nombre`, `habitacion_numero`, `fecha_entrada`, `fecha_salida`

---

## Pruebas con Postman

Cada proyecto incluye su colección de Postman lista para importar:

| Colección | Archivo | Puerto |
|-----------|---------|--------|
| Cursos Online | `curso_online/Backend/postman/CursoOnline.postman_collection.json` | 3000 |
| Reservas Hotel | `reserva_hotel/Backend/postman/ReservasHotel.postman_collection.json` | 3001 |

**Para importar:**
1. Abrir Postman → **Import**
2. Seleccionar el archivo `.json` correspondiente
3. Ejecutar los endpoints (GET all → GET by id → POST → PUT → DELETE)

---

## Validaciones y manejo de errores

| Código | Situación |
|--------|-----------|
| `200 OK` | Consulta exitosa (GET) |
| `201 Created` | Operación de escritura exitosa (POST, PUT, DELETE) |
| `400 Bad Request` | Campos obligatorios faltantes |
| `500 Internal Server Error` | Error en la base de datos |

---

## Puertos

- **Cursos Online**: `http://localhost:3000`
- **Reservas Hotel**: `http://localhost:3001`

---

## Autor

Proyecto desarrollado para Programación Web  
Instituto Santo Tomás, Ingeniería en Informática.

