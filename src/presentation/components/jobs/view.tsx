import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
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



const ViewJobs = (props:ViewJobsProps)=>{


    useTitle(props.title)
    useBreadcrumbs(props.breadcrumbs)

    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState<boolean>(false)

    const [job, setJob] = useState<jobs_interface.Job>({
        _id:"",
        contactName:"",
        contactPhone:"",
        created_at:"",
        description:"",
        direction:"",
        idClient:"",
        identityCounter:"",
        interventionDate:"",
        material:"",
        note:"",
        obsContact:"",
        priority:"",
        technical:"",
        type:"",
        workReport:"",
    })

    const [jobs,setJobs] = useState<jobs_interface.GetJobsResponse>({
        message:[],
        status:0
    })

    const [message, setMessage] = useState<ToastProps>({
        type: "info",
        visible: false,
        title: "",
        description: "",
    });
    
    
    const [form, setForm] = useState<jobs_interface.CreateJobRequest>({
       contactName:"",
       contactPhone:"",
       description:"",
       direction:"",
       idClient:"",
       interventionDate:"",
       material:"",
       obsContact:"",
       priority:"",
       technical:"",
       type:""
    })

    useEffect(()=>{
        props.onGetJobsAsync({
            token:props.token
        })
    },[])
    useEffect(() => {
        document.body.className = ""
        document.body.className = "vertical-layout vertical-menu-modern boxicon-layout no-card-shadow content-left-sidebar todo-application navbar-sticky footer-static "


    }, [])


    useEffect(()=>{
        setJobs(props.GetJobs)
    },[props.GetJobs])

    
    const handleChange = (
        event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };




    const handleSave = () => {
        

    }


    const handleOpenCreateJob = ()=>{
        setShow(true)

    }

    const handleDeleteJob = (job:any)=>{

    }


    const handleCloseJob = (job:any)=>{
        
    }

    const handleSelect = (item:any)=>{

    }

    return(
        <div className="content-area-wrapper" style={{ top: '-90px' }}>
        <SidebarLeft>
            <TodoMenu>
                <div className="form-group text-center add-task">
                    {/* new task button */}
                    <button type="button" className="btn btn-primary add-task-btn btn-block my-1" onClick={() => handleOpenCreateJob()}>
                        <i className="bx bx-plus"></i>
                        <span>Nuevo Trabajo</span>
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
                                label: <>{"Abiertas"} <span className="bullet bullet-sm bullet-warning"></span></>,
                                classes: "d-flex align-items-center justify-content-between",
                                onClick: () => { }
                            },
                            {
                                label: <>{"Cerradas"} <span className="bullet bullet-sm bullet-success"></span></>,
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
                    <Input
                        label="Titulo"
                        placeholder="Titulo"
                        type="text"
                        name="direction"
                        onChange={handleChange}
                        value={form.direction}
                    />
                    <Input
                        label="Tipo tarea"
                        placeholder="Tipo tarea"
                        type="text"
                        name="type"
                        onChange={handleChange}
                        value={form.type}

                    />
                    <div className="form-group">
                        <label htmlFor="">Descripción</label>
                        <textarea onChange={handleChange}
                            name="description"
                            className="form-control" placeholder="Descripción" rows={3} value={
                                form.description
                            }></textarea>
                    </div>

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
                    <Select
                        label="Responsable"
                        options={[]}
                        name="responsible"
                        onChange={handleChange}
                        selected={form.idClient}
                    />
                   
                    <div className="mt-1 d-flex justify-content-end">
                        {
                            job._id === "" ? <button type="button" className="btn btn-primary update-todo" onClick={() => handleSave()}>Crear Tarea</button> : null
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
                                    items={[]}
                                />
                                <div className="todo-task-list list-group" style={{ overflow: 'auto' }}>
                                    {/* task list start */}
                                    <TaskList
                                        items={jobs.message.map((item) => {
                                            return {
                                                label: item.direction,
                                                onClick: () => handleSelect(item),
                                                tags: [ ],
                                                options: [],
                                                data: item
                                            }
                                        })}
                                        onChecked={handleCloseJob}
                                        key={1}
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
    </div>
    )
}

export default ViewJobs;