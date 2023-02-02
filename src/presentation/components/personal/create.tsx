import { CATALOGUE_TYPE_COUNTRY, CATALOGUE_TYPE_DOCUMENT, CATALOGUE_TYPE_MAIN_ROL_CLIENT, CATALOGUE_TYPE_MAIN_ROL_STAFF, CATALOGUE_TYPE_ORGANISATION_OR_ENTITY_WITH_PERSONALITY_LEGAL, CATALOGUE_TYPE_RECORD_AVAILABILITY, CATALOGUE_TYPE_SECONDARY_ROL_CLIENT, CATALOGUE_TYPE_STREET, CATALOGUE_TYPE_USER_STATE, SUCCESS_HTTP_CODE_CREATED } from "application/common";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { interface_core } from "infrastructure/api/core";
import { personal_interface } from "infrastructure/api/personal";
import { user_interface } from "infrastructure/api/users";
import Input from "infrastructure/components/input";
import Select from "infrastructure/components/select";
import Toast, { ToastProps } from "infrastructure/components/toast";
import { CreatePersonalProps } from "presentation/container/personal/create-container";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SelectReact from 'react-select';


const CreatePersonal = (props: CreatePersonalProps) => {
  useTitle(props.title);
  useBreadcrumbs(props.breadcrumbs);

  let navigate = useNavigate()

  const [message, setMessage] = useState<ToastProps>({
    type: "info",
    visible: false,
    title: "",
    description: "",
  });

  const [load,setLoad] = useState<boolean>(false)
  const [form, setForm] = useState<personal_interface.CreatePersonalRequest>(
    {
      
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
      }
  );
  const [catalogue, setCatalogues] = useState<interface_core.State[]>([])

  useEffect(() => {
    setCatalogues(props.catalogue.data.data);
  }, [props.catalogue])

  useEffect(() => {
    setLoad(props.isLoading);
  }, [props.isLoading])


  useEffect(() => {
    if (props.CreatePersonal.status === SUCCESS_HTTP_CODE_CREATED) {
      setMessage({
        description: "Proveedor Creado correctamente",
        title: "",
        type: "success",
        visible: true
      })

      navigate('/inicio/usuarios/')
    }

    if (props.CreatePersonal.status !== 0) {
      setMessage({
        description: props.CreatePersonal.error,
        title: "Error",
        type: "danger",
        visible: true
      })
      setTimeout(() => {
        setMessage({
          description: "",
          title: "",
          type: "danger",
          visible: false
        })
      }, 5000);
    }
  }, [props.CreatePersonal])


  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = () => {


    props.onCreatePersonalAsync({
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
            label="Rol"
            name="role"
            onChange={(e)=>{
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
            options={getListByCode(CATALOGUE_TYPE_SECONDARY_ROL_CLIENT)}
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
            to={`/inicio/personal/`}
          >
            Atrás
          </Link>
          {
            load? <button type="button" className="btn btn-lg btn-primary m-2" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Cargando...
          </button>:    <button
            type="submit"
            className="btn btn-lg btn-primary m-2"
            value={"Agregar"}
            onClick={handleSubmit}
          >
            Guardar
          </button>
          }
      
        </div>
      </div>
    </div>
    <div className="toast-bs-container">
      <Toast {...message} />
    </div>
  </section>
  );
};

export default CreatePersonal;
