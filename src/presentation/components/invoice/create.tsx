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



const CreateInvoice = (props: CreateInvoiceProps) => {


    let navigate = useNavigate()

    useTitle(props.title)
    useBreadcrumbs(props.breadcrumbs)

    const [clients, setClients] = useState<clients_interface.GetClientsResponse>({
        message: [],
        status: 0,
    });

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




    useEffect(()=>{
        if( props.CreateInvoice.status===201){
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
    },[props.CreateInvoice])



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


    const handleSubmit = ()=>{
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

    return (
        <section className="invoice-edit-wrapper">
            <div className="row">
                {/* invoice view page */}
                <div className="col-xl-9 col-md-8 col-12">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-body pb-0 mx-25">
                                {/* header section */}
                                <div className="row mx-0">
                                    <div className="col-xl-4 col-md-12 d-flex align-items-center pl-0">
                                        <h6 className="invoice-number mr-75">Numero Identificación fiscal</h6>
                                        <input type="text" className="form-control pt-25 w-50"
                                            name="NumeroIdentificacionFiscal"
                                            value={form.NumeroIdentificacionFiscal}
                                            onChange={handleChange}
                                            placeholder="#000" />
                                    </div>
                                    <div className="col-xl-8 col-md-12 px-0 pt-xl-0 pt-1">
                                        <div className="invoice-date-picker d-flex align-items-center justify-content-xl-end flex-wrap">
                                            <div className="d-flex align-items-center">
                                                <small className="text-muted mr-75">Fecha de Pago: </small>
                                                <fieldset className="d-flex ">
                                                    <input type="date"
                                                        className="form-control pickadate mr-2 mb-50 mb-sm-0" 
                                                        value={form.billingDate}

                                                        onChange={handleChange}
                                                        name="billingDate"
                                                        placeholder="Select Date" />
                                                </fieldset>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <hr />
                                {/* logo and title */}
                                <div className="row my-2 py-50">
                                    <div className="col-sm-6 col-12 order-2 order-sm-1">
                                        <Select
                                            label="Cliente"
                                            name="clientID"
                                            options={clients.message.map((client) => {
                                                return {
                                                    value: client._id,
                                                    label: client.name,
                                                }
                                            })}
                                            onChange={handleChange}

                                        />
                                    </div>

                                </div>
                                <hr />
                                {/* invoice address and contact */}
                                <div className="row invoice-info">
                                    <div className="col-lg-6 col-md-12 mt-25">
                                        <fieldset className="invoice-address form-group">
                                            <Input
                                                label="Parte de Trabajo"
                                                name="workReport"
                                                value={form.workReport}
                                                onChange={handleChange}
                                                type="text"
                                            />

                                        </fieldset>
                                        <fieldset className="invoice-address form-group">
                                            <Input
                                                label="Dirección de Trabajo"
                                                name="workDirection"
                                                value={form.workDirection}
                                                onChange={handleChange}
                                                type="text"
                                            />
                                        </fieldset>
                                        <fieldset className="invoice-address form-group">

                                            <Input
                                                label="Nota"
                                                name="note"
                                                value={form.note}
                                                onChange={handleChange}
                                                type="text"
                                            />
                                        </fieldset>

                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className="card-body pt-50">
                                {/* product details table*/}
                                <div className="invoice-product-details ">
                                    <form className="form invoice-item-repeater">
                                        <div data-repeater-list="group-a">
                                            <div data-repeater-item>
                                                <div className="row mb-50">
                                                    <div className="col-3 col-md-4 invoice-item-title">Producto</div>
                                                    <div className="col-3 invoice-item-title"># Serie</div>
                                                    <div className="col-3 invoice-item-title">Cantidad</div>
                                                    <div className="col-3 col-md-2 invoice-item-title">Precio</div>
                                                </div>
                                                <div className="invoice-item d-flex border rounded mb-1">
                                                    <div className="invoice-item-filed row  px-1">

                                                        {
                                                            itemProduct.map((item, index) => (
                                                                <>

                                                                    <div className="col-12 col-md-4 mt-1">
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
                                                                    <div className="col-md-2 col-12 form-group mt-2">
                                                                        <strong className="text-primary align-middle">$ {
                                                                            item.price
                                                                        }</strong>
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
                                                    className="btn btn-light-primary btn-sm"
                                                    onClick={() => handleAddProduct()}
                                                >
                                                    <i className="bx bx-plus"></i>
                                                    <span className="invoice-repeat-btn">Agregar</span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/* invoice subtotal */}
                                <hr />
                                <div className="invoice-subtotal pt-50">
                                    <div className="row">
                                        <div className="col-md-5 col-12">
                                            <div className="form-group">
                                                <Input
                                                    label="Descuento del Cliente"
                                                    name="clientDiscount"
                                                    type="number"
                                                    onChange={handleChange}

                                                />
                                            </div>
                                            <div className="form-group">
                                                <Input
                                                    label="Descuento"
                                                    name="discount"
                                                    type="number"
                                                    onChange={handleChange}

                                                />
                                            </div>


                                        </div>
                                        <div className="col-md-5 col-12">
                                          
                                            <div className="form-group">
                                                <Input
                                                    label="IVA"
                                                    name="IVA"
                                                    type="number"
                                                    onChange={handleChange}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* invoice action  */}
                <div className="col-xl-3 col-md-4 col-12">
                    <div className="card invoice-action-wrapper shadow-none border">
                        <div className="card-body">
                            <div className="invoice-payment">
                                <div className="invoice-payment-option mb-2">
                                    <p>Método de pago</p>
                                    <select  id="paymentOption"
                                    name="paymentMethod"
                                    className="form-control bg-transparent"
                                        onChange={handleChange}

                                    >
                                        <option value="DebitCard">Debit Card</option>
                                        <option value="DebitCard">Credit Card</option>
                                        <option value="DebitCard">Paypal</option>
                                        <option value="DebitCard">Internet Banking</option>
                                        <option value="DebitCard">UPI Transfer</option>
                                    </select>
                                </div>

                            </div>
                            <div className="invoice-action-btn mb-1">
                                <button className="btn btn-primary btn-block invoice-send-btn" onClick={handleSubmit}>
                                    <i className="bx bx-send"></i>
                                    <span>Guardar</span>
                                </button>
                            </div>

                            <div className="invoice-action-btn mb-1">
                                <Link className="btn btn-outline-dark btn-block" to="/inicio/facturas">
                                    <span>Cancelar</span>
                                </Link>
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