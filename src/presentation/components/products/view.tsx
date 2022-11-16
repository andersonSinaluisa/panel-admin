import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { products_interface } from "infrastructure/api/products";
import DataTable from "infrastructure/components/data-table";
import Modal from "infrastructure/components/modal";
import { ProductsViewProps } from "presentation/container/products/view-container";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductView = (props: ProductsViewProps) => {

    useTitle(props.title)
    useBreadcrumbs(props.breadcrumbs)

    let navigate = useNavigate()

    const [products, setProducts] = React.useState<products_interface.GetProductsResponse>({
        code: 0,
        message: [],
        status: 0,
    })

    const [product, setProduct] = React.useState<products_interface.Product>({
        _id: "",
        assigned: false,
        assignedTo: "",
        cataloged: false,
        createdAt: "",
        description: "",
        name: "",
        identityCounter: "",
        note: "",
        nroSerie: "",
        precioVentaPublico: 0,
        stock: 0,
    })

    const [showModal, setShowModal] = React.useState<boolean>(false);



    useEffect(() => {
        props.onGetProductsAsync({
            token: props.token
        })
        props.onClearProducts()
    }, [])


    useEffect(() => {
        setProducts(props.GetProducts);
    }, [props.GetProducts])

    const getActions = () => {

        let lista_acc = []
        lista_acc.push({
            color: "warning",
            icon: "bx bx-edit",
            label: "Editar",
            name: "delete",
            onClick: (item: products_interface.Product) => {
                navigate('/inicio/productos/' + item._id)
            }
        })
        lista_acc.push({
            color: "danger",
            icon: "bx bx-trash-alt",
            label: "Eliminar",
            name: "delete",
            onClick: (item: products_interface.Product) => {
                setShowModal(true);
                setProduct(item);
            }
        })
        return lista_acc;


    }


    const handleDelete = (item: any) => {
        props.onDeleteProductAsync({
            headers:{
                token: props.token
            },
            id: item._id
        })
        props.onGetProductsAsync({
            token: props.token
        })
        setShowModal(false);

    }


    return (
        <div className="row" id="table-borderless">
            <div className="col-12 mb-2">
                <Link to="/inicio/productos/nuevo" className="btn btn-primary">
                    Nuevo Producto 
                </Link>
            </div>
            <div className="col-12">
                <div className="table-responsive ">
                    <DataTable
                        key={"table-group"}
                        dataTable={products.message}
                        actions={getActions()}
                        columns={[
                            {
                                name: "identityCounter",
                                label: "ID",
                                type: "text",
                            },

                            {
                                name: "nroSerie",
                                label: "Serie",
                                type: "text",
                            },
                            {
                                name: 'name',
                                label: 'Nombre',
                                type: 'text'
                            },
                            {
                                name: 'description',
                                label: 'Descripción',
                                type: 'text'
                            },
                            {
                                name:'stock',
                                label:'Stock',
                                type:'text'
                                
                            },
                            {
                                name: 'cataloged',
                                label: 'Catalogado',
                                type: 'boolean'
                            },
                            
                        ]}
                        dataLimit={5}
                        pageLimit={2}
                    />
                </div>
            </div>

            <Modal className="modal-main" show={showModal} style={{}}>
                <div className="card">
                    <div className="card-header">
                        <h3>¿Desea eliminar el producto {product.name} ?</h3>
                    </div>
                    <div className="card-footer d-flex justify-content-md-end">
                        <button type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                        >Cancelar</button>
                        <button type="button"
                            onClick={() => handleDelete(product)}
                            className="btn btn-danger ml-md-3">Eliminar</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};


export default ProductView;