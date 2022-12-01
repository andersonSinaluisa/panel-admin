import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { getFieldsByType } from "application/common/utils/fields";
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

type Columns = DataTableProps["columns"];

const SearchView = (props: SearchViewProps) => {

    useTitle(props.title);
    useBreadcrumbs(props.breadcrumbs);


    const [fieldSearch, setFieldSearch] = useState("");


    const [data, setData] = useState<search_interface.SearchResponse>({
        message: [],
        status: 0,
    });
    const [copy, setCopy] = useState<search_interface.SearchResponse>({
        message: [],
        status: 0,
    });

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
    }


    const getFields = (): Columns => {

        let datos = data.message;
        let actions: Columns = [];
        if (datos.length > 0) {
            actions = getFieldsByType(datos[0])
        }
        return actions;


    }


    const getActions = () => {

    }

    const filterDaraByField = (field: string, value: string) => {
        let datos = copy.message;
        let filter = datos.filter((item) => {
            return item[field] === value
        })
        setData({
            ...data,
            message: [
                ...filter
            ]
        })
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
    height: 300,
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
                                ()=>{}
                            }
                            pullDownToRefresh
                            pullDownToRefreshThreshold={50}
                           
                        >

                            {
                                fieldSearch !== "" &&
                                copy.message.map((item) => {
                                    return (
                                        <Checkbox
                                            label={item[fieldSearch]}
                                            name={item[fieldSearch]}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    filterDaraByField(fieldSearch, item[fieldSearch]);
                                                } else {
                                                }
                                            }
                                            }
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
                                            <div className="chip chip-success">
                                                <div className="chip-body">
                                                    <div className="chip-text">nombre</div>
                                                </div>
                                                <button type="button" className="close" aria-label="Close">
                                                    <i className="bx bx-x text-white"></i>
                                                </button>

                                            </div>
                                        </fieldset>
                                    </div>
                                    <DataTable
                                        key={"table-group"}
                                        dataTable={data.message as any}
                                        actions={[]}
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