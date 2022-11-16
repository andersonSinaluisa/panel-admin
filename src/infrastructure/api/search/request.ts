import * as Globals from 'application/common';
import * as APIHANDLER from '../api-handler';



const Search = (props:{
    headers:APIHANDLER.HeaderProps,
    identityCounter:string
})=>{
    return APIHANDLER.get(Globals.SEARCH+props.identityCounter,{
        headers:{
            Authorization:"Bearer "+props.headers.token
        }
    })
}

export {
    Search
}