import { clients_interface } from "infrastructure/api/clients";
import { installations_interface } from "infrastructure/api/installation";
import { jobs_interface } from "infrastructure/api/jobs";
import { personal_interface } from "infrastructure/api/personal";
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



    return '_id' in value && 'identityCounter' in value && 'userId' in value && 'personType' in value && 'documentType' in value && 'document' in value && 'name' in value && 'lastname' in value && 'customerType' in value && 'roadType' in value && 'direction' in value && 'postalCode' in value && 'location' in value && 'province' in value && 'country' in value && 'phone' in value && 'mobilePhone' in value && 'contact' in value && 'contact2' in value && 'email' in value && 'webpage' in value && 'contactSchedule' in value && 'discount' in value && 'note' in value && 'installations' in value && 'createdAt' in value;
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

export {
    isTask,
    isJob,
    isUser,
    isClient,
    isInstallation,
    isPersonal
}
