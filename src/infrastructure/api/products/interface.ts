import { MetaResponse } from "../api-handler";
import { Availability, State, Warehouse } from "../core/interface";

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
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    name: string;
    code: string;
    onSale: boolean;
    stock: number;
    priceForPublic: string;
    initialUnitPurchasePrice: string;
    description: string;
    
    state:State;
    availability:Availability;
    wharehouse:Warehouse;

};


interface GetProductsResponse extends MetaResponse {
    data:Product[];
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