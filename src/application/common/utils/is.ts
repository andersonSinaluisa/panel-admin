import { clients_interface } from "infrastructure/api/clients";
import { installations_interface } from "infrastructure/api/installation";
import { invoice_interface } from "infrastructure/api/invoice";
import { jobs_interface } from "infrastructure/api/jobs";
import { personal_interface } from "infrastructure/api/personal";
import { products_interface } from "infrastructure/api/products";
import { tasks_interface } from "infrastructure/api/tasks";
import { user_interface } from "infrastructure/api/users";

function isTask(value: any): value is tasks_interface.Task {

    return '_id' in value && 'identityCounter' in value && 'name' in value && 'type' in value && 'description' in value && 'state' in value && 'priority' in value && 'interventionDate' in value && 'responsible' in value && 'createdBy' in value && 'observation' in value && 'createdAt' in value;
}


function isJob(value: any): value is jobs_interface.Job {




    return '_id' in value && 'idClient' in value && 'direction' in value && 'contactName' in value && 'contactPhone' in value && 'obsContact' in value && 'type' in value && 'priority' in value && 'interventionDate' in value && 'description' in value && 'material' in value && 'technical' in value && 'workReport' in value && 'note' in value && 'createdAt' in value && 'state' in value && '__v' in value;

}


function isUser(value: any): value is user_interface.User {



    return '_id' in value && 'identityCounter' in value && 'email' in value && 'role' in value && 'personalData' in value && 'createdAt' in value;
}

function isClient(value: any): value is clients_interface.Client {


    return '_id' in value && 'identityCounter' in value && 'name' in value && 'contact' in value && 'contact2' in value && 'contactSchedule' in value && 'country' in value && 'createdAt' in value && 'createdBy' in value && 'direction' in value && 'discount' in value && 'document' in value && 'documentType' in value && 'email' in value && 'firstLogin' in value && 'installations' in value && 'lastname' in value && 'location' in value && 'mobilePhone' in value && 'note' in value && 'personType' in value && 'phone' in value && 'postalCode' in value && 'province' in value && 'roadType' in value && 'userId' in value && 'webpage' in value ;
}

function isInstallation(value: any): value is installations_interface.Installation {


    return '_id' in value && 'identityCounter' in value && 'name' in value && 'owner' in value && 'postalCode' in value && 'location' in value && 'province' in value && 'country' in value && 'note' in value && 'devices' in value && 'users' in value && 'createdAt' in value && 'state' in value;
}

function isPersonal(value: any): value is personal_interface.Personal {



    return '_id' in value && 'identityCounter' in value && 'userId' in value
        && 'documentType' in value && 'document' in value && 'name' in value
        && 'type' in value && 'direction' in value && 'postalCode' in value
        && 'location' in value && 'province' in value && 'country' in value
        && 'phone' in value && 'mobilePhone' in value
        && 'email' in value && 'contactSchedule' in value
        && 'note' in value && 'permissions' in value && 'dependents' in value
        && 'createdBy' in value && 'createdAt' in value && 'lastname1' in value
        && 'lastname2' in value;
}


function isInvoice(value: any): value is invoice_interface.Invoice {

    return '_id' in value && 'identityCounter' in value && 'state' in value && 'billingDate' in value && 'clientID' in value && 'NumeroIdentificacionFiscal' in value && 'products' in value && 'workReport' in value && 'workDirection' in value && 'clientDiscount' in value && 'discount' in value && 'IVA' in value && 'impuestosVariables' in value && 'paymentMethod' in value && 'note' in value && 'createdBy' in value && 'createdAt' in value;
}

function isProduct(value: any): value is products_interface.Product {

    /* _id: string;
     identityCounter: string;
     name: string;
     nroSerie: string;
     description: string;
     precioVentaPublico: number;
     cataloged: boolean;
     stock: number;
     assigned: boolean;
     assignedTo: string;
     note: string;
     createdAt: string;*/
    return '_id' in value && 'identityCounter' in value && 'name' in value && 'nroSerie' in value && 'description' in value && 'precioVentaPublico' in value && 'cataloged' in value && 'stock' in value && 'assigned' in value && 'assignedTo' in value && 'note' in value && 'createdAt' in value;

}

export {
    isTask,
    isJob,
    isUser,
    isClient,
    isInstallation,
    isPersonal,
    isInvoice,
    isProduct
}
