import * as Globals from 'application/common';
import * as APIHANDLER from '../api-handler';
import { CatalogProductRequest, CreateProductCatalogRequest, CreateProductUncatalogRequest, UpdateProductRequest, UpdateStockProductRequest } from './interface';



const GetProducts = (props:APIHANDLER.HeaderProps)=>{
    return APIHANDLER.get(Globals.GET_PRODUCTS,{
        headers:{
            Authorization:"Bearer "+props.token
        }
    })
}

const GetProduct = (props:{headers:APIHANDLER.HeaderProps,id:string})=>{
    return APIHANDLER.get(Globals.GET_PRODUCTS+props.id,{
        headers:{
            Authorization:"Bearer "+props.headers.token
        }
    })
}

const CreateCatalogedProduct = (props:{headers:APIHANDLER.HeaderProps,body:CreateProductCatalogRequest})=>{
    return APIHANDLER.post(Globals.CREATE_CATALOGED_PRODUCTS,props.body,{
            Authorization:"Bearer "+props.headers.token
        
    })
}

const CreateUncatalogedProduct = (props:{headers:APIHANDLER.HeaderProps,body:CreateProductUncatalogRequest})=>{
    return APIHANDLER.post(Globals.CREATE_UNCATALOGED_PRODUCTS,props.body,{
            Authorization:"Bearer "+props.headers.token
        
    })
}

const UpdateProduct = (props:{headers:APIHANDLER.HeaderProps,body:UpdateProductRequest,id:string})=>{
    return APIHANDLER.put(Globals.UPDATE_PRODUCTS+props.id,props.body,{
            Authorization:"Bearer "+props.headers.token  
    })
}


const UpdateStockProduct = (props:{headers:APIHANDLER.HeaderProps,body:UpdateStockProductRequest,id:string})=>{
    return APIHANDLER.put(Globals.UPDATE_STOCK_PRODUCT+props.id,props.body,{
            Authorization:"Bearer "+props.headers.token  
    })
}

const CatalogProduct = (props:{headers:APIHANDLER.HeaderProps,body:CatalogProductRequest,id:string})=>{
    return APIHANDLER.put(Globals.CATALOGE_PRODUCT+props.id,props.body,{
            Authorization:"Bearer "+props.headers.token  
    })
}

//delete product
const DeleteProduct = (props:{headers:APIHANDLER.HeaderProps,id:string})=>{
    return APIHANDLER.del(Globals.DELETE_PRODUCT+props.id,{
            Authorization:"Bearer "+props.headers.token  
    })
}

export {
    GetProducts,
    CreateCatalogedProduct,
    CreateUncatalogedProduct,
    UpdateProduct,
    UpdateStockProduct,
    CatalogProduct,
    DeleteProduct,
    GetProduct

}