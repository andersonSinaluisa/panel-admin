import { Interface } from "readline";
import { isClient, isInstallation, isUser, isInvoice, isJob, isPersonal, isTask, isProduct } from "./is";

export interface Field {
    name: string;
    type: string;
    label: string;

}


const getFieldsByType = (object: any): Field[] => {



    const fields: Field[] = [
       
    ];

    if (isUser(object)) {
        fields.push({
            name: 'email',
            type: 'email',
            label: 'Correo'
        });
    }

    if (isClient(object)) {

        fields.push({
            name: 'document',
            type: 'text',
            label: 'Document'

        }, {
            name: 'lastname',
            type: 'text',
            label: 'Lastname'
        }, {
            name: 'customerType',
            type: 'text',
            label: 'Customer Type'
        }, {
            name: 'roadType',
            type: 'text',
            label: 'Road Type'
        }, {
            name: 'direction',
            type: 'text',
            label: 'Direction'
        }, {
            name: 'postalCode',
            type: 'text',
            label: 'Postal Code'

        });

    }

    if (isInvoice(object)) {

        fields.push({
            name: 'address',
            type: 'text',
            label: 'Address'
        }, {
            name: 'billingDate',
            type: 'text',
            label: 'Billing Date'
        }, {
            name: 'clientID',
            type: 'text',
            label: 'Client ID'
        }, {
            name: 'NumeroIdentificacionFiscal',
            type: 'text',
            label: 'Numero Identificacion Fiscal'
        });
    }

    if (isInstallation(object)) {
    
 
        fields.push({
            name: 'identityCounter',
            type: 'text',
            label: 'Identity Counter'
        }, {
            name: 'owner',
            type: 'text',
            label: 'Owner'
        }, {
            name: 'postalCode',
            type: 'text',
            label: 'Postal Code'
        }, {
            name: 'location',
            type: 'text',
            label: 'Location'
        }, {
            name: 'province',
            type: 'text',
            label: 'Province'
        }, {
            name: 'country',
            type: 'text',
            label: 'Country'
        }, {
            name: 'note',
            type: 'text',
            label: 'Note'
        });
    }


    if(isJob(object)){

        fields.push({
            name: 'identityCounter',
            type: 'text',
            label: 'Identity Counter'
        }, {
            name: 'idClient',
            type: 'text',
            label: 'Id Client'
        }, {
            name: 'direction',
            type: 'text',
            label: 'Direction'
        }, {
            name: 'contactName',
            type: 'text',
            label: 'Contact Name'
        }, {
            name: 'contactPhone',
            type: 'text',
            label: 'Contact Phone'
        }, {
            name: 'obsContact',
            type: 'text',
            label: 'Obs Contact'
        })
    }

    if (isPersonal(object)) {

        fields.push({
            name :'document',
            type: 'text',
            label: 'Documento'
        }, 
        {
            name:'name',
            type: 'text',
            label: 'Nombre'
        },
        
        {
            name: 'lastname1',
            type: 'text',
            label: 'Apellido'
        }, {
            name: 'lastname2',
            type: 'text',
            label: 'Apellido 2'
        }, {
            name: 'type',
            type: 'text',
            label: 'Tipo'
        });
    
    }

    if(isTask(object)){

        fields.push({
            name: 'name',
            type: 'text',
            label: 'Nombre'
        }, {
            name: 'type',
            type: 'text',
            label: 'Tipo'
        }, {
            name: 'description',
            type: 'text',
            label: 'Descripción'
        }, {
            name: 'state',
            type: 'text',
            label: 'Estado'
        })
    }

    if (isProduct(object)) {
      
        fields.push({
            name: 'identityCounter',
            type: 'text',
            label: 'Identity Counter'
        }, {
            name: 'name',
            type: 'text',
            label: 'Nombre'
        }, {
            name: 'nroSerie',
            type: 'text',
            label: 'Nro Serie'
        }, {
            name: 'description',
            type: 'text',
            label: 'Descripción'
        }, {
            name: 'precioVentaPublico',
            type: 'text',
            label: 'Precio Venta Publico'
        }, {
            name: 'cataloged',
            type: 'text',
            label: 'Cataloged'
        });
    
    
    }


    



    return fields;



};

export { getFieldsByType };

