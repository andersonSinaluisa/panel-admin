import { invoice_interface } from "infrastructure/api/invoice";
import { DetailInvoiceProps } from "presentation/container/invoice/detail-container";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";


const DetailInvoice = (props:DetailInvoiceProps) => {

    const {id} = useParams();

    const [invoice,setInvoice] = React.useState<invoice_interface.GetInvoiceResponse>({
        message:{
            _id: "",
            identityCounter: "",
            state: "",
            billingDate: "",
            clientID: "",
            NumeroIdentificacionFiscal: "",
            products:[],
            workReport: "",
            workDirection: "",
            clientDiscount: 0,
            discount: 0,
            IVA:0,
            impuestosVariables: 0,
            paymentMethod: "",
            note: "",
            createdBy: "",
            createdAt: ""
        },
        status:0
    });



    useEffect(() => {
        props.onGetInvoiceAsync({
            headers:{
                token:props.token,
            },
            id:id as string
        })
    }, [id])

    useEffect(() => {
        setInvoice(props.GetInvoice)
    }, [props.GetInvoice])



    return (<section className="invoice-view-wrapper">
        <div className="row">
            {/* invoice view page */}
            <div className="col-xl-9 col-md-8 col-12">
                <div className="card invoice-print-area">
                    <div className="card-content">
                        <div className="card-body pb-0 mx-25">
                            {/* header section */}
                            <div className="row">
                                <div className="col-xl-4 col-md-12">
                                    <span className="invoice-number mr-50">Invoice#</span>
                                    <span>000756</span>
                                </div>
                                <div className="col-xl-8 col-md-12">
                                    <div className="d-flex align-items-center justify-content-xl-end flex-wrap">
                                        <div className="mr-3">
                                            <small className="text-muted">Date Issue:</small>
                                            <span>08/10/2019</span>
                                        </div>
                                        <div>
                                            <small className="text-muted">Date Due:</small>
                                            <span>08/10/2019</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* logo and title */}
                            <div className="row my-3">
                                <div className="col-6">
                                    <h4 className="text-primary">Invoice</h4>
                                    <span>Software Development</span>
                                </div>
                                <div className="col-6 d-flex justify-content-end">
                                </div>
                            </div>
                            <hr />
                            {/* invoice address and contact */}
                            <div className="row invoice-info">
                                <div className="col-6 mt-1">
                                    <h6 className="invoice-from">Bill From</h6>
                                    <div className="mb-1">
                                        <span>Clevision PVT. LTD.</span>
                                    </div>
                                    <div className="mb-1">
                                        <span>9205 Whitemarsh Street New York, NY 10002</span>
                                    </div>
                                    <div className="mb-1">
                                        <span>hello@clevision.net</span>
                                    </div>
                                    <div className="mb-1">
                                        <span>601-678-8022</span>
                                    </div>
                                </div>
                                <div className="col-6 mt-1">
                                    <h6 className="invoice-to">Bill To</h6>
                                    <div className="mb-1">
                                        <span>Pixinvent PVT. LTD.</span>
                                    </div>
                                    <div className="mb-1">
                                        <span>203 Sussex St. Suite B Waukegan, IL 60085</span>
                                    </div>
                                    <div className="mb-1">
                                        <span>pixinvent@gmail.com</span>
                                    </div>
                                    <div className="mb-1">
                                        <span>987-352-5603</span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                        {/* product details table*/}
                        <div className="invoice-product-details table-responsive mx-md-25">
                            <table className="table table-borderless mb-0">
                                <thead>
                                    <tr className="border-0">
                                        <th scope="col">Item</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Cost</th>
                                        <th scope="col">Qty</th>
                                        <th scope="col" className="text-right">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Frest Admin</td>
                                        <td>HTML Admin Template</td>
                                        <td>28</td>
                                        <td>1</td>
                                        <td className="text-primary text-right font-weight-bold">$28.00</td>
                                    </tr>
                                    <tr>
                                        <td>Apex Admin</td>
                                        <td>Anguler Admin Template</td>
                                        <td>24</td>
                                        <td>1</td>
                                        <td className="text-primary text-right font-weight-bold">$24.00</td>
                                    </tr>
                                    <tr>
                                        <td>Stack Admin</td>
                                        <td>HTML Admin Template</td>
                                        <td>24</td>
                                        <td>1</td>
                                        <td className="text-primary text-right font-weight-bold">$24.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* invoice subtotal */}
                        <div className="card-body pt-0 mx-25">
                            <hr />
                            <div className="row">
                             
                                <div className="col-8 col-sm-6 d-flex justify-content-end mt-75">
                                    <div className="invoice-subtotal">
                                        <div className="invoice-calc d-flex justify-content-between">
                                            <span className="invoice-title">Subtotal</span>
                                            <span className="invoice-value">$ 76.00</span>
                                        </div>
                                        <div className="invoice-calc d-flex justify-content-between">
                                            <span className="invoice-title">Discount</span>
                                            <span className="invoice-value">- $ 09.60</span>
                                        </div>
                                        <div className="invoice-calc d-flex justify-content-between">
                                            <span className="invoice-title">Tax</span>
                                            <span className="invoice-value">21%</span>
                                        </div>
                                        <hr />
                                        <div className="invoice-calc d-flex justify-content-between">
                                            <span className="invoice-title">Invoice Total</span>
                                            <span className="invoice-value">$ 66.40</span>
                                        </div>
                                        <div className="invoice-calc d-flex justify-content-between">
                                            <span className="invoice-title">Paid to date</span>
                                            <span className="invoice-value">- $ 00.00</span>
                                        </div>
                                        <div className="invoice-calc d-flex justify-content-between">
                                            <span className="invoice-title">Balance (USD)</span>
                                            <span className="invoice-value">$ 10,953</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* invoice action  */}
            <div className="col-xl-3 col-md-4 col-12">
                <div className="card invoice-action-wrapper shadow-none border">
                    <div className="card-body">
                        <div className="invoice-action-btn">
                            <button className="btn btn-primary btn-block invoice-send-btn">
                                <i className="bx bx-send"></i>
                                <span>Send Invoice</span>
                            </button>
                        </div>
                        <div className="invoice-action-btn">
                            <button className="btn btn-light-primary btn-block invoice-print">
                                <span>print</span>
                            </button>
                        </div>
                        <div className="invoice-action-btn">
                            <a href="app-invoice-edit.html" className="btn btn-light-primary btn-block">
                                <span>Edit Invoice</span>
                            </a>
                        </div>
                        <div className="invoice-action-btn">
                            <button className="btn btn-success btn-block">
                                <i className='bx bx-dollar'></i>
                                <span>Add Payment</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}
export default DetailInvoice;