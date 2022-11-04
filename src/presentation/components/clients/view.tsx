import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import DataTable from "infrastructure/components/data-table";
import { user_interface } from "infrastructure/api/users";
import Modal from "infrastructure/components/modal";
import { ToastProps } from "infrastructure/components/toast";
import { ClientsViewProps } from "presentation/container/clients/view-container";
import { clients_interface } from "infrastructure/api/clients";

const ClientsView = (props: ClientsViewProps) => {
  useTitle(props.title);
  useBreadcrumbs(props.breadcrumbs);

  let navigate = useNavigate();

  const [clients, setClients] = useState<clients_interface.GetClientsResponse>({
    message: [],
    status: 0,
  });

  const [itemSeleted,setItemSelected] = useState<clients_interface.Client>({
   _id:"",
   contact:"",
   contact2:"",
   contactSchedule:"",
   country:"",
   createdAt:"",
   customerType:"",
   direction:"",
   discount:"",
   document:"",
   documentType:"",
   email:"",
   identityCounter:"",
   installations:[],
   location:"",
   mobilePhone:"",
   name:"",
   note:"",
   personType:"",
   phone:"",
   postalCode:"",
   province:"",
   roadType:"",
   userId:"",
   webpage:"",
   lastname:""
  })
  const [message, setMessage] = useState<ToastProps>({
    type: "info",
    visible: false,
    title: "",
    description: "",
  });
  const [showModal,setShowModal] = useState<boolean>(false);

  useEffect(() => {
    setClients(props.ClientsData);
  }, [props.ClientsData]);

  

  //useEffect for DeleteClient
  useEffect(() =>{
    if(props.DeleteClient.status === 200){
      setMessage({
        type: "success",
        visible: true,
        title: "Cliente eliminado",
        description: "El cliente se elimino correctamente",
      });
      props.onGetClientsAsync({
        token: props.token,
      });
      props.onClear()
      return;
    }

    if(props.DeleteClient.status !== 0){
      setMessage({
        type: "danger",
        visible: true,
        title: "Error",
        description: props.DeleteClient.error,
      });
      return;
    }

  },[props.DeleteClient])

  useEffect(() => {
    props.onGetClientsAsync({
      token: props.token,
    });
    props.onClear()
   
  }, []);


  const getActions = ()=>{
      let actions = [];

      actions.push( {
        color: "danger",
        icon: "bx bx-trash-alt",
        label: "Eliminar",
        name: "delete",
        onClick: (item: any) => {
            setItemSelected(item);
            setShowModal(true)
        },
      },{
        color: "warning",
        icon: "bx bx-edit-alt",
        label: "Editar",
        name: "edit",
        onClick: (item: any) => {
            navigate(`/inicio/clientes/${item._id}`)
        },
      })
      

      return actions;
  }

  const handleDelete=(item:clients_interface.Client)=>{
    props.onDeleteClientAsync({
      headers:{
        token:props.token
      },
      id:item._id
    })
    setShowModal(false);
  }

  return (
    <div className="row" id="table-borderless">
      <div className="col-12 mb-2">
        <Link to="/inicio/clientes/nuevo" className="btn btn-primary">
          Nuevo Cliente 
        </Link>
      </div>
      <div className="col-12">
        <div className="table-responsive ">
          <DataTable
            key={"table-group"}
            dataTable={clients.message}
            actions={getActions()}
            columns={[
              {
                name: "identityCounter",
                label: "DNI",
                type: "text",
              },
              {

                name:'name',
                label:'Nombre',
                type:'text'
              },
              {

                name:'lastname',
                label:'Apellido',
                type:'text'
              },

              {
                name: "personType",
                label: "Tipo de Persona",
                type: "text",
              },
              {
                name: "email",
                label: "Correo",
                type: "text",
              },
              {
                name: "createdAt",
                label: "Fecha Creación",
                type: "date",
              },
            ]}
            dataLimit={5}
            pageLimit={2}
          />
        </div>
      </div>

      <Modal className="modal-main" show={showModal} style={{}}>
        <div className="card">
          <div className="card-header">
              <h3>¿Desea eliminar el Cliente { itemSeleted.name } ?</h3>
          </div>
          <div className="card-footer d-flex justify-content-md-end">
              <button type="button" 
              className="btn btn-secondary"
              onClick={()=>setShowModal(false)}
              >Cancelar</button>
              <button type="button" 
              onClick={()=>handleDelete(itemSeleted)}
              className="btn btn-danger ml-md-3">Eliminar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ClientsView;
