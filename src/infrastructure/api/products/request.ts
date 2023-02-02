import * as Globals from 'application/common';
import * as APIHANDLER from '../api-handler';
import { CatalogProductRequest, CreateProductRequest, UpdateProductRequest, UpdateStockProductRequest } from './interface';



const GetProducts = (props:APIHANDLER.HeaderProps)=>{
    let perPage = props.perPage || 15;
    let page = props.page || 1;
    return APIHANDLER.get(Globals.GET_PRODUCTS+"?perPage="+perPage+"&page="+page,{
        headers:{
            Authorization:"Bearer "+props.token
        }
    })
}

const GetProduct = (props:{headers:APIHANDLER.HeaderProps,id:string})=>{
    return APIHANDLER.get(Globals.GET_PRODUCTS+"/"+props.id,{
        headers:{
            Authorization:"Bearer "+props.headers.token
        }
    })
}

const CreateProduct = (props:{headers:APIHANDLER.HeaderProps,body:CreateProductRequest})=>{
    return APIHANDLER.post(Globals.CREATE_PRODUCTS,props.body,{
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
    CreateProduct,
    UpdateProduct,
    UpdateStockProduct,
    CatalogProduct,
    DeleteProduct,
    GetProduct

}