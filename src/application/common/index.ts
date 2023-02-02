
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
export const DELETE_USER = "/auth/users/"



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
export const DELETE_CLIENT = "/core/clients/"


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
export const DELETE_INSTALLATION = "/core/installations/"

/**
 * @constant UPDATE_STATE_INSTALLATION
 * @description Actualizar el estado de una instalacion
 * @type {string}
 * @memberof Constants
 */
export const UPDATE_STATE_INSTALLATION = "/core/installations/"

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
export const GET_BY_ID_PERSONAL = "/core/staff/"

/**
 * @constant DELETE_PERSONAL
 * @description Eliminar un personal
 * @type {string}
 * @memberof Constants
 */
export const DELETE_PERSONAL = "/core/staff/"

/**
 * @constant UPDATE_PERSONAL
 * @description Actualizar un personal
 * @type {string}
 * @memberof Constants
 * 
 */
export const UPDATE_PERSONAL = "/core/staff/"

/**
 * @constant GET_WHAREHOUSES
 * @description Obtener los almacenes
 * @type {string}
 * @memberof Constants
 */
export const GET_WHAREHOUSES = "/core/warehouses";


/**
 * 
 * @constant GET_JOBS
 * @description Obtener los trabajos
 * @type {string}
 * @memberof Constants
 */
export const GET_JOBS = "/core/jobs";

/**
 * @constant CREATE_JOBS
 * @description Crear un trabajo
 * @type {string}
 * @memberof Constants
 */
export const CREATE_JOBS = "/core/jobs";

/**
 * @constant CLOSE_JOBS
 * @description Cerrar un trabajo
 * @type {string}
 * @memberof Constants
 */
export const CLOSE_JOBS = "/core/jobs";

/**
 * @constant DELETE_JOBS
 * @description Eliminar un trabajo
 * @type {string}
 */
export const DELETE_JOBS = "/core/jobs";


/**
 * @constant GET_TASKS
 * @description Obtener las tareas
 * @type {string}
 * @memberof Constants
 */
export const GET_TASKS = "/core/tasks";

/**
 * @constant CREATE_TASKS
 * @description Crear una tarea
 * @type {string}
 * @memberof Constants
 */
export const CREATE_TASKS = "/core/tasks";

/**
 * @constant CLOSE_TASKS
 * @description Cerrar una tarea
 * @type {string}
 * @memberof Constants
 */
export const CLOSE_TASKS = "/core/tasks";

/**
 * @constant DELETE_TASKS
 * @description Eliminar una tarea
 * @type {string}
 * @memberof Constants
 */
export const DELETE_TASKS = "/core/tasks";




/**
 * @constant GET_PRODUCTS
 * @description Obtener los productos
 * @type {string}
 * @memberof Constants
 */
export const GET_PRODUCTS = "/core/products";
/**
 * @constant CREATE_PRODUCTS
 * @description Crear un producto
 * @type {string}
 * @memberof Constants
 */
export const CREATE_PRODUCTS = "/core/products";

/**
 * @constant UPDATE_PRODUCTS
 * @description Actualizar un producto
 * @type {string}
 * @memberof Constants
 */
export const UPDATE_PRODUCTS = "/core/products/";


export const UPDATE_STOCK_PRODUCT = "/products/update-stock/";
export const CATALOGE_PRODUCT = "/products/catalog/";


/**
 * @constant DELETE_PRODUCT
 * @description Eliminar un producto
 * @type {string}
 * @memberof Constants
 */
export const DELETE_PRODUCT = "/core/products/";


export const SEARCH = "/searcher/";

export const GET_BILLING = "/core/invoices";
export const CREATE_BILLING = "/core/invoices";
export const DELETE_BILLING = "/core/invoices";



// Error Messages
export const errorEncountered = 'Error was encountered processing this request';
export const timeoutMessage = "We are unable to fetch data at this time, kindly check your internet connection and we'll reconnect you.";
export const timeoutDuration = 30000;

export const SUCCESS_HTTP_CODE_CREATED = 200

export const APP_NAME = "Panel"


/*    { color: 'primary', label: "ACTIVO",id:'type_installation_state_armed' },
    { color: 'primary', label: "ACTIVO",id:'type_installation_state_disarmed' },
    { color: 'warning', label: "Dormir",id:'type_installation_state_asleep' },
    { color: 'secondary', label: "Bloqueado",id:'type_installation_state_locked' },
    { color: 'danger', label: "Apagado",id:'type_installation_state_switchedOff' },*/


export const INSTALLATION_STATUS_ARMED = 'type_installation_state_armed'
export const INSTALLATION_STATUS_DISARMED = 'type_installation_state_disarmed'
export const INSTALLATION_STATUS_ASLEEP = 'type_installation_state_asleep'
export const INSTALLATION_STATUS_LOCKED = 'type_installation_state_locked'
export const INSTALLATION_STATUS_SWITCHEDOFF = 'type_installation_state_switchedOff'


export const getStatusInstallation = (id: string) => {
    switch (id) {
        case  INSTALLATION_STATUS_ARMED:
            return { color: 'primary', label: "ACTIVO",id:'type_installation_state_armed' }
        case  INSTALLATION_STATUS_DISARMED:
            return { color: 'primary', label: "ACTIVO",id:'type_installation_state_disarmed' }
        case  INSTALLATION_STATUS_ASLEEP:
            return { color: 'warning', label: "Dormir",id:'type_installation_state_asleep' }
        case  INSTALLATION_STATUS_LOCKED:
            return { color: 'secondary', label: "Bloqueado",id:'type_installation_state_locked' }
        case  INSTALLATION_STATUS_SWITCHEDOFF:
            return { color: 'danger', label: "Apagado",id:'type_installation_state_switchedOff' }
        default:
            return { color: 'primary', label: "ACTIVO",id:'type_installation_state_armed' }
    }
}


export const status = [
    { color: 'primary', label: "ACTIVO",id:'type_installation_state_armed' },
    { color: 'primary', label: "ACTIVO",id:'type_installation_state_disarmed' },
    { color: 'warning', label: "Dormir",id:'type_installation_state_asleep' },
    { color: 'secondary', label: "Bloqueado",id:'type_installation_state_locked' },
    { color: 'danger', label: "Apagado",id:'type_installation_state_switchedOff' },
    
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


//type_task_priority_high
/**
 * @constant TASK_PRIORITY_HIGH
 * @description Tipo de tarea alta
 * @type {string}
 * @memberof Constants
 */
export const TASK_PRIORITY_HIGH = "type_task_priority_high";


//type_task_priority_half
/**
 * @constant TASK_PRIORITY_HALF
 * @description Tipo de tarea media
 * @type {string}
 * @memberof Constants
 */
export const TASK_PRIORITY_HALF = "type_task_priority_half";

//type_task_priority_low
/**
 * @constant TASK_PRIORITY_LOW
 * @description Tipo de tarea baja
 * @type {string}
 * @memberof Constants
 * 
 */
export const TASK_PRIORITY_LOW = "type_task_priority_low";


//type_job_priority_high
export const JOB_PRIORITY_HIGH = "type_job_priority_high";

//type_job_priority_half
export const JOB_PRIORITY_HALF = "type_job_priority_half";

//type_job_priority_low
export const JOB_PRIORITY_LOW = "type_job_priority_low";


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

/**
 * @constant CATALOGUE_TYPE_PRODUCT_IN_WAREHOUSE
 * @description Tipo de producto en almacén
 * @type {string}
 * @memberof Constants
 */
export const  CATALOGUE_TYPE_PRODUCT_IN_WAREHOUSE = "catalogue_type_product_in_warehouse";