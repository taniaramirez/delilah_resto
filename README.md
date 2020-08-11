
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
<li>En este software, ingrese a la ruta localhost:3000/register para registrarse como usuario sin permisos de administrador. Para esto, en el body de la petición se encuentran previamente cargados los datos que serán enviados a la base de datos (estos pueden ser modificados). Estos se encuentran en el siguiente formato: 
<br> <br>
<code>
 {
    "userName": "user",
    "name": "Pepe",
    "lastName": "Grillo",
    "email": "test@test.com",
    "phone": 3415556677,
    "address": "Calle Imaginaria 123",
    "password": "test"
}
</code>
<br><br>
Una vez enviada la petición, el software le devolverá un token, este debe ser igresado en los headers de las siguientes rutas que sean permitidas sin permiso de administrador (por ejemplo generar una orden). 
<li> El token debe ingresarse en la fila "Authorization - Bearer (token otorgado)".
<br>
</li>
<li> Si desea registrarse con permisos de administrador, ingrese a la ruta localhost:3000/login. En el body de esta petición se encuentra el usuario y contraseña registrado previamente en la base de datos (puede ser midificado desde allí). </li>
<li> Una vez enviada la petición de login se le devolverá el token de administrador, el cual debe ser utilizado en los headers de las rutas que requieran dicho permiso (por ejemplo listar todas los pedidos o cambiar el estado de una orden). </li>
<li> El token debe ingresarse en la fila "Authorization - Bearer (token otorgado)".
<li> Toda información que se envíe a la base de datos, por ejemplo hacer o modificar un pedido, o modificar un producto, se debe hacer desde el body de la petición.</li>  
</ul>
<strong>Todo listo</strong>
<ul>
<li>Ahora podrá probar todas las rutas</li>
</ul>
