interface Invoice {

    _id: string;
    identityCounter: number;
    state: string;
    billingDate: Date;
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
    createdAt: Date;
}


interface GetInvoicesResponse {
    status: number;
    message: Invoice[];
}

interface GetInvoiceResponse {
    status: number;
    message: Invoice;
}


interface CreateInvoiceRequest {
  
    billingDate: Date;
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
        }>;
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
    CreateInvoiceRequest
}