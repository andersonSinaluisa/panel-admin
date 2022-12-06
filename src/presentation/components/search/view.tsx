import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { getFieldsByType } from "application/common/utils/fields";
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

type Columns = DataTableProps["columns"];

const SearchView = (props: SearchViewProps) => {

    useTitle(props.title);
    useBreadcrumbs(props.breadcrumbs);


    const [fieldSearch, setFieldSearch] = useState("");

    const [clients, setClients] = useState<clients_interface.GetClientsResponse>({
        message: [],
        status:0,
    });

    const [data, setData] = useState<search_interface.SearchResponse>({
        message: [],
        status: 0,
    });
    const [copy, setCopy] = useState<search_interface.SearchResponse>({
        message: [],
        status: 0,
    });
    const [actions, setActions] = useState<any[]>([])
    const [filterFields, setFilterFields] = useState<string[]>([]);
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

    const handleSearch = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchParams({
            ...searchParams,
            search: e.target.value
        })
        props.onSearchAsync({
            headers: {
                token: props.token
            },
            identityCounter: "",
            type: e.target.value
        })
        getActions(e.target.value);
    }


    const getFields = (): Columns => {

        let datos = copy.message;
        let actions: Columns = [];
        if (datos.length > 0) {
            actions = getFieldsByType(datos[0])
        }
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

    const filterDaraByField = (field: string, value: string) => {


        if (filterFields.filter((item) => item === value).length === 0) {
            filterFields.push(value);
            setFilterFields(filterFields);
            let final = copy.message.filter((item_) => {
                return filterFields.findIndex((item) => item === item_[field]) != -1
            })
            setData({
                ...data,
                message: final
            })
        }
    }


    const removeFilter = (field: string, value: string) => {
        let index = filterFields.findIndex((item) => item === value);
        filterFields.splice(index, 1);
        setFilterFields(filterFields);
        let final = copy.message.filter((item_) => {
            return filterFields.findIndex((item) => item === item_[field]) != -1
        })
        setData({
            ...data,
            message: final
        })
    }

    const getLabelDisplay = (field: string, value: string) => {
        if (field == "idClient" || field == "owner") {
            let client = clients.message.filter((item) => item._id == value);
            if (client.length > 0) {
                return client[0].name + " " + client[0].lastname + " (" + client[0].document + ")";
            }
        }
        return value;
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
                        <Select
                            options={[
                                { value: 'users', label: 'Usuarios' },
                                { value: 'jobs', label: 'Trabajos' },
                                { value: 'tasks', label: 'Tareas' },
                                { value: 'billing', label: 'Facturas' },
                                { value: 'clients', label: 'Clientes' },
                                { value: 'installations', label: 'Instalaciones' },
                                { value: 'personal', label: 'Personal' },
                                { value: 'products', label: 'Productos' },
                            ]}
                            label="Buscar por..."
                            onChange={handleSearch}
                            name="search_by"
                            selected={searchParams.search}

                        />

                        {
                            searchParams.search !== "" &&
                            <Select
                                options={getFields().map((item) => {
                                    return { value: item.name, label: item.label }
                                })}

                                label=""
                                name="search_by"
                                onChange={(e) => {
                                    setFieldSearch(e.target.value)
                                }}
                                selected={fieldSearch}
                            />


                        }
                        <div
                            id="scrollableDiv"
                            style={{
                                overflow: 'auto',
                                display: 'flex',
                                flexDirection: 'column-reverse',
                            }}
                        >
                            <InfiniteScroll
                                dataLength={copy.message.length} //This is important field to render the next data
                                next={() => {

                                }}

                                hasMore={true}
                                loader={<h4></h4>}
                                endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }
                                // below props only if you need pull down functionality
                                refreshFunction={
                                    () => { }
                                }
                                pullDownToRefresh
                                pullDownToRefreshThreshold={50}
                            >
                                {
                                    fieldSearch !== "" &&
                                    copy.message.map((item) => {

                                        return (
                                            <Checkbox
                                                label={
                                                    getLabelDisplay(fieldSearch,item[fieldSearch])
                                                }
                                                name={item[fieldSearch]}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        filterDaraByField(fieldSearch, item[fieldSearch]);
                                                    } else {
                                                        removeFilter(fieldSearch, item[fieldSearch]);
                                                    }
                                                }
                                                }
                                                checked={filterFields.filter((item_) => item_ === item[fieldSearch]).length > 0}
                                            />
                                        )
                                    })
                                }
                            </InfiniteScroll>
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
                                            
                                           {
                                               filterFields.map((item)=>{
                                                   return(
                                                    <div className="chip chip-success">
                                                    <div className="chip-body">
                                                        <div className="chip-text">{item}</div>
                                                    </div>
                                                    <button type="button" className="close" aria-label="Close"
                                                        onClick={()=>{
                                                            removeFilter(fieldSearch,item)
                                                        }}
                                                    >
                                                        <i className="bx bx-x text-white"></i>
                                                    </button>
    
                                                </div>
                                                   )
                                               })
                                           }
                                         
                                           
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