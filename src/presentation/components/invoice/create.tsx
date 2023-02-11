import { CATALOGUE_TYPE_INVOICE_PAYMENT_METHOD } from "application/common";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { initialClient } from "application/models/clients";
import { initInvoice } from "application/models/invoice";
import { initProduct } from "application/models/products";
import { initialMetaResponse } from "infrastructure/api/api-handler";
import { clients_interface, clients_request } from "infrastructure/api/clients";
import { interface_core } from "infrastructure/api/core";
import { invoice_interface } from "infrastructure/api/invoice";
import { CreateInvoiceRequest } from "infrastructure/api/invoice/interface";
import { products_interface, products_request } from "infrastructure/api/products";
import Input from "infrastructure/components/input";
import Select from "infrastructure/components/select";
import Toast, { ToastProps } from "infrastructure/components/toast";
import { CreateInvoiceProps } from "presentation/container/invoice/create-container";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SelectReact from 'react-select';
import AsyncSelect from "react-select/async";


const CreateInvoice = (props: CreateInvoiceProps) => {


    let navigate = useNavigate()

    useTitle(props.title)
    useBreadcrumbs(props.breadcrumbs)


    const [message, setMessage] = useState<ToastProps>({
        type: "info",
        visible: false,
        title: "",
        description: "",
    });

    const [form, setForm] = useState<invoice_interface.Invoice>(initInvoice)
    const [catalogue, setCatalogues] = useState<interface_core.State[]>([])

    useEffect(() => {

        if (props.catalogues.status == 200) {
          setCatalogues(props.catalogues.data.data)
          return;
        }
        if (props.catalogues.status != 0) {
          setMessage({
            description: props.catalogues.error,
            title: "Error",
            type: "danger",
            visible: true
          })
          return;
        }
    
      }, [props.catalogues])


    useEffect(() => {
        if (props.CreateInvoice.status === 200) {
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







    const handleChangeSelect = (
        event: React.FormEvent<HTMLSelectElement>
      ) => {
        setForm({
          ...form,
          [event.currentTarget.name]: {
            id: event.currentTarget.value
          },
        });
      };

    const handleChange = (
        event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };

    const handleAddProduct = () => {

        setForm({
            ...form,
            invoiceDetails: [...form.invoiceDetails, {
                amount: 0,
                availability: {
                    code: "",
                    createdAt: "",
                    deletedAt  : "",
                    id: 0,
                    name: "",
                    type: {
                        code: "",
                        createdAt: "",
                        deletedAt: "",
                        id: 0,
                        name: "",
                        updatedAt: "",
                    },
                    updatedAt: "",
                },
                createdAt: "",
                deletedAt: "",
                id: 0,
                product: initProduct,
                state: {
                    code: "",
                    createdAt: "",
                    deletedAt: "",
                    id: 0,
                    name: "",
                    type: {
                        code: "",
                        createdAt: "",
                        deletedAt: "",
                        id: 0,
                        name: "",
                        updatedAt: "",
                    },
                    updatedAt: "",
                },
                updatedAt: "",
            }]
        });

    };


    const handleSubmit = () => {
        //validadte form
        form.iva = parseFloat(totalInvoiceWithIva());
        form.discount = form.clientDiscount;
        let data:CreateInvoiceRequest = {
            billingAt: form.billingDate,
            client: form.client,
            clientDiscount: form.clientDiscount,
            description: form.description,
            
            detailsInvoice: [
                ...form.invoiceDetails.map((item) => {
                    return {
                        amount: item.amount,
                        productId: item.product.id,
                    }
                })
            ],
            discount: form.discount,
            iva: form.iva,
            paymentMethod: form.paymentMethod,
            taxIdentificationNumber: form.taxIdentificationNumber,
            
            variableTaxes: form.variableTaxes,
            workDirection: form.workDirection,
            workReport: form.workReport,
        }

        props.onCreateInvoiceAsync({
            headers: {
                token: props.token,
            },
            body: data
        })

    }


    const removeLastItem = () => {
        if (form.invoiceDetails.length > 1) {
            setForm({
                ...form,
                invoiceDetails: form.invoiceDetails.slice(0, -1),
            });
        }
    };





    const handleItemValue = (
        event: React.FormEvent<HTMLInputElement | HTMLSelectElement>,
        index: number
    ) => {
        const newItems = [...form.invoiceDetails];


        newItems[index] = {
            ...newItems[index],
            [event.currentTarget.name]: event.currentTarget.value,
        };
        


        setForm({
            ...form,
            invoiceDetails: newItems,
        })
    };


    const handleSelectedProduct = (
        event:any,
        index: number
    ) => {
        const newItems = [...form.invoiceDetails];

        newItems[index] =  {
            amount: 0,
            availability: {
                code: "",
                createdAt: "",
                deletedAt  : "",
                id: 0,
                name: "",
                type: {
                    code: "",
                    createdAt: "",
                    deletedAt: "",
                    id: 0,
                    name: "",
                    updatedAt: "",
                },
                updatedAt: "",
            },
            createdAt: "",
            deletedAt: "",
            id: 0,
            product: event.item,
            state: {
                code: "",
                createdAt: "",
                deletedAt: "",
                id: 0,
                name: "",
                type: {
                    code: "",
                    createdAt: "",
                    deletedAt: "",
                    id: 0,
                    name: "",
                    updatedAt: "",
                },
                updatedAt: "",
            },
            updatedAt: "",
        }

        setForm({
            ...form,
            invoiceDetails: newItems
        })
    };


    const handleSelectClient = (event: any) => {
        setForm({
            ...form,
            client: event.item
        })
    }


    const getListByCode = (code: string) => {
        return catalogue.filter((item) => item.type.code === code).map((item) => {
          return {
            label: item.name,
            value: item.id
          }
        })
      }

    

    const totalInvoice = () => {
        let total = form.invoiceDetails.reduce((total, item) => {
            return total + (item.amount * parseFloat(item.product.priceForPublic))
        }, 0)
        return parseFloat(total.toFixed(2))
    }

    const totalInvoiceWithIva = () => {
        let total = totalInvoice() * 0.21 
        return total.toFixed(2)
    }


    const totalInvoiceWithIvaAndDiscount = () => {
        let total = totalInvoice() + parseFloat(totalInvoiceWithIva()) - form.clientDiscount
        return total.toFixed(2)
    }

    const searchClient = (inputValue: string, callback: (options: any[]) => void) => {

        if (inputValue.length > 3) {
            clients_request.GetClients({
                token: props.token,
                page: 1,
                perPage: 100,
                search: inputValue
            }).toPromise().then((res) => {
                callback(res?.data?.data?.map((item) => {
                    return {
                        label: item.firstName + " " + item.firstSurname + " / " + item.documentValue,
                        value: item.id,
                        item: item
                    }
                }) || [])
            })
        }


    }


    const searchProduct = (inputValue: string, callback: (options: any[]) => void) => {

        if (inputValue.length > 3) {
            products_request.GetProducts({
                token: props.token,
                page: 1,
                perPage: 100,
                search: inputValue
            }).toPromise().then((res) => {
                callback(res?.data?.data?.map((item) => {
                    return {
                        label: item.name,
                        value: item.id,
                        item: item
                    }
                }) || [])
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
                                    <div className="col-12 col-md-4">
                                        <h4>N° Factura</h4>
                                        <Input
                                            label="N° Factura"
                                            type="text"
                                            name="taxIdentificationNumber"
                                            onChange={handleChange}
                                            value={form.taxIdentificationNumber}
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
                                            value={form.client?.id+""}
                                            enabled={true}

                                        />
                                        <Input
                                            label="SU PEDIDO"
                                            type="text"
                                            name="code"
                                            enabled={true}
                                            value={form.taxIdentificationNumber}

                                        />
                                    </div>
                                    <div className="col-12 col-md-3"></div>
                                    <div className="col-12 col-md-4">
                                        <h4>Datos Fiscales</h4>
                                        <label htmlFor="clientID">Cliente</label>
                                        <AsyncSelect
                                            name="client"
                                            loadOptions={searchClient}
                                            onChange={handleSelectClient}
                                        />
                                        <Input
                                            label="Dirección"
                                            type="text"
                                            name="direction"
                                            enabled={true}
                                            value={form.client?.direction}
                                        />

                                        <Input
                                            label="Código Postal"
                                            type="text"
                                            name="direction"
                                            value={form.client?.postalCode}
                                            enabled={true}
                                        />
                                        <Input
                                            label="Provincia"
                                            type="text"
                                            name="direction"
                                            enabled={true}
                                            value={form.client?.province}
                                        />
                                        <Input
                                            label={form.client?.documentType.name}
                                            type="text"
                                            name="direction"
                                            enabled={true}
                                            value={form.client?.documentValue}
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
                                                        <div className="col-12 col-md-1 invoice-item-title">Cantidad</div>
                                                        <div className="col-12 col-xl-3 ml-2 col-md-2 invoice-item-title">Ref</div>

                                                        <div className="col-12 col-md-2 invoice-item-title">Nº Serie</div>
                                                        <div className="col-12 col-md-3 invoice-item-title">Descripcion</div>
                                                        <div className="col-12 col-xl-1 col-md-1 invoice-item-title">Precio</div>
                                                        <div className="col-12 col-xl-1 col-md-1 invoice-item-title">Total</div>

                                                    </div>
                                                    <div className=" d-flex border rounded mb-1  row col-12 ">
                                                        <div className="invoice-item-filed row col-12 ">

                                                            {
                                                                form.invoiceDetails.map((item, index) => (
                                                                    <>

                                                                        <div className="col-md-1 col-12 form-group">
                                                                            <Input
                                                                                label=""
                                                                                name="amount"
                                                                                type="number"
                                                                                onChange={(event) => handleItemValue(event, index)}
                                                                                value={form.invoiceDetails[index].amount+""}
                                                                            />
                                                                        </div>

                                                                        <div className="col-12 col-md-2 mt-1">
                                                                            <AsyncSelect
                                                                                name="product"
                                                                                onChange={(event) => handleSelectedProduct(event, index)}
                                                                                loadOptions={searchProduct}
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-2 col-12  form-group mt-2">
                                                                            {
                                                                                form.invoiceDetails[index].product?.code
                                                                            }
                                                                        </div>
                                                                        <div className="col-md-4 col-12 form-group mt-2">
                                                                            {
                                                                                form.invoiceDetails[index].product?.description
                                                                            }
                                                                        </div>


                                                                        <div className="col-md-1 col-12 form-group mt-2">
                                                                            <strong className="text-primary align-middle">$ {
                                                                                form.invoiceDetails[index].product?.priceForPublic
                                                                            }</strong>
                                                                        </div>
                                                                        <div className="col-md-1 col-12 form-group mt-2">
                                                                            <strong className="text-primary align-middle">$ {
                                                                                parseFloat(form.invoiceDetails[index].product?.priceForPublic) * form.invoiceDetails[index].amount
                                                                            }</strong>
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
                                        <div className="col-12 col-md-8">
                                            <p>Metodo de pago</p>
                                            <Select
                                                label=""
                                                name="paymentMethod"
                                                options={getListByCode(CATALOGUE_TYPE_INVOICE_PAYMENT_METHOD)}
                                                onChange={handleChangeSelect}
                                                selected={
                                                    form.paymentMethod.id
                                                }
                                            />
                                            <textarea name="description" id="note" cols={30} rows={10}
                                                className="form-control mt-1" placeholder="Nota"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-12 col-md-4 mt-2">
                                            <div className="invoice-subtotal">
                                                <div className="invoice-calc d-flex justify-content-between">
                                                    <span className="invoice-title">Importe Neto</span>
                                                    <span className="invoice-value">
                                                        $ {totalInvoice()}
                                                    </span>
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
                                                    <span className="invoice-title">IVA (21%)</span>
                                                    <span className="invoice-value">
                                                        $ {
                                                            totalInvoiceWithIva()
                                                        }
                                                    </span>
                                                </div>
                                                <hr />
                                                <div className="invoice-calc d-flex justify-content-between">
                                                    <span className="invoice-title">Total</span>
                                                    <span className="invoice-value">$ {totalInvoiceWithIvaAndDiscount()}</span>
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