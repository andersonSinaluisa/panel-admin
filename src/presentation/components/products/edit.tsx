import { products_interface } from "infrastructure/api/products";
import Input from "infrastructure/components/input";
import Select from "infrastructure/components/select";
import Toast, { ToastProps } from "infrastructure/components/toast";
import { EditProductProps } from "presentation/container/products/edit-container";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const EditProduct = (props: EditProductProps) => {


    const {id} = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState<products_interface.UpdateProductRequest>({
        assigned: false,
        assignedTo: "",
        cataloged: false,
        description: "",
        name: "",
        note: "",
        nroSerie: "",
        precioVentaPublico: 0,
        stock: 0,
    })
    const [message, setMessage] = useState<ToastProps>({
        type: "info",
        visible: false,
        title: "",
        description: "",
    });


    useEffect(() => {
        if(props.UpdateProduct.status === 200){
            setMessage({
                type: "success",
                visible: true,
                title: "Producto actualizado",
                description: "El producto se ha actualizado correctamente",
            });

            navigate("/inicio/productos");
            return;
        }
        
        if(props.UpdateProduct.status !== 0){
            setMessage({
                type: "danger",
                visible: true,
                title: "Error al actualizar el producto",
                description: "El producto no se ha actualizado correctamente",
            });
            return;
        }
    }, [props.UpdateProduct.status])


    useEffect(()=>{
        
        props.onGetProductAsync({
            headers:{
                token: props.token
            },
            id: id as string
        })

    },[])


    useEffect(()=>{
        
    },[props.GetProduct])



    const handleChange = (
        event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.currentTarget;
        //if precioVentaPublico is a number
        if (name === "precioVentaPublico") {
            setForm({ ...form, [name]: Number(value) });
        } else {
            setForm({
                ...form,
                [event.currentTarget.name]: event.currentTarget.value,
            });
        }


    };

    const handleSubmit = () => {

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

        props.onUpdateProductAsync({
            body: form,
            headers: {
                token: props.token
            },
            id: id as string
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
                            value={form.name}
                        />
                    </div>
                  
                    <div className="col-lg-6">
                        <Select
                            label="Tipo de producto"
                            name="type"
                            options={[
                                { value: 'catalog', label: 'Catalogado' },
                                { value: 'uncatalog', label: 'No catalogado' }
                            ]}
                            onChange={
                                (event: React.FormEvent<HTMLSelectElement>) => {
                                   if(event.currentTarget.value === "catalog"){
                                       setForm({
                                           ...form,
                                           cataloged:true
                                       })
                                    }else{
                                        setForm({
                                            ...form,
                                            cataloged:false
                                        })
                                    }
                                }
                            }
                            selected={form.cataloged ? "catalog" : "uncatalog"}
                        />
                    </div>

                    {
                        form.cataloged ? (
                            <div className="col-lg-6">
                                <Input
                                    label="Nro de serie"
                                    name="nroSerie"
                                    type={"text"}
                                    onChange={handleChange}
                                    value={form.nroSerie}
                                />
                            </div>
                        ) :
                            (
                                <div className="col-lg-6">
                                    <Input
                                        label="Stock"
                                        name="stock"
                                        type={"text"}
                                        onChange={handleChange}
                                        value={form.stock+""}

                                    />
                                </div>
                            )
                    }


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
                    <div className="col-lg-6">
                        <Input
                            label="Nota"
                            name="note"
                            type={"text"}
                            onChange={handleChange}
                            value={form.note}
                        />
                    </div>

                    <div className="col-lg-6">
                        <Input
                            label="Precio de venta al publico"
                            name="precioVentaPublico"
                            type={"number"}
                            onChange={handleChange}
                            value={form.precioVentaPublico+""}
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
    );
}

export default EditProduct;