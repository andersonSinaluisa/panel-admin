import * as Globals from 'application/common';
import * as APIHANDLER from '../api-handler';



const Search = (props:{
    headers:APIHANDLER.HeaderProps,
    identityCounter:string,
    type:string,
})=>{
    return APIHANDLER.get(Globals.SEARCH+"?type="+props.type+"&text="+props.identityCounter,{
        headers:{
            Authorization:"Bearer "+props.headers.token
        }
    })
}

export {
    Search
}