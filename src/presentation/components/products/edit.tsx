import { CATALOGUE_TYPE_PRODUCT_IN_WAREHOUSE } from "application/common";
import { initProduct } from "application/models/products";
import { interface_core } from "infrastructure/api/core";
import { products_interface } from "infrastructure/api/products";
import { UpdateProductRequest } from "infrastructure/api/products/interface";
import { wharehouse_request } from "infrastructure/api/wharehouse";
import Checkbox from "infrastructure/components/checkbox";
import Input from "infrastructure/components/input";
import Select from "infrastructure/components/select";
import Toast, { ToastProps } from "infrastructure/components/toast";
import { EditProductProps } from "presentation/container/products/edit-container";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AsyncSelect from "react-select/async";


const EditProduct = (props: EditProductProps) => {


    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState<products_interface.Product>(initProduct)
    const [load, setLoad] = useState<boolean>(false);

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
        setLoad(props.isLoading);
    }, [props.isLoading]);

    useEffect(() => {
        if (props.UpdateProduct.status === 200) {
            setMessage({
                type: "success",
                visible: true,
                title: "Producto actualizado",
                description: "El producto se ha actualizado correctamente",
            });

            navigate("/inicio/productos");
            return;
        }

        if (props.UpdateProduct.status !== 0) {
            setMessage({
                type: "danger",
                visible: true,
                title: "Error al actualizar el producto",
                description: "El producto no se ha actualizado correctamente",
            });
            setTimeout(() => {
                setMessage({
                    type: "danger",
                    visible: false,
                    title: "",
                    description: "",
                });
            }, 3000);
            return;
        }
    }, [props.UpdateProduct.status])


    useEffect(() => {

        props.onGetProductAsync({
            headers: {
                token: props.token
            },
            id: id as string
        })

    }, [])


    useEffect(() => {
        setForm(props.GetProduct.data)
    }, [props.GetProduct])



    const handleChange = (
        event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {

        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        });



    };

    /**
 * @memberof  EditProduct
 * @method handleChangeSelect
 * @description funcion que se ejecuta cuando se cambia el valor de un select
 * @param {React.FormEvent<HTMLSelectElement>} event
 * @returns {void}
 * 
 */
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


    const handleSubmit = () => {
        let data: UpdateProductRequest = {
            code: form.code,
            description: form.description,
            initialUnitPurchasePrice: form.initialUnitPurchasePrice,
            name: form.name,
            onSale: form.onSale,
            priceForPublic: form.priceForPublic,
            stock: form.stock,
            type: {
                id: form.type?.id || 0
            },
            warehouse: {
                id: form.warehouse?.id
            }
        }


        props.onUpdateProductAsync({
            body: data,
            headers: {
                token: props.token
            },
            id: id as string
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
                        value: item.id,
                        item: item
                    }
                }) || [])
            })
        }


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
                            value={form.name}
                        />
                    </div>


                    <div className="col-lg-6">
                        <Input
                            label="Codigo"
                            name="code"
                            type={"text"}
                            onChange={handleChange}
                            value={form.code}
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
                            value={form.description}
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
                            checked={form.onSale}
                        />

                    </div>
                    <div className="col-lg-6">
                        <Input
                            label="Precio de compra"
                            name="initialUnitPurchasePrice"
                            type={"number"}
                            onChange={handleChange}
                            value={form.initialUnitPurchasePrice}
                        />
                    </div>
                    <div className="col-lg-6">
                        <Input
                            label="Precio de venta al publico"
                            name="priceForPublic"
                            type={"number"}
                            onChange={handleChange}
                            value={form.priceForPublic}
                        />
                    </div>
                    <div className="col-lg-6">
                        <Select
                            label="Tipo de producto"
                            name="type"
                            options={getListByCode(CATALOGUE_TYPE_PRODUCT_IN_WAREHOUSE)}
                            onChange={handleChangeSelect}
                            selected={form.type?.id}
                        />
                    </div>
                    <div className="col-lg-6">
                        <Input
                            label="Stock"
                            name="stock"
                            type={"number"}
                            onChange={handleChange}
                            value={form.stock + ""}
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
                                        warehouse: newValue.item
                                    });
                                }
                            }
                            value={form.warehouse?.id ? {
                                label: form.warehouse.name + " / " + form.warehouse.location + " / " + form.warehouse.country?.name, value: form.warehouse.id
                            } : null
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
    );
}

export default EditProduct;