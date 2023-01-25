import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { initProduct } from "application/models/products";
import { initialMetaResponse } from "infrastructure/api/api-handler";
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
        data: [],
        ...initialMetaResponse
    })
    const [load, setLoad] = React.useState<boolean>(true)

    const [product, setProduct] = React.useState<products_interface.Product>(initProduct)

    const [showModal, setShowModal] = React.useState<boolean>(false);



    useEffect(() => {
        props.onGetProductsAsync({
            token: props.token
        })
        setLoad(true)
        props.onClearProducts()
    }, [props.token])



    useEffect(() => {
        setLoad(false)
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
                navigate('/inicio/productos/' + item.id)
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
            headers: {
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
                        dataTable={products.data}
                        actions={getActions()}
                        columns={[

                            {
                                name: "code",
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
                                name: 'stock',
                                label: 'Stock',
                                type: 'text'

                            },
                            {
                                name: 'cataloged',
                                label: 'Catalogado',
                                type: 'boolean'
                            },
                            {
                                name: 'warehouse',
                                label: 'Almacen',
                                type: 'object',
                                field_show: 'name'
                            }

                        ]}
                        dataLimit={5}
                        pageLimit={2}
                        meta={products.meta}
                        onChangePage={(page: number) => {
                            props.onGetProductsAsync({
                                token: props.token,
                                page: page
                            })
                        }}
                        isLoading={load}
                        error={props.errorGetProducts}
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