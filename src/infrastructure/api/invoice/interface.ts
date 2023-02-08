import { MetaResponse } from "../api-handler";
import { Client } from "../clients/interface";
import { Availability, PaymentMethod, State } from "../core/interface";
import { Product } from "../products/interface";

interface Invoice {

    id:number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    billingDate: string;
    taxIdentificationNumber: string;
    workReport: string;
    workDirection: string;
    discount: number;
    clientDiscount: number;
    iva: number;
    variableTaxes: number;
    description: string;
    state:State;
    availability:Availability;
    client:Client;
    paymentMethod:PaymentMethod;
   
    invoiceDetails: InvoiceDetail[];
}
interface InvoiceDetail{
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    amount: number;
    state: State;
    availability: Availability;
    product: Product;

}

interface GetInvoicesResponse  extends MetaResponse{
    data: Invoice[];
}

interface GetInvoiceResponse {
    data: Invoice;
}
interface ProductInvoice{
    productId: number;
    amount: number;
}

interface CreateInvoiceRequest {
  
   
    billingAt: string;
    taxIdentificationNumber: string;
    workReport: string;
    workDirection: string;
    discount: number;
    clientDiscount: number;
    iva: number;
    variableTaxes: number;
    description: string;
    client: {
        id: number;
    },
    paymentMethod: {
        id: number;
    },
    detailsInvoice: {
        amount: number;
        productId: number;
    }[]
}

export type {
    Invoice,
    GetInvoicesResponse,
    GetInvoiceResponse,
    CreateInvoiceRequest,
    ProductInvoice
}