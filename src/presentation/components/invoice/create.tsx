import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { initialClient } from "application/models/clients";
import { initialMetaResponse } from "infrastructure/api/api-handler";
import { clients_interface } from "infrastructure/api/clients";
import { invoice_interface } from "infrastructure/api/invoice";
import { products_interface } from "infrastructure/api/products";
import Input from "infrastructure/components/input";
import Select from "infrastructure/components/select";
import Toast, { ToastProps } from "infrastructure/components/toast";
import { CreateInvoiceProps } from "presentation/container/invoice/create-container";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SelectReact from 'react-select';


const CreateInvoice = (props: CreateInvoiceProps) => {


    let navigate = useNavigate()

    useTitle(props.title)
    useBreadcrumbs(props.breadcrumbs)

    const [clients, setClients] = useState<clients_interface.GetClientsResponse>({
        data: [],
        ...initialMetaResponse
    });


    const [client, setClient] = useState<clients_interface.Client>(initialClient)
    const [message, setMessage] = useState<ToastProps>({
        type: "info",
        visible: false,
        title: "",
        description: "",
    });

    const [products, setProducts] = useState<products_interface.GetProductsResponse>({
        data: [],
        ...initialMetaResponse
    });

    const [itemProduct, setItemProduct] = useState<invoice_interface.ProductInvoice[]>([
        {
            productId: 0,
            amount: 0,
        }
    ])

    const [form, setForm] = useState<invoice_interface.CreateInvoiceRequest>({
        billingDate: "",
        clientDiscount: 0,
        clientID: "",
        discount: 0,
        impuestosVariables: 0,
        IVA: 0,
        note: "",
        paymentMethod: "",
        NumeroIdentificacionFiscal: "",
        products: [],
        workDirection: "",
        workReport: "",

    })




    useEffect(() => {
        if (props.CreateInvoice.status === 201) {
            setMessage({
                type: "success",
                visible: true,
                title: "Factura creada",
                description: "Factura creada con exito",
            });
            setTimeout(() => {
                navigate("/inicio/facturas")
            }, 2000);

            return;
        }

        if (props.CreateInvoice.status !== 0) {
            setMessage({
                type: "danger",
                visible: true,
                title: "Error al crear factura",
                description: "Error al crear factura",
            });
            return
        }
    }, [props.CreateInvoice])



    useEffect(() => {
        props.onGetClientsAsync({
            token: props.token,
        })
        props.onGetProductsAsync({
            token: props.token,
        })
    }, [])

    useEffect(() => {
        setProducts(props.GetProducts)
        setClients(props.GetClients);
    }, [props.GetClients, props.GetProducts])




    const handleChange = (
        event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };

    const handleAddProduct = () => {
        setItemProduct([
            ...itemProduct,
            {
                productId: 0,
                amount: 0,
            },
        ]);
    };


    const handleSubmit = () => {
        //validadte form

        form.products = itemProduct
        if (form.clientID === "") {
            setMessage({
                type: "danger",
                visible: true,
                title: "Error",
                description: "Debe seleccionar un cliente",
            });
            return;


        }

        if (form.products.length === 0) {
            setMessage({
                type: "danger",
                visible: true,
                title: "Error",
                description: "Debe agregar al menos un producto",
            });
            return;


        }

        if (form.workDirection === "") {
            setMessage({
                type: "danger",
                visible: true,
                title: "Error",
                description: "Debe agregar una dirección de trabajo",
            });
            return;


        }

        if (form.workReport === "") {
            setMessage({
                type: "danger",
                visible: true,
                title: "Error",
                description: "Debe agregar un reporte de trabajo",
            });
            return;


        }

        if (form.paymentMethod === "") {
            setMessage({
                type: "danger",
                visible: true,
                title: "Error",
                description: "Debe agregar un metodo de pago",
            });
            return;


        }

        if (form.billingDate === "") {
            setMessage({
                type: "danger",
                visible: true,
                title: "Error",
                description: "Debe agregar una fecha de facturación",
            });
            return;


        }

        props.onCreateInvoiceAsync({
            headers: {
                token: props.token,
            },
            body: form
        })

    }


    const removeLastItem = () => {
        if (itemProduct.length > 1) {
            setItemProduct(itemProduct.slice(0, -1));
        }
    };





    const handleItemValue = (
        event: React.FormEvent<HTMLInputElement | HTMLSelectElement>,
        index: number
    ) => {
        const newItems = [...itemProduct];


        newItems[index] = {
            ...newItems[index],
            [event.currentTarget.name]: event.currentTarget.value,
        };


        setItemProduct(newItems);
    };


    const handleSelectedProduct = (
        event: React.FormEvent<HTMLSelectElement>,
        index: number
    ) => {
        const newItems = [...itemProduct];
        const product = products.data.find(
            (product) => product.id + "" === event.currentTarget.value
        );

        if (product) {
            newItems[index] = {
                productId: product.id,
                amount: 0,
            }
        }

        setItemProduct(newItems);
    };


    const handleSelectClient = (event: any) => {

    }

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
                                        <Input
                                            label="N° Factura"
                                            type="text"
                                            name="numeroFactura"
                                            onChange={handleChange}
                                        />
                                        <Input
                                            label="Fecha factura"
                                            type="date"
                                            name="billingDate"
                                            value={form.billingDate}
                                            onChange={handleChange}

                                        />
                                        <Input
                                            label="Código Cliente"
                                            type="text"
                                            name="code"
                                            value={""}
                                            enabled={true}

                                        />
                                        <Input
                                            label="SU PEDIDO"
                                            type="text"
                                            name="code"
                                        />
                                    </div>
                                    <div className="col-3"></div>
                                    <div className="col-4">
                                        <h4>Datos Fiscales</h4>
                                        <label htmlFor="clientID">Cliente</label>
                                        <SelectReact
                                            name="clientID"
                                            options={clients.data.map((client) => ({
                                                value: client.id,
                                                label: client.firstName + " " + client.secondName,
                                            }))}
                                            onChange={handleSelectClient}

                                        />
                                        <Input
                                            label="Dirección"
                                            type="text"
                                            name="direction"
                                            value={""}
                                            enabled={true}
                                        />

                                        <Input
                                            label="Código Postal"
                                            type="text"
                                            name="direction"
                                            value={""}
                                            enabled={true}
                                        />
                                        <Input
                                            label="Provincia"
                                            type="text"
                                            name="direction"
                                            enabled={true}
                                        />
                                        <Input
                                            label="C.I.F. / N.I.F."
                                            type="text"
                                            name="direction"
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
                                            <div data-repeater-list="group-a">
                                                <div data-repeater-item>
                                                    <div className="row ">
                                                        <div className="col-1 invoice-item-title">Cantidad</div>
                                                        <div className="col-3 ml-2 col-md-2 invoice-item-title">Ref</div>

                                                        <div className="col-2 invoice-item-title">Nº Serie</div>
                                                        <div className="col-3 invoice-item-title">Descripcion</div>
                                                        <div className="col-2 col-md-1 invoice-item-title">Precio</div>
                                                        <div className="col-2 col-md-1 invoice-item-title">Total</div>

                                                    </div>
                                                    <div className=" d-flex border rounded mb-1  row col-12 ">
                                                        <div className="invoice-item-filed row col-12 ">

                                                            {
                                                                itemProduct.map((item, index) => (
                                                                    <>

                                                                        <div className="col-md-1 col-12 form-group">
                                                                            <Input
                                                                                label=""
                                                                                name="quantity"
                                                                                type="number"
                                                                                onChange={(event) => handleItemValue(event, index)}
                                                                                value={""}
                                                                            />
                                                                        </div>

                                                                        <div className="col-12 col-md-2 mt-1">
                                                                            <Select
                                                                                label=""
                                                                                name="productID"
                                                                                options={products.data.map((product) => {
                                                                                    return {
                                                                                        value: product.id,
                                                                                        label: product.code,
                                                                                    }
                                                                                }
                                                                                )}
                                                                                onChange={(event) => handleSelectedProduct(event, index)}
                                                                                selected={
                                                                                    item.productId
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-2 col-12  form-group mt-2">
                                                                            {
                                                                                "00000"
                                                                            }
                                                                        </div>
                                                                        <div className="col-md-4 col-12 form-group mt-2">
                                                                            {products.data.find((product) => product.id === item.productId) && (
                                                                                products.data.find((product) => product.id === item.productId)?.description
                                                                            )}
                                                                        </div>


                                                                        <div className="col-md-1 col-12 form-group mt-2">
                                                                            <strong className="text-primary align-middle">$ {"0000"}</strong>
                                                                        </div>
                                                                        <div className="col-md-1 col-12 form-group mt-2">
                                                                            <strong className="text-primary align-middle">$ 0000</strong>
                                                                        </div>

                                                                        <div className="col-12">
                                                                            <hr />

                                                                        </div>

                                                                    </>

                                                                ))

                                                            }
                                                        </div>
                                                        <div className="invoice-icon d-flex flex-column justify-content-between border-left p-25">
                                                            <span className="cursor-pointer"
                                                                onClick={removeLastItem}
                                                            >
                                                                <i className="bx bx-x"></i>
                                                            </span>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col p-0">
                                                    <button
                                                        type="button"
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => handleAddProduct()}
                                                    >
                                                        <i className="bx bx-plus"></i>
                                                        <span className="invoice-repeat-btn">Agregar</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="card-body pt-0 mx-25">
                                    <hr />
                                    <div className="row">
                                        <div className="col-8">
                                            <p>Metodo de pago</p>
                                            <Select
                                                label=""
                                                name="paymentMethod"
                                                options={[
                                                    {
                                                        value: "Efectivo",
                                                        label: "Efectivo",
                                                    },
                                                    {
                                                        value: "Tarjeta",
                                                        label: "Tarjeta",
                                                    },
                                                ]}
                                                onChange={handleChange}
                                                selected={
                                                    form.paymentMethod
                                                }
                                            />
                                            <textarea name="note" id="note" cols={30} rows={10}
                                                className="form-control mt-1" placeholder="Nota"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-4 mt-2">
                                            <div className="invoice-subtotal">
                                                <div className="invoice-calc d-flex justify-content-between">
                                                    <span className="invoice-title">Importe Neto</span>
                                                    <span className="invoice-value">0000</span>
                                                </div>

                                                {
                                                    form.clientDiscount !== 0 && (
                                                        <div className="invoice-calc d-flex justify-content-between">
                                                            <span className="invoice-title">Descuento Cliente</span>
                                                            <span className="invoice-value">{
                                                                form.clientDiscount
                                                            }</span>
                                                        </div>
                                                    )
                                                }

                                                <div className="invoice-calc d-flex justify-content-between">
                                                    <span className="invoice-title">IVA</span>
                                                    <span className="invoice-value">21%</span>
                                                </div>
                                                <hr />
                                                <div className="invoice-calc d-flex justify-content-between">
                                                    <span className="invoice-title">Total</span>
                                                    <span className="invoice-value">$ 0.00</span>
                                                </div>
                                                <div className="invoice-calc d-flex mt-3 justify-content-between">
                                                    <button className="btn btn-primary btn-block" onClick={handleSubmit}>
                                                        <i className="bx bx-send"></i>
                                                        <span className="invoice-send-btn">Enviar</span>
                                                    </button>

                                                </div>
                                                <div className="invoice-calc d-flex justify-content-between">
                                                    <Link
                                                        type="button"
                                                        className="btn  btn-outline-dark mt-1 btn-block"
                                                        to={`/inicio/facturas/`}
                                                    >
                                                        Atrás
                                                    </Link>

                                                </div>



                                            </div>
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
        </section>

    )
}

export default CreateInvoice;