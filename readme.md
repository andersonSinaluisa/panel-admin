# Probulon API

rutas publicas:
-localidades-provincias-es `http://80.240.126.227:3000/public/localidades-provincias-es.csv`

## **Consultas HTTP**

## Dispositivos

### Agregar dispositivo

**POST** `http://80.240.126.227:3000/device`

Request

    {
        id: id,
        type: type,
        installation: installation
    }

Response

    {
        code: code
        status: status,
        message: message
    }

| Nombre                 | Valor  | Descripcion                     |
| ---------------------- | ------ | ------------------------------- |
| **id**           | numero | _ID del dispositivo en micro_ |
| **type**         | texto  | _Tipo de dispositivo_         |
| **installation** | texto  | _ID de la instalacion_        |

### Obtener dispositivos

**GET** `http://80.240.126.227:3000/device`

Response

    {
        code: code
        status: status,
        message:{
            _id: _id,
            id: id,
            alive: {
                alive: alive,
                updatedAt: updatedAt
            },
            state: state,
            type: type
            stateM1: stateM1,
            stateM2: stateM2,
            stateSL: stateSL,
            stateCB: stateCB,
            stateF1: stateF1,
            stateF2: stateF2,
            stateF3: stateF3,
            stateSan: stateSan,
            stateSV: stateSV,
            stateST: stateST,
            stateSauxn: stateSauxn,
            stateSIM: stateSIM,
            stateWiFi: stateWiFi,
            stateBLE: stateBLE,
            stateGSM: stateGSM,
            elementBuzzer: elementBuzzer,
            elementLEDEstado: elementLEDEstado,
            elementWifi: elementWifi,
            elementBLE: elementBLE,
            elementSensorTemperatura: elementSensorTemperatura,
            elementGSM: elementGSM,
            elementLlamada: elementLlamada,
            elementMandoRF: elementMandoRF,
            puerta: puerta,
            alarmaCelular: alarmaCelular,
            alimentacion: alimentacion,
            bateria: bateria,
            actuacionesEnBateria: actuacionesEnBateria,
            actuacionesTotales: actuacionesTotales,
        },
     }

| Nombre                             | Valor         | Descripcion                     |
| ---------------------------------- | ------------- | ------------------------------- |
| **code**                     | 200-500       | _Codigo de estado_            |
| **status**                   | error success | _Estado de la respuesta_      |
| **\_id**                     | texto         | _ID del dispositivo_          |
| **id**                       | numero        | _ID del dispositivo en micro_ |
| **alive.alive**              | boolean       | _Alive_                       |
| **alive.updatedAt**          | Date          | _Last alive_                  |
| **type**                     | texto         | _tipo de dispositivo_         |
| **puerta**                   | 1             | _Puerta abierta_              |
|                                    | 2             | _Puerta cerrada_              |
| **alarmaCelular**            | 1             | _Alarma Celular ON_           |
|                                    | 2             | _Alarma Celular OFF_          |
| **actuacionesEnBateria**     | numero        | _Nro. actuaciones en bateria_ |
| **actuacionesTotales**       | numero        | _Nro. actuaciones Totales_    |
| **alimentacion**             | 1             | _Linea_                       |
|                                    | 2             | _Bateria_                     |
| **bateria**                  | 1             | _Nivel de bateria 75%_        |
|                                    | 2             | _Nivel de bateria 50%_        |
|                                    | 3             | _Nivel de bateria 30%_        |
|                                    | 4             | _Nivel de bateria 20%_        |
| **state**                    | 1             | _Armado_                      |
|                                    | 2             | _Desarmado_                   |
|                                    | 3             | _Dormir_                      |
|                                    | 4             | _Bloqueado_                   |
|                                    | 5             | _Apagado_                     |
|                                    | 6             | Autocierre                      |
|                                    | 7             | _Antipánico_                 |
|                                    | 8             | _Antibaby_                    |
| **stateM1**                  | numero        | _estado M1_                   |
| **stateM2**                  | numero        | _estado M2_                   |
| **stateSL**                  | numero        | _estado SL_                   |
| **stateCB**                  | numero        | _estado CB_                   |
| **stateF1**                  | numero        | _estado F1_                   |
| **stateF2**                  | numero        | _estado F2_                   |
| **stateF3**                  | numero        | _estado F3_                   |
| **stateSan**                 | numero        | _estado San_                  |
| **stateSV**                  | numero        | _estado SV_                   |
| **stateST**                  | numero        | _estado ST_                   |
| **stateSauxn**               | numero        | _estado Sauxn_                |
| **stateSIM**                 | numero        | _estado SIM_                  |
| **stateWiFi**                | numero        | _estado WiFi_                 |
| **stateBLE**                 | numero        | _estado BLE_                  |
| **stateGSM**                 | numero        | _estado GSM_                  |
| **elementBuzzer**            | numero        | _De 1 a 100_                  |
| **elementLEDEstado**         | 0             | _Desactivado_                 |
|                                    | 1             | _Activado_                    |
| **elementWiFi**              | 0             | _Desactivado_                 |
|                                    | 1             | _Activado_                    |
| **elementBLE**               | 0             | _Desactivado_                 |
|                                    | 1             | _Activado_                    |
| **elementSensorTemperatura** | 0             | _De 1 a 100_                  |
| **elementGSM**               | 0             | _Desactivado_                 |
|                                    | 1             | _Activado_                    |
| **elementLlamada**           | 0             | _Desactivado_                 |
|                                    | 1             | _Activado_                    |
| **elementMandoRF**           | 0             | _Desactivado_                 |
|                                    | 1             | _Activado_                    |

### Obtener dispositivos por ID

**GET** `http://80.240.126.227:3000/device/:_id`

Response

    {
        code: code
        status: status,
        message: [
             {
                _id: _id,
                id: id,
                alive: {
                    alive: alive,
                    updatedAt: updatedAt
                },
                state: state,
                type: type
                stateM1: stateM1,
                stateM2: stateM2,
                stateSL: stateSL,
                stateCB: stateCB,
                stateF1: stateF1,
                stateF2: stateF2,
                stateF3: stateF3,
                stateSan: stateSan,
                stateSV: stateSV,
                stateST: stateST,
                stateSauxn: stateSauxn,
                stateSIM: stateSIM,
                stateWiFi: stateWiFi,
                stateBLE: stateBLE,
                stateGSM: stateGSM,
                elementBuzzer: elementBuzzer,
                elementLEDEstado: elementLEDEstado,
                elementWifi: elementWifi,
                elementBLE: elementBLE,
                elementSensorTemperatura: elementSensorTemperatura,
                elementGSM: elementGSM,
                elementLlamada: elementLlamada,
                elementMandoRF: elementMandoRF,
                puerta: puerta,
                alarmaCelular: alarmaCelular,
                alimentacion: alimentacion,
                bateria: bateria,
                actuacionesEnBateria: actuacionesEnBateria,
                actuacionesTotales: actuacionesTotales,
            },
         ]
     }

| Nombre                             | Valor         | Descripcion                     |
| ---------------------------------- | ------------- | ------------------------------- |
| **code**                     | 200-500       | _Codigo de estado_            |
| **status**                   | error success | _Estado de la respuesta_      |
| **\_id**                     | texto         | _ID del dispositivo_          |
| **id**                       | numero        | _ID del dispositivo en micro_ |
| **alive.alive**              | boolean       | _Alive_                       |
| **alive.updatedAt**          | Date          | _Last alive_                  |
| **type**                     | texto         | _tipo de dispositivo_         |
| **puerta**                   | 1             | _Puerta abierta_              |
|                                    | 2             | _Puerta cerrada_              |
| **alarmaCelular**            | 1             | _Alarma Celular ON_           |
|                                    | 2             | _Alarma Celular OFF_          |
| **actuacionesEnBateria**     | numero        | _Nro. actuaciones en bateria_ |
| **actuacionesTotales**       | numero        | _Nro. actuaciones Totales_    |
| **alimentacion**             | 1             | _Linea_                       |
|                                    | 2             | _Bateria_                     |
| **bateria**                  | 1             | _Nivel de bateria 75%_        |
|                                    | 2             | _Nivel de bateria 50%_        |
|                                    | 3             | _Nivel de bateria 30%_        |
|                                    | 4             | _Nivel de bateria 20%_        |
| **state**                    | 1             | _Armado_                      |
|                                    | 2             | _Desarmado_                   |
|                                    | 3             | _Dormir_                      |
|                                    | 4             | _Bloqueado_                   |
|                                    | 5             | _Apagado_                     |
|                                    | 6             | Autocierre                      |
|                                    | 7             | _Antipánico_                 |
|                                    | 8             | _Antibaby_                    |
| **stateM1**                  | numero        | _estado M1_                   |
| **stateM2**                  | numero        | _estado M2_                   |
| **stateSL**                  | numero        | _estado SL_                   |
| **stateCB**                  | numero        | _estado CB_                   |
| **stateF1**                  | numero        | _estado F1_                   |
| **stateF2**                  | numero        | _estado F2_                   |
| **stateF3**                  | numero        | _estado F3_                   |
| **stateSan**                 | numero        | _estado San_                  |
| **stateSV**                  | numero        | _estado SV_                   |
| **stateST**                  | numero        | _estado ST_                   |
| **stateSauxn**               | numero        | _estado Sauxn_                |
| **stateSIM**                 | numero        | _estado SIM_                  |
| **stateWiFi**                | numero        | _estado WiFi_                 |
| **stateBLE**                 | numero        | _estado BLE_                  |
| **stateGSM**                 | numero        | _estado GSM_                  |
| **elementBuzzer**            | numero        | _De 1 a 100_                  |
| **elementLEDEstado**         | 0             | _Desactivado_                 |
|                                    | 1             | _Activado_                    |
| **elementWiFi**              | 0             | _Desactivado_                 |
|                                    | 1             | _Activado_                    |
| **elementBLE**               | 0             | _Desactivado_                 |
|                                    | 1             | _Activado_                    |
| **elementSensorTemperatura** | 0             | _De 1 a 100_                  |
| **elementGSM**               | 0             | _Desactivado_                 |
|                                    | 1             | _Activado_                    |
| **elementLlamada**           | 0             | _Desactivado_                 |
|                                    | 1             | _Activado_                    |
| **elementMandoRF**           | 0             | _Desactivado_                 |
|                                    | 1             | _Activado_                    |

### Actualizar elemento de dispositivo

**PUT** `http://80.240.126.227:3000/device/:_id`

Request

    {
        estado: estado,
        valor: valor
    }

Response

    {
        code: code
        status: status,
        message: message
    }

| Nombre           | Valor  | Descripcion                        |
| ---------------- | ------ | ---------------------------------- |
| **\_id**   | numero | _ID del dispositivo_             |
| **estado** | 1      | _Buzzer_                         |
|                  | 2      | _LED de estado_                  |
|                  | 3      | _Conexión WiFi_                 |
|                  | 4      | _Conexión BLE_                  |
|                  | 5      | _Sensor de temperatura_          |
|                  | 6      | _Conexión GSM_                  |
|                  | 7      | _Llamada_                        |
|                  | 8      | _Mando RF_                       |
| **valor**  | numero | _1 (activado) o 0 (desactivado)_ |
|                  |        | _1 a 100 en buzzer y ST_         |

### Actuador M1

**POST** `http://80.240.126.227:3000/device/:_id/M1`

Response

    {
        code: code
        status: status,
        message: message
    }

| Nombre          | Valor  | Descripcion            |
| --------------- | ------ | ---------------------- |
| **\_id**  | numero | _ID del dispositivo_ |
| **valor** | 0 1    | _0 abajo, 1 arriba_  |

### Actuador M2

**POST** `http://80.240.126.227:3000/device/:_id/M2`

Response

    {
        code: code
        status: status,
        message: message
    }

| Nombre          | Valor  | Descripcion            |
| --------------- | ------ | ---------------------- |
| **\_id**  | numero | _ID del dispositivo_ |
| **valor** | 0 1    | _0 abajo, 1 arriba_  |

### Eliminar dispositivo

**DELETE** `http://80.240.126.227:3000/device/delete/:id`

Response

    {
        status: status,
        message: message
    }

| Nombre       | Valor  | Descripcion            |
| ------------ | ------ | ---------------------- |
| **id** | numero | _ID del dispositivo_ |

## Instalacion

### Agregar instalacion

**POST** `http://80.240.126.227:3000/installations`

Request

    {
        name: name,
        owner: owner,
        postalCode: postalCode,
        location: location,
        province: province,
        country: country,
        note: note
    }

Response

    {
        status: status,
        message: message
    }

| Nombre               | Valor | Descripcion                         |
| -------------------- | ----- | ----------------------------------- |
| **name**       | texto | _Nombre de la instalacion_        |
| **owner**      | texto | _ID del dueño de la instalacion_ |
| **postalCode** | texto | _Codigo postal_                   |
| **location**   | texto | _Localidad_                       |
| **province**   | texto | _Provincia_                       |
| **country**    | texto | _Pais_                            |
| **note**       | texto | _Notas_                           |

### Obtener instalaciones

**GET** `http://80.240.126.227:3000/installations/`

Response

* [ ] 
      {
          code: code
          status: status,
          message: [
              {
                  _id: _id,
                  identityCounter: identityCounter
                  name: name,
                  owner: owner,
                  postalCode: postalCode,
                  location: location,
                  province: province,
                  country: country,
                  note: note,
                  devices: devices,
                  users: [
                      {
                          id: id, role: role
                      }
                  ],
                  created_at: created_at
              }
          ]
      }

| Nombre                    | Valor | Descripcion                                 |
| ------------------------- | ----- | ------------------------------------------- |
| **\_id**            | texto | _ID de la instalacion_                    |
| **identityCounter** | texto | _Contador de identidad_                   |
| **name**            | texto | _Nombre de la instalacion_                |
| **owner**           | texto | _ID del dueño de la instalacion_         |
| **postalCode**      | texto | _Codigo postal_                           |
| **location**        | texto | _Localidad_                               |
| **province**        | texto | _Provincia_                               |
| **country**         | texto | _Pais_                                    |
| **note**            | texto | _Notas_                                   |
| **devices**         | texto | _Array de dispositivos de la instalacion_ |
| **users**           | texto | _Array de usuarios de la instalacion_     |
| **users.id**        | texto | _ID del cliente_                          |
| **users.role**      | texto | _Rol en la instalacion_                   |
| **created_at**      | texto | _Fecha de creacion_                       |

### Obtener instalacion por ID

**GET** `http://80.240.126.227:3000/installations/:id`

Response

    {
        code: code
        status: status,
        message: {
            _id: _id,
            identityCounter: identityCounter,
            name: name,
            owner: owner,
            postalCode: postalCode,
            location: location,
            province: province,
            country: country,
            note: note,
            devices: devices,
            devices: devices,
            users: [
                {
                    id: id, role: role
                }
            ],
            created_at: created_at
        }
    }

| Nombre                    | Valor | Descripcion                                 |
| ------------------------- | ----- | ------------------------------------------- |
| **id**              | texto | _ID de la instalacion_                    |
| **\_id**            | texto | _ID de la instalacion_                    |
| **identityCounter** | texto | _Contador de identidad_                   |
| **name**            | texto | _Nombre de la instalacion_                |
| **owner**           | texto | _ID del dueño de la instalacion_         |
| **postalCode**      | texto | _Codigo postal_                           |
| **location**        | texto | _Localidad_                               |
| **province**        | texto | _Provincia_                               |
| **country**         | texto | _Pais_                                    |
| **note**            | texto | _Notas_                                   |
| **devices**         | texto | _Array de dispositivos de la instalacion_ |
| **users**           | texto | _Array de usuarios de la instalacion_     |
| **users.id**        | texto | _ID del cliente_                          |
| **users.role**      | texto | _Rol en la instalacion_                   |
| **created_at**      | texto | _Fecha de creacion_                       |

### Obtener instalacion por cliente

**GET** `http://80.240.126.227:3000/installations/client/:id`

Response

    {
        status: status,
        message: [
            {
                _id: _id,
                identityCounter: identityCounter,
                name: name,
                owner: owner,
                postalCode: postalCode,
                location: location,
                province: province,
                country: country,
                note: note,
                devices: devices,
                users: [
                    {
                        id: id, role: role
                    }
                ],
                created_at: created_at
            },
        ]
    }

| Nombre                    | Valor | Descripcion                                 |
| ------------------------- | ----- | ------------------------------------------- |
| **id**              | texto | _ID del cliente_                          |
| **\_id**            | texto | _ID de la instalacion_                    |
| **identityCounter** | texto | _Contador de identidad_                   |
| **name**            | texto | _Nombre de la instalacion_                |
| **owner**           | texto | _ID del dueño de la instalacion_         |
| **postalCode**      | texto | _Codigo postal_                           |
| **location**        | texto | _Localidad_                               |
| **province**        | texto | _Provincia_                               |
| **country**         | texto | _Pais_                                    |
| **note**            | texto | _Notas_                                   |
| **devices**         | texto | _Array de dispositivos de la instalacion_ |
| **users**           | texto | _Array de usuarios de la instalacion_     |
| **users.id**        | texto | _ID del cliente_                          |
| **users.role**      | texto | _Rol en la instalacion_                   |
| **created_at**      | texto | _Fecha de creacion_                       |

### Estado instalacion

**GET** `http://80.240.126.227:3000/installations/state/:id`

Response

    {
        status: status,
        message: {
            state: state
        }
    }

| Nombre           | Valor         | Descripcion                |
| ---------------- | ------------- | -------------------------- |
| **id**     | texto         | _ID de la instalacion_   |
| **code**   | 200-500       | _Codigo de estado_       |
| **status** | error success | _Estado de la respuesta_ |
| **state**  | 1             | _Armado_                 |
|                  | 2             | _Desarmado_              |
|                  | 3             | _Dormir_                 |
|                  | 4             | _Bloqueado_              |
|                  | 5             | _Apagado_                |
|                  | 6             | Autocierre                 |
|                  | 7             | _Antipánico_            |
|                  | 8             | _Antibaby_               |

### Actualizar estado instalacion

**PUT** `http://80.240.126.227:3000/installations/state/:id`

Request

    {
        state: state
    }

Response

    {
        status: status,
        message: message
    }

| Nombre          | Valor | Descripcion              |
| --------------- | ----- | ------------------------ |
| **id**    | texto | _ID de la instalacion_ |
| **state** | 1     | _Armado_               |
|                 | 2     | _Desarmado_            |
|                 | 3     | _Dormir_               |
|                 | 4     | _Bloqueado_            |
|                 | 5     | _Apagado_              |
|                 | 6     | Autocierre               |
|                 | 7     | _Antipánico_          |
|                 | 8     | _Antibaby_             |

### Eliminar instalacion

**DELETE** `http://80.240.126.227:3000/installations/delete/:id`
Response

    }
        status: status,
        message: message
    }

| Nombre       | Valor | Descripcion              |
| ------------ | ----- | ------------------------ |
| **id** | texto | _ID de la instalacion_ |

## Esenarios

### Agregar Esenarios

**POST** `http://80.240.126.227:3000/scenarios`

Request

    {
        name: name,
        timeStart: timeStart,
        timeEnd: timeEnd,
    actions: [
            {
                device: device,
                state: state,
            }
        ],
        installation: installation,
        note: note
    }

Response

    {
        status: status,
        message: message
    }

| Nombre                   | Valor | Descripcion                |
| ------------------------ | ----- | -------------------------- |
| **name**           | texto | _Nombre del esenario_    |
| **timeStart**      | Date  | _Tiempo de inicio_       |
| **timeEnd**        | texto | _Tiempo de final_        |
| **actions**        | Array | _Array de acciones_      |
| **actions.device** | Array | _ID del dispositivo_     |
| **actions.state**  | Array | _Estado del dispositivo_ |
| **installation**   | texto | _ID de la instalacion_   |
| **note**           | texto | _Notas_                  |

### Obtener esenarios

**GET** `http://80.240.126.227:3000/scenarios`

Response

    {
        status: status,
        message: [
            {
                _id: _id,
                name: name,
                state: state,
                forced: forced,
                timeStart: timeStart,
                timeEnd: timeEnd,
    actions: [
                    {
                        device: device,
                        state: state,
                    }
                ],
                installation: installation,
                note: note,
                createdAt: createdAt
            },
        ]
    }

| Nombre                   | Valor  | Descripcion                |
| ------------------------ | ------ | -------------------------- |
| **\_id**           | texto  | _ID de la esenario_      |
| **name**           | texto  | _Nombre del esenario_    |
| **state**          | Bool   | _Estado del esenario_    |
| **forced**         | Bool   | _Forzado_                |
| **timeStart**      | Date   | _Tiempo de inicio_       |
| **timeEnd**        | Date   | _Tiempo de final_        |
| **actions**        | Array  | _Array de acciones_      |
| **actions.device** | texto  | _ID del dispositivo_     |
| **actions.state**  | numero | _Estado del dispositivo_ |
| **installation**   | texto  | _ID de la instalacion_   |
| **note**           | texto  | _Notas_                  |
| **createdAt**      | texto  | _Fecha de creacion_      |

### Obtener instalacion por ID

**GET** `http://80.240.126.227:3000/scenarios/:id`

Response

    {
        code: code
        status: status,
        message: {
            _id: _id,
            name: name,
            state: state,
            forced: forced,
            timeStart: timeStart,
            timeEnd: timeEnd,
    actions: [
                {
                    device: device,
                    state: state,
                }
            ],
            installation: installation,
            note: note,
            createdAt: createdAt
        }
    }

| Nombre                   | Valor  | Descripcion                |
| ------------------------ | ------ | -------------------------- |
| **\_id**           | texto  | _ID de la esenario_      |
| **name**           | texto  | _Nombre del esenario_    |
| **state**          | Bool   | _Estado del esenario_    |
| **forced**         | Bool   | _Forzado_                |
| **timeStart**      | Date   | _Tiempo de inicio_       |
| **timeEnd**        | Date   | _Tiempo de final_        |
| **actions**        | Array  | _Array de acciones_      |
| **actions.device** | texto  | _ID del dispositivo_     |
| **actions.state**  | numero | _Estado del dispositivo_ |
| **installation**   | texto  | _ID de la instalacion_   |
| **note**           | texto  | _Notas_                  |
| **createdAt**      | texto  | _Fecha de creacion_      |

### Actualizar esenario

**PUT** `http://80.240.126.227:3000/scenarios/update/:id`

Request

    {
        name: name,
        timeStart: timeStart,
        timeEnd: timeEnd,
    actions: [
            {
                device: device,
                state: state,
            }
        ],
        note: note
    }

Response

    {
        status: status,
        message: message
    }

| Nombre                   | Valor  | Descripcion                |
| ------------------------ | ------ | -------------------------- |
| **id**             | texto  | _ID de la esenario_      |
| **name**           | texto  | _Nombre del esenario_    |
| **timeStart**      | Date   | _Tiempo de inicio_       |
| **timeEnd**        | Date   | _Tiempo de final_        |
| **actions**        | Array  | _Array de acciones_      |
| **actions.device** | texto  | _ID del dispositivo_     |
| **actions.state**  | numero | _Estado del dispositivo_ |
| **note**           | texto  | _Notas_                  |

### Activar esenario

**PUT** `http://80.240.126.227:3000/scenarios/active/:id`
Response

    }
        status: status,
        message: message
    }

| Nombre       | Valor | Descripcion         |
| ------------ | ----- | ------------------- |
| **id** | texto | _ID del esenario_ |

### Desactivar esenario

**PUT** `http://80.240.126.227:3000/scenarios/inactive/:id`
Response

    }
        status: status,
        message: message
    }

| Nombre       | Valor | Descripcion         |
| ------------ | ----- | ------------------- |
| **id** | texto | _ID del esenario_ |

### Forzar esenario

**PUT** `http://80.240.126.227:3000/scenarios/force/:id`
Response

    }
        status: status,
        message: message
    }

| Nombre       | Valor | Descripcion         |
| ------------ | ----- | ------------------- |
| **id** | texto | _ID del esenario_ |

### Desforzar esenario

**PUT** `http://80.240.126.227:3000/scenarios/unforce/:id`
Response

    }
        status: status,
        message: message
    }

| Nombre       | Valor | Descripcion         |
| ------------ | ----- | ------------------- |
| **id** | texto | _ID del esenario_ |

### Eliminar esenario

**DELETE** `http://80.240.126.227:3000/scenarios/delete/:id`
Response

    }
        status: status,
        message: message
    }

| Nombre       | Valor | Descripcion         |
| ------------ | ----- | ------------------- |
| **id** | texto | _ID del esenario_ |

## Notificaciones

### Obtener notificaciones

**GET** `http://80.240.126.227:3000/notifications`

query

| Nombre         | Valor | Descripcion      |
| -------------- | ----- | ---------------- |
| **type** | 1     | _Notificacion_ |
|                | 2     | _Alarma_       |
| **all**  |       | _Todas_        |

    {
        status: status,
        message: [
             {
                _id: _id,
                type: type,
                name: name,
                description: description,
                installation: installation,
                createdAt: createdAt
            },
         ]
     }

| Nombre                 | Valor | Descripcion                        |
| ---------------------- | ----- | ---------------------------------- |
| **\_id**         | texto | _ID de la notificacion_          |
| **type**         | 1     | _Notificacion_                   |
|                        | 2     | _Alarma_                         |
| **name**         | texto | _Nombre de la notificacion_      |
| **description**  | texto | _Descripcion de la notificacion_ |
| **installation** | texto | _ID de la instalacion_           |
| **created_at**   | fecha | _Fecha de creacion_              |

### Obtener notificacion por ID

**GET** `http://80.240.126.227:3000/notifications/:id`

    {
        status: status,
        message: {
            _id: _id,
            type: type,
            name: name,
            description: description,
            installation: installation,
            createdAt: createdAt
        },
     }

| Nombre                 | Valor | Descripcion                        |
| ---------------------- | ----- | ---------------------------------- |
| **\_id**         | texto | _ID de la notificacion_          |
| **id**           | texto | _ID de la notificacion_          |
| **type**         | 1     | _Notificacion_                   |
|                        | 2     | _Alarma_                         |
| **name**         | texto | _Nombre de la notificacion_      |
| **description**  | texto | _Descripcion de la notificacion_ |
| **installation** | texto | _ID de la instalacion_           |
| **created_at**   | fecha | _Fecha de creacion_              |

### Obtener notificaciones por instalacion

**GET** `http://80.240.126.227:3000/notifications/installation/:id`

query

| Nombre         | Valor | Descripcion      |
| -------------- | ----- | ---------------- |
| **type** | 1     | _Notificacion_ |
|                | 2     | _Alarma_       |
| **all**  |       | _Todas_        |

    {
        status: status,
        message: [
             {
                _id: _id,
                type: type,
                name: name,
                description: description,
                installation: installation,
                createdAt: createdAt
            },
         ]
     }

| Nombre                 | Valor | Descripcion                        |
| ---------------------- | ----- | ---------------------------------- |
| **\_id**         | texto | _ID de la notificacion_          |
| **id**           | texto | _ID de la instalacion_           |
| **type**         | 1     | _Notificacion_                   |
|                        | 2     | _Alarma_                         |
| **name**         | texto | _Nombre de la notificacion_      |
| **description**  | texto | _Descripcion de la notificacion_ |
| **installation** | texto | _ID de la instalacion_           |
| **createdAt**    | fecha | _Fecha de creacion_              |

### Elmiminar notificacion

**DELETE** `http://80.240.126.227:3000/notifications/delete/:id`

Response

    {
        status: status,
        message: message
    }

| Nombre       | Valor  | Descripcion               |
| ------------ | ------ | ------------------------- |
| **id** | numero | _ID de la notificacion_ |

## Usuarios

### Registrar

**POST** `http://80.240.126.227:3000/users/register`

Request

    {
        email: email,
        password: password,
        role: role,
    }

Response

    {
        status: status,
        message: message
    }

| Nombre             | Valor | Descripcion                             |
| ------------------ | ----- | --------------------------------------- |
| **email**    | texto | _Correo electronico_                  |
| **password** | texto | _Contraseña_                         |
| **role**     | texto | _Rol del usuario (personal, cliente)_ |

### Login

**POST** `http://80.240.126.227:3000/users/login`

Request

    {
        email: email,
        password: password,
    }

Response

    {
        status: status,
        message: token
    }

| Nombre             | Valor | Descripcion            |
| ------------------ | ----- | ---------------------- |
| **email**    | texto | _Correo electronico_ |
| **password** | texto | _Contraseña_        |
| **token**    | texto | _Token de sesion_    |

### Obtener usuarios

**GET** `http://80.240.126.227:3000/users`

Response

    {
        status: status,
        message: [
            {
                _id: _id,
                identityCounter: identityCounter,
                email: email,
                role: role,
                personalData: personalData
                created_at: created_at
            }
        ]
    }

| Nombre                    | Valor | Descripcion                            |
| ------------------------- | ----- | -------------------------------------- |
| **\_id**            | texto | _ID de usuario_                      |
| **identityCounter** | texto | _Contador de identidad_              |
| **email**           | texto | _Correo electronico_                 |
| **role**            | texto | _Rol del usuario (personal, client)_ |
| **personalData**    | texto | _ID de los datos personales_         |
| **createdAt**       | texto | _Fecha de creacion_                  |

### Obtener usuario por ID

**GET** `http://80.240.126.227:3000/users/:_id`

Response

    {
        status: status,
        message: {
            _id: _id,
            identityCounter: identityCounter,
            email: email,
            role: role,
            personalData: personalData
            created_at: created_at
        }
    }

| Nombre                    | Valor | Descripcion                            |
| ------------------------- | ----- | -------------------------------------- |
| **\_id**            | texto | _ID de usuario_                      |
| **identityCounter** | texto | _Contador de identidad_              |
| **email**           | texto | _Correo electronico_                 |
| **role**            | texto | _Rol del usuario (personal, client)_ |
| **personalData**    | texto | _ID de los datos personales_         |
| **created_at**      | texto | _Fecha de creacion_                  |

### Actualizar contraseña de usuario

**PUT** `http://80.240.126.227:3000/users/update-pass/:_id`

Request

    {
        password: password
    }

Response

    {
        status: status,
        message: message
    }

| Nombre             | Valor | Descripcion       |
| ------------------ | ----- | ----------------- |
| **\_id**     | texto | _ID de usuario_ |
| **password** | texto | _Contraseña_   |

### Eliminar usuario

**DELETE** `http://80.240.126.227:3000/users/delete/:_id`

Response

    {
        status: status,
        message: message
    }

| Nombre         | Valor | Descripcion       |
| -------------- | ----- | ----------------- |
| **\_id** | texto | _ID de usuario_ |

## Clientes

### Agregar cliente

**POST** `http://80.240.126.227:3000/client`

Request

    {
        userId: userId,
        personType: personType,
        documentType: documentType,
        document: document,
        name: name,
        lastname: lastname,
        customerType,
        roadType: roadType,
        direction: direction,
        postalCode: postalCode,
        location: location,
        province: province,
        country: country,
        phone: phone,
        mobilePhone: mobilePhone,
        contact: contact,
        contact2: contact2,
        email: email,
        webpage: webpage,
        contactSchedule: contactSchedule,
        discount: discount,
        note: note,
    }

Response

    {
        status: status,
        message: message
    }

| Nombre                    | Valor  | R  | Descripcion                                              |
| ------------------------- | ------ | -- | -------------------------------------------------------- |
| **userId**          | texto  | \* | _ID del usuario_                                       |
| **personType**      | texto  |    | _Tipo de persona (fisica, juridica)_                   |
| **documentType**    | texto  |    | _Tipo de documento (DNI, pasaporte, otro)_             |
| **document**        | texto  |    | _Documento_                                            |
| **name**            | texto  | \* | _Nombre del cliente_                                   |
| **lastname**        | texto  |    | _Apellido_ del cliente_                                |
| **roadType**        | texto  |    | _Tipo de via (calle, avenida, carretera, plaza, otro)_ |
| **direction**       | texto  |    | _Direccion_                                            |
| **postalCode**      | texto  |    | _Codigo postal_                                        |
| **location**        | texto  |    | _Localidad_                                            |
| **province**        | texto  |    | _Provincia_                                            |
| **country**         | texto  |    | _Pais_                                                 |
| **phone**           | texto  |    | _Telefono_                                             |
| **mobilePhone**     | texto  |    | _Telefono movil_                                       |
| **contact**         | texto  |    | _Contacto_                                             |
| **contact2**        | texto  |    | _Contacto 2_                                           |
| **email**           | texto  |    | _Correo electronico_                                   |
| **webpage**         | texto  |    | _Pagina web_                                           |
| **contactSchedule** | texto  |    | _Horario de contacto_                                  |
| **discount**        | numero |    | _Porcentaje de descuento_                              |
| **note**            | texto  |    | _Notas_                                                |
| **message**         | texto  |    | _ID del cliente creado o mensaje de error_             |

### Obtener clientes

**GET** `http://80.240.126.227:3000/client`

Response

    {
        status: status,
        message: [
            {
                _id: _id,
                identityCounter: identityCounter,
                userId: userId,
                personType: personType,
                documentType: documentType,
                document: document,
                name: name,
                customerType,
                roadType: roadType,
                direction: direction,
                postalCode: postalCode,
                location: location,
                province: province,
                country: country,
                phone: phone,
                mobilePhone: mobilePhone,
                contact: contact,
                contact2: contact2,
                email: email,
                webpage: webpage,
                contactSchedule: contactSchedule,
                discount: discount,
                note: note,
                installations: [
                    id: id,
                    role: role,
                    permissions: [
                        {
                            id: id,
                             name: name
                        }
                    ]
                ],
                createdAt: createdAt
            }
        ]
    }

| Nombre                                   | Valor  | Descripcion                                                 |
| ---------------------------------------- | ------ | ----------------------------------------------------------- |
| **\_id**                           | texto  | _ID de cliente_                                           |
| **identityCounter**                | texto  | _Contador de identidad_                                   |
| **userId**                         | texto  | _ID de usuario_                                           |
| **personType**                     | texto  | _Tipo de persona (fisica, juridica)_                      |
| **documentType**                   | texto  | _Tipo de documento (DNI, otro)_                           |
| **document**                       | texto  | _Documento_                                               |
| **name**                           | texto  | _Nombre del cliente_                                      |
| **roadType**                       | texto  | _Tipo de via (calle, avenida, carretera, plaza, otro)_    |
| **direction**                      | texto  | _Direccion_                                               |
| **postalCode**                     | texto  | _Codigo postal_                                           |
| **location**                       | texto  | _Localidad_                                               |
| **province**                       | texto  | _Provincia_                                               |
| **country**                        | texto  | _Pais_                                                    |
| **phone**                          | texto  | _Telefono_                                                |
| **mobilePhone**                    | texto  | _Telefono movil_                                          |
| **contact**                        | texto  | _Contacto_                                                |
| **contact2**                       | texto  | _Contacto 2_                                              |
| **email**                          | texto  | _Correo electronico_                                      |
| **webpage**                        | texto  | _Pagina web_                                              |
| **contactSchedule**                | texto  | _Horario de contacto_                                     |
| **discount**                       | numero | _Porcentaje de descuento_                                 |
| **note**                           | texto  | _Notas_                                                   |
| **installations**                  | array  | _Array de instalaciones_                                  |
| **installations.id**               | texto  | _ID de instalacion_                                       |
| **installations.role**             | texto  | _Rol en instalacion (propietario, conviviente, invitado)_ |
| **installations.permissions**      | array  | _Array permisos_                                          |
| **installations.permissions.id**   | texto  | _ID de permiso_                                           |
| **installations.permissions.name** | texto  | _Nombre de permiso_                                       |
| **createdBy**                      | texto  | _ID del usuario que lo creo_                              |
| **createdAt**                      | texto  | _Fecha de creacion_                                       |

### Obtener cliente por ID

**GET** `http://80.240.126.227:3000/client/:_id`

Response

    {
        status: status,
        message: {
            _id: _id,
            identityCounter: identityCounter,
            userId: userId,
            personType: personType,
            documentType: documentType,
            document: document,
            name: name,
            customerType,
            roadType: roadType,
            direction: direction,
            postalCode: postalCode,
            location: location,
            province: province,
            country: country,
            phone: phone,
            mobilePhone: mobilePhone,
            contact: contact,
            contact2: contact2,
            email: email,
            webpage: webpage,
            contactSchedule: contactSchedule,
            discount: discount,
            note: note,
            installations: [
                id: id,
                role: role,
                permissions: [
                    {
                        id: id,
                            name: name
                    }
                ]
            ],
            createdAt: createdAt
        }
    }

| Nombre                                   | Valor  | Descripcion                                                 |
| ---------------------------------------- | ------ | ----------------------------------------------------------- |
| **\_id**                           | texto  | _ID de cliente_                                           |
| **identityCounter**                | texto  | _Contador de identidad_                                   |
| **userId**                         | texto  | _ID de usuario_                                           |
| **personType**                     | texto  | _Tipo de persona (fisica, juridica)_                      |
| **documentType**                   | texto  | _Tipo de documento (DNI, otro)_                           |
| **document**                       | texto  | _Documento_                                               |
| **name**                           | texto  | _Nombre del cliente_                                      |
| **roadType**                       | texto  | _Tipo de via (calle, avenida, carretera, plaza, otro)_    |
| **direction**                      | texto  | _Direccion_                                               |
| **postalCode**                     | texto  | _Codigo postal_                                           |
| **location**                       | texto  | _Localidad_                                               |
| **province**                       | texto  | _Provincia_                                               |
| **country**                        | texto  | _Pais_                                                    |
| **phone**                          | texto  | _Telefono_                                                |
| **mobilePhone**                    | texto  | _Telefono movil_                                          |
| **contact**                        | texto  | _Contacto_                                                |
| **contact2**                       | texto  | _Contacto 2_                                              |
| **email**                          | texto  | _Correo electronico_                                      |
| **webpage**                        | texto  | _Pagina web_                                              |
| **contactSchedule**                | texto  | _Horario de contacto_                                     |
| **discount**                       | numero | _Porcentaje de descuento_                                 |
| **note**                           | texto  | _Notas_                                                   |
| **installations**                  | array  | _Array de instalaciones_                                  |
| **installations.id**               | texto  | _ID de instalacion_                                       |
| **installations.role**             | texto  | _Rol en instalacion (Propietario, conviviente, invitado)_ |
| **installations.permissions**      | array  | _Array permisos_                                          |
| **installations.permissions.id**   | texto  | _ID de permiso_                                           |
| **installations.permissions.name** | texto  | _Nombre de permiso_                                       |
| **createdBy**                      | texto  | _ID del usuario que lo creo_                              |
| **createdAt**                      | texto  | _Fecha de creacion_                                       |

### Añadir instalacion a cliente

**PUT** `http://80.240.126.227:3000/client/:id/installation`

Request

    {
        installation: installation,
        role: role,
    }

Response

    {
        status: status,
        message: message
    }

| Nombre                 | Valor | Descripcion                     |
| ---------------------- | ----- | ------------------------------- |
| **id**           | texto | _ID del cliente_              |
| **installation** | texto | _ID de la instalacion_        |
| **role**         | texto | _Rol (conviviente, invitado)_ |

### Eliminar instalacion a cliente

**DELETE** `http://80.240.126.227:3000/client/:id/installation/delete/:Idinstallation`

Response

    {
        status: status,
        message: message
    }

| Nombre                   | Valor | Descripcion              |
| ------------------------ | ----- | ------------------------ |
| **id**             | texto | _ID del cliente_       |
| **Idinstallation** | texto | _ID de la instalacion_ |

### Actualizar permisos de instalacion de cliente

**PUT** `http://80.240.126.227:3000/client/:_id/permissions/installation/:idInstallation`

Request

    {
        permissions: [
            {
                id: id,
                nombre: nombre,
            }
        ]
    }

Response

    {
        status: status,
        message: message
    }

| Nombre                   | Valor | Descripcion              |
| ------------------------ | ----- | ------------------------ |
| **\_id**           | texto | _ID del cliente_       |
| **idInstallation** | texto | _ID de la instalacion_ |
| **id**             | texto | _ID del permiso_       |
| **nombre**         | texto | _Nombre del permiso_   |

### Actualizar datos cliente

**PUT** `http://80.240.126.227:3000/client/update/:_id`

Request

    {
            personType: personType,
            documentType: documentType,
            document: document,
            name: name,
            customerType,
            roadType: roadType,
            direction: direction,
            postalCode: postalCode,
            location: location,
            province: province,
            country: country,
            phone: phone,
            mobilePhone: mobilePhone,
            contact: contact,
            contact2: contact2,
            email: email,
            webpage: webpage,
            contactSchedule: contactSchedule,
            discount: discount,
            note: note,
    }

Response

    {
        status: status,
        message: message
    }

| Nombre                    | Valor  | Descripcion                                              |
| ------------------------- | ------ | -------------------------------------------------------- |
| **\_id**            | texto  | _ID de cliente_                                        |
| **personType**      | texto  | _Tipo de persona (fisica, juridica)_                   |
| **documentType**    | texto  | _Tipo de documento (DNI, otro)_                        |
| **document**        | texto  | _Documento_                                            |
| **name**            | texto  | _Nombre del cliente_                                   |
| **customerType**    | texto  | _Tipo de cliente (propietario, invitado)_              |
| **roadType**        | texto  | _Tipo de via (calle, avenida, carretera, plaza, otro)_ |
| **direction**       | texto  | _Direccion_                                            |
| **postalCode**      | texto  | _Codigo postal_                                        |
| **location**        | texto  | _Localidad_                                            |
| **province**        | texto  | _Provincia_                                            |
| **country**         | texto  | _Pais_                                                 |
| **phone**           | texto  | _Telefono_                                             |
| **mobilePhone**     | texto  | _Telefono movil_                                       |
| **contact**         | texto  | _Contacto_                                             |
| **contact2**        | texto  | _Contacto 2_                                           |
| **email**           | texto  | _Correo electronico_                                   |
| **webpage**         | texto  | _Pagina web_                                           |
| **contactSchedule** | texto  | _Horario de contacto_                                  |
| **discount**        | numero | _Porcentaje de descuento_                              |
| **note**            | texto  | _Notas_                                                |

### Eliminar cliente

**DELETE** `http://80.240.126.227:3000/client/delete/:_id`

Response

    {
        status: status,
        message: message
    }

| Nombre         | Valor | Descripcion       |
| -------------- | ----- | ----------------- |
| **\_id** | texto | _ID de cliente_ |

### Ver permisos de usuario cliente

**GET** `http://80.240.126.227:3000/client/permissions`

Response

    {
        status: status,
        message: [
            {
                id: id,
                nombre: nombre,
            }
        ]
    }

| Nombre           | Valor | Descripcion            |
| ---------------- | ----- | ---------------------- |
| **id**     | texto | _ID del permiso_     |
| **nombre** | texto | _Nombre del permiso_ |

## Personal

### Agregar personal

**POST** `http://80.240.126.227:3000/personal`

Request

    {
        userId: userId,
        documentType: documentType,
        document: document,
        name: name,
        type: type,
        direction: direction,
        postalCode: postalCode,
        location: location,
        province: province,
        country: country,
        phone: phone,
        mobilePhone: mobilePhone,
        contact: contact,
        contact2: contact2,
        email: email,
        contactSchedule: contactSchedule,
        note: note,
        createdBy: createdBy
    }

Response

    {
        status: status,
        message: message
    }

| Nombre                    | Valor | R  | Descripcion                                   |
| ------------------------- | ----- | -- | --------------------------------------------- |
| **userId**          | texto | \* | _ID de usuario_                             |
| **documentType**    | texto | \* | _Tipo de documento (DNI, pasaporte, otro)_  |
| **document**        | texto | \* | _Documento_                                 |
| **name**            | texto | \* | _Nombre del personal_                       |
| **type**            | texto | \* | _Tipo de personal (interno, externo)_       |
| **direction**       | texto | \* | _Direccion_                                 |
| **postalCode**      | texto | \* | _Codigo postal_                             |
| **location**        | texto | \* | _Localidad_                                 |
| **province**        | texto | \* | _Provincia_                                 |
| **country**         | texto | \* | _Pais_                                      |
| **phone**           | texto |    | _Telefono_                                  |
| **mobilePhone**     | texto |    | _Telefono movil_                            |
| **email**           | texto |    | _Correo electronico_                        |
| **contactSchedule** | texto |    | _Horario de contacto_                       |
| **note**            | texto |    | _Notas_                                     |
| **createdBy**       | texto | \* | _ID del usuario que lo creo_                |
| **message**         | texto |    | _ID del personal creado o mensaje de error_ |

### Obtener personales

**GET** `http://80.240.126.227:3000/personal`

Response

    {
        status: status,
        message: [
            {
                _id: _id,
                identityCounter: identityCounter,
                userId: userId,
                documentType: documentType,
                document: document,
                name: name,
                type: type,
                direction: direction,
                postalCode: postalCode,
                location: location,
                province: province,
                country: country,
                phone: phone,
                mobilePhone: mobilePhone,
                contact: contact,
                contact2: contact2,
                email: email,
                contactSchedule: contactSchedule,
                note: note,
                permissions: [
                    {
                        id: id,
                        name: name
                    }
                ],
                dependents: dependents,
                createdBy: createdBy,
                createdAt: createdAt
            },
        ]
    }

| Nombre                     | Valor | Descripcion                             |
| -------------------------- | ----- | --------------------------------------- |
| **\_id**             | texto | _ID de personal_                      |
| **userId**           | texto | _ID de usuario_                       |
| **identityCounter**  | texto | _Contador de identidad_               |
| **documentType**     | texto | _Tipo de documento (DNI, otro)_       |
| **document**         | texto | _Documento_                           |
| **name**             | texto | _Nombre del personal_                 |
| **type**             | texto | _Tipo de personal (interno, externo)_ |
| **direction**        | texto | _Direccion_                           |
| **postalCode**       | texto | _Codigo postal_                       |
| **location**         | texto | _Localidad_                           |
| **province**         | texto | _Provincia_                           |
| **country**          | texto | _Pais_                                |
| **phone**            | texto | _Telefono_                            |
| **mobilePhone**      | texto | _Telefono movil_                      |
| **email**            | texto | _Correo electronico_                  |
| **contactSchedule**  | texto | _Horario de contacto_                 |
| **note**             | texto | _Notas_                               |
| **permissions**      | Array | _Array de permisos_                   |
| **permissions.id**   | texto | _ID de permiso_                       |
| **permissions.name** | texto | _nombre de permiso_                   |
| **dependents**       | Array | _Array de personas a cargo_           |
| **createdBy**        | texto | _ID del usuario que lo creo_          |
| **createdAt**        | texto | _Fecha de creacion_                   |

### Obtener personal por ID

**GET** `http://80.240.126.227:3000/personal/:_id`

Response

    {
        status: status,
        message: {
                _id: _id,
                identityCounter: identityCounter,
                userId: userId,
                documentType: documentType,
                document: document,
                name: name,
                type: type,
                direction: direction,
                postalCode: postalCode,
                location: location,
                province: province,
                country: country,
                phone: phone,
                mobilePhone: mobilePhone,
                contact: contact,
                contact2: contact2,
                email: email,
                contactSchedule: contactSchedule,
                note: note,
                permissions: [
                    {
                        id: id,
                        name: name
                    }
                ],
                dependents: dependents,
                createdBy: createdBy,
                createdAt: createdAt
            }
    }

| Nombre                     | Valor | Descripcion                             |
| -------------------------- | ----- | --------------------------------------- |
| **\_id**             | texto | _ID de personal_                      |
| **userId**           | texto | _ID de usuario_                       |
| **identityCounter**  | texto | _Contador de identidad_               |
| **documentType**     | texto | _Tipo de documento (DNI, otro)_       |
| **document**         | texto | _Documento_                           |
| **name**             | texto | _Nombre del personal_                 |
| **type**             | texto | _Tipo de personal (interno, externo)_ |
| **direction**        | texto | _Direccion_                           |
| **postalCode**       | texto | _Codigo postal_                       |
| **location**         | texto | _Localidad_                           |
| **province**         | texto | _Provincia_                           |
| **country**          | texto | _Pais_                                |
| **phone**            | texto | _Telefono_                            |
| **mobilePhone**      | texto | _Telefono movil_                      |
| **email**            | texto | _Correo electronico_                  |
| **contactSchedule**  | texto | _Horario de contacto_                 |
| **note**             | texto | _Notas_                               |
| **permissions**      | Array | _Array de permisos_                   |
| **permissions.id**   | texto | _ID de permiso_                       |
| **permissions.name** | texto | _nombre de permiso_                   |
| **dependents**       | Array | _Array de personas a cargo_           |
| **createdBy**        | texto | _ID del usuario que lo creo_          |
| **createdAt**        | texto | _Fecha de creacion_                   |

### Agregar personal a cargo

**POST** `http://80.240.126.227:3000/personal/dependents/:id`

Request

    {
        dependents: dependents,
    }

Response

    {
        status: status,
        message: message
    }

| Nombre               | Valor | Descripcion                |
| -------------------- | ----- | -------------------------- |
| **id**         | texto | _ID del personal_        |
| **dependents** | texto | _ID del usuario a cargo_ |

### Eliminar personal a cargo

**DELETE** `http://80.240.126.227:3000/personal/dependents/:id`

Request

    {
        dependents: dependents,
    }

Response

    {
        status: status,
        message: message
    }

| Nombre               | Valor | Descripcion                |
| -------------------- | ----- | -------------------------- |
| **id**         | texto | _ID del personal_        |
| **dependents** | texto | _ID del usuario a cargo_ |

### Actualizar permisos del personal

**PUT** `http://80.240.126.227:3000/personal/permissions/:_id`

Request

    {
        permissions: [
            {
                id: id,
                nombre: nombre,
            }
        ]
    }

Response

    {
        status: status,
        message: message
    }

| Nombre           | Valor | Descripcion            |
| ---------------- | ----- | ---------------------- |
| **\_id**   | texto | _ID de usuario_      |
| **id**     | texto | _ID del permiso_     |
| **nombre** | texto | _Nombre del permiso_ |

## Actualizar datos personal

**PUT** `http://80.240.126.227:3000/personal/update/:_id`

Request

    {
        personType: personType,
        documentType: documentType,
        document: document,
        name: name,
        customerType,
        roadType: roadType,
        direction: direction,
        postalCode: postalCode,
        location: location,
        province: province,
        country: country,
        phone: phone,
        mobilePhone: mobilePhone,
        contact: contact,
        contact2: contact2,
        email: email,
        webpage: webpage,
        contactSchedule: contactSchedule,
        discount: discount,
        note: note,
    }

Response

    {
        status: status,
        message: message
    }

| Nombre                    | Valor | Descripcion                             |
| ------------------------- | ----- | --------------------------------------- |
| **\_id**            | texto | _ID de cliente_                       |
| **documentType**    | texto | _Tipo de documento (DNI, otro)_       |
| **document**        | texto | _Documento_                           |
| **name**            | texto | _Nombre del personal_                 |
| **type**            | texto | _Tipo de personal (interno, externo)_ |
| **direction**       | texto | _Direccion_                           |
| **postalCode**      | texto | _Codigo postal_                       |
| **location**        | texto | _Localidad_                           |
| **province**        | texto | _Provincia_                           |
| **country**         | texto | _Pais_                                |
| **phone**           | texto | _Telefono_                            |
| **mobilePhone**     | texto | _Telefono movil_                      |
| **email**           | texto | _Correo electronico_                  |
| **contactSchedule** | texto | _Horario de contacto_                 |
| **note**            | texto | _Notas_                               |

### Eliminar personal

**DELETE** `http://80.240.126.227:3000/personal/delete/:_id`

Response

    {
        status: status,
        message: message
    }

| Nombre         | Valor | Descripcion        |
| -------------- | ----- | ------------------ |
| **\_id** | texto | _ID de personal_ |

### Ver permisos de usuario personal

**GET** `http://80.240.126.227:3000/personal/permissions`

Response

    {
        status: status,
        message: [
            {
                id: id,
                nombre: nombre,
            }
        ]
    }

| Nombre           | Valor | Descripcion            |
| ---------------- | ----- | ---------------------- |
| **id**     | texto | _ID del permiso_     |
| **nombre** | texto | _Nombre del permiso_ |

## Trabajos

### Agregar trabajo

**POST** `http://80.240.126.227:3000/jobs`

Request

    {
        idClient: idClient,
        direction: direction,
        contactName: contactName,
        contactPhone: contactPhone,
        obsContact: obsContact,
        type: type,
        priority: priority,
        interventionDate: interventionDate,
        description: description,
        material: material,
        technical: technical,
    }

Response

    {
        status: status,
        message: message
    }

| Nombre                     | Valor | Descripcion                                                            |
| -------------------------- | ----- | ---------------------------------------------------------------------- |
| **idClient**         | texto | _ID del cliente_                                                     |
| **direction**        | texto | _Direccion_                                                          |
| **contactName**      | texto | _Nombre contacto_                                                    |
| **contactPhone**     | texto | _Numero de contacto_                                                 |
| **type**             | texto | _Tipo(mantenimiento, avería, incidencias, revisión, instalación)_ |
| **priority**         | texto | _Pioridad(alta, media, baja)_                                        |
| **interventionDate** | texto | _Fecha de intervencion_                                              |
| **description**      | texto | _Descripcion_                                                        |
| **material**         | texto | _array de jsons de materiales_                                       |
| **technical**        | texto | _ID del tecnico_                                                     |

### Obtener trabajos

**GET** `http://80.240.126.227:3000/jobs/:id`

Response

    {
        status: status,
        message: {
            _id: _id,
            identityCounter: identityCounter,
            idClient: idClient,
            direction: direction,
            contactName: contactName,
            contactPhone: contactPhone,
            obsContact: obsContact,
            type: type,
            priority: priority,
            interventionDate: interventionDate,
            description: description,
            material: material,
            technical: technical,
            workReport: workReport,
            note: note
            created_at: created_at
        }
    }

| Nombre                     | Valor | Descripcion                                                            |
| -------------------------- | ----- | ---------------------------------------------------------------------- |
| **id**               | texto | _ID del trabajo_                                                     |
| **\_id**             | texto | _ID del trabajo_                                                     |
| **identityCounter**  | texto | _Contador de identidad_                                              |
| **idClient**         | texto | _ID del cliente_                                                     |
| **direction**        | texto | _Direccion_                                                          |
| **contactName**      | texto | _Nombre contacto_                                                    |
| **contactPhone**     | texto | _Numero de contacto_                                                 |
| **type**             | texto | _Tipo(mantenimiento, avería, incidencias, revisión, instalación)_ |
| **priority**         | texto | _Pioridad(alta, media, baja)_                                        |
| **interventionDate** | texto | _Fecha de intervencion_                                              |
| **description**      | texto | _Descripcion_                                                        |
| **material**         | texto | _array de jsons de materiales_                                       |
| **technical**        | texto | _ID del tecnico_                                                     |
| **workReport**       | texto | _Reporte del trabajo ej: 123R001_                                    |
| **note**             | texto | _Notas_                                                              |
| **created_at**       | texto | _Fecha de creacion_                                                  |

## Cerrar trabajo

**PUT** `http://80.240.126.227:3000/jobs/close/:id`

Request

    {
        material: material,
        workReport: workReport,
        note: note
    }

Response

    {
        status: status,
        message: message
    }

| Nombre               | Valor | Descripcion                         |
| -------------------- | ----- | ----------------------------------- |
| **id**         | texto | _ID del trabajo_                  |
| **material**   | texto | _array de jsons de materiales_    |
| **workReport** | texto | _Reporte del trabajo ej: 123R001_ |
| **note**       | texto | _Notas_                           |

### Eliminar trabajo

**DELETE** `http://80.240.126.227:3000/jobs/delete/:id`

Response

    {
        status: status,
        message: message
    }

| Nombre       | Valor | Descripcion        |
| ------------ | ----- | ------------------ |
| **id** | texto | _ID del trabajo_ |

## Tareas

### Agregar tarea

**POST** `http://80.240.126.227:3000/tasks`

Request

    {
        name: name,
        type: type,
        description: description,
        priority: priority,
        interventionDate: interventionDate,
        responsible: responsible,
        observation: observation,
    }

Response

    {
        status: status,
        message: message
    }

| Nombre                     | Valor | Descripcion                                                   |
| -------------------------- | ----- | ------------------------------------------------------------- |
| **name**             | texto | _nombre de la tarea (cita, facturación, baja, nueva alta)_ |
| **type**             | texto | _tipo de tarea (llamada, otros)_                            |
| **description**      | texto | _Descripcion de la tarea_                                   |
| **priority**         | texto | _Pioridad(alta, media, baja)_                               |
| **interventionDate** | texto | _Fecha a intervenir_                                        |
| **responsible**      | texto | _ID del responsable de la tarea_                            |
| **observation**      | texto | _Observacion de la tarea a reralizar_                       |

### Obtener tareas

**GET** `http://80.240.126.227:3000/tasks`

Response

    {
        status: status,
        message: [
            {
                _id: _id,
                identityCounter: identityCounter,
                name: name,
                type: type,
                description: description,
                state: state,
                priority: priority,
                interventionDate: interventionDate,
                responsible: responsible,
                createdBy: createdBy,
                observation: observation,
                createdAt: createdAt
            }
        ]
    }

| Nombre                     | Valor | Descripcion                                                   |
| -------------------------- | ----- | ------------------------------------------------------------- |
| **\_id**             | texto | _ID de la tarea_                                            |
| **identityCounter**  | texto | _Contador de identidad_                                     |
| **name**             | texto | _nombre de la tarea (cita, facturación, baja, nueva alta)_ |
| **type**             | texto | _tipo de tarea (llamada, otros)_                            |
| **description**      | texto | _Descripcion de la tarea_                                   |
| **state**            | texto | _Estado de la tarea (abierto, cerrado)_                     |
| **priority**         | texto | _Pioridad(alta, media, baja)_                               |
| **interventionDate** | texto | _Fecha a intervenir_                                        |
| **responsible**      | texto | _ID del responsable de la tarea_                            |
| **createdBy**        | texto | _ID del usuario que creo_                                   |
| **observation**      | texto | _Observacion de la tarea a reralizar_                       |
| **createdAt**        | texto | _Fecha de creacion_                                         |

### Obtener tarea por ID

**GET**  `http://80.240.126.227:3000/tasks/:id`

Response

    {
        status: status,
        message: {
            _id: _id,
            identityCounter: identityCounter,
            name: name,
            type: type,
            description: description,
            state: state,
            priority: priority,
            interventionDate: interventionDate,
            responsible: responsible,
            createdBy: createdBy,
            observation: observation,
            createdAt: createdAt
        }
    }

| Nombre                     | Valor | Descripcion                                                   |
| -------------------------- | ----- | ------------------------------------------------------------- |
| **id**               | texto | _ID de la tarea_                                            |
| **\_id**             | texto | _ID de la tarea_                                            |
| **identityCounter**  | texto | _Contador de identidad_                                     |
| **name**             | texto | _nombre de la tarea (cita, facturación, baja, nueva alta)_ |
| **type**             | texto | _tipo de tarea (llamada, otros)_                            |
| **description**      | texto | _Descripcion de la tarea_                                   |
| **state**            | texto | _Estado de la tarea (abierto, cerrado)_                     |
| **priority**         | texto | _Pioridad(alta, media, baja)_                               |
| **interventionDate** | texto | _Fecha a intervenir_                                        |
| **responsible**      | texto | _ID del responsable de la tarea_                            |
| **createdBy**        | texto | _ID del usuario que creo_                                   |
| **observation**      | texto | _Observacion de la tarea a reralizar_                       |
| **createdAt**        | texto | _Fecha de creacion_                                         |

## Cerrar tarea

**PUT** `http://80.240.126.227:3000/tasks/close/:id`

Request

    {
        note: note
    }

Response

    {
        status: status,
        message: message
    }

| Nombre                | Valor | Descripcion        |
| --------------------- | ----- | ------------------ |
| **id**          | texto | _ID de la tarea_ |
| **observation** | texto | _Observacion_    |

### Eliminar tarea

**DELETE** `http://80.240.126.227:3000/tasks/delete/:id`

Response

    {
        status: status,
        message: message
    }

| Nombre       | Valor | Descripcion        |
| ------------ | ----- | ------------------ |
| **id** | texto | _ID de la tarea_ |

## Productos (almacen)

### Agregar producto sin catalogar

**POST** `http://80.240.126.227:3000/products/uncataloged`

Request

    {
      name: name,
      description: description,
      precioVentaPublico: precioVentaPublico,
      stock: stock,
      note: note,
    }

Response

    {
        status: status,
        message: message
    }

| Nombre                       | Valor  | Descripcion                    |
| ---------------------------- | ------ | ------------------------------ |
| **name**               | texto  | _Nombre del producto_        |
| **description**        | texto  | _Descripcion del producto_   |
| **precioVentaPublico** | numero | _Precio de venta al publico_ |
| **stock**              | numero | _Stock_                      |
| **note**               | texto  | _Notas_                      |

### Agregar producto catalogado

**POST** `http://80.240.126.227:3000/products/cataloged`

Request

    {
      name: name,
      nroSerie: nroSerie
      description: description,
      precioVentaPublico: precioVentaPublico,
      note: note,
    }

Response

    {
        status: status,
        message: message
    }

| Nombre                       | Valor  | Descripcion                    |
| ---------------------------- | ------ | ------------------------------ |
| **name**               | texto  | _Nombre del producto_        |
| **nroSerie**           | texto  | _Numero de serie_            |
| **description**        | texto  | _Descripcion del producto_   |
| **precioVentaPublico** | numero | _Precio de venta al publico_ |
| **note**               | texto  | _Notas_                      |

### Obtener productos

**GET** `http://80.240.126.227:3000/products/:id`

Response

    {
        code: code
        status: status,
        message: {
            _id: _id,
            identityCounter: identityCounter,
            name: name,
            nroSerie: nroSerie,
            description: description,
            precioVentaPublico: precioVentaPublico,
            cataloged: cataloged,
            stock: stock,
            assigned: assigned,
            assignedTo: assignedTo,
            note: note,
            createdAt: createdAt
        }
    }

| Nombre                       | Valor   | Descripcion                    |
| ---------------------------- | ------- | ------------------------------ |
| **id**                 | texto   | _ID del producto_            |
| **\_id**               | texto   | _ID del producto_            |
| **identityCounter**    | texto   | _Contador de identidad_      |
| **name**               | texto   | _Nombre del producto_        |
| **nroSerie**           | texto   | _Numero de serie_            |
| **description**        | texto   | _Descripcion del producto_   |
| **precioVentaPublico** | numero  | _Precio de venta al publico_ |
| **cataloged**          | boolean | _Estado de catalogacion_     |
| **stock**              | numero  | _Stock_                      |
| **assigned**           | boolean | _Estado de asignacion_       |
| **assignedTo**         | texto   | _ID del cliente asignado_    |
| **note**               | texto   | _Notas_                      |
| **createdAt**          | texto   | _Fecha de creacion_          |

### Obtener productos sin catalogar

**GET** `http://80.240.126.227:3000/products/uncataloged`

Response

    {
        code: code
        status: status,
        message: {
            _id: _id,
            identityCounter: identityCounter,
            name: name,
            nroSerie: nroSerie,
            description: description,
            precioVentaPublico: precioVentaPublico,
            cataloged: cataloged,
            stock: stock,
            assigned: assigned,
            assignedTo: assignedTo,
            note: note,
            createdAt: createdAt
        }
    }

| Nombre                       | Valor   | Descripcion                    |
| ---------------------------- | ------- | ------------------------------ |
| **\_id**               | texto   | _ID del producto_            |
| **identityCounter**    | texto   | _Contador de identidad_      |
| **name**               | texto   | _Nombre del producto_        |
| **nroSerie**           | texto   | _Numero de serie_            |
| **description**        | texto   | _Descripcion del producto_   |
| **precioVentaPublico** | numero  | _Precio de venta al publico_ |
| **cataloged**          | boolean | _Estado de catalogacion_     |
| **stock**              | numero  | _Stock_                      |
| **assigned**           | boolean | _Estado de asignacion_       |
| **assignedTo**         | texto   | _ID del cliente asignado_    |
| **note**               | texto   | _Notas_                      |
| **createdAt**          | texto   | _Fecha de creacion_          |

### Obtener productos catalogados

**GET** `http://80.240.126.227:3000/products/cataloged`

Response

    {
        code: code
        status: status,
        message: {
            _id: _id,
            identityCounter: identityCounter,
            name: name,
            nroSerie: nroSerie,
            description: description,
            precioVentaPublico: precioVentaPublico,
            cataloged: cataloged,
            stock: stock,
            assigned: assigned,
            assignedTo: assignedTo,
            note: note,
            createdAt: createdAt
        }
    }

| Nombre                       | Valor   | Descripcion                    |
| ---------------------------- | ------- | ------------------------------ |
| **\_id**               | texto   | _ID del producto_            |
| **identityCounter**    | texto   | _Contador de identidad_      |
| **name**               | texto   | _Nombre del producto_        |
| **nroSerie**           | texto   | _Numero de serie_            |
| **description**        | texto   | _Descripcion del producto_   |
| **precioVentaPublico** | numero  | _Precio de venta al publico_ |
| **cataloged**          | boolean | _Estado de catalogacion_     |
| **stock**              | numero  | _Stock_                      |
| **assigned**           | boolean | _Estado de asignacion_       |
| **assignedTo**         | texto   | _ID del cliente asignado_    |
| **note**               | texto   | _Notas_                      |
| **createdAt**          | texto   | _Fecha de creacion_          |

### Actualizar datos del producto

**PUT** `http://80.240.126.227:3000/products/update/:id`

Request

    {
        name: name,
        nroSerie: nroSerie,
        description: description,
        precioVentaPublico: precioVentaPublico,
        cataloged: cataloged,
        stock: stock,
        assigned: assigned,
        assignedTo: assignedTo,
        note: note,

}

Response

    {
        status: status,
        message: message
    }

| Nombre                       | Valor   | Descripcion                    |
| ---------------------------- | ------- | ------------------------------ |
| **id**                 | texto   | _ID del producto_            |
| **name**               | texto   | _Nombre del producto_        |
| **nroSerie**           | texto   | _Numero de serie_            |
| **description**        | texto   | _Descripcion del producto_   |
| **precioVentaPublico** | numero  | _Precio de venta al publico_ |
| **cataloged**          | boolean | _Estado de catalogacion_     |
| **stock**              | numero  | _Stock_                      |
| **assigned**           | boolean | _Estado de asignacion_       |
| **assignedTo**         | texto   | _ID del cliente asignado_    |
| **note**               | texto   | _Notas_                      |

### Actualizar stock de producto

**PUT** `http://80.240.126.227:3000/products/update-stock/:id`

Request

    {
        stock: stock
    }

Response

    {
        status: status,
        message: message
    }

| Nombre          | Valor | Descripcion         |
| --------------- | ----- | ------------------- |
| **id**    | texto | _ID del producto_ |
| **stock** | texto | _Stock_           |

### Catalogar producto

**PUT** `http://80.240.126.227:3000/products/catalog/:id`

Request

    {
        nroSerie: nroSerie
    }

Response

    {
        status: status,
        message: message
    }

| Nombre             | Valor | Descripcion         |
| ------------------ | ----- | ------------------- |
| **id**       | texto | _ID del producto_ |
| **nroSerie** | texto | _Numero de serie_ |

### Eliminar producto

**DELETE** `http://80.240.126.227:3000/products/delete/:id`

Response

    {
        status: status,
        message: message
    }

| Nombre       | Valor | Descripcion         |
| ------------ | ----- | ------------------- |
| **id** | texto | _ID del producto_ |

## Contactos (posibles clientes)

### Agregar contacto

**POST** `http://80.240.126.227:3000/contacts`

Request

    {
        name: name,
        lastName: lastName,
        roadType: roadType,
        direction: direction,
        postalCode: postalCode,
        location: location,
        province: province,
        country: country,
        phone: phone,
        mobilePhone: mobilePhone,
        email: email,
        tracing: tracing,
        note: note,
    }

Response

    {
        status: status,
        message: message
    }

| Nombre                | Valor | R  | Descripcion                                              |
| --------------------- | ----- | -- | -------------------------------------------------------- |
| **name**        | texto | \* | _Nombre del constacto_                                 |
| **lastname**    | texto | \* | _Apellido del constacto_                               |
| **roadType**    | texto | \* | _Tipo de via (calle, avenida, carretera, plaza, otro)_ |
| **direction**   | texto | \* | _Direccion_                                            |
| **postalCode**  | texto | \* | _Codigo postal_                                        |
| **location**    | texto | \* | _Localidad_                                            |
| **province**    | texto | \* | _Provincia_                                            |
| **country**     | texto | \* | _Pais_                                                 |
| **phone**       | texto |    | _Telefono_                                             |
| **mobilePhone** | texto |    | _Telefono movil_                                       |
| **email**       | texto |    | _Correo electronico_                                   |
| **tracing**     | texto |    | _Seguimiento_                                          |
| **note**        | texto |    | _Notas_                                                |
| **message**     | texto |    | _ID del cliente creado o mensaje de error_             |

### Obtener contactos

**GET** `http://80.240.126.227:3000/contacts`

Response

    {
        status: status,
        message: [
            {
                _id: _id,
                identityCounter: identityCounter,
                name: name,
                lastName: lastName,
                roadType: roadType,
                direction: direction,
                postalCode: postalCode,
                location: location,
                province: province,
                country: country,
                phone: phone,
                mobilePhone: mobilePhone,
                email: email,
                tracing: tracing,
                note: note,
                createdBy: createdBy
                createdAt: createdAt
            },
        ]
    }

| Nombre                    | Valor | Descripcion                                              |
| ------------------------- | ----- | -------------------------------------------------------- |
| **\_id**            | texto | _ID de cliente_                                        |
| **identityCounter** | texto | _Contador de identidad_                                |
| **idCode**          | texto | _ID de contacto codificado_                            |
| **name**            | texto | _Nombre del contacto_                                  |
| **lastname**        | texto | _Apellido del contacto_                                |
| **customerType**    | texto | _Tipo de contacto (propietario, invitado)_             |
| **roadType**        | texto | _Tipo de via (calle, avenida, carretera, plaza, otro)_ |
| **direction**       | texto | _Direccion_                                            |
| **postalCode**      | texto | _Codigo postal_                                        |
| **location**        | texto | _Localidad_                                            |
| **province**        | texto | _Provincia_                                            |
| **country**         | texto | _Pais_                                                 |
| **phone**           | texto | _Telefono_                                             |
| **mobilePhone**     | texto | _Telefono movil_                                       |
| **email**           | texto | _Correo electronico_                                   |
| **tracing**         | texto | _Seguimiento_                                          |
| **note**            | texto | _Notas_                                                |
| **createdBy**       | texto | _ID del usuario que lo creo_                           |
| **created_at**      | texto | _Fecha de creacion_                                    |

### Obtener contacto por ID

**GET** `http://80.240.126.227:3000/contacts/:id`

Response

    {
        status: status,
        message: {
            _id: _id
            identityCounter: identityCounter,
            name: name,
            lastName: lastName,
            roadType: roadType,
            direction: direction,
            postalCode: postalCode,
            location: location,
            province: province,
            country: country,
            phone: phone,
            mobilePhone: mobilePhone,
            email: email,
            tracing: tracing,
            note: note,
            createdBy: createdBy
            createdAt: createdAt
        },
    }

| Nombre                    | Valor | Descripcion                                              |
| ------------------------- | ----- | -------------------------------------------------------- |
| **id**              | texto | _ID de contacto_                                       |
| **identityCounter** | texto | _Contador de identidad_                                |
| **name**            | texto | _Nombre del contacto_                                  |
| **lastname**        | texto | _Apellido del contacto_                                |
| **customerType**    | texto | _Tipo de contacto (propietario, invitado)_             |
| **roadType**        | texto | _Tipo de via (calle, avenida, carretera, plaza, otro)_ |
| **direction**       | texto | _Direccion_                                            |
| **postalCode**      | texto | _Codigo postal_                                        |
| **location**        | texto | _Localidad_                                            |
| **province**        | texto | _Provincia_                                            |
| **country**         | texto | _Pais_                                                 |
| **phone**           | texto | _Telefono_                                             |
| **mobilePhone**     | texto | _Telefono movil_                                       |
| **email**           | texto | _Correo electronico_                                   |
| **tracing**         | texto | _Seguimiento_                                          |
| **note**            | texto | _Notas_                                                |
| **createdBy**       | texto | _ID del usuario que lo creo_                           |
| **created_at**      | texto | _Fecha de creacion_                                    |

### Actualizar datos contacto

**PUT** `http://80.240.126.227:3000/contacts/update/:id`

Request

    {
            name: name,
            lastName: lastName,
            roadType: roadType,
            direction: direction,
            postalCode: postalCode,
            location: location,
            province: province,
            country: country,
            phone: phone,
            mobilePhone: mobilePhone,
            email: email,
            tracing: tracing,
            note: note,
    }

Response

    {
        status: status,
        message: message
    }

| Nombre                 | Valor | Descripcion                                              |
| ---------------------- | ----- | -------------------------------------------------------- |
| **id**           | texto | _ID de contacto_                                       |
| **name**         | texto | _Nombre del contacto_                                  |
| **lastname**     | texto | _Apellido del contacto_                                |
| **customerType** | texto | _Tipo de contacto (propietario, invitado)_             |
| **roadType**     | texto | _Tipo de via (calle, avenida, carretera, plaza, otro)_ |
| **direction**    | texto | _Direccion_                                            |
| **postalCode**   | texto | _Codigo postal_                                        |
| **location**     | texto | _Localidad_                                            |
| **province**     | texto | _Provincia_                                            |
| **country**      | texto | _Pais_                                                 |
| **phone**        | texto | _Telefono_                                             |
| **mobilePhone**  | texto | _Telefono movil_                                       |
| **email**        | texto | _Correo electronico_                                   |
| **tracing**      | texto | _Seguimiento_                                          |
| **note**         | texto | _Notas_                                                |

### Eliminar contacto

**DELETE** `http://80.240.126.227:3000/contacts/delete/:id`

Response

    {
        status: status,
        message: message
    }

| Nombre       | Valor | Descripcion     |
| ------------ | ----- | --------------- |
| **id** | texto | _ID de contacto |

## Facturacion

### Agregar factura

**POST** `http://80.240.126.227:3000/billing`

Request

    {
        billingDate: billingDate,
        clientID: clientID,
        NumeroIdentificacionFiscal: NumeroIdentificacionFiscal,
        products: [
            {
                id: id,
                name: name,
                nroSerie:nroSerie,
                note: note,
                price: price,
                quantity: quantity
            }
        ],
        workReport: workReport,
        workDirection: workDirection,
        clientDiscount: clientDiscount,
        discount: discount,
        IVA: IVA,
        impuestosVariables: impuestosVariables,
        paymentMethod: paymentMethod,
        note: note
    }

Response

    {
        status: status,
        message: message
    }

| Nombre                               | Valor | R  | Descripcion                         |
| ------------------------------------ | ----- | -- | ----------------------------------- |
| **billingDate**                | texto | \* | _Fecha de facturacion_            |
| **clientID**                   | texto | \* | _ID del cliente_                  |
| **NumeroIdentificacionFiscal** | texto | \* | _Numero de identificacion fiscal_ |
| **products.id**                | texto | \* | _ID del producto_                 |
| **products.name**              | texto | \* | _Nombre del producto_             |
| **products.nroSerie**          | texto | \* | _Numero de serie del producto_    |
| **products.note**              | texto | \* | _Notas del producto_              |
| **products.price**             | texto | \* | _Precio del producto_             |
| **products.quantity**          | texto | \* | _Cantidad del producto_           |
| **workReport**                 | texto | \* | _Parte de trabajo_                |
| **workDirection**              | texto | \* | _Direccion de trabajo_            |
| **clientDiscount**             | texto | \* | _Descuento del cliente_           |
| **discount**                   | texto | \* | _Descuento de la factura_         |
| **IVA**                        | texto | \* | _Impuesto al valor angregado_     |
| **impuestosVariables**         | texto | \* | _Impuestos variables_             |
| **paymentMethod**              | texto | \* | _Metodo de pago_                  |
| **note**                       | texto |    | _Notas_                           |

### Obtener factura

**GET** `http://80.240.126.227:3000/billing`

Response

    {
        status: status,
        message: [
            {
                _id: _id,
                identityCounter: identityCounter,
                state: state,
                billingDate: billingDate,
                clientID: clientID,
                NumeroIdentificacionFiscal: NumeroIdentificacionFiscal,
                products: [
                    {
                        id: id,
                        name: name,
                        nroSerie:nroSerie,
                        note: note,
                        price: price,
                        quantity: quantity
                    }
                ],
                workReport: workReport,
                workDirection: workDirection,
                clientDiscount: clientDiscount,
                discount: discount,
                IVA: IVA,
                impuestosVariables: impuestosVariables,
                paymentMethod: paymentMethod,
                note: note
                createdBy: createdBy
                createdAt: createdAt
            },
        ]
    }

| Nombre                               | Valor | Descripcion                         |
| ------------------------------------ | ----- | ----------------------------------- |
| **\_id**                       | texto | _ID de la factura_                |
| **identityCounter**            | texto | _Contador de identidad_           |
| **state**                      | texto | _Estado de la factura_            |
| **billingDate**                | texto | _Fecha de facturacion_            |
| **clientID**                   | texto | _ID del cliente_                  |
| **NumeroIdentificacionFiscal** | texto | _Numero de identificacion fiscal_ |
| **products.id**                | texto | _ID del producto_                 |
| **products.name**              | texto | _Nombre del producto_             |
| **products.nroSerie**          | texto | _Numero de serie del producto_    |
| **products.note**              | texto | _Notas del producto_              |
| **products.price**             | texto | _Precio del producto_             |
| **products.quantity**          | texto | _Cantidad del producto_           |
| **workReport**                 | texto | _Parte de trabajo_                |
| **workDirection**              | texto | _Direccion de trabajo_            |
| **clientDiscount**             | texto | _Descuento del cliente_           |
| **discount**                   | texto | _Descuento de la factura_         |
| **IVA**                        | texto | _Impuesto al valor angregado_     |
| **impuestosVariables**         | texto | _Impuestos variables_             |
| **paymentMethod**              | texto | _Metodo de pago_                  |
| **note**                       | texto | _Notas_                           |
| **createdBy**                  | texto | _ID del usuario que lo creo_      |
| **createdAt**                  | texto | _Fecha de creacion_               |

### Obtener factura por ID

**GET** `http://80.240.126.227:3000/billing/:id`

Response

    {
        status: status,
        message: {
            _id: _id,
            identityCounter: identityCounter,
            state: state,
            billingDate: billingDate,
            clientID: clientID,
            NumeroIdentificacionFiscal: NumeroIdentificacionFiscal,
            products: [
                {
                    id: id,
                    name: name,
                    nroSerie:nroSerie,
                    note: note,
                    price: price,
                    quantity: quantity
                }
            ],
            workReport: workReport,
            workDirection: workDirection,
            clientDiscount: clientDiscount,
            discount: discount,
            IVA: IVA,
            impuestosVariables: impuestosVariables,
            paymentMethod: paymentMethod,
            note: note
            createdBy: createdBy
            createdAt: createdAt
        }
    }

| Nombre                               | Valor | Descripcion                         |
| ------------------------------------ | ----- | ----------------------------------- |
| **\_id**                       | texto | _ID de la factura_                |
| **identityCounter**            | texto | _Contador de identidad_           |
| **state**                      | texto | _Estado de la factura_            |
| **billingDate**                | texto | _Fecha de facturacion_            |
| **clientID**                   | texto | _ID del cliente_                  |
| **NumeroIdentificacionFiscal** | texto | _Numero de identificacion fiscal_ |
| **products.id**                | texto | _ID del producto_                 |
| **products.name**              | texto | _Nombre del producto_             |
| **products.nroSerie**          | texto | _Numero de serie del producto_    |
| **products.note**              | texto | _Notas del producto_              |
| **products.price**             | texto | _Precio del producto_             |
| **products.quantity**          | texto | _Cantidad del producto_           |
| **workReport**                 | texto | _Parte de trabajo_                |
| **workDirection**              | texto | _Direccion de trabajo_            |
| **clientDiscount**             | texto | _Descuento del cliente_           |
| **discount**                   | texto | _Descuento de la factura_         |
| **IVA**                        | texto | _Impuesto al valor angregado_     |
| **impuestosVariables**         | texto | _Impuestos variables_             |
| **paymentMethod**              | texto | _Metodo de pago_                  |
| **note**                       | texto | _Notas_                           |
| **createdBy**                  | texto | _ID del usuario que lo creo_      |
| **createdAt**                  | texto | _Fecha de creacion_               |

### Eliminar factura

**DELETE** `http://80.240.126.227:3000/factura/delete/:id`

Response

    {
        status: status,
        message: message
    }

| Nombre       | Valor | Descripcion       |
| ------------ | ----- | ----------------- |
| **id** | texto | _ID de la factura |

## Buscardor

### Buscar

**GET** `http://80.240.126.227:3000/searcher/identityCounter`

Response

    {
        status: status,
        message: message
    }

| Nombre                    | Valor | Descripcion               |
| ------------------------- | ----- | ------------------------- |
| **identityCounter** | texto | _Contador de identidad_ |

## Codigos de intervencion

### Generar codigo de intervencion

**POST** `http://80.240.126.227:3000/intervention-code`

Request

    {
        client: client,
        installation: installation,
    }

Response

    {
        status: status,
        message: message
    }

| Nombre                 | Valor | Descripcion              |
| ---------------------- | ----- | ------------------------ |
| **client**       | texto | _ID del cliente_       |
| **installation** | texto | _ID de la instalacion_ |

### Obtener codigos de intervencion

**GET** `http://80.240.126.227:3000/intervention-code`

Response

    {
        status: status,
        message: [
            {
                _id: _id,
                code: code,
                status: status,
                client: client,
                installation: installation,
                expiresAt: expiresAt,
                createdAt: createdAt,
            },
        ]
    }

| Nombre              | Valor | Descripcion                   |
| ------------------- | ----- | ----------------------------- |
| **\_id**      | texto | _ID del codigo_             |
| **code**      | texto | _Codigo_                    |
| **status**    | texto | _estado (abierto, cerrado)_ |
| **client**    | texto | _ID del cliente_            |
| **expiresAt** | texto | _Fecha de expiracion_       |
| **createdAt** | texto | _Fecha de creacion_         |

### Obtener codigo de intervencion por ID

**GET** `http://80.240.126.227:3000/intervention-code/:id`

Response

    {
        status: status,
        message: {
            _id: _id,
            code: code,
            status: status,
            client: client,
            installation: installation,
            expiresAt: expiresAt,
            createdAt: createdAt,
        },
    }

| Nombre              | Valor | Descripcion                   |
| ------------------- | ----- | ----------------------------- |
| **id**        | texto | _ID del codigo_             |
| **\_id**      | texto | _ID del codigo_             |
| **code**      | texto | _Codigo_                    |
| **status**    | texto | _estado (abierto, cerrado)_ |
| **client**    | texto | _ID del cliente_            |
| **expiresAt** | texto | _Fecha de expiracion_       |
| **createdAt** | texto | _Fecha de creacion_         |

### Renovar codigo de intervencion

**PUT** `http://80.240.126.227:3000/intervention-code/renew/:id`

Response

    {
        status: status,
        message: message
    }

| Nombre       | Valor | Descripcion       |
| ------------ | ----- | ----------------- |
| **id** | texto | _ID del codigo_ |

### Cerrar codigo de intervencion

**PUT** `http://80.240.126.227:3000/intervention-code/close/:id`

Response

    {
        status: status,
        message: message
    }

| Nombre       | Valor | Descripcion       |
| ------------ | ----- | ----------------- |
| **id** | texto | _ID del codigo_ |

### Eliminar codigo de intervencion

**DELETE** `http://80.240.126.227:3000/intervention-code/delete/:id`

Response

    {
        status: status,
        message: message
    }

| Nombre       | Valor | Descripcion       |
| ------------ | ----- | ----------------- |
| **id** | texto | _ID del codigo_ |

## **Topicos WebSockets**

## Todas las notificaciones

`notifications`

Response

    {
        name: name,
        type: type,
        description: description,
    }

| Nombre                | Valor | Descripcion                  |
| --------------------- | ----- | ---------------------------- |
| **name**        | texto | _Dispositivo de la alarma_ |
| **type**        | 1     | _Notificacion_             |
|                       | 2     | _Alarma_                   |
| **description** | texto | _descripcion de la alarma_ |

## Estado de la instalacion

`installation-${id}-state`

Response

    state

| Nombre          | Valor | Descripcion     |
| --------------- | ----- | --------------- |
| **state** | 1     | _Armado_      |
|                 | 2     | _Desarmado_   |
|                 | 3     | _Dormir_      |
|                 | 4     | _Bloqueado_   |
|                 | 5     | _Apagado_     |
|                 | 6     | Autocierre      |
|                 | 7     | _Antipánico_ |
|                 | 8     | _Antibaby_    |

## Estado del dispositivo

`device-${id}-state`

Response

    state

| Nombre          | Valor | Descripcion     |
| --------------- | ----- | --------------- |
| **state** | 1     | _Armado_      |
|                 | 2     | _Desarmado_   |
|                 | 3     | _Dormir_      |
|                 | 4     | _Bloqueado_   |
|                 | 5     | _Apagado_     |
|                 | 6     | Autocierre      |
|                 | 7     | _Antipánico_ |
|                 | 8     | _Antibaby_    |

## Notificaciones del dispositivos general

`device-notification`

Response

    {
        name: name,
        type: type,
        description: description,
    }

| Nombre                | Valor | Descripcion                           |
| --------------------- | ----- | ------------------------------------- |
| **name**        | texto | _Dispositivo de la de notificacion_ |
| **type**        | 1     | _Notificacion_                      |
|                       | 2     | _Alarma_                            |
| **description** | texto | _descripcion de la notificacion_    |

## Notificaciones del dispositivo

`device-${id}-notification`

Response

    description

| Nombre                | Valor | Descripcion                     |
| --------------------- | ----- | ------------------------------- |
| **description** | texto | _descripcion de notificacion_ |

## Alarmas del dispositivos general

`device-alarm`

Response

    {
        name: name,
        type: type,
        description: description,
    }

| Nombre                | Valor | Descripcion                  |
| --------------------- | ----- | ---------------------------- |
| **name**        | texto | _Dispositivo de la alarma_ |
| **type**        | 1     | _Notificacion_             |
|                       | 2     | _Alarma_                   |
| **description** | texto | _descripcion de la alarma_ |

## Alarmas del dispositivo

`device-${id}-alarm`

Response

    description

| Nombre                | Valor | Descripcion                  |
| --------------------- | ----- | ---------------------------- |
| **description** | texto | _descripcion de la alarma_ |

## **Permisos cliente**

Agregar el header "installation" con el ID de la instalacion en cada consulta del cliente

| id                             | name                           |
| ------------------------------ | ------------------------------ |
| client-users-add               | Añadir usuarios               |
| client-users-view              | Visualizar usuarios            |
| client-users-edit              | Editar usuarios                |
| client-users-delete'           | Eliminar usuarios              |
| client-users-permissions-edit  | Editar permisos de usuario     |
| client-users-permissions-view  | Ver permisos de usuario        |
| client-notifications-view      | Visualizar notificationes      |
| client-notifications-delete    | Borrar notificationes          |
| client-installations-view      | Visualizar instalacion         |
| client-installations-add       | Añadir instalacion            |
| client-installations-edit      | Editar instalacion             |
| client-installations-state     | Cambiar estado instalacion     |
| client-installations-delete    | Eliminar instalacion           |
| client-devices-view            | Visualizar dispositivos        |
| client-devices-add             | Añadir dispositivos           |
| client-devices-state           | Cambiar estado dispositivos    |
| client-devices-actuate         | Actuar dispositivos            |
| client-devices-delete          | Eliminar dispositivos          |
| client-scenarios-view          | Visualizar esenario            |
| client-scenarios-add           | Añadir esenario               |
| client-scenarios-edit          | Editar esenario                |
| client-scenarios-state         | Cambiar estado esenario        |
| client-scenarios-delete        | Eliminar esenario              |
| client-intervencioncode-add    | Generar codigo de intervencion |
| client-intervencioncode-view   | Ver codigo de intervencion     |
| client-intervencioncode-renew  | Renovar codigo de intervencion |
| client-intervencioncode-revoke | Revocar codigo de intervencion |

## **Permisos personal**

| id                              | name                          |
| ------------------------------- | ----------------------------- |
| personal-users-view             | Visualizar usuarios           |
| personal-users-add              | Añadir usuarios              |
| personal-users-edit             | Editar usuarios               |
| personal-users-permissions-view | Ver permisos de usuario       |
| personal-users-permissions-edit | Editar permisos de usuario    |
| personal-users-delete           | Eliminar usuarios             |
| personal-clients-view           | Visualizar clientes           |
| personal-clients-add            | Añadir clientes              |
| personal-clients-edit           | Editar clientes               |
| personal-clients-delete         | Eliminar clientes             |
| personal-personal-view          | Visualizar personal           |
| personal-personal-add           | Añadir personal              |
| personal-personal-edit          | Editar personal               |
| personal-personal-delete        | Eliminar personal             |
| personal-notifications-view     | Visualizar notificationes     |
| personal-notifications-delete   | Eliminar notificationes       |
| personal-installations-view     | Visualizar instalacion        |
| personal-installations-add      | Añadir instalacion           |
| personal-installations-edit     | Editar instalacion            |
| personal-installations-delete   | Eliminar instalacion          |
| personal-devices-view           | Visualizar dispositivos       |
| personal-devices-add            | Añadir dispositivos          |
| personal-devices-state          | Cambiar estado dispositivos   |
| personal-devices-actuate        | Actuar dispositivos           |
| personal-devices-delete         | Eliminar dispositivos         |
| personal-tasks-view             | Visualizar tareas             |
| personal-tasks-add              | Añadir tareas                |
| personal-tasks-close            | Cerrar tareas                 |
| personal-tasks-delete           | Eliminar tareas               |
| personal-jobs-view              | Visualizar trabajos           |
| personal-jobs-add               | Añadir trabajos              |
| personal-jobs-close             | Cerrar trabajos               |
| personal-jobs-delete            | Eliminar trabajos             |
| personal-products-view          | Visualizar productos          |
| personal-products-add           | Añadir productos             |
| personal-products-edit          | Editar productos              |
| personal-products-delete        | Eliminar productos            |
| personal-billing-view           | Visualizar facturas           |
| personal-billing-add            | Añadir facturas              |
| personal-billing-delete         | Eliminar facturas             |
| personal-contacts-view          | Visualizar contactos          |
| personal-contacts-add           | Añadir contactos             |
| personal-contacts-edit          | Editar contactos              |
| personal-contacts-delete        | Eliminar contactos            |
| client-intervencioncode-close   | Cerrar codigo de intervencion |
