# Proyecto de Manejo de Datos de Energías Renovables

Este proyecto tiene como objetivo crear una aplicación web para el manejo de datos relacionados con la producción y consumo de energías renovables, permitiendo la gestión de información a través de un CRUD (Create, Read, Update, Delete). La aplicación proporciona una interfaz para visualizar y analizar los datos mediante gráficos y facilita la manipulación de los registros en una base de datos.

## Tecnologías Utilizadas

### Frontend

- **Angular**: Se utilizó Angular junto con TypeScript para el desarrollo de la interfaz de usuario, permitiendo una estructura modular y organizada en componentes.
- **Bootstrap**: Se empleó Bootstrap para el diseño de la interfaz, garantizando un estilo moderno y responsivo.
- **Chart.js**: Herramienta utilizada para la generación de gráficos interactivos que permiten visualizar los datos de producción y consumo de energía.

### Backend

- **Spring Boot y Java**: La aplicación está soportada por un backend en Spring Boot que provee la estructura y lógica del servidor, gestionando las entidades relacionadas con la información de energías renovables.
- **MySQL**: Base de datos utilizada para almacenar los registros de producción y consumo de energía por país y tipo de energía.

### Pruebas

- **Postman**: Se utilizaron pruebas de endpoints en Postman para verificar el correcto funcionamiento de las operaciones CRUD y asegurar que los datos se manipulen correctamente.

## Funcionalidades

- **Gestión de Energía**: Permite la creación, actualización, visualización y eliminación de registros de producción y consumo de energía.
- **Gráficos Interactivos**: Visualización de los datos de energía en forma de gráficos, mostrando tendencias y patrones de consumo y producción.
- **Filtrado de Datos**: Posibilidad de filtrar la información por país y tipo de energía, facilitando la comparación de datos entre distintos países y energías.

## Estructura del Proyecto

- `Frontend` (Angular): Se encarga de la presentación de los datos y la interacción del usuario.
  - **Componentes**: Cada entidad tiene su propio componente CRUD, que permite la creación y edición de registros.
  - **Servicios**: Angular Services se encargan de la comunicación con el backend, gestionando las solicitudes HTTP.
  - **Gráficos**: Integración de Chart.js para la representación visual de los datos de energía.

- `Backend` (Spring Boot): Administra las operaciones CRUD y define las entidades del sistema.
  - **Entidades**: Clases Java que representan las tablas de la base de datos, como `Country`, `Energy`, `EnergyProduced`, `EnergyConsumed`, entre otras.
  - **Controladores**: Se define una API REST que expone los endpoints para la gestión de datos.
  - **Servicios**: La lógica de negocio se organiza en servicios para mantener el código modular y reutilizable.

## Instalación y Configuración

1. **Clonar el Repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio

