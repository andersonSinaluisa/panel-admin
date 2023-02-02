import EditProduct from "presentation/components/products/edit"
import { HeaderProps } from "infrastructure/api/api-handler"
import { connect } from 'react-redux'
import { GetProductResponse, UpdateProductRequest } from "infrastructure/api/products/interface"
import { UpdateProductStateProps } from "application/models/products";
import { CatalogueState } from "application/models/core";


export interface EditProductProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    onUpdateProductAsync:(props:{headers:HeaderProps, body:UpdateProductRequest,id:string})=>void;
    UpdateProduct:UpdateProductStateProps;
    onGetProductAsync:(props:{headers:HeaderProps, id:string})=>void;
    GetProduct: GetProductResponse;
    catalogue: CatalogueState;
    isLoading:boolean;

}

const mapStateToProps = ({AUTH,PRODUCTS,CORE,loading}:any,ownProps:any) => {
    return {
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        token: AUTH.Session.data.token,
        UpdateProduct: PRODUCTS.UpdateProduct,
        GetProduct: PRODUCTS.GetProduct.data,
        catalogue: CORE.catalogues,
        isLoading:  loading.effects.PRODUCTS.onUpdateProductAsync

    }
}



const mapDispatchToProps = ({PRODUCTS}: any) => ({
    onUpdateProductAsync:(props:{headers:HeaderProps, body:UpdateProductRequest,id:string})=>PRODUCTS.onUpdateProductAsync(props),
    onGetProductAsync:(props:{headers:HeaderProps, id:string})=> PRODUCTS.onGetProductAsync(props)
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)