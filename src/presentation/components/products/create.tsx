import { SUCCESS_HTTP_CODE_CREATED } from "application/common";
import { products_interface } from "infrastructure/api/products";
import Input from "infrastructure/components/input";
import Select from "infrastructure/components/select";
import Toast, { ToastProps } from "infrastructure/components/toast";
import { CreateProductProps } from "presentation/container/products/create-container";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const CreateProduct = (props: CreateProductProps) => {


    const navigate = useNavigate();

    const [form, setForm] = useState<products_interface.CreateProductCatalogRequest|products_interface.CreateProductUncatalogRequest>({
        name: "",
        description: "",
        note: "",
        precioVentaPublico: 0,
        nroSerie:"",
        assigned:false,
        createdBy: "",
    })


    const [message, setMessage] = useState<ToastProps>({
        type: "info",
        visible: false,
        title: "",
        description: "",
    });


    useEffect(() => {

        if (props.CreateProductCatalog.status === 200) {
            setMessage({
                type: "success",
                visible: true,
                title: "Producto creado",
                description: "El producto se ha creado correctamente",
            });
            navigate("/inicio/productos");
            return;
        }

        if (props.CreateProductCatalog.status !== 0) {
            setMessage({
                type: "danger",
                visible: true,
                title: "Error al crear el producto",
                description: "El producto no se ha creado correctamente",
            });
            return;
        }


    }, [props.CreateProductCatalog]);


    const handleChange = (
        event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.currentTarget;
        //if precioVentaPublico is a number
        if (name === "precioVentaPublico") {
            setForm({ ...form, [name]: Number(value) });
        }else{
            setForm({
                ...form,
                [event.currentTarget.name]: event.currentTarget.value,
            });
        }

        
    };


    const handleSubmit = () => {

        form.createdBy = props.idUser;
        //validate fields
        if (form.name === "" || form.description === "" || form.note === "" || form.precioVentaPublico === 0) {
            setMessage({
                type: "danger",
                visible: true,
                title: "Error",
                description: "Todos los campos son obligatorios",
            });
            return;
        }

        //call api
        props.onCreateProductCatalogAsync({
            body: form as products_interface.CreateProductCatalogRequest,
            headers: {
                token: props.token
            }
        })

    }

    return (
        <section id="basic-vertical-layouts">
            <div className="col-12 row bg-cover">
                <div className="row p-2 col-12">

                
                <div className="col-lg-6">
                        <Input
                            label="Contador de Identidad"
                            name="indentityCounter"
                            type={"text"}
                            onChange={handleChange}
                        />
                    </div>
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
                            label="Nro de serie"
                            name="nroSerie"
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
                    <div className="col-lg-6">
                        <Input
                            label="Nota"
                            name="note"
                            type={"text"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-lg-6">
                        <Input
                            label="Precio de venta al publico"
                            name="precioVentaPublico"
                            type={"number"}
                            onChange={handleChange}
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
                        <button
                            type="submit"
                            className="btn btn-lg btn-primary m-2"
                            value={"Agregar"}
                            onClick={handleSubmit}
                        >
                            Guardar
                        </button>
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