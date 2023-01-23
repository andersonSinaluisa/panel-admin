interface Invoice {

    _id: string;
    identityCounter: string;
    state: string;
    billingDate: string;
    clientID: string;
    NumeroIdentificacionFiscal: string;
    products: Array<
        {
            id: string;
            name: string;
            nroSerie: string;
            note: string;
            price: number;
            quantity: number;
        }>,
    workReport: string;
    workDirection: string;
    clientDiscount: number;
    discount: number;
    IVA: number;
    impuestosVariables: number;
    paymentMethod: string;
    note: string;
    createdBy: string;
    createdAt: string;
}


interface GetInvoicesResponse {
    status: number;
    message: Invoice[];
}

interface GetInvoiceResponse {
    status: number;
    message: Invoice;
}
interface ProductInvoice{
    productId: number;
    amount: number;
}

interface CreateInvoiceRequest {
  
    billingDate: string;
    clientID: string;
    NumeroIdentificacionFiscal: string;
    products: ProductInvoice[];
    workReport: string;
    workDirection: string;
    clientDiscount: number;
    discount: number;
    IVA: number;
    impuestosVariables: number;
    paymentMethod: string;
    note: string;
}

export type {
    Invoice,
    GetInvoicesResponse,
    GetInvoiceResponse,
    CreateInvoiceRequest,
    ProductInvoice
}