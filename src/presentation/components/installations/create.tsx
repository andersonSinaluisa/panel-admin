import React, { useEffect, useState } from "react";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import Input from "infrastructure/components/input";
import Toast, { ToastProps } from "infrastructure/components/toast";
import { CreateInstallationProps } from "presentation/container/installations/create-container";
import { Link, useNavigate } from "react-router-dom";
import { installations_interface } from "infrastructure/api/installation";
import { CATALOGUE_TYPE_COUNTRY, SUCCESS_HTTP_CODE_CREATED } from "application/common";
import Select from "infrastructure/components/select";
import { clients_interface, clients_request } from "infrastructure/api/clients";
import SelectReact from 'react-select';
import json from 'application/common/utils/datos.json';
import { initialMetaResponse } from "infrastructure/api/api-handler";
import { interface_core } from "infrastructure/api/core";
import AsyncSelect from 'react-select/async';
import { Client } from "infrastructure/api/clients/interface";

const CreateInstallation = (props: CreateInstallationProps) => {
  useTitle(props.title);
  useBreadcrumbs(props.breadcrumbs);

  let navigate = useNavigate();

  let [load,setLoad] = useState(false);


  const [message, setMessage] = useState<ToastProps>({
    type: "info",
    visible: false,
    title: "",
    description: "",
  });

  const [form, setForm] =
    useState<installations_interface.CreateInstallationRequest>({

      name: "",
      postalCode: "",
      province: "",
      location: "",
      direction: "",
      description: "",
      country: {
        id: 0,
      },
      client: {
        id: 0,
      },
      clients: [],
    });


  const [clients, setClients] = useState<clients_interface.GetClientsResponse>({
    data: [],
    ...initialMetaResponse
  })


  useEffect(() => {
    console.log(props.isLoading)
    setLoad(props.isLoading);
  }, [props.isLoading])



  useEffect(() => {
    if (props.CreateInstallation.status === 200) {
      setMessage({
        description: "Proveedor Creado correctamente",
        title: "",
        type: "success",
        visible: true,
      });

      navigate("/inicio/instalaciones/");
    }

    if (props.CreateInstallation.status !== 0) {
      setMessage({
        description: props.CreateInstallation.error,
        title: "Error",
        type: "danger",
        visible: true,
      });
      setTimeout(() => {
        setMessage({
          type: "info",
          visible: false,
          title: "",
          description: "",
        });
      }, 8000);
    }
  }, [props.CreateInstallation]);

  useEffect(() => {
    setClients(props.GetClients);
  }, [props.GetClients])

  useEffect(() => {

    props.onGetClientsAsync({
      token: props.token
    })
  }, [])

  const [catalogue, setCatalogues] = useState<interface_core.State[]>([])


  useEffect(() => {

    if (props.catalogues.status == 200) {
      setCatalogues(props.catalogues.data.data)
      return;
    }
    if (props.catalogues.status != 0) {
      setMessage({
        description: props.catalogues.error,
        title: "Error",
        type: "danger",
        visible: true
      })
      return;
    }

  }, [props.catalogues])


  const searchClient = (inputValue: string,callback: (options: any[]) => void)  => {
    
      if (inputValue.length > 3) {
        clients_request.GetClients({
          token: props.token,
          page: 1,
          perPage: 100,
          search: inputValue
        }).toPromise().then((res) => {
          callback(res?.data?.data?.map((item) => {
            return {
              label: item.firstName+" "+item.firstSurname+" / "+item.documentValue,
              value: item.id
            }
          }) || [])
        }) 
      }
    
    
  }

  const handleChange = (
    event: React.FormEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = () => {
    //validate form fields
    setLoad(true);
    props.CreateInstallationAsync({
      headers: {
        token: props.token,
      },
      body: form,
    });
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
              label="Nombre"
              name="name"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <label htmlFor="description">Descripción</label>
            <textarea
              className="form-control"
              name="description"
              onChange={handleChange}
              placeholder="Descripción"
            ></textarea>
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
              label="Provincia"
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
              label="País"
              name="country"
              onChange={handleChangeSelect}
              options={getListByCode(CATALOGUE_TYPE_COUNTRY)}
            />
          </div>
          <div className="col-lg-6">
            <label htmlFor="client">Cliente</label>
            <AsyncSelect 
            
              loadOptions={(inputValue, callback) => {
                searchClient(inputValue,callback)
              
              }}
              name="client"
              onChange={
                (newValue:any) => {
                  setForm({
                    ...form,
                    client: {
                      id: newValue.value
                    },
                  });
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
              to={`/inicio/instalaciones/`}
            >
              Atrás
            </Link>
            {
              !load ? <button
              type="submit"
              className="btn btn-lg btn-primary m-2"
              value={"Agregar"}
              onClick={handleSubmit}
            >
              Guardar
            </button>: <div className="spinner-border text-primary m-2" role="status">
            <span className="sr-only">Loading...</span>
          </div>
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

export default CreateInstallation;
