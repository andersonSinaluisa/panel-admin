import { HeaderProps } from "infrastructure/api/api-handler"
import { CreateProductRequest } from "infrastructure/api/products/interface"
import { connect } from 'react-redux'
import CreateProduct from "presentation/components/products/create"
import { CreateProductStateProps } from "application/models/products";
import { CatalogueState } from "application/models/core";


export interface CreateProductProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    onCreateProductAsync:(props:{headers:HeaderProps, body:CreateProductRequest})=>void;
    CreateProduct:CreateProductStateProps;
    idUser:string;
    catalogue: CatalogueState;
    isLoading:boolean;
}

const mapStateToProps = ({AUTH,PRODUCTS,CORE,loading}:any,ownProps:any) => {
    return {
        token: AUTH.Session.data.token,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        CreateProduct:PRODUCTS.CreateProduct,
        catalogue: CORE.catalogues,
        isLoading:  loading.effects.PRODUCTS.onCreateProductAsync

    }
}

const mapDispatchToProps = ({PRODUCTS}: any) => ({
    onCreateProductAsync:(props:{headers:HeaderProps, body:CreateProductRequest})=>PRODUCTS.onCreateProductAsync(props),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)