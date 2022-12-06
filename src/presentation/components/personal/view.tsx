import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import DataTable from "infrastructure/components/data-table";
import Modal from "infrastructure/components/modal";
import { PersonalViewProps } from "presentation/container/personal/view-container";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {personal_interface} from 'infrastructure/api/personal';
import { ToastProps } from "infrastructure/components/toast";


const PersonalView = (props: PersonalViewProps) => {
    useTitle(props.title);
    useBreadcrumbs(props.breadcrumbs);
  
    let navigate = useNavigate();
  
    const [personal, setPersonal] = useState<personal_interface.GetPersonalResponse>({
      message: [],
      status: 0,
    });
  
    const [itemSeleted,setItemSelected] = useState<personal_interface.Personal>({
    
    _id:"",
    identityCounter:"",
    userId:"",
    documentType:"",
    document:"",
    name:"",
    type:"",
    direction:"",
    postalCode:"",
    location:"",
    province:"",
    country:"",
    phone:"",
    mobilePhone:"",
    contact:"",
    contact2:"",
    email:"",
    contactSchedule:"",
        
    note:"",
    permissions:[],
    dependents:0,
    createdBy:"",
    createdAt:"",
    lastname1:"",
    lastname2:"",
    })
    const [message, setMessage] = useState<ToastProps>({
      type: "info",
      visible: false,
      title: "",
      description: "",
    });
    const [showModal,setShowModal] = useState<boolean>(false);
  
    useEffect(() => {
        setPersonal(props.GetPersonal);
    }, [props.GetPersonal]);
  
  
    useEffect(() => {
      if(props.DeletePersonal.status===200){
          props.onGetPersonalAsync({
              token: props.token,
            });
          return;
      }
  
      if(props.DeletePersonal.status!==0){
          setMessage({
              description:props.DeletePersonal.error,
              title:"Error",
              type:"danger",
              visible:true
          })
  
          return;
      }
    }, [props.DeletePersonal])
    
  
    useEffect(() => {
      props.onGetPersonalAsync({
        token: props.token,
      });
      props.clear()
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
          color: "primary",
          icon: "bx bx-edit-alt",
          label: "Editar",
          name: "edit",
          onClick: (item: any) => {
            navigate(`/inicio/personal/${item._id}`);
          }
        })
  
        return actions;
    }
  
    const handleDelete=(item:personal_interface.Personal)=>{
      props.onDeletePersonalAsync({
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
          <Link to="/inicio/personal/nuevo" className="btn btn-primary">
            Nuevo Personal
          </Link>
        </div>
        <div className="col-12">
          <div className="table-responsive ">
            <DataTable
              key={"table-group"}
              dataTable={personal.message}
              actions={getActions()}
              columns={[
               
  
                {
                  name: "document",
                  label: "Identificación",
                  type: "text",
                },
                {
                    name:'name',
                    label:'Nombre',
                    type:'text'
                },
                {
                    name:'type',
                    label:'Tipo',
                    type:'text'
                },
                {
                    name:'direction',
                    label:'Dirección',
                    type:'text'
                },
                {
                  name: "type",
                  label: "Tipo",
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
                <h3>¿Desea eliminar el usuario { itemSeleted.email } ?</h3>
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
  
  export default PersonalView;
  