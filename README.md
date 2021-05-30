# Nodepop-React-Avanzado

Vamos a crear una aplicación de tipo dashboard que será la interfaz gráfica desde la que podremos gestionar el API de anuncios Nodepop. Para esta práctica usaremos de punto de inicio la práctica que se realizó en el modulo de fundamentos: [Nodepop-React](hhttps://github.com/danielbueno76/Nodepop-React).

## Objetivos de la práctica:

1. Configurar un store Redux donde se almacenará al menos la siguiente información:
   - Información sobre la sesión o el usuario registrado en el sistema. Al iniciar la aplicación se deberá leer la información del usuario desde el LocalStorage (si existiese) y se almacenará en el store de Redux. Al hacer login un un usuario su información deberá guardarse en el store de Redux y en el Local Storage si se eligió recordar el login.
   - Información sobre los anuncios. El store deberá manejar la obtención de tags disponibles, de anuncios desde el API (listado y detalle), así como la creación y borrado de anuncios. Será importante modelar correctamente el estado que se va a guardar en el store.
2. Crear las acciones y reducers necesarios para poder cumplir los objetivos del punto 1.
3. Conectar los componentes con el store de redux (connect / hooks)
4. Configurar Redux Dev Tools para simplificar las tareas de debugging de la aplicación.
5. Testing. Crear tests unitarios, dando al menos un ejemplo de cada uno de estos casos.
   - Una acción síncrona.
   - Una acción asíncrona.
   - Un reducer.
   - Un selector.
   - Un componente con snapshot testing.
   - Comprobar el funcionamiento de un componente que ejecuta una acción del store, mockeando la acción.
6. Formularios. La aplicación contiene varios formularios (Login, Creación de anuncios).
   Se extrae la lógica común a todos ellos y se reutilizan en los disintos formularios, creando un componente <Form /> que mantenga los valores del formulario y un <FormField
   /> que reciba el valor que le corresponde así como la función necesaria para poder modificar ese valor en el evento onChange. De ese modo, toda la lógica del onChange estará “escondida” en los components Form e Input.

## Backend

Usaremos todos el siguiente proyecto como backend:
[Nodepop-API](https://github.com/davidjj76/nodepop-api).
Una vez en marcha, tendremos nuestro backend corriendo el el puerto 3001 (configurable via archivo .env). Tenéis disponible un swagger en la ruta **/swagger** donde podréis probar los diferentes endpoints y ver cómo pasar los datos en las peticiones.

En el backend tendremos disponibles los siguientes endpoints:

- **/api/auth/signup**
  - **POST**: Nos permite crear usuarios.
- **/api/auth/me**
  - **GET**: Nos devuelve la información del usuario autenticado.
- **/api/auth/login**
  - **POST**: Devuelve un token de acceso cuando le pasamos un email y password de un usuario correctos.
- **/api/v1/adverts**
  - **GET**: Devuelve un listado de anuncios, con la posiblidad de aplicar filtros con la query que enviemos en la URL. Los filtros posibles son:
    - name=coche (que el nombre empiece por “coche”, sin importar MAY/MIN)
    - sale=true/false (si el anuncio es de compra o venta)
    - price=0-25000 (precio dentro del rango indicado)
    - tags=motor,work (que tenga todos los tags)
  - **POST**: Crea un anuncio.
- **/api/v1/adverts/tags**
  - **GET**: Devuelve el listado de tags disponibles.
- **/api/v1/adverts/:id**
  - **GET**: Devuelve un único anuncio por Id.
  - **DELETE**: Borra un anuncio por Id.

**NOTA**: Todos los endpoints bajo **/adverts** requieren que se envíe el token proporcionado en el endpoint de login. Se ha de enviar en la cabecera de la petición de la siguiente forma:

`` Header[‘Authorization’] = `Bearer ${token}` ``.

Los datos del backend son persistidos en una base de datos sqlite en el directorio **/data** (de ese modo no os teneís que preocupar de crear bases de datos). Las fotos subidas al backend son almacenadas en el directorio **/uploads** y servidas por el backend cómo contenido estático en **/public** (la ruta pública de cada foto es almacenada en la base de datos).

## Frontend

La aplicación frontend será una SPA (Single Page Application) desarrollada con React como librería principal. Podéis crear la aplicación con **create-react-app** para que no os tengáis que preocupar de la inicialización del Proyecto.

En la aplicación se implementarán una serie de rutas (enrutado en el navegador) divididas en dos grupos: **Públicas y Protegidas**. En cada una de la rutas se renderizará un componente principal tal como se explica a continuación.

- **Públicas**: Accesibles para cualquier usuario.
  - **/login**: LoginPage.
- **Protegidas**: Accesibles **SOLO** para usuarios autenticados. Cualquier acceso de un usuario no autenticado a cualquiera de estas rutas redireccionará a **/login**.
  - **/**: Redirecciona a **/adverts**
  - **/adverts**: AdvertsPage
  - **/advert/:id**: AdvertPage
  - **/advert/new**: NewAdvertPage
  - Para cualquier otra url que no coincida se creará un componente **NotFoundPage** que informará al usuario que la página solicitada no existe.

Funcionalidad de cada página-componente:

- **LoginPage:**
  - Formulario con inputs para recoger email y password del usuario.
  - Checkbox “Recordar contraseña” mediante el que indicaremos que guardamos en el localStorage los datos de la session de usuario, evitando tener que introducir credenciales en cada visita al sitio (pensad la información mínima que os interesea guardar).
- **AdvertsPage:**

  - Listado de anuncios. Cada anuncio presentará nombre, precio, si es compra venta y los tags. No se mostrará la foto en este listado.
  - Manejará el estado cuando no haya ningún anuncio de mostrar, con un enlace a la página de creación de anuncios.
  - Cada anuncio del listado tendrá un enlace al detalle del anuncio (ruta **/advert/:id**).
  - Zona de filtros: Formulario con distintos inputs, donde podremos introducir los filtros que queremos aplicar sobre el listado o borrar el filtrado.

    - Filtro por nombre (input tipo texto)
    - Filtro compra/venta (input tipo radio ‘venta’, ‘compra’, ‘todos’)
    - Filtro por precio (input donde podremos seleccionar el rango de precios por el que queremos filtrar).
    - Filtro por tags (input donde podremos seleccionar uno o varios tags de los disponibles). El filtro incluirá todos los tags seleccionados.
    - La aplicación recuerda las preferencias de filtrado del usuario, de modo que cada vez que se entre en esta ruta estuviesen ya marcados los últimos filtros aplicados y con ellos se realizase la petición al API. Estas preferencias permanecen guardadas por el navegador.

  - **El filtrado de anuncios:**
    - Recoger los filtros a aplicar en el front y enviarlos a la petición al API para traer los anuncios ya filtrados desde el backend (una petición cada vez que se apliquen los filtros).

- **AdvertPage**:
  - Detalle del anuncio cuyo id es recogido de la URL. Mostrará la foto del anuncio o un placeholder en su lugar si no existe foto.
  - Si el anuncio no existe deberia redirigirnos al **NotFoundPage**.
  - Botón para poder borrar el anuncio. Antes de borrar mostar una confirmación al usuario. Tras el borrado debería redireccionar al listado de anuncios.
- **NewAdvertPage**:
  - Formulario con **TODOS** los inputs necesarios para crear un nuevo anuncio:
    - Nombre
    - Compra / Venta
    - Tags disponibles.
    - Precio
    - Foto
  - Todos los campos, excepto la foto serán requeridos para crear un anuncio. Manejar estas validaciones con React, por ejemplo desabiltando el submit hasta pasar todas las validaciones.
  - Tras la creación del anuncio debería redireccionar a la página del anuncio.
- Además de estos componentes necesitaremos un componente visible cuando el usuario esté logeado desde el que podamos hacer **logout** con confirmación.
- Las rutas de **/adverts** y **/advert/new** deben de estar accesibles fácilmente mediante enlaces de navegación (Link o NavLink).

## Otras cosas

A tener en cuenta.

- **Estilos**: No es necesario una aplicación super mega impactante en cuanto a lo visual, simplemente que funcione y que las cosas esté colocadas correctamente en la pantalla.
  - Podéis usar la técnica de estilado que más os guste, CSS puro, atributo style, SCSS, CSS modules, CSS in JS como Styled Components (u otros) o una mezcla de cosas.
  - Podéis usar una librería de componentes si creeis que os puede quitar trabajo a la hora de dar un aspecto más uniforme a toda la aplicación. Hay muchas, como Semantic UI, React Bootstrap, Ant…
- **Librerías**: Intentad usar el mínimo de librerías posibles, React Router, Axios, Styled Components están permitidas, pero por ejemplo no uséis librerías para el manejo de formularios (React Hook Form, o Formik), porque en estos momentos es preferible que comprendáis como funcionan las cosas en React.
- **Código**: Recomiendo usar un formateador [Prettier](https://prettier.io/) de código por varias razones:
  - Formato uniforme por todo el código. El que corrige la práctica lo agradecerá.
  - No nos tenemos que preocupar al codificar por aspectos como indentaciones, saltos de linea, etc, el formateador lo hace por nosotros y escribiremos código más rápido.
  - Fácil de integrar en nuestro editor favorito mediante plugins. En equipos de desarrollo más grandes podemos incluso integrarlo en el proyecto y hacer que a cada commit se formetée automáticamente, asegurando que todos los miembros del equipo formatean igual independientemente de las configuraciones de sus editores.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
