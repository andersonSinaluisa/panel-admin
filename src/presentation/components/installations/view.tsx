import { getStatusInstallation ,status} from "application/common";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { initialInstallation } from "application/models/installations";
import { initialMetaResponse } from "infrastructure/api/api-handler";
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
      data: [],
      ...initialMetaResponse
    });

    const [state,setState] = useState<installations_interface.UpdateStateInstallationsRequest>({
      state:0
    })
  
    const [clients,setClients] = useState<clients_interface.GetClientsResponse>({
      data: [],
      ...initialMetaResponse
      
    });
    
    const [message, setMessage] = useState<ToastProps>({
      type: "info",
      visible: false,
      title: "",
      description: "",
    });
    const [showModal,setShowModal] = useState<boolean>(false);
  
    const [showModalStatus,SetShowModalStatus] = useState<boolean>(false)

    const [installation,setInstallation] = useState<installations_interface.Installation>(initialInstallation)


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
        },/*{
          color: "warning",
          icon: "bx bx-edit",
          label: "Actualizar estado",
          name: "update",
          onClick: (item: any) => {
              SetShowModalStatus(true)
              setShowModal(false)

              setInstallation(item)
          },
        },*/{
          color: "warning",
          icon: "bx bx-edit",
          label: "Editar",
          name: "edit",
          onClick: (item: any) => {
              navigate(`/inicio/instalaciones/${item._id}`)
          }
          
        })
  
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
              dataTable={installations.data}
              actions={getActions()}
              columns={[
               
                
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
              ]}
              dataLimit={15}
              pageLimit={2}
              meta={installations.meta}
              onChangePage={(page: number) => {
                props.GetInstallationsAsync({
                  token: props.token,
                  page: page,
                });
              }}
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
        <Modal className="modal-main" show={showModalStatus} style={{}}>
        <div className="card">
            <div className="card-header">
                <h3>Actualizar estado de la instalación</h3>
            </div>
            <div className="card-body">
              <Select
                label="Seleccione el estado"
                name="status"
                options={status.map(x=>{
                  return {label:x.label,value:x.id}
                })}
                onChange={(e:any)=>{
                  setState({
                    state:e.currentTarget.value
                  })
                }}
              />
            </div>
            <div className="card-footer d-flex justify-content-md-end">
                <button type="button" 
                className="btn btn-secondary"
                onClick={()=>SetShowModalStatus(false)}
                >Cancelar</button>
                <button type="button" 
                onClick={()=>handleStatus(installation)}
                className="btn btn-success ml-md-3">Actualizar</button>
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