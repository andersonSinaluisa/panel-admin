import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import DataTable from "infrastructure/components/data-table";
import Modal from "infrastructure/components/modal";
import { PersonalViewProps } from "presentation/container/personal/view-container";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { personal_interface } from 'infrastructure/api/personal';
import { ToastProps } from "infrastructure/components/toast";
import { initialMetaResponse } from "infrastructure/api/api-handler";
import { initPersonal } from "application/models/personal";


const PersonalView = (props: PersonalViewProps) => {
  useTitle(props.title);
  useBreadcrumbs(props.breadcrumbs);

  let navigate = useNavigate();

  const [personal, setPersonal] = useState<personal_interface.GetPersonalResponse>({
    data: [],
    ...initialMetaResponse
  });

  const [itemSeleted, setItemSelected] = useState<personal_interface.Personal>(initPersonal)
  const [message, setMessage] = useState<ToastProps>({
    type: "info",
    visible: false,
    title: "",
    description: "",
  });
  const [showModal, setShowModal] = useState<boolean>(false);


  const [load, setLoad] = useState<boolean>(false);


  useEffect(() => {
    setLoad(props.isLoading);
  }, [props.isLoading]);

  useEffect(() => {
    setPersonal(props.GetPersonal);

  }, [props.GetPersonal]);


  useEffect(() => {
    if (props.DeletePersonal.status === 200) {
      setMessage({
        description: "El personal se elimino correctamente",
        title: "Exito",
        type: "success",
        visible: true
      })

      setTimeout(() => {
        setMessage({

          description: "",
          title: "",
          type: "info",
          visible: false
        })
      }, 3000);
      props.onGetPersonalAsync({
        token: props.token,
      });
      return;
    }

    if (props.DeletePersonal.status !== 0) {
      setMessage({
        description: props.DeletePersonal.error,
        title: "Error",
        type: "danger",
        visible: true
      })

      setTimeout(() => {
        setMessage({

          description: "",
          title: "",
          type: "info",
          visible: false
        })
      }, 3000);
      return;
    }
  }, [props.DeletePersonal])


  useEffect(() => {
    if (props.GetPersonal.message.status === 0) {

      props.onGetPersonalAsync({
        token: props.token,
      });
    }
    props.clear()
  }, [props.title]);


  const getActions = () => {
    let actions = [];

    actions.push({
      color: "danger",
      icon: "bx bx-trash-alt",
      label: "Eliminar",
      name: "delete",
      onClick: (item: any) => {
        setItemSelected(item);
        setShowModal(true)
      },
    }, {
      color: "warning",
      icon: "bx bx-edit-alt",
      label: "Editar",
      name: "edit",
      onClick: (item: any) => {
        navigate(`/inicio/personal/${item.id}`);
      }
    })

    return actions;
  }

  const handleDelete = (item: personal_interface.Personal) => {
    props.onDeletePersonalAsync({
      headers: {
        token: props.token
      },
      id: item.id
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
            dataTable={personal.data}
            actions={getActions()}
            columns={[


              {
                name: "documentValue",
                label: "Documento",
                type: "text",
              },
              {
                name: 'firstName',
                label: 'Nombre',
                type: 'text'
              },
              {
                name: 'firstSurname',
                label: 'Apellido',
                type: 'text'
              },
              {
                name: 'direction',
                label: 'Dirección',
                type: 'text'
              },
              {
                name: "createdAt",
                label: "Fecha Creación",
                type: "date",
              }
            ]}
            dataLimit={5}
            pageLimit={2}
            meta={personal.meta}
            onChangePage={(page: number) => {
              props.onGetPersonalAsync({
                token: props.token,
                page,
              });
            }}
            isLoading={load}
          />
        </div>
      </div>

      <Modal className="modal-main" show={showModal} style={{}}>
        <div className="card">
          <div className="card-header">
            <h3>¿Desea eliminar el usuario {itemSeleted.email} ?</h3>
          </div>
          <div className="card-footer d-flex justify-content-md-end">
            <button type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >Cancelar</button>
            <button type="button"
              onClick={() => handleDelete(itemSeleted)}
              className="btn btn-danger ml-md-3">Eliminar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PersonalView;
