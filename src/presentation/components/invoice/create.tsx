import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
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
        message: [],
        status: 0,
    });


    const [client, setClient] = useState<clients_interface.Client>({
        _id: "",
        identityCounter: "",
        userId: "",
        personType: "",
        documentType: "",
        document: "",
        name: "",
        lastname: "",
        customerType: "",
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
        discount: "",
        note: "",
        installations: [],
        createdAt: "",

    })
    const [message, setMessage] = useState<ToastProps>({
        type: "info",
        visible: false,
        title: "",
        description: "",
    });

    const [products, setProducts] = useState<products_interface.GetProductsResponse>({
        message: [],
        status: 0,
        code: 0
    });

    const [itemProduct, setItemProduct] = useState<invoice_interface.ProductInvoice[]>([
        {
            id: "",
            name: "",
            note: "",
            nroSerie: "",
            price: 0,
            quantity: 0,
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
        event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
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
                id: "",
                quantity: 0,
                price: 0,
                name: "",
                note: "",
                nroSerie: "",
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
        const product = products.message.find(
            (product) => product._id === event.currentTarget.value
        );

        if (product) {
            newItems[index] = {

                id: product._id,
                name: product.name,
                note: product.note,
                nroSerie: product.nroSerie,
                price: product.precioVentaPublico,
                quantity: 0,
            }
        }

        setItemProduct(newItems);
    };


    const handleSelectClient = (event: any) => {
        const client = clients.message.find((client) => client._id === event.value)
        if (client) {
            setForm({
                ...form,
                clientID: client._id,
                NumeroIdentificacionFiscal: client.document,
                workDirection: client.direction
            })
        }
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
                                            label="Numero de factura"
                                            type="text"
                                            name="numeroFactura"
                                        />
                                        <Input
                                            label="Fecha de facturación"
                                            type="date"
                                            name="billingDate"
                                            value={form.billingDate}
                                        />

                                    </div>
                                    <div className="col-3"></div>
                                    <div className="col-4">
                                        <h4>Datos Fiscales</h4>
                                        <label htmlFor="clientID">Cliente</label>
                                        <SelectReact
                                            name="clientID"
                                            options={clients.message.map((client) => ({
                                                value: client._id,
                                                label: client.name,
                                            }))}
                                            onChange={handleSelectClient}

                                        />

                                        <p>
                                            <strong>Numero de identificación fiscal:</strong>{" "}
                                            {form.NumeroIdentificacionFiscal}

                                            <br />
                                            <strong>Dirección de trabajo:</strong>{" "}
                                            {form.workDirection}

                                            <br />
                                        </p>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="invoice-product-details ">
                                        <form className="form invoice-item-repeater">
                                            <div data-repeater-list="group-a">
                                                <div data-repeater-item>
                                                    <div className="row mb-50">
                                                        <div className="col-2 col-md-2 invoice-item-title">Producto</div>
                                                        <div className="col-3 invoice-item-title"># Serie</div>
                                                        <div className="col-3 invoice-item-title">Cantidad</div>
                                                        <div className="col-2 col-md-1 invoice-item-title">Precio</div>
                                                        <div className="col-2 col-md-1 invoice-item-title">Total</div>

                                                    </div>
                                                    <div className="invoice-item d-flex border rounded mb-1">
                                                        <div className="invoice-item-filed row  ">

                                                            {
                                                                itemProduct.map((item, index) => (
                                                                    <>

                                                                        <div className="col-12 col-md-2 mt-1">
                                                                            <Select
                                                                                label=""
                                                                                name="productID"
                                                                                options={products.message.map((product) => {
                                                                                    return {
                                                                                        value: product._id,
                                                                                        label: product.name,
                                                                                    }
                                                                                }
                                                                                )}
                                                                                onChange={(event) => handleSelectedProduct(event, index)}
                                                                                selected={
                                                                                    item.id
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-3 col-12 ">
                                                                            <Input
                                                                                label=""
                                                                                name="nroSerie"
                                                                                type="text"
                                                                                value={
                                                                                    item.nroSerie
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-3 col-12 form-group">
                                                                            <Input
                                                                                label=""
                                                                                name="quantity"
                                                                                type="number"
                                                                                onChange={(event) => handleItemValue(event, index)}
                                                                                value={item.quantity + ""}
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-1 col-12 form-group mt-2">
                                                                            <strong className="text-primary align-middle">$ {item.price
                                                                            }</strong>
                                                                        </div>
                                                                        <div className="col-md-1 col-12 form-group mt-2">
                                                                            <strong className="text-primary align-middle">$ {item.quantity * item.price}</strong>
                                                                        </div>
                                                                        <div className="row col-12">
                                                                            <div className="col-md-4 col-12 form-group">
                                                                                <Input
                                                                                    label="Nota"
                                                                                    name="note"
                                                                                    type={"text"}
                                                                                    placeholder="Nota"
                                                                                    onChange={(event) => handleItemValue(event, index)}
                                                                                    value={item.note}
                                                                                />
                                                                            </div>
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
                                        <div className="col-4 col-sm-6">
                                            <p>Metodo de pago</p>
                                            <select className="form-control">
                                                <option>Choose Bank</option>
                                                <option>Bank of America</option>
                                                <option>Barclays Bank</option>
                                                <option>HSBC</option>
                                                <option>Standard Chartered</option>
                                            </select>
                                        </div>
                                        <div className="col-10 d-flex justify-content-end ">
                                            <div className="invoice-subtotal">
                                                <div className="invoice-calc d-flex justify-content-between">
                                                    <span className="invoice-title">Subtotal</span>
                                                    <span className="invoice-value">{
                                                        itemProduct.reduce((total, item) => {
                                                            return total + item.quantity * item.price
                                                        }, 0)
                                                    }</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span className="invoice-title mt-2">Descuento</span>
                                                    <span className="invoice-value col-4">
                                                        <Input
                                                            label=""
                                                            name="discount"
                                                            type="number"
                                                            onChange={handleChange}
                                                            value={form.discount + ""}
                                                        />
                                                    </span>
                                                </div>
                                                <div className="invoice-calc d-flex justify-content-between">
                                                    <span className="invoice-title">Descuento Cliente</span>
                                                    <span className="invoice-value">{
                                                        form.clientDiscount
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
                                                        itemProduct.reduce((total, item) => {
                                                            return total + item.quantity * item.price
                                                        }, 0) - form.discount - form.clientDiscount
                                                    }</span>
                                                </div>
                                                <div className="invoice-calc d-flex mt-3 justify-content-between">
                                                    <button className="btn btn-primary btn-block" onClick={handleSubmit}>
                                                        <i className="bx bx-send"></i>
                                                        <span className="invoice-send-btn">Enviar</span>
                                                    </button>
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