import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { clients_interface } from "infrastructure/api/clients";
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
    message: [],
    status: 0
  })
  const [clients, setClients] = React.useState<clients_interface.GetClientsResponse>({
    message: [],
    status: 0
  })

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [invoice, setInvoice] = React.useState<invoice_interface.Invoice>({
    _id: "",
    identityCounter: "",
    state: "",
    billingDate: "",
    clientID: "",
    NumeroIdentificacionFiscal: "",
    products: [],
    workReport: "",
    workDirection: "",
    clientDiscount: 0,
    discount: 0,
    IVA: 0,
    impuestosVariables: 0,
    paymentMethod: "",
    note: "",
    createdBy: "",
    createdAt: ""
  })



  React.useEffect(() => {
    props.onGetInvoicesAsync({
      token: props.token
    })
    props.onGetClientsAsync({
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




  const handleDelete = (invoice: invoice_interface.Invoice) => {

    props.onDeleteInvoiceAsync({
      headers: {
        token: props.token
      },
      id: invoice._id
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
          navigate(`/inicio/facturas/${item._id}`)
        },
      },
     

    )

    return actions;
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
            dataTable={invoices.message}
            actions={getActions()}
            columns={[
              {
                name: "identityCounter",
                label: "Identificador",
                type: "text",
              },

              {
                name: "NumeroIdentificacionFiscal",
                label: "Identificacion Fiscal",
                type: "text",
              },
              {
                name: "clientID",
                label: "Cliente",
                type: "render",
                render: (clientID: string) => {
                  return (
                    <div>
                      {clients.message.map(client => {
                        if (client._id === clientID) {
                          return client.name + " " + client.lastname;
                        }
                      })}
                    </div>
                  );
                },
              },
              {
                name: "billingDate",
                label: "Fecha de Facturacion",
                type: "text",
              },

              {
                name: "IVA",
                label: "IVA",
                type: "text",
              },
              {
                name: "impuestosVariables",
                label: "Impuestos Variables",
                type: "text",
              },
            ]}
            dataLimit={5}
            pageLimit={2}
          />
        </div>
      </div>

      <Modal className="modal-main" show={showModal} style={{}}>
        <div className="card">
          <div className="card-header">
            <h3>¿Desea eliminar la factura {invoice.NumeroIdentificacionFiscal} ?</h3>
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