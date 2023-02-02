/**
 * @fileoverview Componente de formulario de instalacion
 * @name edit.tsx
 * @author Anderson Sinaluisa - andersonsinaluisa.com
 * @license MIT
 * @version 1.0.0
 * @module presentation/components/installations/edit
 * @requires React
 * @requires application/common/hooks/use-title
 * @requires infrastructure/components/input
 * @requires infrastructure/components/toast
 * @requires react-router-dom
 * @requires infrastructure/api/installation
 * @requires application/common
 * @requires infrastructure/components/select
 * @requires infrastructure/api/clients
 * @requires presentation/container/installations/edit-container
 * @requires application/models/installations
 * @requires infrastructure/api/core
 * @requires react-select/async
 * 
 */


import React, { useEffect, useState } from "react";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import Input from "infrastructure/components/input";
import Toast, { ToastProps } from "infrastructure/components/toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { installations_interface } from "infrastructure/api/installation";
import { CATALOGUE_TYPE_COUNTRY, SUCCESS_HTTP_CODE_CREATED } from "application/common";
import Select from "infrastructure/components/select";
import {  clients_request } from "infrastructure/api/clients";
import { EditInstallationProps } from "presentation/container/installations/edit-container";
import { initialInstallation } from "application/models/installations";
import { interface_core } from "infrastructure/api/core";
import AsyncSelect from "react-select/async";
import { UpdateInstallationsRequest } from "infrastructure/api/installation/interface";



/**
 * @function EditInstallation
 * @param {EditInstallationProps} props
 * @returns {JSX.Element}
 * @example
 * connect(mapSatateToProps, mapDispatchToProps)(EditInstallation)
 */
const EditInstallation = (props: EditInstallationProps) => {
  
  /**
   * @memberof EditInstallation
   * @method useTitle
   * @description cambia el titulo de la pagina
   * @param {string} props.title
   */
  useTitle(props.title);


  /**
   * @memberof EditInstallation
   * @method useBreadcrumbs
   * @description cambia el breadcrumb de la pagina
   */
  useBreadcrumbs(props.breadcrumbs);


  /**
   * @memberof EditInstallation
   * @method useNavigate
   * @description permite navegar entre paginas
   * @param {string} props.title
   * @returns {Function} navigate
   * @example navigate("/installations")
   * @example navigate("/installations", { replace: true })
   * @example navigate("/installations", { state: { id: 1 } })
   * @example navigate("/installations", { replace: true, state: { id: 1 } })
   * @example navigate(-1)
   * @example navigate(-2)
    */
  let navigate = useNavigate();



  /**
   * @memberof EditInstallation
   * @method useState
   * @description permite manejar el estado de un componente
   * @param {ToastProps} { type: "info", visible: false, title: "", description: "", }
   * @returns {array} [message, setMessage]
   * @example message
   * @example setMessage
   * @example message.type
   * @example message.visible
   * */
  const [message, setMessage] = useState<ToastProps>({
    type: "info",
    visible: false,
    title: "",
    description: "",
  });


  /**
   * @memberof EditInstallation
   * @method useParams
   * @description permite obtener los parametros de la url
   * @returns {object} { id: string }
   * @example id
   * 
   */
  const { id } = useParams();

  /**
   * @memberof EditInstallation
   * @method useState
   * @description permite manejar el estado de un componente del formulario de instalacion
   * @param {installations_interface.Installation} initialInstallation
   * @returns {array} [form, setForm]
   * @example form
   * @example setForm
   * 
   */
  const [form, setForm] = useState<installations_interface.Installation>(initialInstallation);


  /**
   * @memberof EditInstallation
   *  @method useState
   * @description permite manejar el estado de un componente del formulario de instalacion cuando se esta cargando
   * @param {boolean} false
   * @returns {array} [load, setLoad]
   * @example load
   * @example setLoad
   */
  const [load, setLoad] = useState(false);


  /**
   * @memberof EditInstallation
   * @method useState
   *  @description permite manejar el estado del componente para obtener el catalogo
   * @param {interface_core.State[]} []
   * @returns {array} [catalogue, setCatalogues]
   * @example catalogue
   * @example setCatalogues
   * */
  const [catalogue, setCatalogues] = useState<interface_core.State[]>([])



  /**
   * @memberof EditInstallation
   * @method useEffect
   * @description permite ejecutar una funcion cuando se renderiza el componente, para obtener el catalogo
   * @param {Function} () => void
   * @returns {void}
   * 
   */
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


  /**
   * @memberof EditInstallation
   * @method useEffect
   * @description permite ejecutar una funcion cuando se renderiza el componente, para setear el estado de carga
   * @param {Function} () => void
   * @returns {void}
   * */
  useEffect(() => {
    setLoad(props.isLoading)
  }, [props.isLoading])



  /**
   * @memberof EditInstallation
   * @method useEffect
   * @description permite ejecutar una funcion cuando se renderiza el componente, para setear los datos de la instalacion
   * @param {Function} () => void
   * @returns {void}
   * 
   */
  useEffect(() => {
    setForm(props.GetInstallation);
  }, [props.GetInstallation]);


  /**
   * @memberof EditInstallation
   * @method useEffect
   * @description permite ejecutar una funcion cuando se renderiza el componente, para obtener los datos de la instalacion una vez actualizada
   * @param {Function} () => void
   * @returns {void}
   * 
   */
  useEffect(() => {
      if(props.UpdateStateInstallation.status==SUCCESS_HTTP_CODE_CREATED){
        setMessage({
          description: "Instalación actualizada correctamente",
          title: "Instalación",
          type: "success",
          visible: true
        })
        navigate("/inicio/instalaciones/");
        return;
      }

      
    if (props.UpdateStateInstallation.status !== 0) {
      setMessage({
        description: props.UpdateStateInstallation.error,
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
  }, [props.UpdateStateInstallation]);

  /**
   * @memberof EditInstallation
   * @method useEffect
   * @description permite ejecutar una funcion cuando se renderiza el componente, para obtener los datos de la instalacion
   * @param {Function} () => void
   * @returns {void}
   * 
   */
  useEffect(() => {
    props.GetInstallationAsync({
      headers: {
        token: props.token
      },
      id: parseInt(id as string)
    });
  }, []);






  /**
   * @memberof EditInstallation
   * @method useEffect
   * @description funcion que se ejecuta cuando se actualiza el estado de el input donde se implementa
   * @param {React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} event
   * @returns {void}
   * 
   * @example 
   *  <Input
   *    name="name"
   *    label="Nombre"
   *    value={form.name}
   *    onChange={handleChange}
   *    />
   */
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


  /**
   * @memberof EditInstallation
   * @method handleSubmit
   * @description funcion que se ejecuta cuando se envia el formulario
   * @returns {void}
   */
  const handleSubmit = () => {


    let data :UpdateInstallationsRequest= {
        name: form.name,
        client: {
          id: form.client.id
        },
        country: {
          id: form.country.id
        },
        description: form.description,
        direction: form.direction,
        location: form.location,
        postalCode: form.postalCode,
        province: form.province,
        state:{
          id: form.state.id
        }
    }

    props.UpdateStateInstallationAsync({
      headers: {
        token: props.token
      },
      body: data,
      id: parseInt(id as string)
    });
  };


  /**
   *  @memberof EditInstallation
   * @method searchClient
   * @description funcion que se ejecuta cuando se busca un cliente
   * @param {string} inputValue
   * @param {Function} callback
   * @returns {void}
   */
  const searchClient = (inputValue: string, callback: (options: any[]) => void) => {

    if (inputValue.length > 3) {
      clients_request.GetClients({
        token: props.token,
        page: 1,
        perPage: 100,
        search: inputValue
      }).toPromise().then((res) => {
        callback(res?.data?.data?.map((item) => {
          return {
            label: item.firstName + " " + item.firstSurname + " / " + item.documentValue,
            value: item.id,
            item: item
          }
        }) || [])
      })
    }


  }


  /**
   * @memberof EditInstallation
   * @method getListByCode
   * @description funcion que permite obtener una lista de un catalogo
   * @param {string} code
   * @returns {array} [{label: string, value: string}]
   */
  const getListByCode = (code: string) => {
    return catalogue.filter((item) => item.type.code === code).map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    })
  }


  /**
   * @memberof EditInstallation
   * @method handleChangeSelect
   * @description funcion que se ejecuta cuando se cambia el valor de un select
   * @param {React.FormEvent<HTMLSelectElement>} event
   * @returns {void}
   * 
   */
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
              value={form.name}
            />
          </div>
          <div className="col-lg-6">
            <label htmlFor="description">Descripción</label>
            <textarea
              className="form-control"
              name="description"
              onChange={handleChange}
              placeholder="Descripción"
              value={form.description}
            ></textarea>
          </div>
          <div className="col-lg-6">
            <Input
              label="Codigo Postal"
              name="postalCode"
              type={"text"}
              onChange={handleChange}
              value={form.postalCode}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Provincia"
              name="province"
              type={"text"}
              onChange={handleChange}
              value={form.province}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Localidad"
              name="location"
              type={"text"}
              onChange={handleChange}
              value={form.location}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Dirección"
              name="direction"
              type={"text"}
              onChange={handleChange}
              value={form.direction}
            />
          </div>
          <div className="col-lg-6">
            <Select
              label="País"
              name="country"
              onChange={handleChangeSelect}
              options={getListByCode(CATALOGUE_TYPE_COUNTRY)}
              selected={form.country?.id}
            />
          </div>
          <div className="col-lg-6">
            <label htmlFor="client">Cliente</label>
            <AsyncSelect

              loadOptions={(inputValue, callback) => {
                searchClient(inputValue, callback)

              }}
              name="client"
              onChange={
                (newValue: any) => {
                  setForm({
                    ...form,
                    client: newValue?.item
                  })
                }
              }
              value={form.client.id ? { label: form.client.firstName + " " + form.client.firstSurname , value: form.client.id } : null}
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
              </button> : <div className="spinner-border text-primary m-2" role="status">
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

export default EditInstallation;
