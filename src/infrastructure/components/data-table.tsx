import React, { useEffect, useState } from "react";
import * as Globals from '../../application/common'
import { ExportToCsv } from 'export-to-csv';
import { initialMetaResponse, MetaResponse } from "infrastructure/api/api-handler";



export interface DataTableProps {
  dataTable: Array<Object>;
  dataLimit: number;
  pageLimit: number;
  columns: Array<{
    name: string;
    label: string;
    type: 'date' | 'boolean' | 'avatar' | 'array' | 'text' | 'object' | 'render' | string,
    field_show?: string;
    render?: (value: any) => any;
  }>;
  actions?: Array<{
    name: string;
    label: string;
    icon: string;
    color: string;
    onClick: Function;
  }>
  isLoading?: boolean;

  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    links: {
      url: string;
      label: string;
      active: boolean;
    }[]
  },
  error?: string;
  onChangePage?: (page: number) => void;
  onDownload?: () => void;
  onSearch?: (search: string) => void;
}




/** @module Components/Datatable */
/**
 * Una función que devuelve una tabla con paginación, búsqueda y acciones.
 * @param {array} dataTable - Array de datos para la tabla.
 * @param {ino} dataLimit - Límite de datos por página.
 * @param {int} pageLimit - Número de páginas.
 * @param {array} columns - Array de columnas de la tabla.
 * @param {array} actions - Array de acciones de la tabla.
 * @param {object} meta - Objeto con la información de la paginación.
 * @return {object} Un componente que representa una tabla.
 * @example
 * <DataTable
 *      dataTable={[
 *                  {id:1,name:"Juan",lastname:"Perez",age:30},
 *                  {id:2,name:"Juan",lastname:"Perez",age:30}
 *                ]}
 *      dataLimit={10}
 *      pageLimit={5}
 *      columns={[
 *                {label:"ID",name:"id"},
 *                {label:"Nombre",name:"name"},
 *                {label:"Apellido",name:"lastname"},
 *                {label:"Edad",name:"age"}
 *             ]}
 *      actions={[
 *                  {label:"Editar",name:"edit",icon:"bx bx-edit",color:"primary",onClick:()=>{}},
 *                  {label:"Eliminar",name:"delete",icon:"bx bx-trash",color:"danger",onClick:()=>{}}
 *              ]}
 *      />
 */
const DataTable = (props: DataTableProps) => {

  const Meta_ = props.meta ? props.meta : initialMetaResponse.meta
  
  const [load,setLoad] = useState(true)
  const [error,setError] = useState(props.error?props.error:"")
  const { actions, columns, dataTable} = props;
  const [data_table, setDataTable] = useState<Array<Object>>([]);
  const [pages] = useState(
    Math.round(Meta_.total / Meta_.per_page)
  );
  const [currentPage, setCurrentPage] = useState(Meta_.current_page);



  useEffect(() => {
    console.log("useEffect",props.isLoading)
    setLoad(props.isLoading!==undefined?props.isLoading:true)
  }, [props.isLoading])
 
  useEffect(() => {
    setError(props.error?props.error:"")
  }, [props.error])

  useEffect(() => {
    setDataTable(dataTable);
    //converto to array
    if (typeof dataTable === "object") {
      setDataTable(Object.values(dataTable));
    }

    

  }, [dataTable]);

  const onSearch = (event: React.ChangeEvent) => {
    const target: EventTarget & HTMLInputElement = event.target as EventTarget & HTMLInputElement;
    const search = target.value;
    if (props.onSearch) {
      props.onSearch(search);
    }
    
  };

  return (
    <div className="table-responsive">

      <div className="">
        <nav aria-label="row position-relative ">
          {/* search input*/}
          <div className="col-md-12 mt-3 d-flex">
            <div className="form-group col-5">
              <input
                type="text"
                className="form-control"
                id="search"
                placeholder="Buscar..."
                onChange={onSearch}
              />
            </div>
            <div className="col-6">
              <button
                className="btn btn-primary "
                onClick={props.onDownload}
              >
                Exportar <i className="bx bxs-download"></i>
              </button>
            </div>



          </div>
        </nav>
        <table className="table table-bordered bg-white" id="table">
          <thead>
            <tr>
              {/*columns with sortable*/}
              {columns.map((column) => (
                <th key={column.name}>{column.label}</th>
              ))}
              {actions ? <th>Acciones</th> : null}
            </tr>
          </thead>
          <tbody>
            {data_table!=null && !load ? data_table.map((item: any, index) => (
              <tr key={index}>
                {columns.map((column, index) => (
                  <td key={index}>
                    {column.type === "date" ? (
                      new Date(item[column.name]).toLocaleDateString()
                    ) : column.type === "boolean" ? (
                      item[column.name] ? (
                        "Si"
                      ) : (
                        "No"
                      )
                    ) : column.type === "avatar" ? (
                      item[column.name] ?
                        <img
                          src={Globals.URLAPI + item[column.name]}
                          alt="avatar"
                          width="50"
                          height="50"
                        /> :
                        <img
                          src={window.location.origin + "/base/app-assets/images/profile/no_perfil.png"}
                          alt="avatar"
                          width="50"
                          height="50"
                        />
                    ) : column.type === "array" ? (
                      item[column.name].map((item: any, index: number) => (
                        <>

                          {column.field_show ? " [" + item[column.field_show] + " ]" : JSON.stringify(item) + " |"}
                        </>
                      ))
                    ) : column.type === "text" ? (
                      item[column.name]
                    ) : column.type === "object" ? (

                      JSON.stringify(item[column.name]) !== '{}' && item[column.name]!==null  ? column.field_show ?
                        item[column.name][column.field_show]

                        : "" : ""
                    ) : column.type === 'render' ? (
                      column.render ? column.render(item[column.name]) : item[column.name]
                    ) : (
                      item[column.name]
                    )}
                  </td>
                ))}
                {actions ?
                  <td key={index}>
                    {actions.map((action, index) => (
                      <a href="#" onClick={() => action.onClick(item)} className="mt-2" data-popup="tooltip" title={action.label} data-trigger="manual">
                        <i
                          className={`badge-circle badge-circle-light-${action.color} ${action.icon} font-medium-1`}
                        ></i>
                      </a>
                    ))}
                  </td> : null}
              </tr>
            )):null}
            {
              load ? <tr>
                <td colSpan={columns.length + 1} className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span> 
                  </div>
                </td>
              </tr> : null
              
            }
            {
              error!=="" ? <tr>
                <td colSpan={columns.length + 1} className="text-center">
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                </td>
              </tr> : null
            }
          </tbody>
        </table>
      </div>
      <div className="col-md-6">
        {Meta_.to + " de " + Meta_.total}
      </div>

      <ul className="pagination pagination-lg col-12 justify-content-end">
        {
          Meta_.links.map(link => {
            return (
              <li
                className={`page-item  ${link.active ? "active" : null} `}
                onClick={() => { 
                  if (link.url!=null){
                    let page:any = link.url.split("page=")[1];
                    page = parseInt(page);
                    if(props.onChangePage){
                      props.onChangePage(page);
                    }
                  }
                }}
                key={link.label}
              >
                <a className="page-link" href="#">
                  {link.label.replace('&laquo;', '<<').replace('&raquo;', '>>').replace("Previous", "").replace("Next", "")}
                </a>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default DataTable;
