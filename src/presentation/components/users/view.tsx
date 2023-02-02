import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import DataTable from "infrastructure/components/data-table";
import { UsersViewProps } from "presentation/container/users/view-container";
import { user_interface } from "infrastructure/api/users";
import Modal from "infrastructure/components/modal";
import { ToastProps } from "infrastructure/components/toast";
import { initialMetaResponse } from "infrastructure/api/api-handler";
import { initUser } from "application/models/users";

const UserView = (props: UsersViewProps) => {
  useTitle(props.title);
  useBreadcrumbs(props.breadcrumbs);

  let navigate = useNavigate();

  const [users, setUsers] = useState<user_interface.GetUsers>({
    data: [],
    ...initialMetaResponse
  });

  const [itemSeleted, setItemSelected] = useState<user_interface.User>(initUser)
  const [message, setMessage] = useState<ToastProps>({
    type: "info",
    visible: false,
    title: "",
    description: "",
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [load,setLoad] = useState<boolean>(false)

  useEffect(() => {
    setUsers(props.UsersData);
  }, [props.UsersData]);

  useEffect(() => {
    setLoad(props.isLoading)
  },[props.isLoading])

  useEffect(() => {
    if (props.DeleteUser.status === 200) {
      props.onGetUsersAync({
        token: props.token,

      });
      return;
    }

    if (props.DeleteUser.status !== 0) {
      setMessage({
        description: props.DeleteUser.error,
        title: "Error",
        type: "danger",
        visible: true
      })

      return;
    }
  }, [props.DeleteUser])


  useEffect(() => {
    props.onGetUsersAync({
      token: props.token,
    });
  }, []);


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
    },)


    actions.push({
      color:'warning',
      icon:'bx bx-show',
      label: 'Ver',
      name:'edit',
      onClick:(item:any)=>{
        navigate('/inicio/usuarios/'+item.id)
      }
    })

    return actions;
  }

  const handleDelete = (item: user_interface.User) => {
    props.onDeleteUserAsync({
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
        <Link to="/inicio/usuarios/nuevo" className="btn btn-primary">
          Nuevo Usuario
        </Link>
      </div>
      <div className="col-12">
        <div className="table-responsive ">
          <DataTable
            key={"table-group"}
            dataTable={users.data}
            actions={getActions()}
            columns={[
              {
                name: "firstName",
                label: "Nombre",
                type: "text",
              },
              {
                name: "firstSurname",
                label: "Apellido",
                type: "text",
              },
              {
                label: "Email",
                name: "email",
                type: "text",
              },
              {
                label: "Rol",
                name: "role",
                type: "object",
                field_show: "name",
              }
            ]}
            dataLimit={15}
            pageLimit={2}
            meta={users.meta}
            onChangePage={(page: number) => {
              props.onGetUsersAync({
                token: props.token,
                page: page
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

export default UserView;
