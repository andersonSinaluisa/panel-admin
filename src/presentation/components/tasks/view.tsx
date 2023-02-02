import { TASK_OPEN, TASK_PRIORITY_HALF, TASK_PRIORITY_LOW, TASK_PRIORITY_HIGH, CATALOGUE_TYPE_TASK_PRIORITY, CATALOGUE_TYPE_TASK_NAME, CATALOGUE_TYPE_TASK, TASK_CLOSE } from "application/common";
import { useQuery } from "application/common/hooks/use-query";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { initTask } from "application/models/tasks";
import { ExportToCsv } from "export-to-csv";
import { initialMetaResponse } from "infrastructure/api/api-handler";
import { interface_core } from "infrastructure/api/core";
import { State } from "infrastructure/api/core/interface";
import { personal_request } from "infrastructure/api/personal";
import { tasks_interface } from "infrastructure/api/tasks";
import { CloseTaskRequest } from "infrastructure/api/tasks/interface";
import { user_interface } from "infrastructure/api/users";
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
import { TasksViewProps } from "presentation/container/tasks/view-container";
import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";



const TaskView = (props: TasksViewProps) => {


    useTitle(props.title)
    useBreadcrumbs(props.breadcrumbs)
    const [show, setShow] = useState(false)

    const query = useQuery();



    const [tasks, setTasks] = useState<tasks_interface.GetTaskResponse>({
        data: [],
        ...initialMetaResponse
    })
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalClose, setShowModalClose] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(false)
    const [users, setUsers] = useState<user_interface.GetUsers>({
        data: [],
        ...initialMetaResponse
    })

    const initForm = {
        description: "",
        interventionAt: "",
        name: {
            id: 0,
        },
        observation: "",
        priority: {
            id: 0
        },
        responsible: {
            id: 0
        },
        type: {
            id: 0
        }
    }

    const [form, setForm] = useState<tasks_interface.Task>(initTask)
    
    const [message, setMessage] = useState<ToastProps>({
        type: "info",
        visible: false,
        title: "",
        description: "",
    });
    useEffect(() => {
        document.body.className = ""
        document.body.className = "vertical-layout vertical-menu-modern boxicon-layout no-card-shadow content-left-sidebar todo-application navbar-sticky footer-static "


    }, [])

    
        

    /*useEffect(() => {

        if (query.get("task")) {
            tasks.data.filter((task) => {
                if (task.id + "" === query.get("task")) {
                    setTask(task)

                    setShow(true)
                }
            })
        }

    }, [tasks.message])*/


    const [catalogue, setCatalogues] = useState<interface_core.State[]>([])

    useEffect(() => {
        setCatalogues(props.catalogue.data.data);
    }, [props.catalogue])



    useEffect(() => {
        if(props.DeleteTask.status === 200){
            setMessage({
                description: "Tarea Eliminada correctamente",
                title: "Exito",
                type: "success",
                visible: true
            })
            setTimeout(() => {
                setMessage({
                    description: "",
                    title: "",
                    type: "success",
                    visible: false
                })
            }, 3000)
            return;
        }

        if(props.DeleteTask.status !== 0){
            setMessage({
                description: props.DeleteTask.error,
                title: "Error",
                type: "danger",
                visible: true
            })
            setTimeout(() => {
                setMessage({
                    description: "",
                    title: "",
                    type: "success",
                    visible: false
                })
            }, 3000)
            return;
        }
    }, [props.DeleteTask])


    useEffect(() => {
        if (props.CreateTasks.status === 200) {
            setMessage({
                description: "Tarea Creada correctamente",
                title: "",
                type: "success",
                visible: true
            })
            setTimeout(() => {
                setMessage({
                    description: "",
                    title: "",
                    type: "success",
                    visible: false
                })
            }, 3000)
            return;
        }

        if (props.CreateTasks.status !== 0) {
            setMessage({
                description: props.CreateTasks.error,
                title: "Error",
                type: "danger",
                visible: true
            })
            setTimeout(() => {
                setMessage({
                    description: "",
                    title: "",
                    type: "success",
                    visible: false
                })
            }, 3000)
            return;
        }
    }, [props.CreateTasks])

    useEffect(() => {
        if (reload){
            setTasks(props.GetTasks)  
        }else{
            setTasks({
                data: [
                    ...props.GetTasks.data,
                    ...tasks.data
                ],
                meta: props.GetTasks.meta,
                links: props.GetTasks.links,
                message: props.GetTasks.message,
            })
        }
        
    }, [props.GetTasks])

    useEffect(() => {
        props.onGetTasksAsync({
            token: props.token
        })
        
        props.onClear()

    }, [props.token])


    useEffect(() => {

        if (props.CloseTask.status !== 0) {
            if (props.CloseTask.status === 200) {
                setMessage({
                    description: "Tarea Cerrada correctamente",
                    title: "",
                    type: "success",
                    visible: true
                })
                setReload(true)
                setTimeout(() => {
                    setMessage({
                        description: "",
                        title: "",
                        type: "danger",
                        visible: false
                    })
                }, 3000)
                props.onGetTasksAsync({
                    token: props.token
                })
                props.onClear()

                return;
            }
            setMessage({
                description: props.CloseTask.error,
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
            }, 3000)
            return;
        }

    }, [props.CloseTask])


    const handleChange = (
        event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };




    const handleSave = () => {
        //validate fields of form
        console.log(form)
        props.onCreateTasksAsync({
            headers: {
                token: props.token,
            },
            body: form
        })
        props.onGetTasksAsync({
            token: props.token
        })
        setShow(false);

    }

    const handleCloseTask = (item: tasks_interface.Task) => {
        setShowModalClose(true)
        setForm(item)
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

    const handleConfirmCloseTask = () => {

        let state = catalogue.filter((item) => item.code == TASK_CLOSE );
        if(state.length===0){
            return;
        }

        let status_close = state[0].id;

        let data:CloseTaskRequest={
            state:{
                id:status_close
            }
        }
        setShowModalClose(false)
        
        props.onCloseTaskAsync({
            body:data,
            headers: {
                token: props.token
            },
            id: form.id
        })
        props.onGetTasksAsync({
            token: props.token
        })


    }


    const getListByCode = (code: string) => {
        return catalogue.filter((item) => item.type.code === code).map((item) => {
            return {
                label: item.name,
                value: item.id
            }
        })
    }

    const handleDeleteTask = (item: tasks_interface.Task) => {
        props.onDeleteTaskAsync({
            headers: {
                token: props.token
            },
            id: item.id
        })
        setShowModal(false)
    }


    //handleSelect for view info task
    const handleSelect = (item: tasks_interface.Task) => {
        setShow(true)
        setForm(item)

    }

    const handleOpenCreateTask = () => {
        setForm(initTask)
        setShow(true)

    }

    const handleShowModal = (item: tasks_interface.Task) => {
        setShowModal(true)
        setForm(item)
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

    return (
        <div className="content-area-wrapper" style={{ top: '-90px' }}>
            <SidebarLeft>
                <TodoMenu>
                    <div className="form-group text-center add-task">
                        {/* new task button */}
                        <button type="button" className="btn btn-primary add-task-btn btn-block my-1" onClick={() => handleOpenCreateTask()}>
                            <i className="bx bx-plus"></i>
                            <span>Nueva Tarea</span>
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
                    title={
                        form.id === 0 ? "Nueva Tarea" : form.name.name
                    }
                    onClose={() => setShow(!show)}
                    show={show}

                >
                    <>
                        <Select
                            label="Tipo tarea"
                            options={getListByCode(CATALOGUE_TYPE_TASK_NAME)}
                            name="name"
                            onChange={handleChangeSelect}
                            selected={form.name.id}
                            disabled={form.id !== 0}

                        />
                        <Select
                            label="Tipo tarea"
                            options={getListByCode(CATALOGUE_TYPE_TASK)}
                            name="type"
                            onChange={handleChangeSelect}
                            selected={form.type.id}
                            disabled={form.id !== 0}

                        />
                        <div className="form-group">
                            <label htmlFor="">Descripción</label>
                            <textarea onChange={handleChange}
                                name="description"
                                className="form-control" placeholder="Descripción" rows={3} value={
                                    form.description
                                }
                                disabled={form.id !== 0}

                            ></textarea>
                        </div>

                        <Select
                            label="Prioridad"
                            options={getListByCode(CATALOGUE_TYPE_TASK_PRIORITY)}
                            name="priority"
                            onChange={handleChangeSelect}
                            selected={form.priority.id}
                            disabled={form.id !== 0}
                        />
                        <Input
                            label="Fecha intervención"
                            placeholder="Fecha intervención"
                            type="date"
                            name="interventionAt"
                            onChange={handleChange}
                            value={form.interventionAt}
                            enabled={form.id !== 0}
                        />

                        <label htmlFor="client">Responsable</label>
                        <AsyncSelect
                            loadOptions={(inputValue, callback) => {
                                searchPersonal(inputValue, callback);

                            }}
                            name="responsible"
                            onChange={
                                (newValue: any) => {
                                    setForm({
                                        ...form,
                                        responsible: newValue.item

                                    });
                                }
                            }
                            isDisabled={form.id !== 0}

                            value={form.responsible?.id ? { label: form.responsible.firstName + " " + form.responsible.firstSurname, value: form.responsible.id } : null}
                        />
                        <div className="form-group">
                            <label htmlFor="">Observación</label>
                            <textarea
                                onChange={handleChange}
                                name="observation"
                                disabled={form.id !== 0}

                                className="form-control" placeholder="Observación" rows={3} value={form.observation}></textarea>
                        </div>
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
                                                        csvExporter.generateCsv(tasks.message);
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
                                            fetchData={() => {
                                                if (tasks.data.length < props.GetTasks.meta.total) {
                                                    setReload(false)

                                                    props.onGetTasksAsync({
                                                        token: props.token,
                                                        page: tasks.meta.current_page + 1,
                                                        perPage: 10,
                                                    })
                                                }
                                            }}
                                            items={tasks.data.map((item) => {
                                                return {
                                                    label: item.name.name,
                                                    onClick: () => handleSelect(item),
                                                    tags: [
                                                        {
                                                            color: item.priority.code === TASK_PRIORITY_HIGH ? "warning" : item.priority.code === TASK_PRIORITY_HALF ? "info" : "success",
                                                            label: "prioridad: " + item.priority.name
                                                        },
                                                        {
                                                            color: item.state.code === TASK_OPEN ? "success" : "danger",
                                                            label: "estado: " + item.state.name
                                                        }
                                                    ],
                                                    options: [
                                                        {
                                                            element: <a className="todo-item-delete ml-75" onClick={() => handleShowModal(item)}>
                                                                <i className="bx bx-trash"></i>
                                                            </a>
                                                        }
                                                    ],
                                                    completed: item.state.code === TASK_OPEN ? false : true,
                                                    data: item
                                                }
                                            })}
                                            onChecked={handleCloseTask}
                                            key={1}
                                            hasMore={tasks.data.length < props.GetTasks.meta.total}
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
                        <h3>¿Desea eliminar la tarea {form.name.name}?</h3>
                    </div>
                    <div className="card-footer d-flex justify-content-md-end">
                        <button type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                        >Cancelar</button>
                        <button type="button"
                            onClick={() => handleDeleteTask(form)}
                            className="btn btn-danger ml-md-3">Eliminar</button>
                    </div>
                </div>
            </Modal>
            <Modal className="modal-main" show={showModalClose} style={{}}>
                <div className="card">
                    <div className="card-header">
                        <h3>¿Desea cerrar la tarea {form.name.name}?</h3>
                    </div>
                    <div className="card-footer d-flex justify-content-md-end">
                        <button type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowModalClose(false)}
                        >Cancelar</button>
                        <button type="button"
                            onClick={() => handleConfirmCloseTask()}
                            className="btn btn-danger ml-md-3">Cerrar</button>
                    </div>
                </div>
            </Modal>
        </div>

    )

}

export default TaskView;