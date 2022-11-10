
interface CreateProductCatalogRequest {
    name: string;
    description: string;
    precioVentaPublico: number;
    note: string;
    nroSerie:string;
    assigned: boolean;
    createdBy: string;
}

interface CreateProductUncatalogRequest {
    name: string;
    description: string;
    precioVentaPublico: number;
    stock: number;
    note: string;
    createdBy:string;
}



interface Product {
    _id: string;
    identityCounter: string;
    name: string;
    nroSerie: string;
    description: string;
    precioVentaPublico: number;
    cataloged: boolean;
    stock: number;
    assigned: boolean;
    assignedTo: string;
    note: string;
    createdAt: string;
};


interface GetProductsResponse {
    code: number;
    status: number;
    message:Product[];
}

interface GetProductResponse {
    code: number;
    status: number;
    message:Product;
}

interface UpdateProductRequest{

    name: string;
    nroSerie: string;
    description: string;
    precioVentaPublico: number;
    cataloged: boolean;
    stock: number;
    assigned: boolean;
    assignedTo: string;
    note: string;

}


interface UpdateStockProductRequest{
    stock:number;
}

interface CatalogProductRequest{
    nroSeries:string;
}

export type {
    GetProductsResponse,
    Product,
    CreateProductCatalogRequest,
    CreateProductUncatalogRequest,
    GetProductResponse,
    UpdateProductRequest,
    CatalogProductRequest,
    UpdateStockProductRequest
}