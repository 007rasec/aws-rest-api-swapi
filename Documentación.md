# Reto Rimac: NodeJS, Serverless, DynamoBD, AWS

Reto técnico de Rimac, empleando Node.js, framework Serverless para AWS, con base de datos DynamoDB e integración con SWAPI.

## Comenzando 🚀

_Ls siguientes instrucciones ayudarán a poder instalar el proyecto localmente y también desplegarlo en un entorno de desarrollo en AWS._

### Pre instalación 📋 

_Para alojar localmente la base de datos DynamoDB que es con la que se ha probado el proyecto, es necesario tener instalado java JRE, se puede descargar el instalador desde la siguiente ruta._

```
https://www.java.com/es/download/ie_manual.jsp
```

_Tener instalado Node.js._

```
https://nodejs.org/es/download/
```


### Instalación 🔧 

_Es necesario abrir la consola en el directorio del proyecto para ejecutar los comandos_

```
.../aws-rest-api-swapi> _
```

_Para desplegar el proyecto localmente, es necesario instalar unas dependencias mediante npm._

_Instalar el framework serverless localmente en modo offline, mediante la consola por npm._

```
npm install --save serverless-offline
```

_Para ahorrar megas y tiempo de despliegue al momento de subir el proyecto a AWS, instalar el siguiente plugin._

```
npm install serverless-plugin-include-dependencies --save-dev
```

_Instalar el sdk de AWS para usarlo en el proyecto._

```
npm install --save aws-sdk
```

_Instalar DynamoBD localmente para realizar las pruebas en modo offline._

```
npm install --save-dev serverless-dynamodb-local
```

_Instalar Node-Fetch, para la consulta externa de Api rest, en este caso se está consultado a SWAPI._

```
npm install node-fetch
```

_Instalar UUID, para la generación de ID al momento de registrar un personaje._

```
npm install uuid
```

## Ejecutando ⚙️

_Para ejecutar localmente y realizar las pruebas, se debe ejecutar la siguiente línea en la consola._

```
sls offline start
```

_Se ha implementado un CRUD básico para la tabla Peaple, que almacena personajes de Star Wars._

### Prueba de registro por POST 🔩

_Para realizar el post, se maneja la siguiente url de manera local._

```
http://localhost:3000/dev/people
```

```
{
  "nombre": "Luke Skywalker",
  "genero": "Male",
  "peliculas": "https://swapi.py4e.com/api/films/1/",
  "color_ojos": "azul",
  "color_cabello": "Marrón",
  "color_piel": "Marrón",
  "altura": "172",
  "peso": "77",
  "planeta": "https://swapi.py4e.com/api/planets/1/",
  "especie": "https://swapi.py4e.com/api/species/1/",
  "nave": "https://swapi.py4e.com/api/starships/12/",
  "vehiculo": "https://swapi.py4e.com/api/vehicles/14/",
  "url": "https://swapi.py4e.com/api/people/1/",
  "fecha_nacimiento": "10/10/1990"
}
```

### Prueba de listado de personajes por GET 🔩

_Para realizar el GET del listado de personajes, se maneja la siguiente url de manera local._

```
http://localhost:3000/dev/people
```

### Prueba de lectura de un objeto por GET 🔩

_Para realizar el GET de un personaje, es necesario brindar por PathParams el id del personaje registrado en la BD, se maneja la siguiente url de manera local._

```
http://localhost:3000/dev/people/{id}
```

_Hay una validación para el GET de un personaje; los personajes guardados tienen un ID autogenerado, sin embargo, es posible obtener un personaje que no esté guardado siempre y cuando existan en el SWAPI, bastaría con brindarle un id válido, como por ejemplo:_

```
http://localhost:3000/dev/people/5

Brindará los datos de Leia Organa.
```

### Prueba de actualización de un personaje por PUT 🔩

_Para realizar el PUT de un personaje, se brinda por PathParams el id del personaje y el json con los datos a actualizar, se maneja la siguiente url de manera local._

```
http://localhost:3000/dev/people/{id}
```

_Se puede alcanzar un json como el siguiente:_

```
{
	"id": "2f752d20-b223-11eb-8e5d-23944a435742",
    "nombre": "Leia Organa",
    "altura": "150",
    "masa": "49",
    "color_cabello": "brown",
    "color_piel": "light",
    "color_ojos": "brown",
    "fecha_nacimiento": "19BBY",
    "genero": "female",
    "planeta": "https://swapi.py4e.com/api/planets/2/",
    "peliculas": "https://swapi.py4e.com/api/films/1/",
    "especie": [
        "https://swapi.py4e.com/api/species/1/"
    ],
    "vehiculo": [
        "https://swapi.py4e.com/api/vehicles/30/"
    ],
    "nave": [],
    "fecha_creacion": "2014-12-10T15:20:09.791000Z",
    "fecha_edicion": "2014-12-20T21:17:50.315000Z",
    "url": "https://swapi.py4e.com/api/people/5/"
}
```

### Prueba de eliminación de un personaje por DELETE 🔩

_Para realizar el DELETE de un personaje, hay que pasar un parámetro por medio de PathParams se maneja la siguiente url de manera local._

```
http://localhost:3000/dev/people/{id}
```


## Despliegue 📦

_El proyecto está preparado para desplegar en AWS, para realizar el ejercicio antes mencionado con los recursos de la nube._

```
serverless deploy
```
_Se los endpoint generados se encuentran en AWS._
```
  POST - https://4t1mv5s6o8.execute-api.us-east-1.amazonaws.com/dev/people
  GET - https://4t1mv5s6o8.execute-api.us-east-1.amazonaws.com/dev/people
  GET - https://4t1mv5s6o8.execute-api.us-east-1.amazonaws.com/dev/people/{id}
  PUT - https://4t1mv5s6o8.execute-api.us-east-1.amazonaws.com/dev/people/{id}
  DELETE - https://4t1mv5s6o8.execute-api.us-east-1.amazonaws.com/dev/people/{id}
```

### Configuración de AIM, cuenta para despliegue en AWS 🔩

_Para el correcto despliegue en AWS, es necesario tener las cuentas AIM con los permisos necesarios, para ello se debe configurar el framework serverless con la cuenta aws._

_La cuenta AIM debe contar con el key y el clave, tener en cuenta que la clave solo se verá cuando se genera por primera vez la cuenta AIM, las claves pueden ser generadas nuevamente en caso perderla, se debe seguir el siguiente comando:_

```
serverless config credentials --provider aws --key 1234 --secret 5678
```


## Construido con 🛠️

_Herramientas usadas_

* [NodeJs](https://nodejs.org/es/download/) - Tecnología usada.
* [VisualCode](https://code.visualstudio.com/download) - Editor de código fuente.
* [Serverless](https://rometools.github.io/rome/) - Framework usado.
* [DynamoDB] (https://aws.amazon.com/es/dynamodb/) - Base de datos NoSQL de AWS.
* [AWS] (https://aws.amazon.com/es/) - Tecnología en nube.

## Versionado 📌

Se usa GitHub para el versionamiento https://github.com/007rasec/aws-rest-api-swapi.git.


## Autores ✒️

* **César Medina Romero** - *Trabajo Inicial y documentación* - [007rasec](https://github.com/007rasec)

---