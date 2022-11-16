import EditProduct from "presentation/components/products/edit"
import { HeaderProps } from "infrastructure/api/api-handler"
import { connect } from 'react-redux'
import { GetProductResponse, UpdateProductRequest } from "infrastructure/api/products/interface"
import { UpdateProductStateProps } from "application/models/products";


export interface EditProductProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    onUpdateProductAsync:(props:{headers:HeaderProps, body:UpdateProductRequest,id:string})=>void;
    UpdateProduct:UpdateProductStateProps;
    onGetProductAsync:(props:{headers:HeaderProps, id:string})=>void;
    GetProduct: GetProductResponse
}

const mapStateToProps = ({AUTH,PRODUCTS}:any,ownProps:any) => {
    return {
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        token: AUTH.Session.data.message.token,
        UpdateProduct: PRODUCTS.UpdateProduct,
        GetProduct: PRODUCTS.GetProduct.data
    }
}



const mapDispatchToProps = ({PRODUCTS}: any) => ({
    onUpdateProductAsync:(props:{headers:HeaderProps, body:UpdateProductRequest,id:string})=>PRODUCTS.onUpdateProductAsync(props),
    onGetProductAsync:(props:{headers:HeaderProps, id:string})=> PRODUCTS.onGetProductAsync(props)
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)