import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const CreateUser = (props: UserCreateProps) => {
  useTitle(props.title);
  useBreadcrumbs(props.breadcrumbs);

  let navigate = useNavigate()

  const [message, setMessage] = useState<ToastProps>({
    type: "info",
    visible: false,
    title: "",
    description: "",
  });

  const [form, setForm] = useState<user_interface.CreateUserRequest>({
    email:"",
    password:"",
    role:"personal"
  });



  useEffect(()=>{
      if(props.CreateUser.status===SUCCESS_HTTP_CODE_CREATED){
          setMessage({
              description:"Proveedor Creado correctamente",
              title:"",
              type:"success",
              visible:true
          })
          
          navigate('/inicio/usuarios/')
      }

      if(props.CreateUser.status!==0){
        setMessage({
            description:props.CreateUser.error,
            title:"Error",
            type:"danger",
            visible:true
        })
      }
  },[props.CreateUser])


  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = () => {
   
    if(form.email===""){
      setMessage({
        description:"Ingrese el correo",
        title:"Error",
        type:"warning",
        visible:true
      })
      return;
    }

    if(form.password===""){
      setMessage({
        description:"Ingrese la contraseña",
        title:"Error",
        type:"warning",
        visible:true
      })
      return;
    }

    props.onCreateUsersAsync({
      headers:{
        token:props.token
      },
      body:form
    })

    
  };

  return (
    <section id="basic-vertical-layouts">
      <div className="col-12 row bg-cover">
        <div className="row p-2 col-12">
          <div className="col-lg-6">
            <Input
              label="Correo"
              name="email"
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
              onChange={handleChange}
              options={[
                  {label:'Personal',value:'persona'},
                  {label:'Cliente',value:'cliente'}
              ]}
            />
          </div>
          
        </div>
        <div className="col-12 row ">
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
