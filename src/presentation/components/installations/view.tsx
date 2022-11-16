import { getStatusInstallation ,status} from "application/common";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { clients_interface } from "infrastructure/api/clients";
import { installations_interface } from "infrastructure/api/installation";
import DataTable from "infrastructure/components/data-table";
import Modal from "infrastructure/components/modal";
import Select from "infrastructure/components/select";
import Toast, { ToastProps } from "infrastructure/components/toast";
import { ViewInstallationsProps } from "presentation/container/installations/view-container";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const ViewInstallations = (props:ViewInstallationsProps)=>{
    useTitle(props.title);
    useBreadcrumbs(props.breadcrumbs);
  
    let navigate = useNavigate();
  
    const [installations, setInstallations] = useState<installations_interface.GetInstallationsResponse>({
      message: [],
      status: 0,
      code:""
    });

    const [state,setState] = useState<installations_interface.UpdateStateInstallationsRequest>({
      state:0
    })
  
    const [clients,setClients] = useState<clients_interface.GetClientsResponse>({
      message: [],
      status: 0,
      
    });
    
    const [message, setMessage] = useState<ToastProps>({
      type: "info",
      visible: false,
      title: "",
      description: "",
    });
    const [showModal,setShowModal] = useState<boolean>(false);
  
    const [showModalStatus,SetShowModalStatus] = useState<boolean>(false)

    const [installation,setInstallation] = useState<installations_interface.Installation>({
      _id:"",
      name:"",
      owner:"",
      postalCode:"",
      location:"",
      province:"",
      country:"",
      createdAt:"",
      devices:"",
      state:0,
      note:"",
      identityCounter:"",
      users:[]
    })


    useEffect(() => {
        console.log(props.GetInstallations)
     setInstallations(props.GetInstallations)
    }, [props.GetInstallations]);

    useEffect(() => {
      setClients(props.GetClients)
    }, [props.GetClients]);

    
  
  
    useEffect(()=>{
      console.log(message)
      if(props.DeleteInstallation.status===200){
        setMessage({
          type: "success",
          visible: true,
          title: "Instalación eliminada",
          description: "La instalación se ha eliminado correctamente",
        });
        props.ClearState()

        return;
      }
      if(props.DeleteInstallation.status===400){
        setMessage({
          type: "danger",
          visible: true,
          title: "Error al eliminar la instalación",
          description: "La instalación no se ha eliminado correctamente",
        });
        props.ClearState()

        return;
      }
    },[props.DeleteInstallation])


    useEffect(()=>{
      console.log(message)

      if(props.UpdateStateInstallation.status===200){
        setMessage({
          type: "success",
          visible: true,
          title: "Instalación actualizada",
          description: "La instalación se ha actualizado correctamente",
        });
        props.ClearState()

        return;
      }
      if(props.UpdateStateInstallation.status===400){
        setMessage({
          type: "danger",
          visible: true,
          title: "Error al actualizar la instalación",
          description: "La instalación no se ha actualizado correctamente",
        });
        props.ClearState()

        return;
      }
      
    },[props.UpdateStateInstallation])

    
  
    useEffect(() => {
      props.GetInstallationsAsync({
        token: props.token,
      });
      props.onGetClientsAsync({
        token: props.token,
      })
      props.ClearState()
    }, []);
  
  
    const getActions = ()=>{
        let actions = [];
  
        actions.push( {
          color: "danger",
          icon: "bx bx-trash-alt",
          label: "Eliminar",
          name: "delete",
          onClick: (item: any) => {
              setShowModal(true)
              setInstallation(item)
          },
        },{
          color: "warning",
          icon: "bx bx-edit",
          label: "Actualizar estado",
          name: "update",
          onClick: (item: any) => {
              SetShowModalStatus(true)
              setShowModal(false)

              setInstallation(item)
          },
        },)
  
        return actions;
    }
  
    const handleDelete=(item:any)=>{
     
      setShowModal(false);
      props.DeleteInstallationAsync({
        headers:{
          token:props.token
        },
        id:item._id
      })
      props.GetInstallationsAsync({
        token: props.token,
      });
    }

    //handle status update
    const handleStatus=(item:any)=>{
      SetShowModalStatus(false)
      props.UpdateStateInstallationAsync({
        body:state,
        headers:{
          token:props.token
        },
        id:item._id
      })
      props.GetInstallationsAsync({
        token: props.token,
      });
    }
  
    return (
      <div className="row" id="table-borderless">
        <div className="col-12 mb-2">
          <Link to="/inicio/instalaciones/nuevo" className="btn btn-primary">
            Nueva instalación
          </Link>
        </div>
        <div className="col-12">
          <div className="table-responsive ">
            <DataTable
              key={"table-group"}
              dataTable={installations.message}
              actions={getActions()}
              columns={[
                {
                  name: "identityCounter",
                  label: "Identificador",
                  type: "text",
                },
                {
                  name: "owner",
                  label: "Propietario",
                  type: "render",
                  render(value) {
                    return (
                      <div>
                        {clients.message.map((client) => {
                          if (client._id === value) {
                            return client.name+ " " + client.lastname+" - "+client.document;
                          }
                        })}
                      </div>
                    );
                  },
                  
                },
                {
                  name: "postalCode",
                  label: "Codigo postal",
                  type: "text",
                },
                {
                  name: "location",
                  label: "Ubicación",
                  type: "text",
                },
                {
                    name: "province",
                    label: "Provincia",
                    type: "text",
                },
                {
                    name: "country",
                    label: "País",
                    type: "text",
                },
                {
                    name:'note',
                    label:'Nota',
                    type:'render',
                    render:(item:any)=>{
                        //split text with max length 20
                        if (item.length > 20) {
                             //see more button
                            return (
                                <div>{item.substring(0, 20)}...
                                    <button className="btn btn-link" onClick={() => {}}>
                                        Ver más
                                    </button>
                                </div>
                            );
                           
                        } else {
                            return item;
                        }
                       
                    }
                },
                {
                    name:'state',
                    label:'Estado',
                    type:'render',
                    render:(item)=>{
                        let {color,label} = getStatusInstallation(item);
                        return <span className={`badge badge-pill badge-${color}`}>{label}</span>
                    }
                }
              ]}
              dataLimit={5}
              pageLimit={2}
            />
          </div>
        </div>
  
        <Modal className="modal-main" show={showModal} style={{}}>
          <div className="card">
            <div className="card-header">
                <h3>¿Desea eliminar la instalación ?</h3>
            </div>
            <div className="card-footer d-flex justify-content-md-end">
                <button type="button" 
                className="btn btn-secondary"
                onClick={()=>setShowModal(false)}
                >Cancelar</button>
                <button type="button" 
                onClick={()=>handleDelete(installation)}
                className="btn btn-danger ml-md-3">Eliminar</button>
            </div>
          </div>
        </Modal>

        {/* modal for update status*/}
        
          <div className="toast-bs-container">
            <Toast {...message} />
          </div>
      </div>
    )
}

export default ViewInstallations;