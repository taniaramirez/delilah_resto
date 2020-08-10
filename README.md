
<strong>Requisitos</strong>

Para ejecutar la API es necesario tener instalado:
<ul>
<li>Un editor de código</li>
<li>Postman</li>
<li>Node</li> 
<li>XAMPP</li>
</ul>

<strong>Iniciar el servidor</strong>

<ul>
<li>Descargar el proyecto en su computadora.</li>
<li>Puede revisar el archivo openapi.yaml para conocer la documentación de la API.</li>
<li>Abrir la carpeta del proyecto con el editor de código.</li>
<li>Instalar las dependencias indicadas en el archivo package.json </li>
<li>Iniciar el servidor ingresando en la consola el comando
npm run dev (esto iniciará el servidor en el puerto 3000)</li>
</ul>

<strong>Base de datos</strong>
<ul>
<li>Abra XAMPP y conéctese al puerto 3310</li>
<li>Abra http://localhost/phpmyadmin/ para ingresar al panel de control de MySQL e importe el archivo 'delilah.sql', ubicado en la carpeta documentation, para importar la base de datos (de ser necesario usuario, el mismo es 'root' y no posee contraseña).</li>
</ul>

<strong>Rutas</strong>
<ul>
<li>Importe el archivo delilah-resto-api.postman_collection.json en Postman.</li>
<li>En este software, ingrese a la ruta localhost:3000/register para registrarse como usuario sin permisos de administrador. Ingrese  localhost:3000/login y obtenga su token para realizar operaciones con permisos de administrador. </li>
</ul>
<strong>Todo listo</strong>
<ul>
<li>Con el token recibido podrá probar todas las rutas</li>
</ul>
