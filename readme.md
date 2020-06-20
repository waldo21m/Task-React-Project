# 📘 Tasks

Tasks es una aplicación de gestión de tareas (helpdesk).

## 💻 Índice

* [Arquitectura del la aplicación](#archApp)
    * [Librerías implementadas para complementar el desarrollo del Frontend](#libraries)
* [Pasos iniciales](#initApp)
* [Ejecutar la aplicación](#execApp)
* [Y mas...](#more)

## <a name="archApp"></a> 🚀 Arquitectura del la aplicación

La aplicación está construida en **React** con CRA para el Frontend, el cual realiza consultas mediante la plataforma [8base](https://www.8base.com/) con [GraphQL](https://graphql.org/). Además, cuenta con un webhook que se encarga de exponer un servicio tipo API RestFull utilizado para marcar una tarea específica como completada. 

### <a name="libraries"> 📚 Librerías implementadas para complementar el desarrollo del Frontend
Podemos destacar algunas de las librerías:
* [Material-UI](https://material-ui.com/es/)
* [React Router Dom](https://reacttraining.com/react-router/)
* [Redux](https://es.redux.js.org/)
* [React Hook Form](https://react-hook-form.com/)
* [Cypress](https://www.cypress.io/)

*Nota: Para mayor información del resto de las dependencias, no dude en consultar el archivo package.json.*

## <a name="initApp"></a> 🐾 Pasos iniciales
Una vez clonado el proyecto, debemos movernos a la carpeta raíz, ejecutando el siguiente comando:

```sh
cd task-react-project
```

Luego necesitamos ejecutar el siguiente comando para instalar todas las librerías necesarias:

```sh
npm i
```

## <a name="execApp"></a> 🤓 Ejecutar la aplicación
Para iniciar la aplicación ejecutamos el siguiente comando:

```sh
npm run start
```

Si deseamos ejecutar las pruebas unitarias y E2E con Cypress, podemos hacer uso del método interactivo con el comando:

```sh
npm run cypress
```

O mediante la interfaz de línea de comandos:

```sh
npm run cypress-cli
```

## <a name="more"></a> 💡 Y mas...
Por fines prácticos, los archivos de configuración fueron subidos al repositorio y no son un mero accidente. También, se encuentra una colección para que sea importada con [Postman](https://www.postman.com/) que contiene todas las consultas que se usaron durante el desarrollo de esta aplicación.

Algunas rutas que no se integraron con 8base por **limitaciones de una cuenta gratuita** pero que se maquetaron fueron las siguientes:
* /signup
* /user