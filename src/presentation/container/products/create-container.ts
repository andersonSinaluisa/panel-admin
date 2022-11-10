import { HeaderProps } from "infrastructure/api/api-handler"
import { CreateProductCatalogRequest } from "infrastructure/api/products/interface"
import { connect } from 'react-redux'
import CreateProduct from "presentation/components/products/create"
import { CreateProductCatalogStateProps } from "application/models/products";


export interface CreateProductProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    onCreateProductCatalogAsync:(props:{headers:HeaderProps, body:CreateProductCatalogRequest})=>void;
    CreateProductCatalog:CreateProductCatalogStateProps;
    idUser:string;
}

const mapStateToProps = ({AUTH,PRODUCTS}:any,ownProps:any) => {
    return {
        token: AUTH.Session.data.message.token,
        idUser:AUTH.Session.data.message.idUser,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        CreateProductCatalog:PRODUCTS.CreateProductCatalog
    }
}

const mapDispatchToProps = ({PRODUCTS}: any) => ({
    onCreateProductCatalogAsync:(props:{headers:HeaderProps, body:CreateProductCatalogRequest})=>PRODUCTS.onCreateProductCatalogAsync(props)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)