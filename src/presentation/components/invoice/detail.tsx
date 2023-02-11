import { DOWNLOAD_INVOICE } from "application/common";
import { initialClient } from "application/models/clients";
import { initInvoice } from "application/models/invoice";
import { initialMetaResponse } from "infrastructure/api/api-handler";
import { clients_interface } from "infrastructure/api/clients";
import { ExportData } from "infrastructure/api/core/request";
import { invoice_interface } from "infrastructure/api/invoice";
import { products_interface } from "infrastructure/api/products";
import Input from "infrastructure/components/input";
import Toast, { ToastProps } from "infrastructure/components/toast";
import { DetailInvoiceProps } from "presentation/container/invoice/detail-container";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SelectReact from 'react-select';


const DetailInvoice = (props: DetailInvoiceProps) => {

    const { id } = useParams();

    const [invoice, setInvoice] = React.useState<invoice_interface.GetInvoiceResponse>({
        data: initInvoice,
        
    });
    const [products, setProducts] = useState<products_interface.GetProductsResponse>({
        data: [],
        ...initialMetaResponse
    });

    const [client, setClient] = React.useState<clients_interface.Client>(initialClient);
    const [message, setMessage] = useState<ToastProps>({
        type: "info",
        visible: false,
        title: "",
        description: "",
    });


    useEffect(() => {
        props.onGetProductsAsync({
            token: props.token,
        })
    }, [])

    useEffect(() => {
        props.onGetInvoiceAsync({
            headers: {
                token: props.token,
            },
            id: id as string
        })
      
    }, [id])

    useEffect(() => {
        setInvoice(props.GetInvoice)
    }, [props.GetInvoice])





    return (
        <section className="invoice-edit-wrapper">
            <div className="row">
                {/* invoice view page */}
                <div className="col-12">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-body pb-0 mx-25">
                                {/* header section */}
                                <div className="row">
                                    <div className="col-12 col-md-4">
                                        <h4>N° Factura</h4>
                                        <Input
                                            label="N° Factura"
                                            type="text"
                                            name="numeroFactura"
                                            value={invoice.data.taxIdentificationNumber}
                                            enabled={true}

                                        />
                                        <Input
                                            label="Fecha factura"
                                            type="date"
                                            name="billingDate"
                                            value={invoice.data.billingDate}
                                            enabled={true}

                                        />
                                        <Input
                                            label="Código Cliente"
                                            type="text"
                                            name="code"
                                            value={invoice.data.client.documentValue}
                                            enabled={true}

                                        />
                                        <Input
                                            label="SU PEDIDO"
                                            type="text"
                                            name="code"
                                            enabled={true}
                                            value={invoice.data.taxIdentificationNumber}

                                        />
                                    </div>
                                    <div className="col-3"></div>
                                    <div className="col-12 col-md-4">
                                        <h4>Datos Fiscales</h4>
                                        
                                        <Input
                                            label="Cliente"
                                            type="text"
                                            name="direction"
                                            value={invoice.data.client?.firstName+" "+invoice.data.client?.firstSurname}
                                            enabled={true}
                                        />
                                        <Input
                                            label="Dirección"
                                            type="text"
                                            name="direction"
                                            value={invoice.data.client?.direction}
                                            enabled={true}
                                        />

                                        <Input
                                            label="Código Postal"
                                            type="text"
                                            name="direction"
                                            value={invoice.data.client?.postalCode}
                                            enabled={true}
                                        />
                                        <Input
                                            label="Provincia"
                                            type="text"
                                            name="direction"
                                            value={invoice.data.client?.direction}
                                            enabled={true}
                                        />
                                        <Input
                                            label="C.I.F. / N.I.F."
                                            type="text"
                                            name="direction"
                                            value={invoice.data.client?.documentValue}
                                            enabled={true}
                                        />
                                    </div>
                                </div>
                                

                                <hr />
                                <div className="row">

                                    <div className="col-12">
                                        <h4>Productos</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="invoice-product-details col-12">
                                        <form className="form col-12">
                                            <div data-repeater-list="col-12">
                                                <div data-repeater-item>
                                                    <div className="row ">
                                                        <div className="col-12 col-md-1 invoice-item-title">Cantidad</div>
                                                        <div className="col-12 col-xl-1 ml-2 col-md-1 invoice-item-title">Ref</div>

                                                        <div className="col-12 col-md-2 invoice-item-title">Nº Serie</div>
                                                        <div className="col-12 col-md-3 invoice-item-title">Descripcion</div>
                                                        <div className="col-12 col-md-2 col-md-1 invoice-item-title">Precio</div>
                                                        <div className="col-12 col-md-2 col-md-1 invoice-item-title">Total</div>
                                                    </div>
                                                    <div className=" d-flex border rounded mb-1 row col-12">

                                                        {
                                                            invoice.data.invoiceDetails?.map((item, index) => {
                                                                return <div className="invoice-item-filed row col-12 ">
                                                                    
                                                                <>
                                                                    <div className="col-md-1 col-12 form-group mt-2">
                                                                        <p className="invoice-item-title align-middle">
                                                                            {
                                                                                item.amount
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-md-1 col-12  form-group mt-2">
                                                                        {
                                                                            item.product?.id
                                                                        }
                                                                    </div>

                                                                    <div className="col-md-2 col-12 form-group mt-2">
                                                                        <p className="invoice-item-title align-middle">
                                                                            {
                                                                                item.product?.code
                                                                            }   
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-md-3 col-12 form-group mt-2">
                                                                       {item.product?.name} / {item.product?.description}
                                                                    </div>

                                                                    <div className="col-md-2 col-12 form-group mt-2">
                                                                        <strong className="text-primary align-middle">
                                                                            € {item.product?.priceForPublic}
                                                                        </strong>
                                                                    </div>
                                                                    <div className="col-md-2 col-12 form-group mt-2">
                                                                        <strong className="text-primary align-middle">
                                                                            € {parseInt(item.product?.priceForPublic||"0")*item.amount}
                                                                        </strong>
                                                                    </div>

                                                                    <div className="col-12">
                                                                        <hr />

                                                                    </div>

                                                                </>

                                                           
                                                    </div>

                                                            })
                                                        }
                                                        
                                                        <div className="invoice-icon d-flex flex-column justify-content-between border-left p-25">


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                                <div className="card-body pt-0 mx-25">
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-md-8">
                                            <h6>Metodo de pago</h6>
                                            <p>
                                                {
                                                    invoice.data.paymentMethod.name
                                                }
                                            </p>
                                            <h6>Notas de la factura</h6>
                                            <p>
                                            {invoice.data.description}
                                            </p>
                                        </div>
                                        <div className="col-12 col-md-4 mt-2">
                                            <div className="invoice-subtotal">
                                                <div className="invoice-calc d-flex justify-content-between">
                                                    <span className="invoice-title">Importe Neto</span>
                                                    <span className="invoice-value">
                                                        € {invoice.data.invoiceDetails.map((item, index) => {
                                                            return parseInt(item.product?.priceForPublic||"0")*item.amount
                                                        }).reduce((a, b) => a + b, 0)
                                                        }
                                                    </span>
                                                </div>

                                                <div className="invoice-calc d-flex justify-content-between">
                                                    <span className="invoice-title">Descuento </span>
                                                    <span className="invoice-value">€ {invoice.data.clientDiscount}</span>
                                                </div>
                                                <div className="invoice-calc d-flex justify-content-between">
                                                    <span className="invoice-title">IVA (12%)</span>
                                                    <span className="invoice-value">€ {invoice.data.iva}</span>
                                                </div>
                                                <hr />
                                                <div className="invoice-calc d-flex justify-content-between">
                                                    <span className="invoice-title">Total</span>
                                                    <span className="invoice-value">
                                                        € {invoice.data.invoiceDetails.map((item, index) => {
                                                            return parseInt(item.product?.priceForPublic||"0")*item.amount- invoice.data.clientDiscount - invoice.data.iva
                                                        }).reduce((a, b) => a + b, 0)
                                                        }
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 row ">
                    <div className="col-12 justify-content-end d-md-flex ">

                        <button
                            type="button"
                            className="btn btn-lg btn-outline-primary m-2"
                            onClick={() => {
                                ExportData(DOWNLOAD_INVOICE+invoice.data.id,{
                                    token:props.token,
                                  }).pipe().subscribe((data)=>{
                                    if(data.status==200){
                                      const blob  = new Blob([data.data])
                                      const url = window.URL.createObjectURL(blob);
                                      const a = document.createElement('a');
                                      a.setAttribute('hidden','');
                                      a.setAttribute('href',url);
                                      a.setAttribute('download',`factura-${invoice.data.id}.pdf`);
                                      document.body.appendChild(a);
                                      a.click();
                                    }
                                  })
                            }}
                        >
                          <i className="bx bx-file"></i> Descargar
                        </button>

                        <Link
                            type="button"
                            className="btn btn-lg btn-outline-dark m-2"
                            to={`/inicio/facturas/`}
                        >
                            Atrás
                        </Link>

                    </div>
                </div>
            </div>
            <div className="toast-bs-container">
                <Toast {...message} />
            </div>
        </section>
    )
}
export default DetailInvoice;