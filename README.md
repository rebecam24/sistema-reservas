
# Interfaz de Usuario para Gestión de Reservas de Espacios

Este proyecto es una aplicación construida con Angular que permite a los usuarios gestionar reservas de lugares. La aplicación ofrece diferentes funcionalidades según el tipo de usuario.

## Requisitos

- Node.js (versión recomendada: 18.x o superior)
- Angular CLI (versión recomendada: 18.x)

## Paquetes Utilizados

La aplicación utiliza los siguientes paquetes:

- **ngx-toastr**: ^19.0.0 - Notificaciones tipo toast para informar al usuario.
- **Tailwind CSS**: ^3.4.13 - Framework CSS para diseño de interfaz.

## Instalación

1. Clona el repositorio:

   git clone https://github.com/rebecam24/sistema-reservas.git


2. Navega al directorio del proyecto:

   cd sistema-reservas


3. Instala las dependencias:

   npm install


4. Inicia el servidor de desarrollo:

   ng serve


5. Abre tu navegador y accede a:

   http://localhost:4200


## Funcionalidades

La aplicación permite a los usuarios gestionar reservas con las siguientes funcionalidades:

### Usuarios Administradores

Los usuarios con rol de administrador tienen acceso a:

- **CRUD de Lugares**: Crear, Leer, Actualizar y Eliminar lugares.
- **Filtrado de Lugares**: Aplicar filtros para visualizar lugares específicos.

### Usuarios Regulares

Los usuarios regulares tienen acceso a:

- **Gestión de Reservas**: Crear, modificar o cancelar reservas.
- **Visualización y Filtrado de Lugares**: Ver y aplicar filtros a los lugares disponibles.

