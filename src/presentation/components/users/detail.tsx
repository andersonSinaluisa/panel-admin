import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SUCCESS_HTTP_CODE_CREATED } from "application/common";
import {
  useBreadcrumbs,
  useTitle,
} from "application/common/hooks/use-title";
import Input from "infrastructure/components/input";
import Toast, { ToastProps } from "infrastructure/components/toast";
import { user_interface } from "infrastructure/api/users";
import { UserCreateProps } from "presentation/container/users/create-container";
import Select from "infrastructure/components/select";
import { UserDetailProps } from "presentation/container/users/detail-container";
import { initUser } from "application/models/users";




const DetailUser = (props: UserDetailProps) => {


  let { id } = useParams();
  useTitle(props.title);
  useBreadcrumbs(props.breadcrumbs);

  let navigate = useNavigate()

  const [message, setMessage] = useState<ToastProps>({
    type: "info",
    visible: false,
    title: "",
    description: "",
  });

  const [form, setForm] = useState<user_interface.User>(
    initUser
  );


  useEffect(() => {
    try{
      props.onGetUserAsync({
        id: parseInt(id as string),
        headers: {
          token: props.token
        }
      })
    }catch(e){
      setMessage({
        description: "Error al obtener el usuario",
        title: "Error",
        type: "danger",
        visible: true,
      });
    }
   
  }, [])


  useEffect(() => {
    setForm(props.GetUser)

  }, [props.GetUser])


  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
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
            value={form.firstName} 
            enabled={true}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Segundo Nombre"
            name="secondName"
            type={"text"}
            value={form.secondName}
            enabled={true}
  
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Primer Apellido"
            name="firstSurname"
            type={"text"}
             value={form.firstSurname}
             enabled={true}

          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Segundo Apellido"
            name="secondSurname"
            type={"text"}
              value={form.secondSurname}
              enabled={true}

          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Tipo de Persona"
            name="personType"
            type={"text"}
            enabled={true}
            value={form.personType.name}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Tipo de Documento"
            name="documentType"
           type={"text"}
           enabled={true}

           value={form.documentType.name}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Documento"
            name="documentValue"
            type={"text"}
            enabled={true}
            value={form.documentValue}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Pais"
            name="country"
            type={"text"}
            enabled={true}
            value={form.country.name}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Estado/Pronvincia"
            name="province"
            type={"text"}
            enabled={true}
            value={form.province}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Localidad"
            name="location"
            type={"text"}
            enabled={true}
            value={form.location}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Dirección"
            name="direction"
            type={"text"}
            enabled={true}
            value = {form.direction}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Tipo de Calle"
            name="streetType"
            type={"text"}
            enabled={true}
            value={form.streetType.name}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Codigo Postal"
            name="postalCode"
            type={"text"}
            enabled={true}

             value={form.postalCode}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Telefono Fijo"
            name="landlinePhone"
            type={"tel"}
            enabled={true}
            value={form.landlinePhone}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Telefono Celular"
            name="mobilePhone"
            type={"tel"}
            enabled={true}
            value={form.mobilePhone}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Telefono de contacto"
            name="firstContact"
            type={"tel"}
            enabled={true}
            value={form.firstContact}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Telefono de contacto secundario"
            name="secondContact"
            type={"tel"}
            enabled={true}
            value={form.secondContact}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Horario de contacto"
            name="contactSchedule"
            type={"text"}
            enabled={true}
            value={form.contactSchedule}
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
            enabled={true}
            value={form.nickName}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Email"
            name="email"
            type={"email"}
            enabled={true}
            value={form.email}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Email Secundario"
            name="secondaryEmail"
            type={"email"}
            enabled={true}
            value={form.secondaryEmail}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Email de respaldo"
            name="backupEmail"
            type={"email"}
            enabled={true}
            value={form.backupEmail}
          />
        </div>
        
        <div className="col-lg-6">
          <Input
            label="Rol"
            name="role"
            type={"text"}
            enabled={true}
            value={form.role.name}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Activo"
            name="state"
            type={"text"}
            enabled={true}
            value={form.state.name}
          />
        </div>
        <div className="col-lg-6">
          <Input
            label="Disponibilidad"
            name="availability"
            type={"text"}
            enabled={true}
            value={form.availability.name}
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
          
        </div>
      </div>
    </div>
    <div className="toast-bs-container">
      <Toast {...message} />
    </div>
  </section>
  );
};

export default DetailUser;
