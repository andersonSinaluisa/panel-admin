import { HeaderProps } from "infrastructure/api/api-handler"
import { connect } from 'react-redux'
import ProductView from "presentation/components/products/view"
import { products_interface } from "infrastructure/api/products"
import { CatalogProductStateProps, DeleteProductStateProps, UpdateStockProductStateProps } from "application/models/products";


export interface ProductsViewProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    GetProducts:products_interface.GetProductsResponse;
    onGetProductsAsync:(props: HeaderProps)=>void;
    onUpdateStockProductAsync:(props:{headers:HeaderProps,body:products_interface.UpdateStockProductRequest,id:string})=>void;
    UpdateStockProduct:UpdateStockProductStateProps
    onCatalogProductAsync:(props:{headers:HeaderProps,body:products_interface.CatalogProductRequest,id:string})=>void;
    CatalogProduct:CatalogProductStateProps;
    onDeleteProductAsync:(props:{headers:HeaderProps,id:string})=>void;
    DeleteProduct:DeleteProductStateProps;
    onClearProducts:()=>void;
}

//connect to redux
const mapStateToProps = ({AUTH,PRODUCTS}:any,ownProps:any) => {
    return {
        token: AUTH.Session.data.message.token,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        GetProducts:PRODUCTS.GetProducts.data,
        UpdateStockProduct:PRODUCTS.UpdateStockProduct,
        CatalogProduct:PRODUCTS.CatalogProduct,
        DeleteProduct:PRODUCTS.DeleteProduct
    }
}

const mapDispatchToProps = ({PRODUCTS}: any) => ({
    onGetProductsAsync:(props: HeaderProps)=>PRODUCTS.onGetProductsAsync(props),
    onUpdateStockProductAsync:(props:{headers:HeaderProps,body:products_interface.UpdateStockProductRequest,id:string})=>PRODUCTS.onUpdateStockProductAsync(props),
    onCatalogProductAsync:(props:{headers:HeaderProps,body:products_interface.CatalogProductRequest,id:string})=>PRODUCTS.onCatalogProductAsync(props),
    onDeleteProductAsync:(props:{headers:HeaderProps,id:string})=>PRODUCTS.onDeleteProductAsync(props),
    onClearProducts:()=>PRODUCTS.onClearProducts()
})


export default connect(mapStateToProps, mapDispatchToProps)(ProductView)