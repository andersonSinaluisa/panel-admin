import { SUCCESS_HTTP_CODE_CREATED } from "application/common";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
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
  const [users, setUsers] = useState<user_interface.User[]>([])


  const [form, setForm] = useState<personal_interface.CreatePersonalRequest>({
    contact: "",
    contact2: "",
    contactSchedule: "",
    country: "",
    createdBy: "",
    direction: "",
    document: "",
    documentType: "",
    email: "",
    location: "",
    mobilePhone: "",
    name: "",
    phone: "",
    note: "",
    postalCode: "",
    province: "",
    type: "",
    userId: "",
    lastname1: ""
  });

  //create array with fields name, type, label, options and value
  const fields = [

    {
      name: "name",
      type: "text",
      label: "Nombre",
      options: [],
      value: form.name,
    },
    {
      name: "lastname1",
      type: "text",
      label: "Apellido",
      options: [],
      value: form.lastname1,
    },

    {
      name: "documentType",
      type: "select",
      label: "Tipo de documento",
      options: [
        { label: 'DNI', value: 'DNI' },
        { label: 'Otro', value: 'Otro' }
      ],
      value: form.documentType,
    },

    {
      name: "document",
      type: "text",
      label: "Documento",
      options: [],
      value: form.document,
    },

    {
      name: "country",
      type: "text",
      label: "País",
      options: [],
      value: form.country,
    },

    {
      name: "direction",
      type: "text",
      label: "Dirección",
      options: [],
      value: form.direction,
    },

    {
      name: "location",
      type: "text",
      label: "Localidad",
      options: [],
      value: form.location,
    },
    {
      name: "email",
      type: "text",
      label: "Email",
      options: [],
      value: form.email,
    },
    {
      name: "mobilePhone",
      type: "text",
      label: "Teléfono móvil",
      options: [],
      value: form.mobilePhone,
    },
    {
      name: "phone",
      type: "text",
      label: "Teléfono",
      options: [],
      value: form.phone,
    },
    {
      name: "note",

      type: "text",
      label: "Nota",
      options: [],
      value: form.note,
    },
    {
      name: "postalCode",
      type: "text",
      label: "Código postal",
      options: [],
      value: form.postalCode,
    },
    {
      name: "province",
      type: "text",
      label: "Provincia",
      options: [],
      value: form.province,
    },
    {
      name: "type",
      type: "select",
      label: "Tipo",
      options: [
        { label: 'interno', value: 'interno' },
        { label: 'externo', value: 'externo' },

      ],
      value: form.type,
    },

    {
      name: "contact",
      type: "text",
      label: "Contacto",
      options: [],
      value: form.contact,
    },
    {

      name: "contact2",
      type: "text",
      label: "Contacto 2",
      options: [],
      value: form.contact2,
    },
    {
      name: "contactSchedule",
      type: "text",
      label: "Horario de contacto",
      options: [],
      value: form.contactSchedule,
    },
    {
      name: "createdBy",
      type: "text",
      label: "Creado por",
      options: [],
      value: form.createdBy,
    },

  ];

  useEffect(() => {
    setUsers(props.GetUsers);
  }, [props.GetUsers])


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

    let error = ""


    Object.values(form).forEach(e => {
      if (e == "") {
        error = "Complete todos los campos"
        return;
      }
    })



    if (error !== "") {
      setMessage({
        description: error,
        title: "Error",
        type: "danger",
        visible: true
      })
      return;
    }

    props.onCreatePersonalAsync({
      headers: {
        token: props.token
      },
      body: form
    })


  };

  return (
    <section id="basic-vertical-layouts">
      <div className="col-12 row bg-cover">
        <div className="row p-2 col-12">
          {
            //create fields from form
            fields.map((field, index) => {
              if (field.type === "select") {
                return (
                  <div className="col-md-6 col-12" key={index}>
                    <Select
                      label={field.label}
                      name={field.name}
                      options={field.options}

                      selected={field.value}
                      onChange={handleChange}
                    />
                  </div>
                )
              } else {
                return (
                  <div className="col-12 col-md-6" key={index}>
                    <Input
                      name={field.name}
                      type={field.type}
                      label={field.label}
                      value={field.value}
                      onChange={handleChange}

                    />
                  </div>
                )
              }

            })


          }
          <div className="col-3">
            <label htmlFor="userId">Usuario</label>
            <SelectReact
              isSearchable={true}
              name="userId"
              options={users.map(e => ({
                value: e.id,
                label: e.email
              }))}
              placeholder="Seleccione un usuario"
              onChange={
                (e: any) => {
                  setForm({
                    ...form,
                    userId: e.value
                  })
                }
              }

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

export default CreatePersonal;
