import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { getFieldsByType } from "application/common/utils/fields";
import { initialMetaResponse } from "infrastructure/api/api-handler";
import { clients_interface } from "infrastructure/api/clients";
import { search_interface } from "infrastructure/api/search";
import Checkbox from "infrastructure/components/checkbox";
import DataTable, { DataTableProps } from "infrastructure/components/data-table";
import FilterLabel from "infrastructure/components/filter-label";
import ListGroup from "infrastructure/components/list-group";
import Select from "infrastructure/components/select";
import SidebarLeft from "infrastructure/components/sidebar-left";
import SidebarRight from "infrastructure/components/sidebar-right";
import TodoMenu from "infrastructure/components/todo-menu";
import { SearchViewProps } from "presentation/container/search/view-container";
import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams } from "react-router-dom";
import ReactSelect, { MultiValue } from 'react-select';

type Columns = DataTableProps["columns"];

const SearchView = (props: SearchViewProps) => {

    useTitle(props.title);
    useBreadcrumbs(props.breadcrumbs);


    const [fieldSearch, setFieldSearch] = useState("");

    const [clients, setClients] = useState<clients_interface.GetClientsResponse>({
        data: [],
        ...initialMetaResponse
    });


    const [types, setTypes] = useState<string[]>([]);

    const [data, setData] = useState<search_interface.SearchResponse>({
        data: {
            clients: {
                data: []
            },
            installations: {
                data: []
            },
            invoices: {
                data: []
            },
            jobs: {
                data: []
            },
            products: {
                data: []
            },
            staff: {
                data: []
            },
            tasks: {
                data: []
            },
            users: {
                data: []
            }
        },
        message: {
            detail: "",
            status: 0,
            summary: ""
        }
    });
    const [copy, setCopy] = useState<search_interface.SearchResponse>({
        data: {
            clients: {
                data: []
            },
            installations: {
                data: []
            },
            invoices: {
                data: []
            },
            jobs: {
                data: []
            },
            products: {
                data: []
            },
            staff: {
                data: []
            },
            tasks: {
                data: []
            },
            users: {
                data: []
            }
        },
        message: {
            detail: "",
            status: 0,
            summary: ""
        }
    });
    const [actions, setActions] = useState<any[]>([])
    const [filterFields, setFilterFields] = useState<{
        field: string,
        list: MultiValue<{ label: string, value: string }>
    }[]>([]);
    let navigate = useNavigate();

    const [searchParams, setSearchParams] = useState<{
        search: string,
        type: string
    }>({
        search: "",
        type: ""
    });
    const [show, setShow] = useState(false);
    useEffect(() => {
        document.body.className = ""
        document.body.className = "vertical-layout vertical-menu-modern boxicon-layout no-card-shadow content-left-sidebar todo-application navbar-sticky footer-static "
    }, [])

    useEffect(() => {
        props.onGetClientsAsync({
            token: props.token,
        });
    }, [])

    useEffect(() => {
        setClients(props.clients);
    }, [props.clients])

    useEffect(() => {
        setData(props.search);
        setCopy(props.search);
    }, [props.search])

    const handleSearch = (e: any) => {
        setSearchParams({
            ...searchParams,
            search: e.target.name
        })

        types.push(e.target.name);


        props.onSearchAsync({
            headers: {
                token: props.token
            },
            identityCounter: "",
            type: types.join("&"),
        })
        getActions(e.target.name);


    }


    const getFields = (): Columns => {

        let datos = copy.message;
        


        let actions: Columns = [];



        return actions;


    }


    const getActions = (type: string) => {
        let actions_ = [];
        let path = "";

        if (type == "users") {
            path = "/usuarios/"
        }
        if (type == "installations") {
            path = "/instalaciones/"
        }
        if (type == "invoice") {
            path = "/facturas/"
        }
        if (type == "jobs") {
            path = "/trabajos/?job="
        }
        if (type == "products") {
            path = "/productos/"
        }
        if (type == "tasks") {
            path = "/tareas/?task="
        }
        if (type == "billing") {
            path = "/facturas/"
        }
        console.log(searchParams.type)


        actions_.push({
            name: "Ver",
            icon: "bx bx-show-alt",
            label: "Ver",
            color: "info",
            onClick: (row: any) => {
                navigate('/inicio' + path + row._id)
            }
        })
        setActions(actions_)
    }

    const filterDataByField = (field: string, value: MultiValue<{ label: string, value: string }>) => {


        if (filterFields.filter((item) => item.field === field).length === 0) {
            filterFields.push({
                field: field,
                list: value
            });
            //setFilterFields(filterFields);


        }
        let type = types[types.length - 1];

        let final = copy.message;
        let data = final[type as keyof search_interface.SearchResponse["message"]];

        if (value.length !== 0) {
            /*final =data.filter((item_:any) => {
                return value.filter((item) => item.value === item_[field]).length > 0;

            })*/
        }



        /* setData({
             ...data,
             message: {	
                 ...data.message,
                 [type]: final
             }
         })*/
    }




    const getLabelDisplay = (field: string, value: string) => {
        if (field == "idClient" || field == "owner" || field == "clientID") {

        }
        return value;
    }


    const getValuesByField = (field: string) => {
        let values: any[] = [];
        let type = types[types.length - 1];

        return values;
    }

    const removeFilter = (field: string, value: string) => {
        let final = filterFields.filter((item) => item.field !== field);

        if (final.length > 0) {
            let clear_data: {
                field: string,
                list: MultiValue<{ label: string, value: string }>
            }[] = [];
            clear_data.push({
                field: field,
                list: final[0].list.filter((item) => item.value !== value)
            });
            setFilterFields(clear_data);
        }


    }

    return (
        <div className="content-area-wrapper" style={{ top: '-90px' }}>
            <SidebarLeft>
                <TodoMenu>
                    <div className="form-group text-center add-task">
                        {/* new task button */}

                    </div>
                    {/* sidebar list start */}
                    <div className="sidebar-menu-list">
                        <label htmlFor="">Buscar por</label>
                        {
                            [
                                { value: 'users', label: 'Usuarios' },
                                { value: 'jobs', label: 'Trabajos' },
                                { value: 'tasks', label: 'Tareas' },
                                { value: 'invoices', label: 'Facturas' },
                                { value: 'clients', label: 'Clientes' },
                                { value: 'installations', label: 'Instalaciones' },
                                { value: 'staff', label: 'Personal' },
                                { value: 'products', label: 'Productos' },
                            ].map((item, index) => {
                                return (
                                    <Checkbox
                                        key={index}
                                        label={item.label}
                                        name={item.value}
                                        value={item.value}
                                        onChange={handleSearch}
                                        checked={searchParams.search == item.value}
                                    />
                                )
                            })

                        }
                        <div style={{
                            overflowY: 'scroll',
                            objectFit: 'cover',
                            height: 'inherit',
                            marginBottom: '50px'
                        }}>
                            {
                                searchParams.search !== "" &&

                                getFields().map((item) => {
                                    return (
                                        <div className="mt-1">
                                            <label htmlFor="">{item.label}
                                                <i className="bx bx-filter-alt "></i>
                                            </label>
                                            <ReactSelect
                                                key={item.name}
                                                options={getValuesByField(item.name).map((item_) => {
                                                    return {
                                                        value: item_,
                                                        label: getLabelDisplay(item.name, item_)
                                                    }
                                                })}
                                                isMulti
                                                placeholder="Selecciona"
                                                onChange={(e) => {
                                                    filterDataByField(item.name, e)
                                                }
                                                }
                                            />
                                        </div>

                                    )
                                })

                            }
                        </div>
                    </div>
                </TodoMenu>

                {/* todo new task sidebar */}
                <SidebarRight
                    title="Nueva Tarea"
                    onClose={() => setShow(!show)}
                    show={show}

                >
                    <>

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
                            <div className="todo-app-list" >

                                <div className="todo-app-list-wrapper" >
                                    <div className="todo-fixed-search d-flex justify-content-between align-items-center">
                                        <div className="sidebar-toggle d-block d-lg-none">
                                            <i className="bx bx-menu"></i>
                                        </div>
                                        <fieldset className="form-group position-relative has-icon-left m-0 flex-grow-1 ml-1 mr-1">

                                            {/*
                                                filterFields.map((item) => {
                                                    return item.list.map((item_) => {
                                                        return (

                                                            <div className="chip chip-success">
                                                                <div className="chip-body">
                                                                    <div className="chip-text">{item_.label}</div>
                                                                </div>
                                                                <button type="button" className="close" aria-label="Close"
                                                                    onClick={() => {
                                                                        removeFilter(item.field, item_.value)
                                                                    }}
                                                                >
                                                                    <i className="bx bx-x text-white"></i>
                                                                </button>

                                                            </div>
                                                        )
                                                    })
                                                })
                                            */}


                                        </fieldset>
                                    </div>
                                    <DataTable
                                        key={"table-group"}
                                        dataTable={data.message as any}
                                        actions={actions}
                                        columns={getFields()}
                                        dataLimit={5}
                                        pageLimit={2}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchView;