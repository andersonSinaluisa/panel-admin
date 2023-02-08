import { EXPORT_CLIENTS, EXPORT_INSTALLATIONS, getStatusInstallation ,status} from "application/common";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { initialInstallation } from "application/models/installations";
import { initialMetaResponse } from "infrastructure/api/api-handler";
import { clients_interface } from "infrastructure/api/clients";
import { ExportData } from "infrastructure/api/core/request";
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

    const [load,setLoad] = useState<boolean>(false)


    useEffect(() => {
     setInstallations(props.GetInstallations)
    }, [props.GetInstallations]);

    useEffect(() => {
      setClients(props.GetClients)
    }, [props.GetClients]);

    useEffect(() => {
      setLoad(props.isLoading)
    }, [props.isLoading]);
    
  
  
    useEffect(()=>{
      if(props.DeleteInstallation.status===200){
        setMessage({
          type: "success",
          visible: true,
          title: "Instalación eliminada",
          description: "La instalación se ha eliminado correctamente",
        });
        props.ClearState()
        setTimeout(() => {
          setMessage({
            type: "info",
            visible: false,
            title: "",
            description: "",
          });
        }, 3000);
        return;
      }
      if(props.DeleteInstallation.status!==0){
        setMessage({
          type: "danger",
          visible: true,
          title: "Error al eliminar la instalación",
          description: props.DeleteInstallation.error,
        });
        setTimeout(() => {
          setMessage({
            type: "info",
            visible: false,
            title: "",
            description: "",
          });
        }, 3000);
        props.ClearState()

        return;
      }
    },[props.DeleteInstallation])



    
  
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
          label: "Editar",
          name: "edit",
          onClick: (item: any) => {
              navigate(`/inicio/instalaciones/${item.id}`)
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
        id:item.id
      })
      props.GetInstallationsAsync({
        token: props.token,
      });
    }

    //handle status update

    const DownloadData = ()=>{
      ExportData(EXPORT_INSTALLATIONS,{
        token:props.token,
        
      }).pipe().subscribe((data)=>{
        //donwload excel file
        //attachment; filename=clients-report-probulon.xlsx
  
        if(data.status==200){
  
          const blob  = new Blob([data.data])
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.setAttribute('hidden','');
          a.setAttribute('href',url);
          a.setAttribute('download','instalaciones-reporte-probulon.xlsx');
          document.body.appendChild(a);
          a.click();
  
        }
      })
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
                  name: "client",
                  label: "Cliente",
                  type: "render",
                  render: (item: any) => {
                    return (
                      <div className="d-flex justify-content-center">
                        {item?.firstName} {item?.firstSurname}
                      </div>
                    );
                  }
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
                  label:"Estado",
                  name:"state",
                  type:"render",
                  render:(item:any)=>{
                    return(
                      <div className="d-flex justify-content-center">
                        <div className={
                          "badge badge-pill badge-"+getStatusInstallation(item.code).color+" font-size-12"
                        }  >
                          {getStatusInstallation(item.code).label}
                          </div>
                      </div>
                    )
                  }
                }
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
              isLoading={load}
              onDownload={DownloadData}
            />
          </div>
        </div>
  
        <Modal className="modal-main" show={showModal} style={{}}>
          <div className="card">
            <div className="card-header">
                <h3>¿Desea eliminar la instalación del cliente {installation.client.firstName+" "+installation.client.firstSurname} ?</h3>
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