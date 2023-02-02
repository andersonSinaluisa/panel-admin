import { CATALOGUE_TYPE_PRODUCT_IN_WAREHOUSE, SUCCESS_HTTP_CODE_CREATED } from "application/common";
import { interface_core } from "infrastructure/api/core";
import { products_interface } from "infrastructure/api/products";
import { wharehouse_request } from "infrastructure/api/wharehouse";
import Checkbox from "infrastructure/components/checkbox";
import Input from "infrastructure/components/input";
import Select from "infrastructure/components/select";
import Toast, { ToastProps } from "infrastructure/components/toast";
import { CreateProductProps } from "presentation/container/products/create-container";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";


const CreateProduct = (props: CreateProductProps) => {


    const navigate = useNavigate();

    const [form, setForm] = useState<products_interface.CreateProductRequest>({
        code: "",
        description: "",
        initialUnitPurchasePrice: "",
        name: "",
        onSale: false,
        priceForPublic: "",
        stock: 0,
        type: {
            id: 0,
        },
        warehouse: {
            id: 0,
        },
    })


    const [load, setLoad] = useState<boolean>(false)

    const [message, setMessage] = useState<ToastProps>({
        type: "info",
        visible: false,
        title: "",
        description: "",
    });

    const [catalogue, setCatalogues] = useState<interface_core.State[]>([])

    useEffect(() => {
        setCatalogues(props.catalogue.data.data);
    }, [props.catalogue])




    useEffect(() => {
        setLoad(props.isLoading)

    }, [props.isLoading])

    useEffect(() => {

        if (props.CreateProduct.status === 200) {
            setMessage({
                type: "success",
                visible: true,
                title: "Producto creado",
                description: "El producto se ha creado correctamente",
            });

            navigate("/inicio/productos");
            return;
        }

        if (props.CreateProduct.status !== 0) {
            setMessage({
                type: "danger",
                visible: true,
                title: "Error al crear el producto",
                description: "El producto no se ha creado correctamente",
            });
            setTimeout(() => {
                setMessage({
                    type: "info",
                    visible: false,
                    title: "",
                    description: "",
                });
            }, 3000);
            return;
        }


    }, [props.CreateProduct]);




    const handleChange = (
        event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.currentTarget;

        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        });



    };


    const searchWharehouse = (inputValue: string, callback: (options: any[]) => void) => {

        if (inputValue.length > 3) {
            wharehouse_request.GetWharehouse({
                token: props.token,
                page: 1,
                perPage: 100,
                search: inputValue
            }).toPromise().then((res) => {
                callback(res?.data?.data?.map((item) => {
                    return {
                        label: item.name + " / " + item.location + " / " + item.country?.name,
                        value: item.id
                    }
                }) || [])
            })
        }


    }

    const handleSubmit = () => {

        props.onCreateProductAsync({
            body: form,
            headers: {
                token: props.token
            }
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

    return (
        <section id="basic-vertical-layouts">
            <div className="col-12 row bg-cover">
                <div className="row p-2 col-12">



                    <div className="col-lg-6">
                        <Input
                            label="Nombre"
                            name="name"
                            type={"text"}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="col-lg-6">
                        <Input
                            label="Codigo"
                            name="code"
                            type={"text"}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="col-lg-6">
                        <label htmlFor="description">Descripción</label>
                        <textarea
                            className="form-control"
                            id="description"
                            rows={3}
                            defaultValue={""}
                            name="description"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-lg-6 p-5">
                        <Checkbox
                            label="En venta"
                            name="onSale"
                            onChange={(event) => {
                                setForm({
                                    ...form,
                                    onSale: event.currentTarget.checked,
                                });
                            }}
                        />

                    </div>
                    <div className="col-lg-6">
                        <Input
                            label="Precio de compra"
                            name="initialUnitPurchasePrice"
                            type={"number"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-lg-6">
                        <Input
                            label="Precio de venta al publico"
                            name="priceForPublic"
                            type={"number"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-lg-6">
                        <Select
                            label="Tipo de producto"
                            name="type"
                            options={getListByCode(CATALOGUE_TYPE_PRODUCT_IN_WAREHOUSE)}
                            onChange={
                                (event) => {
                                    setForm({
                                        ...form,
                                        type: {
                                            id: parseInt(event.currentTarget.value)
                                        }
                                    });
                                }
                            }
                        />
                    </div>
                    <div className="col-lg-6">
                        <Input
                            label="Stock"
                            name="stock"
                            type={"number"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="client">Almacén</label>
                        <AsyncSelect

                            loadOptions={(inputValue, callback) => {
                                searchWharehouse(inputValue, callback)

                            }}
                            name="wharehouse"
                            onChange={
                                (newValue: any) => {
                                    setForm({
                                        ...form,
                                        warehouse: {
                                            id: newValue.value
                                        },
                                    });
                                }
                            }
                        />
                    </div>


                </div>
                <div className="col-12 row ">
                    <div className="col-12 justify-content-end d-md-flex ">
                        <Link
                            type="button"
                            className="btn btn-lg btn-outline-dark m-2"
                            to={`/inicio/productos/`}
                        >
                            Atrás
                        </Link>
                        {
                            load ? <button type="button" className="btn btn-lg btn-primary m-2" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Cargando...
                            </button> : <button
                                type="submit"
                                className="btn btn-lg btn-primary m-2"
                                value={"Agregar"}
                                onClick={handleSubmit}
                            >
                                Guardar
                            </button>
                        }
                    </div>
                </div>
            </div>
            <div className="toast-bs-container">
                <Toast {...message} />
            </div>
        </section>
    )
}


export default CreateProduct;