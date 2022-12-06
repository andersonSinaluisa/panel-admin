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
            label: 'Documento'

        }, {
            name: 'lastname',
            type: 'text',
            label: 'Apellido'
        }, {
            name: 'customerType',
            type: 'text',
            label: 'Tipo de cliente'
        }, {
            name: 'roadType',
            type: 'text',
            label:  'Tipo de vía'
        }, {
            name: 'direction',
            type: 'text',
            label: 'Dirección'
        }, {
            name: 'postalCode',
            type: 'text',
            label: 'Código postal'

        });

    }

    if (isInvoice(object)) {

        fields.push({
            name: 'address',
            type: 'text',
            label: 'Dirección'
        }, {
            name: 'billingDate',
            type: 'text',
            label: 'Fecha de facturación'
        }, {
            name: 'clientID',
            type: 'text',
            label: 'Cliente'
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
            label: 'propietario'
        }, {
            name: 'postalCode',
            type: 'text',
            label: 'Código postal'
        }, {
            name: 'location',
            type: 'text',
            label: 'Localización'
        }, {
            name: 'province',
            type: 'text',
            label: 'Provincia'
        }, {
            name: 'country',
            type: 'text',
            label: 'País'
        }, {
            name: 'note',
            type: 'text',
            label: 'Nota'
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
            label: 'Cliente'
        }, {
            name: 'direction',
            type: 'text',
            label: 'Dirección'
        }, {
            name: 'contactName',
            type: 'text',
            label: 'Nombre de contacto'
        }, {
            name: 'contactPhone',
            type: 'text',
            label: 'Teléfono de contacto'
        }, {
            name: 'obsContact',
            type: 'text',
            label: 'Observaciones de contacto'
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
            type: 'boolean',
            label: 'Catalogado'
        });
    
    
    }


    



    return fields;



};

export { getFieldsByType };

