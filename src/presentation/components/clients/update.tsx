import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useBreadcrumbs,
  useTitle,
} from "application/common/hooks/use-title";
import Input from "infrastructure/components/input";
import Toast, { ToastProps } from "infrastructure/components/toast";
import Select from "infrastructure/components/select";
import { clients_interface } from "infrastructure/api/clients";
import { user_interface } from "infrastructure/api/users";
import { UpdateClientProps } from "presentation/container/clients/update-container";
import DataTable from "infrastructure/components/data-table";

const UpdateClient = (props: UpdateClientProps) => {
  useTitle(props.title);
  useBreadcrumbs(props.breadcrumbs);

  const {id} = useParams();

  let navigate = useNavigate()

  const [message, setMessage] = useState<ToastProps>({
    type: "info",
    visible: false,
    title: "",
    description: "",
  });


  const [users,setUsers] = useState<user_interface.User[]>([])

  const [form, setForm] = 
  useState<clients_interface.Client>(
    {
        personType: "",
        documentType: "",
        document: "",
        name: "",
        customerType:"",
        roadType: "",
        direction: "",
        postalCode: "",
        location: "",
        province: "",
        country: "",
        phone: "",
        mobilePhone: "",
        contact: "",
        contact2: "",
        email: "",
        webpage: "",
        contactSchedule: "",
        discount: "0",
        note: "",
        _id:"",
        createdAt:"",
        identityCounter:"",
        installations:[],
        userId:"",
        lastname:""
        
    }
  );


  useEffect(()=>{
      let _id = id as string;
      props.onGetClientByIdAsync({
          headers:{
             token: props.token
          },
          id: _id
      })
  },[id])


  useEffect(()=>{
      if(props.GetClientById.status===200){


        setForm(props.GetClientById.data.message)
      }
  },[props.GetClientById])

  useEffect(()=>{
      if(props.UpdateClient.status===200){
          setMessage({
              description:"Cliente Creado correctamente",
              title:"",
              type:"success",
              visible:true
          })
          
          navigate('/inicio/clientes/')
      }

      if(props.UpdateClient.status!==0){
        setMessage({
            description:props.UpdateClient.error,
            title:"Error",
            type:"danger",
            visible:true
        })
      }
  },[props.UpdateClient])


  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = () => {
   
    let error = ""

    let datos:clients_interface.ClientUpdateRequest = {
      personType: form.personType,
      documentType: form.documentType,
      document: form.document,
      name: form.name,
      customerType:form.customerType,
      roadType: form.roadType,
      direction: form.direction,
      postalCode: form.postalCode,
      location: form.location,
      province: form.province,
      country: form.country,
      phone: form.phone,
      mobilePhone: form.mobilePhone,
      contact: form.contact,
      contact2: form.contact2,
      email: form.email,
      webpage: form.webpage,
      contactSchedule: form.contactSchedule,
      discount: form.discount,
      note: form.note,
      lastname:form.lastname
  }

    //validate data from key and values typescript
    Object.keys(datos).forEach((key) => {
      if (datos[key as keyof clients_interface.ClientUpdateRequest] === "") {
        error = "Todos los campos son obligatorios";
      }
    });


    
    if(error!==""){
        setMessage({
            description:error,
            title:"Error",
            type:"danger",
            visible:true
        })
        return;
    }
  
    props.onUpdateClientAsync({
      headers:{
        token:props.token
      },
      body:datos ,
      id:form._id
    })

    
  };

  return (
    <section id="basic-vertical-layouts">
      <div className="col-12 row bg-cover">
        <div className="row p-2 col-12">
        
        <div className="col-lg-6">
            
            <Select
             label="Tipo de Persona"
             name="personType"
             onChange={handleChange}
             options={[
                 {label:'Física',value:'fisica'},
                 {label:'Jurídica',value:'juridica'}
             ]}
             selected={form.personType}
           />
         </div>
          <div className="col-lg-6">
            
             <Select
              label="Tipo de Documento"
              name="documentType"
              onChange={handleChange}
              options={[
                  {label:'DNI',value:'DNI'},
                  {label:'Otro',value:'Otro'}
              ]}
              selected={form.documentType}

            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Documento"
              name="document"
              type={"text"}
              onChange={handleChange}
              value={form.document}
            />
          </div>
          <div className="col-lg-6">
          <Input
              label="Nombre"
              name="name"
              type={"text"}
              onChange={handleChange}
              value={form.name}
            />
          </div>
          <div className="col-lg-6">
          <Input
              label="Apellido"
              name="lastname"
              type={"text"}
              onChange={handleChange}
              value={form.lastname}
            />
          </div>
          <div className="col-lg-6">
            <Select
              label="Tipo de Cliente"
              name="customerType"
              onChange={handleChange}
              options={[
                  {label:'propietario',value:'propietario'},
                  {label:'invitado',value:'invitado'}
              ]}
              selected={form.customerType}
            />
          </div>
          <div className="col-lg-6">
            <Select
              label="Tipo de Vía"
              name="roadType"
              onChange={handleChange}
              options={[
                  {label:'Calle',value:'Calle'},
                  {label:'Avenida',value:'Avenida'},
                  {label:'Ctra',value:'Ctra'},
                  {label:'Plaza',value:'Plaza'}

              ]}
              selected={form.roadType}
            />
          </div>
          <div className="col-lg-6">
          <Input
              label="Dirección con numero y piso"
              name="direction"
              type={"text"}
              onChange={handleChange}
              value={form.direction}
            />
          </div>
          <div className="col-lg-6">
          <Input
              label="Codigo Postal"
              name="postalCode"
              type={"text"}
              onChange={handleChange}
              value={form.postalCode}

            />
          </div>
          <div className="col-lg-6">
          <Input
              label="Localidad"
              name="location"
              type={"text"}
              onChange={handleChange}
              value={form.location}

            />
          </div>
          <div className="col-lg-6">
          <Input
              label="País"
              name="country"
              type={"text"}
              onChange={handleChange}
              value={form.country}

            />
          </div>
          <div className="col-lg-6">
          <Input
              label="Provincia"
              name="province"
              type={"text"}
              onChange={handleChange}
              value={form.province}

            />
          </div>
          <div className="col-lg-6">
          <Input
              label="Teléfono"
              name="phone"
              type={"text"}
              onChange={handleChange}
              value={form.phone}

            />
          </div>
          <div className="col-lg-6">
          <Input
              label="Teléfono movil"
              name="mobilePhone"
              type={"text"}
              onChange={handleChange}
              value={form.mobilePhone}

            />
          </div>
          <div className="col-lg-6">
          <Input
              label="Contacto"
              name="contact"
              type={"text"}
              onChange={handleChange}
              value={form.contact}

            />
          </div>
          <div className="col-lg-6">
          <Input
              label="Contacto 2"
              name="contact2"
              type={"text"}
              onChange={handleChange}
              value={form.contact2}

            />
          </div>
          <div className="col-lg-6">
          <Input
              label="Correo"
              name="email"
              type={"email"}
              onChange={handleChange}
              value={form.email}

            />
          </div>
          <div className="col-lg-6">
          <Input
              label="Sitio web"
              name="webpage"
              type={"text"}
              onChange={handleChange}
              value={form.webpage}

            />
          </div>
          <div className="col-lg-6">
          <Input
              label="Horario de contacto"
              name="contactSchedule"
              type={"text"}
              onChange={handleChange}
              value={form.contactSchedule}

            />
          </div>
          <div className="col-lg-6">
          <Input
              label="Notas"
              name="note"
              type={"text"}
              onChange={handleChange}
              value={form.note}

            />
          </div>
          <div className="col-12">
          <hr />

          </div>
          <div className="col-12 table-responsive">
              <h3>Instalaciones</h3>
            
            <DataTable
                columns={[
                  {
                    name:"role",
                    label:"Rol",
                    type:"text"
                  },
                  {
                    name:"permissions",
                    label:"Permisos",
                    type:"array",
                    field_show:"name"
                  }
                ]}
                dataLimit={10}
                dataTable={form.installations}
                pageLimit={5}
                actions={[]}

              />      
          
          </div>
        </div>
        <div className="col-12 row ">
          <div className="col-12 justify-content-end d-md-flex ">
            <Link
              type="button"
              className="btn btn-lg btn-outline-dark m-2"
              to={`/inicio/clientes/`}
            >
              Atrás
            </Link>
            <button
              type="submit"
              className="btn btn-lg btn-primary m-2"
              value={"Agregar"}
              onClick={handleSubmit}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
      <div className="toast-bs-container">
        <Toast {...message} />
      </div>
    </section>
  );
};

export default UpdateClient;
