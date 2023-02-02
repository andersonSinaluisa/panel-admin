import { MetaResponse } from "../api-handler";
import { Availability, State, Warehouse } from "../core/interface";

interface CreateProductRequest {
    warehouse:{
        id:number
    };
    type:{
        id:number
    };
    name: string;
    code: string;
    onSale: boolean;
    stock: number;
    priceForPublic: string;
    initialUnitPurchasePrice: string;
    description: string;
    
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
    type?: State;
    state:State;
    availability:Availability;
    warehouse:Warehouse;

};


interface GetProductsResponse extends MetaResponse {
    data:Product[];
}

interface GetProductResponse {
    data: Product;
    message:{
        status:number;
    }
}

interface UpdateProductRequest{

    warehouse:{
        id:number
    };
    type:{
        id:number
    };
    name: string;
    code: string;
    onSale: boolean;
    stock: number;
    priceForPublic: string;
    initialUnitPurchasePrice: string;
    description: string;

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
    CreateProductRequest,
    GetProductResponse,
    UpdateProductRequest,
    CatalogProductRequest,
    UpdateStockProductRequest
}