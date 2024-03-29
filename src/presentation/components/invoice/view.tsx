import { DOWNLOAD_INVOICE, EXPORT_INVOICES } from "application/common";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { initInvoice } from "application/models/invoice";
import { initialMetaResponse } from "infrastructure/api/api-handler";
import { clients_interface } from "infrastructure/api/clients";
import { ExportData } from "infrastructure/api/core/request";
import { invoice_interface } from "infrastructure/api/invoice";
import DataTable from "infrastructure/components/data-table";
import Modal from "infrastructure/components/modal";
import { ViewInvoicesProps } from "presentation/container/invoice/view-container";
import React from "react";
import { Link, useNavigate } from "react-router-dom";


const ViewInvoices = (props: ViewInvoicesProps) => {

  useTitle(props.title)
  useBreadcrumbs(props.breadcrumbs)
  let navigate = useNavigate();
  const [invoices, setInvoices] = React.useState<invoice_interface.GetInvoicesResponse>({
    data: [],
    ...initialMetaResponse
  })
  const [clients, setClients] = React.useState<clients_interface.GetClientsResponse>({
    data: [],
    ...initialMetaResponse
  })

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [invoice, setInvoice] = React.useState<invoice_interface.Invoice>(initInvoice)

  const [load, setLoad] = React.useState<boolean>(false)

  React.useEffect(() => {
    props.onGetInvoicesAsync({
      token: props.token
    })
   
    props.clear();
  }, [])

  React.useEffect(() => {
    setInvoices(props.GetInvoices)
  }, [props.GetInvoices])

  React.useEffect(() => {

    setClients(props.GetClients)
  }, [props.GetClients])


  React.useEffect(() => {
      setLoad(props.isLoading)
  }, [props.isLoading])


  const handleDelete = (invoice: invoice_interface.Invoice) => {

    props.onDeleteInvoiceAsync({
      headers: {
        token: props.token
      },
      id: invoice.id
    })
    props.onGetInvoicesAsync({
      token: props.token
    })
    setShowModal(false)
  }

  const getActions = () => {
    let actions = [];

    actions.push(
      //view detail
      {
        color: "info",
        icon: "bx bx-show-alt",
        label: "Ver",
        name: "view",
        onClick: (item: any) => {
          navigate(`/inicio/facturas/${item.id}`)
        },
      },{
        //donwload pdf
        color: "primary",
        icon: "bx bx-download",
        label: "Descargar",
        name: "download",
        onClick: (item: any) => {
          ExportData(DOWNLOAD_INVOICE+item.id,{
            token:props.token,
          }).pipe().subscribe((data)=>{
            if(data.status==200){
              const blob  = new Blob([data.data])
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.setAttribute('hidden','');
              a.setAttribute('href',url);
              a.setAttribute('download',`factura-${item.id}.pdf`);
              document.body.appendChild(a);
              a.click();
            }
          })
        },
      }
     

    )

    return actions;
  }

  const DownloadData = ()=>{
    ExportData(EXPORT_INVOICES,{
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
        a.setAttribute('download','facturas-reporte-probulon.xlsx');
        document.body.appendChild(a);
        a.click();

      }
    })
  }
  
  return (
    <div className="row" id="table-borderless">
      <div className="col-12 mb-2">
        <Link to="/inicio/facturas/nueva" className="btn btn-primary">
          Nueva Factura
        </Link>
      </div>
      <div className="col-12">
        <div className="table-responsive ">
          <DataTable
            key={"table-group"}
            dataTable={invoices.data}
            actions={getActions()}
            columns={[
             

              {
                name: "taxIdentificationNumber",
                label: "Identificacion Fiscal",
                type: "text",
              },
              {
                name: "client",
                label: "Cliente",
                type: "object",
                field_show: "nickName"
              },
             
              {
                name: "billingDate",
                label: "Fecha de Facturacion",
                type: "text",
              },

              {
                name: "iva",
                label: "IVA",
                type: "text",
              },
              
            ]}
            dataLimit={5}
            pageLimit={2}
            onChangePage={(page: number) => {
              props.onGetInvoicesAsync({
                token: props.token,
                page: page
              })
            }}
            meta={invoices.meta}
            isLoading={load}
            onDownload={DownloadData}
          />
        </div>
      </div>

      <Modal className="modal-main" show={showModal} style={{}}>
        <div className="card">
          <div className="card-header">
            <h3>¿Desea eliminar la factura {invoice.taxIdentificationNumber} ?</h3>
          </div>
          <div className="card-footer d-flex justify-content-md-end">
            <button type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >Cancelar</button>
            <button type="button"
              onClick={() => handleDelete(invoice)}
              className="btn btn-danger ml-md-3">Eliminar</button>
          </div>
        </div>
      </Modal>
    </div>
  );


};


export default ViewInvoices;