import { HeaderProps } from "infrastructure/api/api-handler"
import { CreateProductCatalogRequest, CreateProductUncatalogRequest } from "infrastructure/api/products/interface"
import { connect } from 'react-redux'
import CreateProduct from "presentation/components/products/create"
import { CreateProductCatalogStateProps, CreateProductUncatalogStateProps } from "application/models/products";


export interface CreateProductProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    onCreateProductCatalogAsync:(props:{headers:HeaderProps, body:CreateProductCatalogRequest})=>void;
    CreateProductCatalog:CreateProductCatalogStateProps;
    idUser:string;
    onCreateProductUncatalogAsync:(props:{
        headers:HeaderProps,
        body:CreateProductUncatalogRequest
    })=>void;
    CreateProductUncatalog:CreateProductUncatalogStateProps;
}

const mapStateToProps = ({AUTH,PRODUCTS}:any,ownProps:any) => {
    return {
        token: AUTH.Session.data.message.token,
        idUser:AUTH.Session.data.message.idUser,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        CreateProductCatalog:PRODUCTS.CreateProductCatalog,
        CreateProductUncatalog:PRODUCTS.CreateProductUncatalog
    }
}

const mapDispatchToProps = ({PRODUCTS}: any) => ({
    onCreateProductCatalogAsync:(props:{headers:HeaderProps, body:CreateProductCatalogRequest})=>PRODUCTS.onCreateProductCatalogAsync(props),
    onCreateProductUncatalogAsync:(props:{
        headers:HeaderProps,
        body:CreateProductUncatalogRequest
    })=>PRODUCTS.onCreateProductUncatalogAsync(props)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)