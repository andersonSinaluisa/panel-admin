import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATALOGUE_TYPE_COUNTRY, CATALOGUE_TYPE_DOCUMENT, CATALOGUE_TYPE_MAIN_ROL_STAFF, CATALOGUE_TYPE_ORGANISATION_OR_ENTITY_WITH_PERSONALITY_LEGAL, CATALOGUE_TYPE_RECORD_AVAILABILITY, CATALOGUE_TYPE_SECONDARY_ROL_STAFF, CATALOGUE_TYPE_STREET, CATALOGUE_TYPE_USER_STATE, SUCCESS_HTTP_CODE_CREATED } from "application/common";
import {
  useBreadcrumbs,
  useTitle,
} from "application/common/hooks/use-title";
import Input from "infrastructure/components/input";
import Toast, { ToastProps } from "infrastructure/components/toast";
import { user_interface } from "infrastructure/api/users";
import { UserCreateProps } from "presentation/container/users/create-container";
import Select from "infrastructure/components/select";
import { Role } from "infrastructure/api/core/interface";
import { interface_core } from "infrastructure/api/core";
import { useAuth } from "application/common/hooks/use-auth";

const CreateUser = (props: UserCreateProps) => {
  useTitle(props.title);
  useBreadcrumbs(props.breadcrumbs);
  const {  dataLogin } = useAuth();

  let navigate = useNavigate()

  const [message, setMessage] = useState<ToastProps>({
    type: "info",
    visible: false,
    title: "",
    description: "",
  });


  const [roles, setRoles] = useState<Role[]>([])

  const [form, setForm] = useState<user_interface.CreateUserRequest>({

    nickName: "",
    firstName: "",
    secondName: "",
    firstSurname: "",
    secondSurname: "",
    email: "",
    secondaryEmail: "",
    backupEmail: "",
    password: "",
    documentValue: "",
    province: "",
    location: "",
    direction: "",
    postalCode: "",
    landlinePhone: "",
    mobilePhone: "",
    firstContact: "",
    secondContact: "",
    contactSchedule: "",
    discount: "",
    tracing: "",
    description: "",
    state: {
      id: 0
    },
    availability: {
      id: 0
    },
    role: {
      id: 0,
      role:{
        id:0
      }
      
    },
    personType: {
      id: 0
    },
    documentType: {
      id: 0
    },
    streetType: {
      id: 0
    },
    country: {
      id: 0
    },
    createdBy: {
      id: 0
    },
    secondaryEmailRelationship: null,
    backupEmailRelationship: null,
  });


  const [catalogue, setCatalogues] = useState<interface_core.State[]>([])


  useEffect(() => {

    if (props.catalogues.status == 200) {
      setCatalogues(props.catalogues.data.data)
      return;
    } 
    if(props.catalogues.status!=0){
      setMessage({
        description: props.catalogues.error,
        title: "Error",
        type: "danger",
        visible: true
      })
      setTimeout(() => {
        setMessage({
          type: "info",
          visible: false,
          title: "",
          description: "",
        });
      }, 8000);
      return;
    }

  }, [props.catalogues])


  useEffect(() => {
    if (props.CreateUser.status === SUCCESS_HTTP_CODE_CREATED) {
      setMessage({
        description: "Usuario Creado correctamente",
        title: "",
        type: "success",
        visible: true
      })

      navigate('/inicio/usuarios/')
    }

    if (props.CreateUser.status !== 0) {
      setMessage({
        description: props.CreateUser.error,
        title: "Error",
        type: "danger",
        visible: true
      })
    }
  }, [props.CreateUser])


  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };


  const handleChangeSelect = (
    event: React.FormEvent<HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [event.currentTarget.name]: {
        id: event.currentTarget.value
      },
    });
  };

  const handleSubmit = () => {

    console.log(form)
    form.createdBy = {
      id:dataLogin.data.id
    }
     props.onCreateUsersAsync({
       headers: {
         token: props.token
       },
       body: form
     })


  };


  const getListByCode = (code: string) => {
    return catalogue.filter((item) => item.type.code === code).map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    })
  }

  return (
    <section id="basic-vertical-layouts">
      <div className="col-12 row bg-cover">
        <div className="row p-2 col-12">

          <div className="col-lg-6">
            <Input
              label="Primer Nombre"
              name="firstName"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Segundo Nombre"
              name="secondName"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Primer Apellido"
              name="firstSurname"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Segundo Apellido"
              name="secondSurname"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Select
              label="Tipo de Persona"
              name="personType"
              onChange={handleChangeSelect}
              options={getListByCode(CATALOGUE_TYPE_ORGANISATION_OR_ENTITY_WITH_PERSONALITY_LEGAL)}
            />
          </div>
          <div className="col-lg-6">
            <Select
              label="Tipo de Documento"
              name="documentType"
              onChange={handleChangeSelect}
              options={getListByCode(CATALOGUE_TYPE_DOCUMENT)}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Documento"
              name="documentValue"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Select
              label="Pais"
              name="country"
              onChange={handleChangeSelect}
              options={getListByCode(CATALOGUE_TYPE_COUNTRY)}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Estado/Pronvincia"
              name="province"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Localidad"
              name="location"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Dirección"
              name="direction"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Select
              label="Tipo de Calle"
              name="streetType"
              onChange={handleChangeSelect}
              options={getListByCode(CATALOGUE_TYPE_STREET)}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Codigo Postal"
              name="postalCode"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Telefono Fijo"
              name="landlinePhone"
              type={"tel"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Telefono Celular"
              name="mobilePhone"
              type={"tel"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Telefono de contacto"
              name="firstContact"
              type={"tel"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Telefono de contacto secundario"
              name="secondContact"
              type={"tel"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Horario de contacto"
              name="contactSchedule"
              type={"text"}
              onChange={handleChange}
            />
          </div>
        </div>
        <hr />
        <div className="col-12 row p-2">
          <div className="col-lg-6">
            <Input
              label="Nombre de usuario"
              name="nickName"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Email"
              name="email"
              type={"email"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Email Secundario"
              name="secondaryEmail"
              type={"email"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Email de respaldo"
              name="backupEmail"
              type={"email"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Contraseña"
              name="password"
              type={"password"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Select
              label="Rol"
              name="role"
              onChange={handleChangeSelect}
              options={getListByCode(CATALOGUE_TYPE_MAIN_ROL_STAFF)}
            />
          </div>
          <div className="col-lg-6">
            <Select
              label="Rol Secundario"
              name="role"
              onChange={(e)=>{
                console.log(e.target.value)
                setForm({
                  ...form,
                  role:{
                    ...form.role,
                    role:{
                      id: parseInt(e.target.value)
                    }
                  }
                })
              }}
              options={getListByCode(CATALOGUE_TYPE_SECONDARY_ROL_STAFF)}
            />
          </div>
          <div className="col-lg-6">
            <Select
              label="Activo"
              name="state"
              onChange={handleChangeSelect}
              options={getListByCode(CATALOGUE_TYPE_USER_STATE)}
            />
          </div>
          <div className="col-lg-6">
            <Select
              label="Disponibilidad"
              name="availability"
              onChange={handleChangeSelect}
              options={getListByCode(CATALOGUE_TYPE_RECORD_AVAILABILITY)}
            />
          </div>
        </div>
        <div className="col-12 r.ow ">
          <div className="col-12 justify-content-end d-md-flex ">
            <Link
              type="button"
              className="btn btn-lg btn-outline-dark m-2"
              to={`/inicio/usuarios/`}
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

export default CreateUser;
