# Lista de usuarios
### Práctica del curso de React de LearnThis Academy

## Instalación del projecto
Para instalar el projecto, puedes ejecutar los siguientes comandos en tu terminal, toma en cuenta que ya debes estar situado en el directorio en donde desees instalar el proyecto.

- Descarga el proyecto desde el repositorio en GitHub con el siguiente comando usando SSH:

```bash
git clone git@github.com:onnymm/react-users-list.git
```

- Una vez instalado el proyecto, sitúate dentro del directorio:

```bash
cd react-users-list
```

- Instala las dependencias con **npm**. Si aún no tienes **npm** puedes descargar e instalar el Node Package Manager [aquí](https://nodejs.org/en/download):

```bash
npm install
```



## Ejecuta los servidores Backend y Frontend

Para continuar estos pasos, requerirás de otra terminal. Simplemente abre otra terminal para poder tener los dos servidores en ejecución

Una vez tengas tus dos terminales, procede a iniciar los servidores:

### Ejecución del servidor Backend

- Inicia el servidor Backend con npm

```bash
npm run server
```

### Ejecución del servidor Frontend

- Inicia el servidor Frontend

```bash
npm run dev
```

Para poder acceder a la página web, puedes presional `CTRL` + `clic` sobre el link mostrado en la terminal al iniciarse el servidor Frontend, o bien, ingresar a la URL por defecto que es `http://localhost:5173/`

## Notas

### Funcionalidad
- Se puede realizar un CRUD completo (Métodos **Create**, **Read**, **Update** y **Delete**).
- **Los campos cuentan con validaciones** para evitar la entrada de valores no aceptados.
- Por cuestiones de practicidad para el proyecto, las fotos sólo pueden ser de un máximo de **100 Kb**, se sugiere un tamaño de 75×75 pixeles.

### Recursos
- Este servidor Frontend fue hecho usando **Vite**. Puedes ir a su sitio web [aquí](https://vitejs.dev/) o a su repositorio [aquí](https://github.com/vitejs/vite-plugin-react).
- Para el servidor Backend se utilizó la funcionalidad de **json-server**. Puedes ver su repositorio [aquí](https://github.com/typicode/json-server).
- Los nombres y nombres de usuario no pertenecen a ninguna persona real y fueron generados con inteligencia artificial.
- Las imágenes utilizadas para perfil de usuario en este proyecto fueron tomadas de [thispersondoesntexist.com](https://thispersondoesnotexist.com/) y no pertecen a ninguna persona real.
- Este proyecto fue posible gracias al curso de React de **LearnThis Academy**.