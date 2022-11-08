import { TASK_OPEN } from "application/common";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { tasks_interface } from "infrastructure/api/tasks";
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



const TaskView = (props: TasksViewProps) => {


    useTitle(props.title)
    useBreadcrumbs(props.breadcrumbs)
    const [show, setShow] = useState(false)


    const [tasks, setTasks] = useState<tasks_interface.GetTaskResponse>({
        message: [],
        status: 0
    })
    const [showModal, setShowModal] = useState<boolean>(false)
    const [task, setTask] = useState<tasks_interface.Task>({
        _id: "",
        createdAt: "",
        description: "",
        createdBy: "",
        identityCounter: "",
        interventionDate: "",
        name: "",
        observation: "",
        priority: "",
        responsible: "",
        state: "",
        type: ""
    })
    const [users, setUsers] = useState<user_interface.GetUsers>({
        message: [],
        status: 0
    })

    const [form, setForm] = useState<tasks_interface.CreateTaskRequest>({
        description: "",
        interventionDate: "",
        name: "",
        observation: "",
        priority: "",
        responsible: "",
        type: ""
    })
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





    useEffect(() => {
        if (props.CreateTasks.status === 200) {
            setMessage({
                description: "Tarea Creada correctamente",
                title: "",
                type: "success",
                visible: true
            })
            return;
        }

        if (props.CreateTasks.status !== 0) {
            setMessage({
                description: props.CreateTasks.error,
                title: "Error",
                type: "danger",
                visible: true
            })
            return;
        }
    }, [props.CreateTasks])

    useEffect(() => {
        setTasks(props.GetTasks)
        setUsers(props.GetUsers)
    }, [props.GetTasks, props.GetUsers])

    useEffect(() => {
        props.onGetTasksAsync({
            token: props.token
        })
        props.onGetUsersAync({
            token: props.token
        })
        props.onClear()

    }, [])


    useEffect(() => {

        if (props.CloseTask.status !== 0) {
            if (props.CloseTask.status === 200) {
                setMessage({
                    description: "Tarea Cerrada correctamente",
                    title: "",
                    type: "success",
                    visible: true
                })
                props.onGetTasksAsync({
                    token: props.token
                })
                return;
            }
            setMessage({
                description: props.CloseTask.error,
                title: "Error",
                type: "danger",
                visible: true
            })
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

        if (form.name === "") {
            setMessage({
                description: "El nombre es requerido",
                title: "Error",
                type: "danger",
                visible: true,
            });


            return;
        }

        if (form.interventionDate === "") {
            setMessage({
                description: "La fecha de intervención es requerida",
                title: "Error",
                type: "danger",
                visible: true,
            });


            return;
        }

        if (form.responsible === "") {
            setMessage({
                description: "El responsable es requerido",
                title: "Error",
                type: "danger",
                visible: true,
            });


            return;
        }

        if (form.priority === "") {
            setMessage({
                description: "La prioridad es requerida",
                title: "Error",
                type: "danger",
                visible: true,
            });


            return;
        }

        if (form.type === "") {
            setMessage({
                description: "El tipo es requerido",
                title: "Error",
                type: "danger",
                visible: true,
            });


            return;
        }

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

        props.onCloseTaskAsync({
            body: {
                note: item.observation,
            },
            headers: {
                token: props.token
            },
            id: item._id
        })
    }

    const handleDeleteTask = (item: tasks_interface.Task) => {
        props.onDeleteTaskAsync({
            headers: {
                token: props.token
            },
            id: item._id
        })
        setShowModal(false)
    }


    //handleSelect for view info task
    const handleSelect = (item: tasks_interface.Task) => {

        //cast item to form to show in modal
        setForm(
            {
                description: item.description,
                interventionDate: item.interventionDate,
                name: item.name,
                observation: item.observation,
                priority: item.priority,
                responsible: item.responsible,
                type: item.type
            }
        )
        setTask(item)
        setShow(true)
    }

    const handleOpenCreateTask = () => {
        setTask({
            _id: "",
            createdAt: "",
            description: "",
            createdBy: "",
            identityCounter: "",
            interventionDate: "",
            name: "",
            observation: "",
            priority: "",
            responsible: "",
            state: "",
            type: ""
        })
        setForm({
            description: "",
            interventionDate: "",
            name: "",
            observation: "",
            priority: "",
            responsible: "",
            type: ""
        })
        setShow(true)

    }

    const handleShowModal = (item:tasks_interface.Task) => {
        setShowModal(true)
        setTask(item)
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
                    title="Nueva Tarea"
                    onClose={() => setShow(!show)}
                    show={show}

                >
                    <>
                        <Input
                            label="Titulo"
                            placeholder="Titulo"
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={form.name}
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
                            options={users.message.map(e => {
                                return { label: e.email, value: e._id }
                            })}
                            name="responsible"
                            onChange={handleChange}
                            selected={form.responsible}
                        />
                        <div className="form-group">
                            <label htmlFor="">Observación</label>
                            <textarea
                                onChange={handleChange}
                                name="observation"
                                className="form-control" placeholder="Observación" rows={3} value={form.observation}></textarea>
                        </div>
                        <div className="mt-1 d-flex justify-content-end">
                            {
                                task._id === "" ? <button type="button" className="btn btn-primary update-todo" onClick={() => handleSave()}>Crear Tarea</button> : null
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
                                            items={tasks.message.map((item) => {
                                                return {
                                                    label: item.name,
                                                    onClick: () => handleSelect(item),
                                                    tags: [
                                                        {
                                                            color: item.priority === "Alta" ? "warning" : item.priority === "Media" ? "primary" : "success",
                                                            label: item.priority
                                                        },
                                                        {
                                                            color: item.state === TASK_OPEN ? "warning" : "success",
                                                            label: item.state === TASK_OPEN ? "Abierta" : "Cerrada"
                                                        }
                                                    ],
                                                    options: [
                                                        {
                                                            element: <a className="todo-item-delete ml-75" onClick={()=>handleShowModal(item)}>
                                                                <i className="bx bx-trash"></i>
                                                            </a>
                                                        }
                                                    ],
                                                    completed: item.state === TASK_OPEN ? false : true,
                                                    data: item
                                                }
                                            })}
                                            onChecked={handleCloseTask}
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
                        <h3>¿Desea eliminar la tarea {task.name}?</h3>
                    </div>
                    <div className="card-footer d-flex justify-content-md-end">
                        <button type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                        >Cancelar</button>
                        <button type="button"
                            onClick={() => handleDeleteTask(task)}
                            className="btn btn-danger ml-md-3">Eliminar</button>
                    </div>
                </div>
            </Modal>
        </div>

    )

}

export default TaskView;