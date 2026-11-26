
# RentCar Solutions - API REST

## Información académica

- Institución: CIAF
- Programa: Ingeniería de Software
- Asignatura: Arquitectura Cliente-Servidor
- Docente: Juan Suarez
- Año: 2026

## Integrantes

| Número de lista | Apellidos y nombres |
|---|---|
| 4 | Bedoya Flórez, Fabián Alberto |
| 13 | Lugo Torres, Hugo Alberto |
| 19 | Peña Guevara, Carlos Andrés |
| 20 | Pérez Velandia, Luis Guillermo |

## 1. Descripción del proyecto

RentCar Solutions es un caso de negocio orientado a la prestación de servicios de alquiler de vehículos.

El proyecto consiste en una API REST que permite registrar y consultar solicitudes de reserva de vehículos, aplicando una regla de negocio para calcular el valor final del servicio según la prioridad de la solicitud.

La API está desarrollada con Node.js y Express, utilizando una arquitectura por capas que separa las responsabilidades de cada componente del servidor.

## 2. Tecnologías utilizadas

- JavaScript
- Node.js
- Express
- Nodemon
- Postman
- Git y GitHub
- JSON

## 3. Arquitectura del proyecto

El proyecto implementa una arquitectura por capas con la siguiente estructura:

```text
rentcar-solutions-api/
├── controllers/
│   └── turnos.controller.js
├── routes/
│   └── turnos.routes.js
├── services/
│   └── turnos.service.js
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
├── README.md
└── RentCar.postman_collection.json
```

### Responsabilidades de cada capa

- Routes: define los endpoints y dirige las peticiones hacia los controladores correspondientes.
- Controllers: recibe las peticiones HTTP, valida los datos y genera las respuestas con sus respectivos códigos de estado.
- Services: contiene las reglas de negocio, los cálculos de tarifas y la gestión de los registros.
- Index.js: configura Express, conecta las rutas e inicializa el servidor.

El almacenamiento se realiza mediante un arreglo en memoria. Los registros se eliminan cuando se reinicia el servidor.

## 4. Parámetro del equipo y regla de negocio

El primer integrante del equipo, ordenado alfabéticamente por apellido, es Fabián Alberto Bedoya Flórez, cuyo número oficial de lista es 4.

Por lo tanto:

- N = 4
- Porcentaje de recargo = N × 2 %
- Porcentaje de recargo = 8 %

Cuando una solicitud es prioritaria:

    recargo = precioBase × 0.08
    totalPagar = precioBase + recargo

Cuando la solicitud no es prioritaria o no se especifica el atributo prioritario:

    recargo = 0
    totalPagar = precioBase

## 5. Instalación y ejecución

### Requisitos

- Node.js
- npm
- Git
- Postman para realizar las pruebas

### Instalar las dependencias

```bash
npm ci
```

### Iniciar el servidor

```bash
npm start
```

### Iniciar en modo desarrollo

```bash
npm run dev
```

El servidor estará disponible en:

http://localhost:3000

## 6. Endpoints disponibles

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/turnos | Consulta todas las solicitudes |
| GET | /api/turnos/:id | Consulta una solicitud por ID |
| POST | /api/turnos | Registra una nueva solicitud |

## 7. Datos de entrada

| Campo | Tipo | Obligatorio |
|---|---|---|
| cliente | String | Sí |
| vehiculo | String | Sí |
| fecha | String | Sí |
| precioBase | Number | Sí |
| prioritario | Boolean | No |

El identificador, el recargo y el total a pagar son generados automáticamente por el servidor.

## 8. Códigos de estado HTTP

| Código | Estado | Descripción |
|---|---|---|
| 200 | OK | Consulta realizada correctamente |
| 201 | Created | Solicitud creada correctamente |
| 400 | Bad Request | Datos incompletos o inválidos |
| 404 | Not Found | Solicitud no encontrada |

## 9. Ejemplos de funcionamiento

### Caso exitoso: solicitud prioritaria

Método: POST

URL: http://localhost:3000/api/turnos

Content-Type: application/json

Cuerpo de la petición:

```json
{
    "cliente": "Juan Perez",
    "vehiculo": "Toyota Corolla",
    "fecha": "2026-12-05",
    "precioBase": 150000,
    "prioritario": true
}
```

Respuesta obtenida: 201 Created

```json
{
    "id": 1,
    "cliente": "Juan Perez",
    "vehiculo": "Toyota Corolla",
    "fecha": "2026-12-05",
    "precioBase": 150000,
    "prioritario": true,
    "recargo": 12000,
    "totalPagar": 162000
}
```

### Caso exitoso: solicitud sin prioridad

```json
{
    "cliente": "Maria Lopez",
    "vehiculo": "Renault Logan",
    "fecha": "2026-12-06",
    "precioBase": 120000,
    "prioritario": false
}
```

Resultado obtenido:

- Código HTTP: 201 Created.
- Recargo: 0 COP.
- Total a pagar: 120000 COP.

### Caso exitoso: prioridad no especificada

```json
{
    "cliente": "Andres Martinez",
    "vehiculo": "Mazda CX-5",
    "fecha": "2026-12-08",
    "precioBase": 200000
}
```

Resultado obtenido:

- Código HTTP: 201 Created.
- Prioritario: false.
- Recargo: 0 COP.
- Total a pagar: 200000 COP.

### Caso de error: precio inválido

```json
{
    "cliente": "Pedro Gomez",
    "vehiculo": "Kia Picanto",
    "fecha": "2026-12-07",
    "precioBase": -50000,
    "prioritario": true
}
```

Respuesta obtenida: 400 Bad Request

```json
{
    "mensaje": "Datos obligatorios incompletos o invalidos"
}
```

### Caso de error: identificador inexistente

Método: GET

URL: http://localhost:3000/api/turnos/999

Respuesta obtenida: 404 Not Found

```json
{
    "mensaje": "Solicitud no encontrada"
}
```

## 10. Pruebas funcionales

Las pruebas fueron realizadas mediante Postman.

| Prueba | Resultado | Estado |
|---|---|---|
| Consultar todas las solicitudes | 200 OK | Exitosa |
| Crear solicitud prioritaria | 201 Created | Exitosa |
| Crear solicitud sin prioridad | 201 Created | Exitosa |
| Consultar solicitud por ID | 200 OK | Exitosa |
| Consultar ID inexistente | 404 Not Found | Exitosa |
| Registrar precio negativo | 400 Bad Request | Exitosa |
| Omitir atributo prioritario | 201 Created | Exitosa |

La colección de Postman se encuentra disponible en el archivo:

RentCar.postman_collection.json

Para reproducir las pruebas, se debe importar la colección en Postman e iniciar el servidor. Se deben crear solicitudes antes de consultar sus identificadores.

## 11. Seguridad y validaciones

El controlador verifica que los campos obligatorios estén presentes, que el precio base sea numérico, finito y mayor que cero, y que el atributo prioritario sea booleano cuando se incluya.

Se realizó una auditoría de las dependencias mediante npm audit, obteniendo cero vulnerabilidades reportadas al momento de la revisión.

## 12. Alcance del proyecto

Esta API corresponde a una implementación académica orientada a demostrar la arquitectura por capas, la comunicación mediante HTTP, las validaciones y la aplicación de reglas de negocio.

No incluye autenticación, persistencia mediante una base de datos ni comprobación de disponibilidad de vehículos. Estas funcionalidades corresponden a posibles ampliaciones del sistema.

## 13. Pruebas automatizadas

La colección de Postman incluye siete peticiones y
14 comprobaciones automatizadas.

Resultados obtenidos el 26 de noviembre de 2026:

- Pruebas ejecutadas: 14.
- Pruebas superadas: 14.
- Pruebas fallidas: 0.
- Porcentaje de éxito: 100 %.

Para reproducir las pruebas, se debe reiniciar el
servidor y ejecutar la colección completa en orden
mediante Postman Collection Runner.