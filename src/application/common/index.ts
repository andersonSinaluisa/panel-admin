
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
export const DELETE_JOBS = "/core/jobs/";


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
export const CLOSE_TASKS = "/core/task/:task_id/state";

/**
 * @constant DELETE_TASKS
 * @description Eliminar una tarea
 * @type {string}
 * @memberof Constants
 */
export const DELETE_TASKS = "/core/tasks/";




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

/**
 * @constant UPDATE_STOCK_PRODUCT
 * @deprecated
 * @description Actualizar el stock de un producto
 * @type {string}
 * @memberof Constants
 */
export const UPDATE_STOCK_PRODUCT = "/products/update-stock/";

/**
 * @constant CATALOGE_PRODUCT
 * @description Catalogar un producto
 * @type {string}
 * @deprecated
 * @memberof Constants
 * 
 */
export const CATALOGE_PRODUCT = "/products/catalog/";


/**
 * @constant DELETE_PRODUCT
 * @description Eliminar un producto
 * @type {string}
 * @memberof Constants
 */
export const DELETE_PRODUCT = "/core/products/";


export const SEARCH = "/searcher/";

/**
 * @constant GET_BILLING
 * @description Obtener las facturas
 * @type {string}
 * @memberof Constants
 * 
 */
export const GET_BILLING = "/core/invoices";

/**
 * @constant CREATE_BILLING
 * @description Crear una factura
 * @type {string}
 * @memberof Constants
 */
export const CREATE_BILLING = "/core/invoices";

/**
 * 
 * @constant DELETE_BILLING
 * @description Eliminar una factura
 * @type {string}
 * @memberof Constants
 */
export const DELETE_BILLING = "/core/invoices";



///probulon/users-export
/**
 * @constant EXPORT_USERS
 * @description Exportar usuarios
 * @type {string}
 * @memberof Constants
 */
export const EXPORT_USERS = "/probulon/users-export";
///probulon/clients-export
/**
 * @constant EXPORT_CLIENTS
 * @description Exportar clientes
 * @type {string}
 * @memberof Constants
 */
export const EXPORT_CLIENTS = "/probulon/clients-export";

//probulon/installations-export
/**
 * @constant EXPORT_INSTALLATIONS
 * @description Exportar instalaciones
 * @type {string}
 * @memberof Constants
 */
export const EXPORT_INSTALLATIONS = "/probulon/installations-export";

//probulon/staff-export
/**
 * @constant EXPORT_STAFF
 * @description Exportar personal
 * @type {string}
 * @memberof Constants
 */
export const EXPORT_STAFF = "/probulon/staff-export";

//probulon/jobs-export
/**
 * @constant EXPORT_JOBS
 * @description Exportar trabajos
 * @type {string}
 * @memberof Constants
 * 
 */
export const EXPORT_JOBS = "/probulon/jobs-export";


/**
 * @constant EXPORT_TASKS
 * @description Exportar tareas
 * @type {string}
 * @memberof Constants
 */
export const EXPORT_TASKS = "/probulon/tasks-export";


/**
 * @constant EXPORT_WAREHOUSES
 * @description Exportar almacenes
 * @type {string}
 * @memberof Constants
 */
export const EXPORT_WAREHOUSES = "/probulon/warehouses-export";

/**
 * @constant EXPORT_INVOICES
 * @description Exportar facturas
 * @type {string}
 * @memberof Constants
 */
export const EXPORT_INVOICES = "/probulon/invoices-export";

/**
 *  @constant DOWNLOAD_INVOICE
 * @description Descargar factura
 * @type {string}
 * @memberof Constants
 */
export const DOWNLOAD_INVOICE = "/core/download-invoice/";

/**
 * 
 * @constant errorEncountered
 * @description Mensaje de error
 * @type {string}
 * @memberof Constants
 */
export const errorEncountered = 'Error was encountered processing this request';

/**
 * 
 * @constant timeoutMessage
 * @description Mensaje de error
 * @type {string}
 * @memberof Constants
 */
export const timeoutMessage = "We are unable to fetch data at this time, kindly check your internet connection and we'll reconnect you.";

/**
 * 
 * @constant timeoutDuration
 * @description Duración del timeout
 * @type {number}
 * @memberof Constants
 */
export const timeoutDuration = 30000;

/**
 * 
 * @constant SUCCESS_HTTP_CODE_CREATED
 * @description Código de respuesta de creación
 * @type {number}
 * @memberof Constants
 */
export const SUCCESS_HTTP_CODE_CREATED = 200

/**
 * 
 * @constant APP_NAME
 * @description Nombre de la aplicación
 * @type {string}
 * @memberof Constants
 */
export const APP_NAME = "Panel"


/**
 * 
 * @constant INSTALLATION_STATUS_ARMED
 * @description Estado de la instalación activo
 * @type {string}
 * @memberof Constants
 */
export const INSTALLATION_STATUS_ARMED = 'type_installation_state_armed'

/**
 * 
 * @constant INSTALLATION_STATUS_DISARMED
 * @description Estado de la instalación desactivado
 * @type {string}
 * @memberof Constants
 */
export const INSTALLATION_STATUS_DISARMED = 'type_installation_state_disarmed'

/**
 * 
 * @constant INSTALLATION_STATUS_ASLEEP
 * @description Estado de la instalación dormido
 * @type {string}
 * @memberof Constants
 * 
 */
export const INSTALLATION_STATUS_ASLEEP = 'type_installation_state_asleep'

/**
 * 
 * @constant INSTALLATION_STATUS_LOCKED
 * @description Estado de la instalación bloqueado
 * @type {string}
 * @memberof Constants
 * 
 */
export const INSTALLATION_STATUS_LOCKED = 'type_installation_state_locked'

/**
 *  
 * @constant INSTALLATION_STATUS_SWITCHEDOFF
 * @description Estado de la instalación apagado
 * @type {string}
 * @memberof Constants
 */
export const INSTALLATION_STATUS_SWITCHEDOFF = 'type_installation_state_switchedOff'


/**
 * 
 * @constant getStatusInstallation
 * @description Obtener el estado de la instalación
 * @param {string} id
 * @returns {object}
 * @memberof Constants
 * 
 */
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


/**
 * 
 * @constant status
 * @description Estados de la instalación
 * @type {array}
 * @memberof Constants
 * 
 */
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

//catalogue_type_task_name
/**
 * @constant CATALOGUE_TYPE_TASK_NAME
 * @description Tipo de tarea
 * @type {string}
 * @memberof Constants
 * */
export const CATALOGUE_TYPE_TASK_NAME = "catalogue_type_task_name";

/**
 * @constant JOB_PRIORITY_HIGH
 * @description Tipo de trabajo alta
 * @type {string}
 * @memberof Constants
 * 
 */
export const JOB_PRIORITY_HIGH = "type_job_priority_high";

/**
 * @constant JOB_PRIORITY_HALF
 * @description Tipo de trabajo media
 * @type {string}
 * @memberof Constants
 */
export const JOB_PRIORITY_HALF = "type_job_priority_half";

/**
 * @constant JOB_PRIORITY_LOW
 * @description Tipo de trabajo baja
 * @type {string}
 * @memberof Constants
 */
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


/**
 * @constant CATALOGUE_TYPE_TASK_PRIORITY
 * @description Tipo de prioridad de tarea
 * @type {string}
 * @memberof Constants
 * */
export const CATALOGUE_TYPE_TASK_PRIORITY = "catalogue_type_task_priority";


/**
 * @constant CATALOGUE_TYPE_TASK
 * @description Tipo de tarea
 * @type {string}
 * @memberof Constants
 * */
export const CATALOGUE_TYPE_TASK = "catalogue_type_task";

//catalogue_type_job
/**
 * @constant CATALOGUE_TYPE_JOB
 * @description Tipo de trabajo
 * @type {string}
 * @memberof Constants
 * */
export const CATALOGUE_TYPE_JOB = "catalogue_type_job";


/**
 * @constant CATALOGUE_TYPE_JOB_PRIORITY
 * @description Tipo de prioridad de trabajo
 * @type {string}
 * @memberof Constants
 * */
export const CATALOGUE_TYPE_JOB_PRIORITY = "catalogue_type_job_priority";


/**
 * @constant CATALOGUE_TYPE_INVOICE_PAYMENT_METHOD
 * @description Tipo de método de pago
 * @type {string}
 * @memberof Constants
 * */
export const CATALOGUE_TYPE_INVOICE_PAYMENT_METHOD = "catalogue_type_invoice_payment_method";