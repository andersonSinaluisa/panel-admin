import { createModel } from "@rematch/core";
import { HeaderProps, initialMetaResponse, ResponseServer } from "infrastructure/api/api-handler";
import { products_request } from "infrastructure/api/products";
import { CatalogProductRequest, CreateProductCatalogRequest, CreateProductUncatalogRequest, GetProductResponse, GetProductsResponse, Product, UpdateProductRequest, UpdateStockProductRequest } from "infrastructure/api/products/interface";
import { RootModel } from "..";

export interface GetProductsStateProps extends ResponseServer {
    data: GetProductsResponse;
}

export interface GetProductStateProps extends ResponseServer {
    data: {
        status: number;
        message: "",
    };
}

export interface CreateProductCatalogStateProps extends ResponseServer {
    data: {
        status: number;
        message: "",
    }
}

export interface CreateProductUncatalogStateProps extends ResponseServer {
    data: {
        status: number;
        message: "",
    }
}

export interface UpdateStockProductStateProps extends ResponseServer {
    data: {
        status: number;
        message: "",
    }
}

export interface UpdateProductStateProps extends ResponseServer {
    data: {
        status: number;
        message: "",
    }
}

export interface CatalogProductStateProps extends ResponseServer {
    data: {
        status: number;
        message: "",
    }
}

export interface DeleteProductStateProps extends ResponseServer {
    data: {
        status: number;
        message: "",
    }
}


export const initProduct: Product = {

    id: 0,
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
    name: "",
    code: "",
    onSale: false,
    stock: 0,
    priceForPublic: "",
    initialUnitPurchasePrice: "",
    description: "",
    state: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: null,
        type: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            name: "",
            code: ""
        },
        name: "",
        code: ""

    },

    availability: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: null,
        type: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            name: "",
            code: ""
        },
        name: "",
        code: ""
    },
    wharehouse: {
        id: 0,
        updatedAt: "",
        availability: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            type: {
                id: 0,
                createdAt: "",
                updatedAt: "",
                deletedAt: null,
                name: "",
                code: ""
            },
            name: "",
            code: ""
        },
        country: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            type: {
                id: 0,
                createdAt: "",
                updatedAt: "",
                deletedAt: null,
                name: "",
                code: ""
            },
            name: ""
        },
        createdAt: "",
        deletedAt   : null,
        location: "",
        name: "",
        province: "",
        state: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            type: {
                id: 0,
                createdAt: "",
                updatedAt: "",
                deletedAt: null,
                name: "",
                code: ""
            },
            name: "",
            code: ""

        },

    }
}

export const PRODUCTS = createModel<RootModel>()({
    state: {
        GetProducts: {
            data: {
                data: [],
                ...initialMetaResponse
            },
            error: "",
            status: 0
        } as GetProductsStateProps,
        CreateProductCatalog: {
            error: "",
            data: {
                status: 0,
                message: ""
            },
            status: 0
        } as CreateProductCatalogStateProps,
        CreateProductUncatalog: {
            error: "",
            data: {
                status: 0,
                message: ""
            },
            status: 0
        } as CreateProductUncatalogStateProps,
        UpdateStockProduct: {
            error: "",
            data: {
                status: 0,
                message: ""
            },
            status: 0
        } as UpdateStockProductStateProps,
        UpdateProduct: {
            error: "",
            data: {
                status: 0,
                message: ""
            },
            status: 0
        } as UpdateProductStateProps,
        CatalogProduct: {
            error: "",
            data: {
                status: 0,
                message: ""
            },
            status: 0
        } as CatalogProductStateProps,
        DeleteProduct: {
            error: "",
            data: {
                status: 0,
                message: ""
            },
            status: 0
        } as DeleteProductStateProps,
        GetProduct: {
            error: "",
            data: {},
            status: 0
        } as GetProductStateProps


    },
    reducers: {
        onGetProducts: (state, payload: GetProductsStateProps) => {
            return {
                ...state,
                GetProducts: payload
            }
        },
        onCreateProductCatalog: (state, payload: CreateProductCatalogStateProps) => {
            return {
                ...state,
                CreateProductCatalog: payload
            }
        },
        onCreateProductUncatalog: (state, payload: CreateProductUncatalogStateProps) => {
            return {
                ...state,
                CreateProductUncatalog: payload
            }
        },
        onUpdateStockProduct: (state, payload: UpdateStockProductStateProps) => {
            return {
                ...state,
                UpdateStockProduct: payload
            }
        },
        onUpdateProduct: (state, payload: UpdateProductStateProps) => {
            return {
                ...state,
                UpdateProduct: payload
            }
        },
        onCatalogProduct: (state, payload: CatalogProductStateProps) => {
            return {
                ...state,
                CatalogProduct: payload
            }
        },
        onDeleteProduct: (state, payload: DeleteProductStateProps) => {
            return {
                ...state,
                DeleteProduct: payload
            }
        },
        onGetProduct: (state, payload: GetProductStateProps) => {
            return {
                ...state,
                GetProduct: payload
            }
        }
    },
    effects: (dispatch) => ({
        async onGetProductsAsync(props: HeaderProps) {
            try {

                const response = await products_request.GetProducts(props).toPromise();
                dispatch.PRODUCTS.onGetProducts({
                    data: response.data,
                    error: "",
                    status: response.status
                });

            } catch (e: any) {
                dispatch.PRODUCTS.onGetProducts({
                    data: {
                        data: [],
                        ...initialMetaResponse

                    },
                    error: e.message,
                    status: 0
                });
            }
        },
        async onCreateProductCatalogAsync(props: { headers: HeaderProps, body: CreateProductCatalogRequest }) {
            try {

                const response = await products_request.CreateCatalogedProduct(props).toPromise();
                dispatch.PRODUCTS.onCreateProductCatalog({
                    data: response.data,
                    error: "",
                    status: response.status
                });

            } catch (e: any) {
                dispatch.PRODUCTS.onCreateProductCatalog({
                    data: {
                        status: 0,
                        message: ""
                    },
                    error: e.message,
                    status: 0
                });
            }
        },
        async onCreateProductUncatalogAsync(props: {
            headers: HeaderProps,
            body: CreateProductUncatalogRequest
        }) {
            try {

                const response = await products_request.CreateUncatalogedProduct(props).toPromise();
                dispatch.PRODUCTS.onCreateProductUncatalog({
                    data: response.data,
                    error: "",
                    status: response.status
                });

            } catch (e: any) {
                dispatch.PRODUCTS.onCreateProductUncatalog({
                    data: {
                        status: 0,
                        message: ""
                    },
                    error: e.message,
                    status: 0
                });
            }
        },
        async onUpdateStockProductAsync(props: { headers: HeaderProps, body: UpdateStockProductRequest, id: string }) {
            try {

                const response = await products_request.UpdateStockProduct(props).toPromise();
                dispatch.PRODUCTS.onUpdateStockProduct({
                    data: response.data,
                    error: "",
                    status: response.status
                });

            } catch (e: any) {
                dispatch.PRODUCTS.onUpdateStockProduct({
                    data: {
                        status: 0,
                        message: ""
                    },
                    error: e.message,
                    status: 0
                });
            }
        },
        async onUpdateProductAsync(props: { headers: HeaderProps, body: UpdateProductRequest, id: string }) {
            try {

                const response = await products_request.UpdateProduct(props).toPromise();
                dispatch.PRODUCTS.onUpdateProduct({
                    data: response.data,
                    error: "",
                    status: response.status
                });

            } catch (e: any) {
                dispatch.PRODUCTS.onUpdateProduct({
                    data: {
                        status: 0,
                        message: ""
                    },
                    error: e.message,
                    status: 0
                });
            }
        },
        async onCatalogProductAsync(props: { headers: HeaderProps, body: CatalogProductRequest, id: string }) {
            try {

                const response = await products_request.CatalogProduct(props).toPromise();
                dispatch.PRODUCTS.onCatalogProduct({
                    data: response.data,
                    error: "",
                    status: response.status
                });

            } catch (e: any) {
                dispatch.PRODUCTS.onCatalogProduct({
                    data: {
                        status: 0,
                        message: ""
                    },
                    error: e.message,
                    status: 0
                });
            }
        },
        async onDeleteProductAsync(props: { headers: HeaderProps, id: string }) {
            try {

                const response = await products_request.DeleteProduct(props).toPromise();
                dispatch.PRODUCTS.onDeleteProduct({
                    data: response.data,
                    error: "",
                    status: response.status
                });

            } catch (e: any) {
                dispatch.PRODUCTS.onDeleteProduct({
                    data: {
                        status: 0,
                        message: ""
                    },
                    error: e.message,
                    status: 0
                });
            }
        },
        async onGetProductAsync(props: { headers: HeaderProps, id: string }) {
            try {

                const response = await products_request.GetProduct(props).toPromise();
                dispatch.PRODUCTS.onGetProduct({
                    data: response.data,
                    error: "",
                    status: response.status
                });

            } catch (e: any) {
                dispatch.PRODUCTS.onGetProduct({
                    data: {
                        status: 0,
                        message: ""
                    },
                    error: e.message,
                    status: 0
                });
            }
        },

        onClearProducts() {

            dispatch.PRODUCTS.onCreateProductCatalog({
                data: {
                    status: 0,
                    message: ""
                },
                error: "",
                status: 0
            });
            dispatch.PRODUCTS.onCreateProductUncatalog({
                data: {
                    status: 0,
                    message: ""
                },
                error: "",
                status: 0
            });
            dispatch.PRODUCTS.onUpdateStockProduct({
                data: {
                    status: 0,
                    message: ""
                },
                error: "",
                status: 0
            });
            dispatch.PRODUCTS.onUpdateProduct({
                data: {
                    status: 0,
                    message: ""
                },
                error: "",
                status: 0
            });
            dispatch.PRODUCTS.onCatalogProduct({
                data: {
                    status: 0,
                    message: ""
                },
                error: "",
                status: 0
            });
            dispatch.PRODUCTS.onDeleteProduct({
                data: {
                    status: 0,
                    message: ""
                },
                error: "",
                status: 0
            });
        }

    })
})