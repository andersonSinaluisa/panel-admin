
/**
 * @fileoverview Constants
 * @name index.ts<application/common/index.ts>
 * @description Constants
 * @license GPL-3.0
 *  
 * @author Anderson Sinaluisa - andersonsinaluisa.com
 * 
 * */


/**
 * @constant URLAPI
 * @description URL de la API
 * @type {string}
 * @memberof Constants
 * */
export const URLAPI = "https://probulon-cloud.com.es/api/v1"

/**
 * @constant WEBSOCKET
 * @description URL del websocket
 * @type {string}
 * @memberof Constants
 */
export const WEBSOCKET = "ws://80.240.126.227:8080"

/**
 * @constant LOGIN
 * @description URL de login
 * @type {string}
 * @memberof Constants
 * 
 */
export const LOGIN = "/auth/login"

/**
 * @constant LOGOUT
 * @description URL de logout
 * @type {string}
 * @memberof Constants
 * 
 */
export const LOGOUT = "/auth/logout"

/**
 * @constant GET_USERS
 * @description Obtener los usuarios
 * @type {string}
 * @memberof Constants
 *  
 */
export const GET_USERS = "/auth/users"


/**
 * @constant CREATE_USER
 * @description Crear un usuario
 * @type {string}
 * @memberof Constants
 * 
 */
export const CREATE_USER = "/auth/users"

/**
 * @constant DELETE_USER
 * @description Eliminar un usuario
 * @type {string}
 * @memberof Constants
 */
export const DELETE_USER = "/users/delete/"



/**
 * @constant GET_CATALOGUE_TYPE
 * @description Obtener los tipos de catalogos
 * @type {string}
 * @memberof Constants
 * 
 */
export const GET_CATALOGUE_TYPE = '/probulon/catalogues';



/**
 *  @constant GET_CLIENTS
 * @description Obtener los clientes
 * @type {string}
 * @memberof Constants
 * 
 */
export const GET_CLIENTS = "/core/clients"


/**
 * @constant CREATE_CLIENT
 * @description Crear un cliente
 * @type {string}
 * @memberof Constants
 *  
 **/
export const CREATE_CLIENT = "/core/clients"

/**
 * @constant UPDATE_CLIENT
 * @description Actualizar un cliente
 * @type {string}
 * @memberof Constants
 * 
 */
export const UPDATE_CLIENT = "/core/clients/"


/**
 * @constant DELETE_CLIENT
 * @description Eliminar un cliente
 * @type {string}
 * @memberof Constants
 */
export const DELETE_CLIENT = "/core/clients"


/**
 * @constant GET_INSTALLATIONS
 * @description Obtener las instalaciones
 * @type {string}
 * @memberof Constants
 * 
 */
export const GET_INSTALLATIONS = "/core/installations"


/**
 * @constant CREATE_INSTALLATION
 * @description Crear una instalacion
 * @type {string}
 * @memberof Constants
 */
export const CREATE_INSTALLATION = "/core/installations"

/**
 * @constant DELETE_INSTALLATION
 * @description Eliminar una instalacion
 * @type {string}
 * @memberof Constants
 */
export const DELETE_INSTALLATION = "/core/installations"

/**
 * @constant UPDATE_STATE_INSTALLATION
 * @description Actualizar el estado de una instalacion
 * @type {string}
 * @memberof Constants
 */
export const UPDATE_STATE_INSTALLATION = "/installations/state/"

/**
 * @constant GET_PERSONAL
 * @description Obtener el personal
 * @type {string}
 * @memberof Constants
 */
export const GET_PERSONAL = "/core/staff"

/**
 * @constant CREATE_PERSONAL
 * @description Crear un personal
 * @type {string}
 * @memberof Constants
 */
export const CREATE_PERSONAL = "/core/staff"

/**
 * @constant GET_BY_ID_PERSONAL
 * @description Obtener un personal por id
 * @type {string}
 * @memberof Constants
 */
export const GET_BY_ID_PERSONAL = "/core/staff"

/**
 * @constant DELETE_PERSONAL
 * @description Eliminar un personal
 * @type {string}
 * @memberof Constants
 */
export const DELETE_PERSONAL = "/core/staff"


export const GET_JOBS = "/core/jobs";
export const CREATE_JOBS = "/core/jobs";
export const CLOSE_JOBS = "/core/jobs";
export const DELETE_JOBS = "/core/jobs";

export const GET_TASKS = "/core/tasks";
export const CREATE_TASKS = "/core/tasks";
export const CLOSE_TASKS = "/core/tasks";
export const DELETE_TASKS = "/core/tasks";





export const GET_PRODUCTS = "/core/products";
export const CREATE_CATALOGED_PRODUCTS = "/products/cataloged";
export const CREATE_UNCATALOGED_PRODUCTS = "/products/uncataloged";
export const UPDATE_PRODUCTS = "/products/update/";
export const UPDATE_STOCK_PRODUCT = "/products/update-stock/";
export const CATALOGE_PRODUCT = "/products/catalog/";
export const DELETE_PRODUCT = "/products/delete/";


export const SEARCH = "/searcher/";

export const GET_BILLING = "/core/invoices";
export const CREATE_BILLING = "/core/invoices";
export const DELETE_BILLING = "/core/invoices";



// Error Messages
export const errorEncountered = 'Error was encountered processing this request';
export const timeoutMessage = "We are unable to fetch data at this time, kindly check your internet connection and we'll reconnect you.";
export const timeoutDuration = 30000;

export const SUCCESS_HTTP_CODE_CREATED = 201

export const APP_NAME = "Panel"



export const getStatusInstallation = (id: number) => {
    switch (id) {
        case 1:
            return { color: 'primary', label: "ACTIVO" };
        case 2:
            return { color: 'primary', label: "ACTIVO" };
        case 3:
            return { color: 'warning', label: "Dormir" };
        case 4:
            return { color: 'secondary', label: "Bloqueado" };
        case 5:
            return { color: 'danger', label: "Apagado" };
        case 6:
            return { color: 'success', label: "Autocierre" };
        case 7:
            return { color: 'secondary', label: "Antipánico" };
        case 8:
            return { color: 'warning', label: "Antibaby" };
        default:
            return { color: 'primary', label: "Armado" };
    }
}


export const status = [
    { color: 'primary', label: "ACTIVO",id:1 },
    { color: 'primary', label: "ACTIVO",id:2 },
    { color: 'warning', label: "Dormir",id:3 },
    { color: 'secondary', label: "Bloqueado",id:4 },
    { color: 'danger', label: "Apagado",id:5 },
    { color: 'success', label: "Autocierre",id:6 },
    { color: 'secondary', label: "Antipánico",id:7 },
    { color: 'warning', label: "Antibaby",id:8 }
]

/**
 * @constant TASK_OPEN
 * @description Tipo de tarea abierta
 * @type {string}
 * @memberof Constants
 */
export const TASK_OPEN = "type_task_status_opened";

/**
 * @constant TASK_CLOSE
 *  @description Tipo de tarea cerrada
 * @type {string}
 * @memberof Constants
 */
export const TASK_CLOSE = "type_task_status_closed";



/**
 * @constant CATALOGUE_TYPE_DOCUMENT
 * @description Tipo de documento
 * @type {string}
 * @memberof Constants
 */
export const CATALOGUE_TYPE_DOCUMENT = "catalogue_type_document_identification";

/**
 * @constant CATALOGUE_TYPE_USER_STATE
 * @description Estado
 *  @type {string}
 * @memberof Constants
 * */
export const CATALOGUE_TYPE_USER_STATE = "catalogue_type_user_state";

/**
 * @constant CATALOGUE_TYPE_RECORD_AVAILABILITY
 * @description Disponibilidad
 * @type {string}
 * @memberof Constants
 * */
export const CATALOGUE_TYPE_RECORD_AVAILABILITY = "catalogue_type_record_availability";

//catalogue_type_main_rol_staff
/**
 * @constant CATALOGUE_TYPE_MAIN_ROL_STAFF
 * @description Rol principal
 * @type {string}
 * @memberof Constants
 * */
export const CATALOGUE_TYPE_MAIN_ROL_STAFF = "catalogue_type_main_rol_staff";

//catalogue_type_organisation_or_entity_with_personality_legal
/**
 * @constant CATALOGUE_TYPE_ORGANISATION_OR_ENTITY_WITH_PERSONALITY_LEGAL
 * @description Tipo de organizacion
 * @type {string}
 * @memberof Constants
 * */
export const CATALOGUE_TYPE_ORGANISATION_OR_ENTITY_WITH_PERSONALITY_LEGAL = "catalogue_type_organisation_or_entity_with_personality_legal";


//catalogue_type_street
/**
 * @constant CATALOGUE_TYPE_STREET
 * @description Tipo de vía
 * @type {string}
 * @memberof Constants
 * */
export const CATALOGUE_TYPE_STREET = "catalogue_type_street";

//catalogue_type_country
/**
 * @constant CATALOGUE_TYPE_COUNTRY
 * @description Tipo de país
 * @type {string}
 * @memberof Constants
 * */
export const CATALOGUE_TYPE_COUNTRY = "catalogue_type_country";

//catalogue_type_relationship_type
/**
 * @constant CATALOGUE_TYPE_RELATIONSHIP_TYPE
 * @description Tipo de relación
 * @type {string}
 * @memberof Constants
 * */
export const CATALOGUE_TYPE_RELATIONSHIP_TYPE = "catalogue_type_relationship_type";

/**
 * @constant CATALOGUE_TYPE_SECONDARY_ROL_STAFF
 * @description Tipo de rol secundario
 * @type {string}
 * @memberof Constants
 * */
export const CATALOGUE_TYPE_SECONDARY_ROL_STAFF = "catalogue_type_secondary_rol_staff";



/**
 * @constant CATALOGUE_TYPE_MAIN_ROL_CLIENT
 * @description Tipo de rol principal
 * @type {string}
 * @memberof Constants
 * */
export const CATALOGUE_TYPE_MAIN_ROL_CLIENT = "catalogue_type_main_rol_client";

/**
 * @constant CATALOGUE_TYPE_SECONDARY_ROL_CLIENT
 * @description Tipo de rol secundario
 * @type {string}
 * @memberof Constants
 * */
export const CATALOGUE_TYPE_SECONDARY_ROL_CLIENT = "catalogue_type_secondary_rol_client";