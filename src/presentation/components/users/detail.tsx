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

const DetailUser = (props: UserDetailProps) => {


    let {id} = useParams();
  useTitle(props.title);
  useBreadcrumbs(props.breadcrumbs);

  let navigate = useNavigate()

  const [message, setMessage] = useState<ToastProps>({
    type: "info",
    visible: false,
    title: "",
    description: "",
  });

  const [form, setForm] = useState<user_interface.User>({
    email:"",
    _id:"",
    createdAt:"",
    identityCounter:"",
    personalData:"",
    role:"personal"
  });


  useEffect(()=>{
    props.onGetUserAsync({
        id:id as string,
        headers:{
            token: props.token
        }
    })
  },[])


  useEffect(()=>{

    setForm(props.GetUser)
      
  },[props.GetUser])


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
              label="Correo"
              name="email"
              type={"email"}
              onChange={handleChange}
              enabled={true}
              value={form.email}
            />
          </div>
         
          <div className="col-lg-6">
            
             <Input
              label="Rol"
              name="role"
              type={"text"}
              onChange={handleChange}
              enabled={true}
                value={form.role}
            />
          </div>

            <div className="col-lg-6">
                <Link to={
                    "/inicio/personal/"+form._id
                }>
                    Ver datos
                </Link>
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
