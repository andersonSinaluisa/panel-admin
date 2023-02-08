import { useQuery } from "application/common/hooks/use-query";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { initJob } from "application/models/jobs";
import { ExportToCsv } from "export-to-csv";
import { initialMetaResponse } from "infrastructure/api/api-handler";
import { clients_interface, clients_request } from "infrastructure/api/clients";
import { jobs_interface } from "infrastructure/api/jobs";
import FilterLabel from "infrastructure/components/filter-label";
import Input from "infrastructure/components/input";
import ListGroup from "infrastructure/components/list-group";
import Modal from "infrastructure/components/modal";
import Select from "infrastructure/components/select";
import SidebarLeft from "infrastructure/components/sidebar-left";
import SidebarRight from "infrastructure/components/sidebar-right";
import TaskList from "infrastructure/components/task-list";
import Toast, { ToastProps } from "infrastructure/components/toast";
import TodoMenu from "infrastructure/components/todo-menu";
import TodoSearch from "infrastructure/components/todo-search";
import { ViewJobsProps } from "presentation/container/jobs/view-container";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SelectReact from 'react-select';
import { JOB_PRIORITY_HIGH,JOB_PRIORITY_HALF,JOB_PRIORITY_LOW, CATALOGUE_TYPE_TASK, CATALOGUE_TYPE_JOB, CATALOGUE_TYPE_JOB_PRIORITY, EXPORT_JOBS } from "application/common";
import { interface_core } from "infrastructure/api/core";
import AsyncSelect from "react-select/async";
import { personal_request } from "infrastructure/api/personal";
import { ExportData } from "infrastructure/api/core/request";



const ViewJobs = (props: ViewJobsProps) => {


    useTitle(props.title)
    useBreadcrumbs(props.breadcrumbs)

    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalClose, setShowModalClose] = useState<boolean>(false)

    //get query params
    const query = useQuery();



    const [closeJob, SetCloseJob] = useState<jobs_interface.CloseJobRequest>({
        materials: [],
        description: "",
        status: {
            id: 0
        },
        workReport: "",
    })

    const [jobs, setJobs] = useState<jobs_interface.GetJobsResponse>({
        data: [],
        ...initialMetaResponse
    })
    const [clients, setClients] = useState<clients_interface.GetClientsResponse>({
        data: [],
        ...initialMetaResponse
    })

    const [message, setMessage] = useState<ToastProps>({
        type: "info",
        visible: false,
        title: "",
        description: "",
    });


    const [form, setForm] = useState<jobs_interface.Job>(initJob)
    const [catalogue, setCatalogues] = useState<interface_core.State[]>([])

    useEffect(() => {
        setCatalogues(props.catalogue.data.data);
    }, [props.catalogue])

    useEffect(() => {
        props.onGetJobsAsync({
            token: props.token
        })
        props.onGetClientsAsync({
            token: props.token
        })
    }, [])


    /*useEffect(() => {
        if(query.get("job")){
            jobs.data.filter((job) => {
                if(job.id+"" === query.get("job")){
                    
                    setJob(job)
                    setShow(true)
                }
            }
            )
        }
    }, [jobs.message])*/
    useEffect(() => {
        if(props.DeleteJob.status === 200){
            setMessage({
                description: "Trabajo Eliminado correctamente",
                title: "",
                type: "success",
                visible: true
            })
            setTimeout(() => {
                setMessage({
                    type: "info",
                    visible: false,
                    title: "",
                    description: "",
                })
            }, 3000)
            props.onGetJobsAsync({
                token: props.token
            })
            return;
        }
        if(props.DeleteJob.status !== 0){
            setMessage({
                description: props.DeleteJob.error,
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
                })
            }, 3000)

            return;
        }
    }, [props.DeleteJob])


    useEffect(() => {
        if (props.CreateJob.status === 200) {
            setMessage({
                description: "Trabajo Creado correctamente",
                title: "",
                type: "success",
                visible: true
            })
            setTimeout(() => {
                setMessage({
                    type: "info",
                    visible: false,
                    title: "",
                    description: "",
                })
            }, 3000)
            return;
        }

        if (props.CreateJob.status !== 0) {
            setMessage({
                description: props.CreateJob.error,
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
                })
            }, 3000)
            return;
        }
    }, [props.CreateJob])



    useEffect(() => {
        document.body.className = ""
        document.body.className = "vertical-layout vertical-menu-modern boxicon-layout no-card-shadow content-left-sidebar todo-application navbar-sticky footer-static "


    }, [])

    useEffect(() => {

        if (props.CloseJob.status !== 0) {
            if (props.CloseJob.status === 200) {
                setMessage({
                    description: "Trabajo Cerrado correctamente",
                    title: "",
                    type: "success",
                    visible: true
                })
                props.onGetJobsAsync({
                    token: props.token
                })
                return;
            }
            setMessage({
                description: props.CloseJob.error,
                title: "Error",
                type: "danger",
                visible: true
            })
            return;
        }

    }, [props.CloseJob])
    

    useEffect(() => {
        setJobs({
            data:[...jobs.data, ...props.GetJobs.data],
            message: props.GetJobs.message,
            links: props.GetJobs.links,
            meta: props.GetJobs.meta
        })
    }, [props.GetJobs])

    useEffect(() => {
        setClients(props.GetClients)
    }, [props.GetClients])


    const handleChange = (
        event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };


    const handleShowModal = (job: jobs_interface.Job) => {
        setShowModal(true)
        setForm(job)
    }



    const handleSave = () => {

       props.onCreateJobAsync({
            body: form,
            headers: {
                token: props.token
            }
        })

        props.onGetJobsAsync({
            token: props.token
        })
        setShow(false)
    }


    const handleOpenCreateJob = () => {
        setShow(true)
        setForm(initJob)
    }

    const handleDeleteJob = (job: any) => {

        props.onDeleteJobAsync({
            headers: {
                token: props.token
            },
            id: job.id
        })
        setShowModal(false)
        props.onGetJobsAsync({
            token: props.token
        })
    }


    const handleCloseJob = (job: any) => {
        setShowModalClose(true)
        setForm(job)
    }

    const handleSaveCloseJob = () => {
       
        setShowModalClose(false)

    }

    const handleSelect = (item: jobs_interface.Job) => {
        setForm(item)
        setShow(true)
    }

    
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

      
      const DownloadData = ()=>{
        ExportData(EXPORT_JOBS,{
          token:props.token,
          
        }).pipe().subscribe((data)=>{
          //donwload excel file
          //attachment; filename=clients-report-probulon.xlsx
    
          if(data.status==200){
    
            const blob  = new Blob([data.data])
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden','');
            a.setAttribute('href',url);
            a.setAttribute('download','trabajos-reporte-probulon.xlsx');
            document.body.appendChild(a);
            a.click();
    
          }
        })
      }


      const searchPersonal = (inputValue: string, callback: (options: any[]) => void) => {

        if (inputValue.length > 3) {
            personal_request.GetPersonal({
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

    return (
        <div className="content-area-wrapper" style={{ top: '-90px' }}>
            <SidebarLeft>
                <TodoMenu>
                    <div className="form-group text-center add-task">
                        {/* new task button */}
                        <button type="button" className="btn btn-primary add-task-btn btn-block my-1" onClick={() => handleOpenCreateJob()}>
                            <i className="bx bx-plus"></i>
                            <span>
                                {
                                    form.id === 0 ? "Nuevo Trabajo" : "Ver Trabajo"
                                }
                            </span>
                        </button>
                    </div>
                    {/* sidebar list start */}
                    <div className="sidebar-menu-list">
                        <ListGroup
                            key={1}
                            items={[
                                {
                                    label: "Todas",
                                    onClick: () => { }
                                },
                            ]}
                        />

                        <FilterLabel label="Filtros" />
                        <ListGroup
                            key={1}
                            items={[
                                {
                                    label: "Hoy",
                                    onClick: () => { }
                                },
                                {
                                    label: "Ayer",
                                    onClick: () => { }
                                },
                            ]}
                        />

                        <FilterLabel label="Estados" />

                        <ListGroup
                            key={1}
                            items={[
                                {
                                    label: <>{"Abiertas"} <span className="bullet bullet-sm bullet-success"></span></>,
                                    classes: "d-flex align-items-center justify-content-between",
                                    onClick: () => { }
                                },
                                {
                                    label: <>{"Cerradas"} <span className="bullet bullet-sm bullet-danger"></span></>,
                                    classes: "d-flex align-items-center justify-content-between",
                                    onClick: () => { }
                                },
                            ]}
                        />
                        <FilterLabel label="Prioridad" />

                        <ListGroup
                            key={1}
                            items={[
                                {
                                    label: <>{"Alta"} <span className="bullet bullet-sm bullet-warning"></span></>,
                                    classes: "d-flex align-items-center justify-content-between",
                                    onClick: () => { }
                                },
                                {
                                    label: <>{"Media"} <span className="bullet bullet-sm bullet-info"></span></>,
                                    classes: "d-flex align-items-center justify-content-between",
                                    onClick: () => { }
                                },
                                {
                                    label: <>{"Baja"} <span className="bullet bullet-sm bullet-success"></span></>,
                                    classes: "d-flex align-items-center justify-content-between",
                                    onClick: () => { }
                                },
                            ]}
                        />
                    </div>
                </TodoMenu>

                {/* todo new task sidebar */}
                <SidebarRight
                    title="Nuevo Trabajo"
                    onClose={() => setShow(!show)}
                    show={show}
                >
                    <>
                        <Select
                            name="type"
                            label="Tipo"
                            options={getListByCode(CATALOGUE_TYPE_JOB)}
                            onChange={handleChangeSelect}
                            selected={form.type.id}
                            disabled={form.id !== 0}
                        />

                        
                        <Select
                            name="priority"
                            options={getListByCode(CATALOGUE_TYPE_JOB_PRIORITY)}
                            label="Prioridad"
                            selected={form.priority.id}
                            disabled={form.id !== 0}
                            onChange={handleChangeSelect}

                        />
                       
                       <Input
                            label="Dirección"
                            placeholder="Dirección"
                            type="text"
                            name="direction"
                            onChange={handleChange}
                            value={form.direction}
                            enabled={form.id !== 0}

                        />

                       <label htmlFor="technical">Técnico</label>
                        <AsyncSelect
                            isSearchable={true}
                            name="technical"
                            placeholder=""
                            onChange={
                                (e: any) => {
                                    setForm({
                                        ...form,
                                        technical:e.item
                                    })
                                }
                            }
                            value={
                                form.technical.id !== 0 ? {
                                    label: form.technical.firstName+ " "+form.technical.firstSurname,
                                    value: form.technical.id
                                } : null
                            }
                            isDisabled={form.id !== 0}

                            loadOptions={searchPersonal}
                        />

                        <label htmlFor="type">Cliente</label>
                        <AsyncSelect
                            isSearchable={true}
                            name="client"
                            placeholder=""
                            onChange={
                                (e: any) => {
                                    setForm({
                                        ...form,
                                       client :e.item
                                    })
                                }
                            }
                            loadOptions={searchClient}
                            value={
                                form.client.id !== 0 ? {
                                    label: form.client.firstName+ " "+form.client.firstSurname,
                                    value: form.client.id
                                } : null
                            }
                            isDisabled={form.id !== 0}
                        />

                        

                        <Input
                            label="Nombre Contacto"
                            placeholder=""
                            type="text"
                            name="contactName"
                            onChange={handleChange}
                            value={form.contactName}
                            enabled={form.id !== 0}

                        />
                        <Input
                            label="Telefono Contacto"
                            placeholder=""
                            type="tel"
                            name="contactPhone"
                            onChange={handleChange}
                            value={form.contactPhone}
                            enabled={form.id !== 0}

                        />
                        
                        <Input
                            label="Fecha intervención"
                            placeholder="Fecha intervención"
                            type="date"
                            name="interveneAt"
                            onChange={handleChange}
                            value={form.interveneAt}
                            enabled={form.id !== 0}

                        />

                        <div className="form-group">
                            <label htmlFor="">Descripción</label>
                            <textarea onChange={handleChange}
                                name="description"
                                className="form-control" placeholder="Descripción" rows={3} value={form.description}
                                disabled={form.id !== 0}
                                ></textarea>
                        </div>
                        <Input
                            label="Materiales"
                            placeholder="Materiales separados por coma"
                            type="text"
                            name="material"
                            onChange={(e)=>{
                                setForm({
                                    ...form,
                                    materials:e.target.value.split(",")
                                })
                            }}
                            value={form.materials.map(e => e).join(",")}
                            enabled={form.id !== 0}

                        />
                        <Input
                            label="Técnico"
                            placeholder="Técnica"
                            type="text"
                            name="technical"
                            onChange={handleChange}
                            value={form.technical.firstName + " " + form.technical.secondName}
                            enabled={form.id !== 0}

                        />
                        <Input
                            label="Reporte de trabajo"
                            placeholder="..."
                            type="text"
                            name="workReport"
                            onChange={handleChange}
                            value={form.workReport}
                            enabled={form.id !== 0}

                        />
                        <div className="mt-1 d-flex justify-content-end">
                            {
                                form.id === 0 ? <button type="button" className="btn btn-primary update-todo" onClick={() => handleSave()}>Crear Tarea</button> : null
                            }

                        </div>
                    </>
                </SidebarRight>

            </SidebarLeft>
            <div className="content-right">
                <div className="content-wrapper">
                    <div className={`content-overlay`}></div>
                    <div className="content-header row">
                    </div>
                    <div className="content-body">
                        <div className={`app-content-overlay  ${show ? 'show' : 'hide'}`} onClick={() => setShow(!show)}></div>
                        <div className="todo-app-area">
                            <div className="todo-app-list-wrapper" >
                                <div className="todo-app-list" >
                                    <TodoSearch
                                        items={[
                                            {
                                                element: <button
                                                    className="btn btn-primary "
                                                    onClick={DownloadData}
                                                >
                                                    Exportar <i className="bx bxs-download"></i>
                                                </button>
                                            }
                                        ]}
                                    />
                                    <div className="todo-task-list list-group" style={{ overflow: 'auto' }}>
                                        {/* task list start */}
                                        <TaskList
                                            items={jobs.data.map((item) => {
                                                return {
                                                    label: item.direction,
                                                    onClick: () => handleSelect(item),
                                                    tags: [
                                                        {
                                                            label: "prioridad: " + item.priority.name,
                                                            color: item.priority.code === JOB_PRIORITY_HIGH ? "warning" : item.priority.code === JOB_PRIORITY_HALF ? "info" : item.priority.code === JOB_PRIORITY_LOW ? "success" : "danger" 
                                                        },
                                                        {
                                                            label: "Estado: " + item.state.name,
                                                            color: item.state.name === "abierto" ? "success" : "danger"
                                                        },

                                                    ],
                                                    data: item,
                                                    completed: item.state.name === "abierto" ? false : true,
                                                    options: [
                                                        {
                                                            element: <a className="todo-item-delete ml-75"
                                                                onClick={() => handleShowModal(item)}>
                                                                <i className="bx bx-trash"></i>
                                                            </a>
                                                        }
                                                    ],
                                                }
                                            })}
                                            onChecked={handleCloseJob}
                                            key={1}
                                            fetchData={()=>{
                                                props.onGetJobsAsync({
                                                    token: props.token,
                                                    page: jobs.meta.current_page + 1,
                                                    
                                                })
                                                
                                            }}
                                            hasMore={jobs.meta.current_page !== props.GetJobs.meta.last_page}
                                        />
                                        {/* task list end */}
                                        <div className="no-results">
                                            <h5>No Items Found</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="toast-bs-container">
                <Toast {...message} />
            </div>
            <Modal className="modal-main" show={showModal} style={{}}>
                <div className="card">
                    <div className="card-header">
                        <h3>¿Desea eliminar El trabajo {form.description} ?</h3>
                    </div>
                    <div className="card-footer d-flex justify-content-md-end">
                        <button type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                        >Cancelar</button>
                        <button type="button"
                            onClick={() => handleDeleteJob(form)}
                            className="btn btn-danger ml-md-3">Eliminar</button>
                    </div>
                </div>
            </Modal>
            <Modal className="modal-main" show={showModalClose} style={{}}>
                <div className="card">
                    <div className="card-header">
                        <h3>¿Desea Cerrar el Trabajo ?</h3>
                    </div>
                    <div className="card-body">
                        <Input
                            label="Material"
                            placeholder="Material"
                            type="text"
                            name="material"
                            onChange={(e) => SetCloseJob({ ...closeJob, materials: e.target.value.split(',') })}
                            value={closeJob.materials.join(',')}

                        />
                        <Input
                            label="Notas"
                            placeholder="Notas"
                            type="text"
                            name="note"
                            onChange={(e) => SetCloseJob({ ...closeJob, description: e.target.value})}
                            value={closeJob.description}

                        />
                        <Input
                            label="Material"
                            placeholder="Material"
                            type="text"
                            name="workReport"
                            onChange={(e) => SetCloseJob({ ...closeJob, workReport: e.target.value })}
                            value={closeJob.workReport}

                        />
                    </div>
                    <div className="card-footer d-flex justify-content-md-end">
                        <button type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowModalClose(false)}
                        >Cancelar</button>
                        <button type="button"
                            onClick={() => handleSaveCloseJob()}
                            className="btn btn-success ml-md-3">Cerrar Trabajo</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ViewJobs;