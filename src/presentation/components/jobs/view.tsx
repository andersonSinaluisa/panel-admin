import { useQuery } from "application/common/hooks/use-query";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { initJob } from "application/models/jobs";
import { ExportToCsv } from "export-to-csv";
import { initialMetaResponse } from "infrastructure/api/api-handler";
import { clients_interface } from "infrastructure/api/clients";
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
import { JOB_PRIORITY_HIGH,JOB_PRIORITY_HALF,JOB_PRIORITY_LOW } from "application/common";



const ViewJobs = (props: ViewJobsProps) => {


    useTitle(props.title)
    useBreadcrumbs(props.breadcrumbs)

    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalClose, setShowModalClose] = useState<boolean>(false)

    //get query params
    const query = useQuery();



    const [closeJob, SetCloseJob] = useState<jobs_interface.CloseJobRequest>({
        material: "",
        note: "",
        workReport: ""
    })
    const [job, setJob] = useState<jobs_interface.Job>(initJob)

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


    const [form, setForm] = useState<jobs_interface.CreateJobRequest>({
        contactName: "",
        contactPhone: "",
        description: "",
        direction: "",
        idClient: "",
        interventionDate: "",
        material: "",
        obsContact: "",
        priority: "",
        technical: "",
        type: ""
    })

    useEffect(() => {
        props.onGetJobsAsync({
            token: props.token
        })
        props.onGetClientsAsync({
            token: props.token
        })
    }, [])


    useEffect(() => {
        if(query.get("job")){
            jobs.data.filter((job) => {
                if(job.id+"" === query.get("job")){
                    
                    setJob(job)
                    setShow(true)
                }
            }
            )
        }
    }, [jobs.message])


    useEffect(() => {
        if (props.CreateJob.status === 200) {
            setMessage({
                description: "Trabajo Creado correctamente",
                title: "",
                type: "success",
                visible: true
            })
            return;
        }

        if (props.CreateJob.status !== 0) {
            setMessage({
                description: props.CreateJob.error,
                title: "Error",
                type: "danger",
                visible: true
            })
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
        setJob(job)
    }



    const handleSave = () => {


        //validate fields
        if (form.contactName === "") {
            setMessage({
                description: "El campo Nombre de contacto es requerido",
                title: "Error",
                type: "danger",
                visible: true
            })
            return;
        }

        if (form.contactPhone === "") {
            setMessage({
                description: "El campo Teléfono de contacto es requerido",
                title: "Error",
                type: "danger",
                visible: true
            })
            return;
        }

        if (form.description === "") {
            setMessage({
                description: "El campo Descripción es requerido",
                title: "Error",
                type: "danger",
                visible: true
            })
            return;
        }

        if (form.direction === "") {
            setMessage({
                description: "El campo Dirección es requerido",
                title: "Error",
                type: "danger",
                visible: true
            })
            return;
        }

        if (form.idClient === "") {

            setMessage({
                description: "El campo Cliente es requerido",
                title: "Error",
                type: "danger",
                visible: true
            })
            return;
        }

        if (form.interventionDate === "") {
            setMessage({
                description: "El campo Fecha de intervención es requerido",
                title: "Error",
                type: "danger",
                visible: true
            })
            return;
        }

        if (form.material === "") {

            setMessage({
                description: "El campo Material es requerido",
                title: "Error",
                type: "danger",
                visible: true
            })
            return;
        }

        if (form.obsContact === "") {
            setMessage({
                description: "El campo Observaciones de contacto es requerido",
                title: "Error",
                type: "danger",
                visible: true
            })
            return;
        }

        if (form.priority === "") {
            setMessage({
                description: "El campo Prioridad es requerido",
                title: "Error",
                type: "danger",
                visible: true
            })
            return;
        }

        if (form.technical === "") {
            setMessage({
                description: "El campo Técnico es requerido",
                title: "Error",
                type: "danger",
                visible: true
            })
            return;
        }

        if (form.type === "") {
            setMessage({
                description: "El campo Tipo es requerido",
                title: "Error",
                type: "danger",
                visible: true
            })
            return;
        }

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
        setForm({
            contactName: "",
            contactPhone: "",
            description: "",
            direction: "",
            idClient: "",
            interventionDate: "",
            material: "",
            obsContact: "",
            priority: "",
            technical: "",
            type: ""
        })
        setJob(initJob)
    }

    const handleDeleteJob = (job: any) => {

        props.onDeleteJobAsync({
            headers: {
                token: props.token
            },
            id: job._id
        })
        setShowModal(false)
        props.onGetJobsAsync({
            token: props.token
        })
    }


    const handleCloseJob = (job: any) => {
        setShowModalClose(true)
        setJob(job)
    }

    const handleSaveCloseJob = () => {
        //validate fields
        if (closeJob.material === "") {
            setMessage({
                description: "El campo Material es requerido",
                title: "Error",
                type: "danger",
                visible: true
            })
            return;
        }

        if (closeJob.note === "") {
            setMessage({
                description: "El campo Nota es requerido",
                title: "Error",
                type: "danger",
                visible: true
            })
            return;
        }

        if (closeJob.workReport === "") {
            setMessage({
                description: "El campo Reporte de trabajo es requerido",
                title: "Error",
                type: "danger",
                visible: true
            })
            return;
        }

        props.onCloseJobAsync({
            body: closeJob,
            headers: {
                token: props.token
            },
            id: job.id
        })
        setShowModalClose(false)

    }

    const handleSelect = (item: any) => {
        setForm(
            {
                contactName: item.contactName,
                contactPhone: item.contactPhone,
                description: item.description,
                direction: item.direction,
                idClient: item.idClient,
                interventionDate: item.interventionDate,
                material: item.material,
                obsContact: item.obsContact,
                priority: item.priority,
                technical: item.technical,
                type: item.type
            }
        )
        setJob(item)
        setShow(true)
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
                                    job.id === 0 ? "Nuevo Trabajo" : "Editar Trabajo"
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
                            <label htmlFor="idClient">Cliente</label>
                        <SelectReact
                            isSearchable={true}
                            name="idClient"
                            options={clients.data.map(e => ({
                                value: e.id,
                                label: e.firstName + " " + e.secondName
                            }))}
                            placeholder="Seleccione un Cliente"
                            onChange={
                                (e: any) => {
                                    setForm({
                                        ...form,
                                        idClient: e.value,
                                    })
                                }
                            }


                        />

                        <Input
                            label="Dirección"
                            placeholder="Dirección"
                            type="text"
                            name="direction"
                            onChange={handleChange}
                            value={form.direction}
                        />
                        <Input
                            label="Nombre de contacto"
                            placeholder="Dirección"
                            type="text"
                            name="contactName"
                            onChange={handleChange}
                            value={form.contactName}
                        />
                        <Input
                            label="Numero de contacto"
                            placeholder="Numero de contacto"
                            type="text"
                            name="contactPhone"
                            onChange={handleChange}
                            value={form.contactPhone}
                        />
                        <div className="form-group">
                            <label htmlFor="">Observación Contacto</label>
                            <textarea onChange={handleChange}
                                name="obsContact"
                                className="form-control" placeholder="Descripción" rows={3} value={
                                    form.obsContact
                                }></textarea>
                        </div>

                        <Input
                            label="Tipo tarea"
                            placeholder="Tipo tarea"
                            type="text"
                            name="type"
                            onChange={handleChange}
                            value={form.type}

                        />


                        <Select
                            label="Prioridad"
                            options={[
                                {
                                    label: "Alta",
                                    value: "Alta"
                                },
                                {
                                    label: "Media",
                                    value: "Media"
                                },
                                {
                                    label: "Baja",
                                    value: "Baja"
                                }
                            ]}
                            name="priority"
                            onChange={handleChange}
                            selected={form.priority}

                        />
                        <Input
                            label="Fecha intervención"
                            placeholder="Fecha intervención"
                            type="date"
                            name="interventionDate"
                            onChange={handleChange}
                            value={form.interventionDate}

                        />

                        <div className="form-group">
                            <label htmlFor="">Descripción</label>
                            <textarea onChange={handleChange}
                                name="description"
                                className="form-control" placeholder="Descripción" rows={3} value={
                                    form.description
                                }></textarea>
                        </div>
                        <Input
                            label="Material"
                            placeholder="Material"
                            type="text"
                            name="material"
                            onChange={handleChange}
                            value={form.material}

                        />
                        <Input
                            label="Técnica"
                            placeholder="Técnica"
                            type="text"
                            name="technical"
                            onChange={handleChange}
                            value={form.technical}

                        />
                        <div className="mt-1 d-flex justify-content-end">
                            {
                                job.id === 0 ? <button type="button" className="btn btn-primary update-todo" onClick={() => handleSave()}>Crear Tarea</button> : null
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
                                                    onClick={() => {
                                                        const options = {
                                                            fieldSeparator: ',',
                                                            quoteStrings: '"',
                                                            decimalSeparator: '.',
                                                            showLabels: true,
                                                            showTitle: true,
                                                            title: 'Reporte',
                                                            useTextFile: false,
                                                            useBom: true,
                                                            useKeysAsHeaders: true,
                                                            filename: 'reporte',
                                                        };
                                                        const csvExporter = new ExportToCsv(options);
                                                        csvExporter.generateCsv(jobs.message);
                                                    }}
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
                                                if(jobs.data.length<props.GetJobs.meta.total){
                                                    props.onGetJobsAsync({
                                                        token: props.token,
                                                        page: props.GetJobs.meta.current_page + 1,
                                                        
                                                    })
                                                }
                                            }}
                                            hasMore={jobs.data.length<props.GetJobs.meta.total}
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
                        <h3>¿Desea eliminar la tarea ?</h3>
                    </div>
                    <div className="card-footer d-flex justify-content-md-end">
                        <button type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                        >Cancelar</button>
                        <button type="button"
                            onClick={() => handleDeleteJob(job)}
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
                            onChange={(e) => SetCloseJob({ ...closeJob, material: e.target.value })}
                            value={closeJob.material}

                        />
                        <Input
                            label="Notas"
                            placeholder="Notas"
                            type="text"
                            name="note"
                            onChange={(e) => SetCloseJob({ ...closeJob, note: e.target.value })}
                            value={closeJob.note}

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