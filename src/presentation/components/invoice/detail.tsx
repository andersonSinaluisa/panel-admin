import { clients_interface } from "infrastructure/api/clients";
import { invoice_interface } from "infrastructure/api/invoice";
import { products_interface } from "infrastructure/api/products";
import Input from "infrastructure/components/input";
import Toast, { ToastProps } from "infrastructure/components/toast";
import { DetailInvoiceProps } from "presentation/container/invoice/detail-container";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SelectReact from 'react-select';


const DetailInvoice = (props:DetailInvoiceProps) => {

    const {id} = useParams();

    const [invoice,setInvoice] = React.useState<invoice_interface.GetInvoiceResponse>({
        message:{
            _id: "",
            identityCounter: "",
            state: "",
            billingDate: "",
            clientID: "",
            NumeroIdentificacionFiscal: "",
            products:[],
            workReport: "",
            workDirection: "",
            clientDiscount: 0,
            discount: 0,
            IVA:0,
            impuestosVariables: 0,
            paymentMethod: "",
            note: "",
            createdBy: "",
            createdAt: ""
        },
        status:0
    });
    const [products, setProducts] = useState<products_interface.GetProductsResponse>({
        message: [],
        status: 0,
        code: 0
    });

    const [client,setClient] = React.useState<clients_interface.Client>({
        personType: "",
        documentType: "",
        document: "",
        name: "",
        customerType:"",
        roadType: "",
        direction: "",
        postalCode: "",
        location: "",
        province: "",
        country: "",
        phone: "",
        mobilePhone: "",
        contact: "",
        contact2: "",
        email: "",
        webpage: "",
        contactSchedule: "",
        discount: "0",
        note: "",
        _id:"",
        createdAt:"",
        identityCounter:"",
        installations:[],
        userId:"",
        lastname:""
    });
    const [message, setMessage] = useState<ToastProps>({
        type: "info",
        visible: false,
        title: "",
        description: "",
    });


    useEffect(()=>{
        props.onGetProductsAsync({
            token: props.token,
        })
    },[])

    useEffect(() => {
        props.onGetInvoiceAsync({
            headers:{
                token:props.token,
            },
            id:id as string
        })
    }, [id])


    useEffect(() => {
        props.onGetClientByIdAsync(
            {
                headers:{
                    token:props.token,
                },
                id:invoice.message.clientID
            }
        )

    }, [
        invoice

    ])

    useEffect(() => {
        setInvoice(props.GetInvoice)
    }, [props.GetInvoice])

    useEffect(() => {
        setProducts(props.GetProducts)
    }, [props.GetProducts])

    useEffect(() => {
        setClient(props.GetClientById)
    }, [props.GetClientById])


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
                                <div className="col-4">
                                    <h4>N° Factura</h4>
                                    {
                                        invoice.message.identityCounter
                                    }
                                    <h6>Fecha de facturación</h6>
                                    <p>
                                        {
                                            invoice.message.billingDate
                                        }
                                    </p>
                                </div>
                                <div className="col-3"></div>
                                <div className="col-4">
                                    <h4>Datos Fiscales</h4>
                                    <label htmlFor="clientID">Cliente</label>
                                    <p>
                                      {
                                        client!==undefined && client!=null?client.name+"  "+client.lastname:""
                                      } 
                                    </p>
                                    

                                    <p>
                                        <strong>Numero de identificación fiscal:</strong>{" "}
                                        {
                                            invoice.message.NumeroIdentificacionFiscal
                                        }

                                        <br />
                                        <strong>Dirección de trabajo:</strong>{" "}
                                        {
                                            invoice.message.workDirection 
                                        }

                                        <br />
                                    </p>

                                </div>
                            </div>
                            
                            <hr />
                            <div className="row">

                                <div className="col-12">
                                    <h4>Productos</h4>
                                </div>
                            </div>
                            <div className="row m-2">
                                <div className="invoice-product-details col-12">
                                    <form className="form col-12">
                                        <div data-repeater-list="col-12">
                                            <div data-repeater-item>
                                                <div className="row mb-50 col-12">
                                                <div className="col-1 col-md-1 invoice-item-title">Ref</div>
                                                        <div className="col-2 col-md-2 invoice-item-title">Producto</div>

                                                        <div className="col-2 invoice-item-title">Nº Serie</div>
                                                        <div className="col-2 invoice-item-title">Descripcion</div>
                                                        <div className="col-2 invoice-item-title">Cantidad</div>
                                                        <div className="col-2 col-md-1 invoice-item-title">Precio</div>
                                                        <div className="col-2 col-md-1 invoice-item-title">Total</div>


                                                </div>
                                                <div className="invoice-item d-flex border rounded mb-1 col-12">
                                                    <div className="invoice-item-filed row col-12 ">

                                                        {
                                                            invoice.message.products.map((item, index) => (
                                                                <div className="col-12 row">

                                                                    <div className="col-md-1 col-12  form-group mt-2">
                                                                        {products.message.find((product) => product._id === item.id) && (
                                                                               products.message.find((product) => product._id === item.id)?.identityCounter
                                                                            )}
                                                                    </div>
                                                                    <div className="col-12 col-md-2 mt-2">
                                                                        <p className="invoice-item-title align-middle">{item.name}</p>
                                                                    </div>
                                                                    <div className="col-md-2 col-12 form-group mt-2">
                                                                        <p className="invoice-item-title align-middle">
                                                                            {item.nroSerie}
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-md-2 col-12 form-group mt-2">
                                                                            {products.message.find((product) => product._id === item.id) && (
                                                                               products.message.find((product) => product._id === item.id)?.description
                                                                            )}
                                                                        </div>
                                                                    <div className="col-md-2 col-12 form-group mt-2">
                                                                            <p className="invoice-item-title align-middle">
                                                                                {item.quantity}
                                                                            </p>
                                                                    </div>
                                                                    <div className="col-md-1 col-12 form-group mt-2">
                                                                        <strong className="text-primary align-middle">$ {item.price
                                                                        }</strong>
                                                                    </div>
                                                                    <div className="col-md-1 col-12 form-group mt-2">
                                                                        <strong className="text-primary align-middle">$ {item.quantity * item.price}</strong>
                                                                    </div>
                                                                   
                                                                    <div className="col-12">
                                                                        <hr />

                                                                    </div>

                                                                </div>

                                                            ))

                                                        }
                                                    </div>
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
                                    <div className="col-8">
                                        <h6>Metodo de pago</h6>
                                        <p>
                                            {
                                                invoice.message.paymentMethod
                                            }
                                        </p>
                                        <h6>Notas de la factura</h6>
                                        <p>
                                        {invoice.message.note}
                                        </p>
                                    </div>
                                    <div className="col-4 mt-2">
                                        <div className="invoice-subtotal">
                                            <div className="invoice-calc d-flex justify-content-between">
                                                <span className="invoice-title">Importe Neto</span>
                                                <span className="invoice-value">{
                                                    invoice.message.products.reduce((total, item) => {
                                                        return total + item.quantity * item.price
                                                    }, 0)
                                                }</span>
                                            </div>
                                            
                                            <div className="invoice-calc d-flex justify-content-between">
                                                <span className="invoice-title">Descuento Cliente</span>
                                                <span className="invoice-value">{
                                                    invoice.message.clientDiscount
                                                }</span>
                                            </div>
                                            <div className="invoice-calc d-flex justify-content-between">
                                                <span className="invoice-title">IVA</span>
                                                <span className="invoice-value">21%</span>
                                            </div>
                                            <hr />
                                            <div className="invoice-calc d-flex justify-content-between">
                                                <span className="invoice-title">Total</span>
                                                <span className="invoice-value">$ {
                                                     invoice.message.products.reduce((total, item) => {
                                                        return total + item.quantity * item.price
                                                    }, 0) - invoice.message.discount - invoice.message.clientDiscount
                                                }</span>
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
            <Link
              type="button"
              className="btn btn-lg btn-outline-dark m-2"
              to={`/inicio/instalaciones/`}
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