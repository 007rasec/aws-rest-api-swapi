'user strict'

const AWS = require('aws-sdk');
const uuid = require('uuid');
const fetch_ = require('node-fetch');
const { IoTJobsDataPlane } = require('aws-sdk');
const mapper = require('./utils/mapper/peopleMapper');
const IS_OFFLINE = process.env.IS_OFFLINE;

let dynamoDB;

if(IS_OFFLINE === 'true'){
  dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  });
} else {
  dynamoDB = new AWS.DynamoDB.DocumentClient();
}

module.exports.crearPeople = (event, context, callback) => {
    const datetime = new Date().toISOString();
    const data = JSON.parse(event.body);

    const params = {
        TableName: 'people',
        Item: {
            id: uuid.v1(),
            nombre: data.nombre,
            genero: data.genero,
            peliculas: data.peliculas,
            color_ojos: data.color_ojos,
            color_cabello: data.color_cabello,
            color_piel: data.color_piel,
            altura: data.altura,
            peso: data.peso,
            planeta: data.planeta,
            especie: data.especie,
            nave: data.naves,
            vehiculo: data.vehiculo,
            url: data.url,
            fecha_nacimiento: data.fecha_nacimiento,
            fecha_creacion: datetime,
            fecha_edicion: datetime        
        }
    };

    dynamoDB.put(params, (error, data) => {
        if(error) {
            console.error("error de insert");
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 201,
            body: JSON.stringify(data.Items)
        }
        callback(null, response);
    })
}

module.exports.listarPeople = (event, context, callback) => {
    const params = {
        TableName: 'people'
    };

    dynamoDB.scan(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        };

        callback(null, response);
    });
}

/*
module.exports.obtenerPeople =  async (event, context, callback) => {

    const id = event.pathParameters.id;

    var params = {
        TableName: 'people',
        Key: {
          id: id
        }        
      };
    console.log('dynamoDB.get');

    dynamoDB.get(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        };
        console.error(data.Item);
        if(!data.Item){
            const endpoint = `${process.env.SWAPI_URL}/people/${id}/?format=json`
            let jsonResponse = {};
            console.log('endpoint');
            console.log(endpoint);
            
            fetch_(endpoint)
                .then( (res) => res.json())
                .then( (json) => jsonResponse = json)
                .catch(error => console.log(error));

            response = {
                statusCode: 200,
                body: JSON.stringify(jsonResponse)
            };
            console.log(jsonResponse);
            console.log('if callback');
            callback(null, response);
        } else {
            console.log('else callback');
            callback(null, response);
        }
        
    });
}
*/

module.exports.obtenerPeople =  async (event, context, callback) => {

    const id = event.pathParameters.id;

    var params = {
        TableName: 'people',
        Key: {
          id: id
        }        
      };

    let response = {};
    await dynamoDB.get(params, (error, data) => {
        if(error) {
            console.error(error);
            response = {
                statusCode: 400,
                body: JSON.stringify(error)
            };
        }

        if(!data.Item){
            const endpoint = `${process.env.SWAPI_URL}/people/${id}/?format=json`
            response = fetch_(endpoint)
                .then(
                    function(u){ return u.json();}
                )
                .then(json => {
                    console.log(mapper.transformKeys(json))
                    return {
                        statusCode: 200,
                        body: JSON.stringify(mapper.transformKeys(json))
                    }
                });
        } else {
            response = {
                statusCode: 200,
                body: JSON.stringify(data.Item)
            };
            return response;
        }
    }).promise();
    return response;
}

module.exports.actualizarPeople = (event, context, callback) => {
    const datetime = new Date().toISOString();
    const data = JSON.parse(event.body);
    var params = {
        TableName: 'people',
        Key: {
          id: event.pathParameters.id
        },
        UpdateExpression: "set nombre = :nombre "+
        ", genero = :genero"+
        ", peliculas = :peliculas"+
        ", color_ojos = :color_ojos"+
        ", color_cabello = :color_cabello"+
        ", color_piel = :color_piel"+
        ", altura = :altura"+
        ", peso = :peso"+
        ", planeta = :planeta"+
        ", especie = :especie"+
        ", nave = :nave"+
        ", vehiculo = :vehiculo"+
        ", url = :url"+
        ", fecha_nacimiento = :fecha_nacimiento",
        ExpressionAttributeValues:{
            ":nombre": data.nombre,
            ":genero": data.genero,
            ":peliculas": data.peliculas,
            ":color_ojos": data.color_ojos,
            ":color_cabello": data.color_cabello,
            ":color_piel": data.color_piel,
            ":altura": data.altura,
            ":peso": data.peso,
            ":planeta": data.planeta,
            ":especie": data.especie,
            ":nave": data.nave,
            ":vehiculo": data.vehiculo,
            ":url": data.url,
            ":fecha_nacimiento": data.fecha_nacimiento,
        },
        ReturnValues:"UPDATED_NEW"     
      };

    dynamoDB.update(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        };

        callback(null, response);
    });
}

module.exports.eliminarPeople = (event, context, callback) => {
    const datetime = new Date().toISOString();
    const data = JSON.parse(event.body);

    var params = {
        TableName: 'people',
        Key: {
          id: event.pathParameters.id
        },
        ConditionExpression: " id = :id",
        ExpressionAttributeValues:{
            ":id": event.pathParameters.id
        },
      };

    dynamoDB.delete(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        };

        callback(null, response);
    });
}